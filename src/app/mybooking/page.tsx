import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/Auth/getUserProfile";
import getBookings from "@/libs/Booking/getBookings";
import BookingCard from "@/components/BookingCard";

export default async function MyBooking() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.token) return null;

    const profile = await getUserProfile(session.user.token);
    const createdAt = new Date(profile.data.createdAt);

    const bookingJson:BookingJson = await getBookings(session.user.token)

    return (
        <main className="w-full min-h-screen flex flex-col items-center bg-gray-100">
            <div className="max-w-4xl w-full p-8 rounded-lg">
                {/* Title */}
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                    My Booking
                </h1>
                {bookingJson?.count ? (
                    <div>
                        {bookingJson.data.map((bookingItem: BookingItem) => (
                            <BookingCard key={bookingItem._id} bookingData={bookingItem}/>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No bookings found.</p>
                )}
            </div>
        </main>
    );
}
