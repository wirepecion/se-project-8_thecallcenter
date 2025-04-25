import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/Auth/getUserProfile";
import ProfileUserCard from '@/components/ProfileUserCard';
import MembershipCard from "@/components/MembershipCard";
import CreditsCard from "@/components/CreditsCard";
import DiscountCard from "@/components/DiscountCard";
import RankCard from "@/components/RankCard";
import TotalAmountCard from "@/components/TotalAmountCard";
import TotalUserCard from "@/components/TotalUserCard";
import SubscriptionCard from "@/components/SubscriptionCard";
import TotalPendingCard from "@/components/TotalPendingCard";

export default async function ProfilePage({ params }: { params: { uid: string } }) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

    const userProfile = await getUserProfile(session.user.token);
    const user: UserItem = userProfile.data;

    return (

        
        <div className="min-h-screen w-full text-white py-10 px-4">
            
            { user.role === "user" && (
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
            )}
            { user.role === "hotelManager" && (
                <div className="max-w-screen-lg mx-auto flex flex-col gap-12">
                    <div className="p-2"/>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <ProfileUserCard uid={params.uid} />
                        <SubscriptionCard uid={params.uid} />
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <div className="p-[1px]"/>
                        <TotalAmountCard uid={params.uid} />
                        <TotalUserCard uid={params.uid} />
                        <TotalPendingCard uid={params.uid} />
                    </div>
                </div>
            )}
        </div>
    );
}
