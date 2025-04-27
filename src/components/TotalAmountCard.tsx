import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/Auth/getUserProfile";
import getBookings from "@/libs/Booking/getBookings";
import getHotel from "@/libs/Hotel/getHotel";
import Image from "next/image";
import getUser from "@/libs/Auth/getUser";

export default async function TotalAmountCard({ token, uid }: { token: string, uid?: string }): Promise<JSX.Element | null> {

    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;
    const profile = await (uid ? getUser(token, uid) : getUserProfile(token));

    const bookingJson = await getBookings(session.user.token);
    const totalAmount = bookingJson.data.flatMap((booking: any) => booking.payments || [])
    .filter((payment: PaymentItem) => (payment.status) === "completed")
    .reduce((sum: number, payment: PaymentItem) => sum + Number(payment.amount || 0), 0);

    const resHotel = await getHotel(profile.data.responsibleHotel)

    return (
        <div className="bg-white rounded-xl shadow-md p-6 w-4/12 h-[159px] text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <div className="flex justify-between items-start mb-2">
            <div className="flex flex-col items-start mb-1">
            <p className="text-gray-500 text-medium leading-tight mb-3">Total Amount</p>
            <p className="text-gray-800 font-semibold text-3xl leading-tigh mb-2">฿{totalAmount.toFixed(2)}</p>
            </div>
                <Image src="/img/icons/totalAmount.png" alt="Total Amount" width={50} height={50} className="object-contain" />
            </div>
            <p>
                <span className="text-green-500 font-semibold">{resHotel.data.name}</span>
            </p>
        </div>
    );
}