import getUserProfile from "@/libs/Auth/getUserProfile";
import getBookings from "@/libs/Booking/getBookings";
import MyBookingPage from "@/components/MyBookingPage";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function MyBooking() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.token) {
        return <p className="text-center text-gray-500">Unauthorized. Please log in.</p>;
    }

    // Fetch user profile & bookings on the server
    const profile = await getUserProfile(session.user.token);
    const bookingJson: BookingJson = await getBookings(session.user.token);
    console.log("Role from myBooking page: " + profile.name)

    return (
        <MyBookingPage 
            initialBookings={bookingJson.data} 
            initialUserProfile={profile.data} 
            sessionToken={session.user.token}
        />
    );
}
