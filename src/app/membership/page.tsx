
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/Auth/getUserProfile";
import HeroSection from "@/components/HeroSection";
import DiscriptionMember from "@/components/DiscriptionMember";

export default async function Membership() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

    const profile = await getUserProfile(session.user.token);
    const role = profile.data.role;

    return (
        <main className="h-auto min-h-screen">
            <HeroSection
                title={
                    <>
                        Membership<br /> Loyalty Program
                    </>
                }
                description="Turn every stay into a rewarding experience."
                imageSrc="/assets/girlinmember.png"
            />
            <DiscriptionMember />
        </main>
    );
}