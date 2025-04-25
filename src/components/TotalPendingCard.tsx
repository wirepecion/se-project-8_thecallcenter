
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/Auth/getUserProfile";
import getBookings from "@/libs/Booking/getBookings";
import getHotel from "@/libs/Hotel/getHotel";
import Image from "next/image";

export default async function TotalPendingCard({ uid }: { uid: string }): Promise<JSX.Element | null> {

    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;
    const profile = await getUserProfile(session.user.token);

    const bookingJson = await getBookings(session.user.token);
    const totalPending = bookingJson.data
        .flatMap((booking: any) => booking.payments || [])
        .filter((payment: PaymentItem) => payment.status === "pending")
        .reduce((sum: number, payment: PaymentItem) => sum + 1, 0);
      

    const resHotel = await getHotel(profile.data.responsibleHotel)

    return (
        <div className="bg-white rounded-xl shadow-md p-6 w-80 h-[150px] text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <div className="flex justify-between items-start mb-2">
            <div className="flex flex-col items-start mb-1">
            <p className="text-gray-500 text-medium leading-tight mb-3">Total Pending</p>
            <p className="text-gray-800 font-semibold text-3xl leading-tigh mb-2">{totalPending}</p>
            </div>
                <Image src="/img/icons/totalPending.png" alt="Total Amount" width={50} height={50} className="object-contain" />
            </div>
            <p>
                <span className="text-orange-500 font-semibold">Pending payments</span>
            </p>
        </div>
    );
}
