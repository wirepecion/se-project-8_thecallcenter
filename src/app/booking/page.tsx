'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import getUserProfile from '@/libs/Auth/getUserProfile';
import getHotels from '@/libs/Hotel/getHotels';
import BookingForm from '@/components/BookingForm';
import HeroSection from '@/components/HeroSection';
import Loader from '@/components/Loader';

export default function Booking() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [hotels, setHotels] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.token) return;

      try {
        const profileData = await getUserProfile(session.user.token);
        const hotelsData = await getHotels();
        setProfile(profileData);
        setHotels(hotelsData);
      } catch (err) {
        console.error('Failed to load data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session]);

  if (status === 'loading' || loading || !profile || !hotels) {
    return (
      <main className="h-auto min-h-screen flex items-center justify-center">
        <Loader />
      </main>
    );
  }

  const role = profile.data.role;

  return (
    <main className="h-auto">
      {role === "user" && (
        <>
          <HeroSection
            title={
              <>
                Booking <br /> Your Stay
              </>
            }
            description="The most seamless and secure way to book unique hotel experiences around the world."
            imageSrc="/assets/room.png"
          />
          <BookingForm hotels={hotels.data} userProfile={profile} />
        </>
      )}
      {role === "admin" && (
        <HeroSection
          title={
            <>
              Your role <br /> is Admin
            </>
          }
          description="You are logged in as an admin. Please log in as a user to book hotels."
          imageSrc="/assets/room.png"
        />
      )}
      {role === "hotelManager" && (
        <HeroSection
          title={
            <>
              Your role <br /> is Hotel manager
            </>
          }
          description="You are logged in as a hotel manager. Please log in as a user to book hotels."
          imageSrc="/assets/room.png"
        />
      )}
    </main>
  );
}
