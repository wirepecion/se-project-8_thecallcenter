import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/Auth/getUserProfile";
import { Bitcoin } from "lucide-react"; // ใช้ไอคอนแทนรูปภาพ

export default async function CreditsCard({ uid }: { uid: string }): Promise<JSX.Element | null> {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

    const userProfile = await getUserProfile(session.user.token);
    const user = userProfile.data;

    return (
        <div className="max-w-sm mx-auto w-108 h-[150px] p-6 bg-white rounded-2xl shadow-md flex items-center space-x-4 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <div className="bg-blue-100 p-4 rounded-full ">
                <Bitcoin className="w-8 h-8 text-blue-600" />
            </div>
            <div>
                <p className="text-2xl font-bold text-blue-600">{user.credit}</p>
                <p className="text-sm text-gray-600 font-semibold">Credits Remaining</p>
                <p className="text-xs text-gray-500 mt-1">Tip: You can use your credits just like cash when making a payment.</p>
            </div>
        </div>
    );
}
