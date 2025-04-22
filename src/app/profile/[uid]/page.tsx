import ProfileUserCard from '@/components/ProfileUserCard';

export default function ProfilePage({ params }: { params: { uid: string } }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
            <p className="text-lg">User ID: {params.uid}</p>

            <ProfileUserCard uid={params.uid} />
            {/* Add more profile details here */}
        </div>
    );
}