import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/Auth/getUserProfile";
import ProfileUserCard from '@/components/ProfileUserCard';
import MembershipCard from "@/components/MembershipCard";
import CreditsCard from "@/components/CreditsCard";
import DiscountCard from "@/components/DiscountCard";
import RankCard from "@/components/RankCard";

export default async function UserProfile({ params }: { params: { uid: string } }) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;
    const userProfile: UserJson = await getUserProfile(session.user.token);
    const user = userProfile.data;
    if (user.role !== "admin") return <p className="text-center text-gray-500">Unauthorized. Only admin can access this path.</p>;

    return (
        <div className="min-h-screen w-full text-white py-10 px-4">
            
                <div className="max-w-screen-lg mx-auto flex flex-col gap-12">
                    <div className="p-2"/>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <ProfileUserCard token={session.user.token} uid={params.uid} />
                        <MembershipCard token={session.user.token} uid={params.uid} />
                    </div>

                     <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <RankCard token={session.user.token} uid={params.uid} />
                        <DiscountCard token={session.user.token} uid={params.uid} />
                        <CreditsCard token={session.user.token} uid={params.uid} />
                    </div>

                </div>
        </div>
    );
}
