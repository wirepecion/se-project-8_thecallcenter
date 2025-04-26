import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/Auth/getUserProfile";
import HeroSection from "@/components/HeroSection";
import DescriptionMember from "@/components/DescriptionMember";
import MembershipTable from "@/components/MembershipTable"; 
import MembershipCard from "@/components/MembershipCard";

export default async function Membership({ params }: { params: { uid: string } }) {
    const session = await getServerSession(authOptions);


    let user: UserItem | null = null;
    if (session?.user?.token) {
        const userProfile: UserJson = await getUserProfile(session.user.token);
        user = userProfile.data;
    }

    return (
        <main className="min-h-screen">
            <HeroSection
                title={<>Membership<br /> Loyalty Program</>}
                description="Turn every stay into a rewarding experience."
                imageSrc="/assets/girlinmember.png"
            />
            {session ? (
                user?.membershipTier !== "none" ? (
                    <div className="flex justify-center">
                        <MembershipCard token={session.user.token}/>
                    </div>
                ) : (
                    <div>
                        <DescriptionMember />
                    </div>
                )
            ) : <div>
            <DescriptionMember />
        </div>}
            

            <MembershipTable user={user} />
        </main>
    );
}
