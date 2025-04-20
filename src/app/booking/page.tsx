import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/Auth/getUserProfile";
import getHotels from "@/libs/Hotel/getHotels";
import BookingForm from "@/components/BookingForm";
import HeroSection from "@/components/HeroSection";

export default async function Booking() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  const profile = await getUserProfile(session.user.token);
  const hotelJson: HotelJson = await getHotels();

  const role = profile.data.role;

  console.log("User Profile:", role);

  return (
    <main className="h-auto min-h-screen">
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
          {/* <BookingHero /> */}
          <BookingForm hotels={hotelJson.data} userProfile={profile} />
        </>
      )}
      {role === "admin" && (
        <>
         <>
          <HeroSection
            title={
              <>
                Your role <br /> is Admin
              </>
            }
            description="You are logged in as an admin. Please log in as a user to book hotels."
            imageSrc="/assets/room.png"
          />
        </>
        </>
      )}
      {role === "hotelManager" && (
        <>
        <>
         <HeroSection
           title={
             <>
               Your role <br /> is Hotel manager
             </>
           }
           description="You are logged in as an hotel manager. Please log in as a user to book hotels."
           imageSrc="/assets/room.png"
         />
       </>
       </>
      )}
    </main>
  );
}
