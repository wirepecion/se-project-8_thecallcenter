import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/Auth/getUserProfile";
import MyProfilePage from "@/components/profile-component/MyProfilePage";
import ProfileUserCard from '@/components/ProfileUserCard';
import MembershipCard from "@/components/MembershipCard";
import CreditsCard from "@/components/CreditsCard";
import DiscountCard from "@/components/DiscountCard";
import RankCard from "@/components/RankCard";

export default async function Profile() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

    const userProfile: UserJson = await getUserProfile(session.user.token);
    const user = userProfile.data;

    return (
        <>
            { 
                user.role === "admin" ? (
                    <MyProfilePage sessionToken={session?.user?.token} name={userProfile.data.name}/>
                ) : (
                    <div className="min-h-screen w-full text-white py-10 px-4">
                        <div className="max-w-screen-lg mx-auto flex flex-col gap-12">
                            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                                <ProfileUserCard uid={user._id} />
                                <MembershipCard uid={user._id} />
                            </div>

                            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                                <RankCard uid={user._id} />
                                <DiscountCard uid={user._id} />
                                <CreditsCard uid={user._id} />
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}