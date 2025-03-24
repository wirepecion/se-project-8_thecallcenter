"use client";

import { useEffect, useState } from "react";
import getUserProfile from "@/libs/Auth/getUserProfile";
import getBookings from "@/libs/Booking/getBookings";
import BookingCard from "@/components/BookingCard";
import { useSession } from "next-auth/react";

export default function MyBooking() {
    const { data: session } = useSession();
    const [bookings, setBookings] = useState<BookingItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState<UserItem | null>(null);

    useEffect(() => {
        async function fetchData() {
            if (!session?.user?.token) return;
            
            const profile = await getUserProfile(session.user.token);
            console.log(profile)
            setUserProfile(profile.data)

            const bookingJson: BookingJson = await getBookings(session.user.token);
            setBookings(bookingJson.data);
            setLoading(false);
        }

        fetchData();
    }, []);

    if (loading) return <p className="text-center text-gray-500">Loading bookings...</p>;

    return (
        <main className="w-full min-h-screen flex flex-col items-center bg-gray-100">
            <div className="max-w-4xl w-full p-8 rounded-lg">
                {/* Title */}
                {  userProfile?.role=='admin'?
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Bookings</h1>
                : <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">My Bookings</h1> }

                {bookings.length > 0 ? (
                    <div>
                        {bookings.map((bookingItem) => (
                            <BookingCard 
                                key={bookingItem._id} 
                                bookingData={bookingItem} 
                                setBookings={setBookings} // Pass the setter function
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No bookings found.</p>
                )}
            </div>
        </main>
    );
}
