import { Button } from "@mui/material";
import DateReserve from "@/components/DateReserve";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/Auth/getUserProfile";
import getHotels from "@/libs/Hotel/getHotels";
import HotelBooking from "@/components/HotelBooking";
import BookingButton from "@/components/BookingButton";

export default async function Booking() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

    const profile = await getUserProfile(session.user.token);
    var createdAt = new Date(profile.data.createdAt);

    const hotelJson:HotelJson = await getHotels()

    return (
    <main className="w-full min-h-screen flex flex-col justify-center items-center bg-gray-100 py-10 px-6">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
        {/* Title */}
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Hotel Booking
        </h1>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center md:place-items-start">
          {/* User Profile Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Your Profile
            </h2>
            <table className="w-full border-collapse border border-gray-300">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium text-gray-600">Name:</td>
                  <td className="p-3">{profile.data.name}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium text-gray-600">Email:</td>
                  <td className="p-3">{profile.data.email}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-medium text-gray-600">Tel:</td>
                  <td className="p-3">{profile.data.tel}</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-gray-600">Member Since:</td>
                  <td className="p-3">{createdAt.toDateString()}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Booking Section */}
          <div className="flex flex-col items-center space-y-5 bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">Select Your Stay</h2>

            <HotelBooking hotels={hotelJson.data}/>

            <div className="w-full">
              <p className="text-sm text-gray-600 mb-1">Check-In Date:</p>
              <DateReserve />
            </div>

            <div className="w-full">
              <p className="text-sm text-gray-600 mb-1">Check-Out Date:</p>
              <DateReserve />
            </div>

            <BookingButton/>
          </div>
        </div>
      </div>
    </main>
  );
}
