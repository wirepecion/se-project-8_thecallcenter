import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/Auth/getUserProfile";
import ProfileUserCard from '@/components/ProfileUserCard';
import MemberShipCard from "@/components/MembershipCard";
import MembershipCard from "@/components/MembershipCard";

export default async function ProfilePage({ params }: { params: { uid: string } }) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

    const userProfile = await getUserProfile(session.user.token);

    const user = userProfile.data;

    return (

        
        <div className="p-3 h-auto text-white min-h-screen w-[95%]">
            
            <div className="flex items-center justify-center min-h-screen">
            <ProfileUserCard uid={params.uid} />

            <MembershipCard uid={params.uid} />
        </div>

        </div>
    );
}
