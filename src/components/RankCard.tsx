import Image from "next/image";
import getUser from "@/libs/Auth/getUser";
import getUserProfile from "@/libs/Auth/getUserProfile";
import Link from "next/link";

export default async function RankCard({ 
    token,
    uid 
}: { 
    token: string
    uid?: string 
}) {

    const userProfile = await (uid ? getUser(token, uid) : getUserProfile(token));
    const user = userProfile.data;

    const tier = user.membershipTier?.toLowerCase() || "none";
    const tierImage = `/img/Membership_tier/${tier}.png`; 

    return (

        <div className="bg-white rounded-xl shadow-md p-6 w-3/12 h-[150px] flex justify-between items-center max-w-md transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <div className="flex flex-col items-start">
                <p className="text-gray-800 font-semibold text-2xl">Benefits</p>
                <Link href="/membership" className="text-sm font-semibold text-blue-500 mt-1 hover:underline">
                    → see more
                </Link>
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
