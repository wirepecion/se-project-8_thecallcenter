import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/Auth/getUserProfile";
import MyProfilePage from "@/components/profile-component/MyProfilePage";

export default async function MyProfile() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.token) {
        return <p className="text-center text-gray-500">Unauthorized. Please log in.</p>;
    }

    // Fetch user profile & Check admin role
    const profile: UserJson = await getUserProfile(session.user.token);
    if (profile.data.role !== "admin") {
        return <p className="text-center text-gray-500">Unauthorized. Only admin can access this path.</p>;
    }

    return (
        <MyProfilePage sessionToken={session?.user?.token} name={profile.data.name}/>
    );
}