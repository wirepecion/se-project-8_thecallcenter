import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/Auth/getUserProfile";

export default async function RankCard({ uid }: { uid: string }): Promise<JSX.Element | null> {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

    const userProfile = await getUserProfile(session.user.token);
    const user = userProfile.data;

    const tier = user.membershipTier?.toLowerCase() || "none";
    const tierImage = `/img/ranks/${tier}.png`; 

    return (

        <div className="bg-white rounded-xl shadow-md p-6 w-3/12 h-[150px] flex justify-between items-center max-w-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <div className="flex flex-col items-start">
                <p className="text-gray-800 font-semibold text-2xl">Benefits</p>
                <button className="text-sm font-semibold text-blue-500 mt-1 hover:underline">
                    → see more
                </button>
            </div>
            <div className="w-20 h-20 relative">
                <Image
                    src={tierImage}
                    alt={`${tier} rank`}
                    fill
                    className="object-contain"
                />
            </div>
        </div>
    );
}
