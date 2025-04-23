import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/Auth/getUserProfile";
import ProfileUserCard from '@/components/ProfileUserCard';
import MembershipCard from "@/components/MembershipCard";
import CreditsCard from "@/components/CreditsCard";
import DiscountCard from "@/components/DiscountCard";
import RankCard from "@/components/RankCard";

export default async function ProfilePage({ params }: { params: { uid: string } }) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

    const userProfile = await getUserProfile(session.user.token);
    const user = userProfile.data;

    return (

        
        <div className="min-h-screen w-full text-white py-10 px-4">
            
            <div className="max-w-screen-lg mx-auto flex flex-col gap-12">
                
                <div className="p-2"/>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <ProfileUserCard uid={params.uid} />
                    <MembershipCard uid={params.uid} />
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <div className="p-[1px]"/>
                    <RankCard uid={params.uid} />
                    <DiscountCard uid={params.uid} />
                    <CreditsCard uid={params.uid} />
                </div>
            </div>
        </div>
    );
}
