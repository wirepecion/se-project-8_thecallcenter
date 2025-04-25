
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/Auth/getUserProfile";
import getBookings from "@/libs/Booking/getBookings";
import getHotel from "@/libs/Hotel/getHotel";
import Image from "next/image";

export default async function TotalUserCard({ uid }: { uid: string }): Promise<JSX.Element | null> {

    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;
    const profile = await getUserProfile(session.user.token);

    const bookingJson = await getBookings(session.user.token);
    const totalUser = new Set(bookingJson.data
        .flatMap((booking: any) => booking.user || [])
        .filter((user: UserItem) => user.name)
        .map((user: UserItem) => user.name)
    ).size;
      

    const resHotel = await getHotel(profile.data.responsibleHotel)

    return (
        <div className="bg-white rounded-xl shadow-md p-6 w-80 h-[150px] text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <div className="flex justify-between items-start mb-2">
            <div className="flex flex-col items-start mb-1">
            <p className="text-gray-500 text-medium leading-tight mb-3">Total User</p>
            <p className="text-gray-800 font-semibold text-3xl leading-tigh mb-2">{totalUser}</p>
            </div>
                <Image src="/img/icons/totalUser.png" alt="Total Amount" width={50} height={50} className="object-contain" />
            </div>
            <p>
                <span className="text-blue-500 font-semibold">User status</span>
            </p>
        </div>
    );
}
