import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/Auth/getUserProfile";
import MyProfilePage from "@/components/profile-component/MyProfilePage";
import ProfileUserCard from '@/components/ProfileUserCard';
import MembershipCard from "@/components/MembershipCard";
import CreditsCard from "@/components/CreditsCard";
import DiscountCard from "@/components/DiscountCard";
import RankCard from "@/components/RankCard";
import TotalAmountCard from "@/components/TotalAmountCard";
import TotalUserCard from "@/components/TotalUserCard";
import AdsTokenCard from "@/components/AdsTokenCard";
import TopUpHero from "@/components/TopUpHero";
import TopUpPackage from "@/components/TopUpPackage";

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
                ) : user.role === "hotelManager" ? (
                    <div className="min-h-screen w-full text-white py-10 px-4">
                        <div className="max-w-screen-lg mx-auto flex flex-col gap-12">
                            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                                <ProfileUserCard token={session.user.token} />
                                <AdsTokenCard token={session.user.token} />
                            </div>
        
                            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                                <TotalAmountCard token={session.user.token} />
                                <TotalUserCard token={session.user.token} />
                                <CreditsCard token={session.user.token} />
                            </div>
                            <div className="flex flex-col md:flex-col items-center justify-center gap-6">
                                <TopUpHero />
                                <TopUpPackage />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="min-h-screen w-full text-white py-10 px-4">
                        <div className="max-w-screen-lg mx-auto flex flex-col gap-12">
                            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                                <ProfileUserCard token={session.user.token}/>
                                <MembershipCard token={session.user.token}/>
                            </div>

                            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                                <RankCard token={session.user.token}/>
                                <DiscountCard token={session.user.token}/>
                                <CreditsCard token={session.user.token}/>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
}