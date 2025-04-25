import ProfileRow from "./ProfileRow";

export default function ProfileTable({
    users
}: {
    users: UserItem[] | null
}) {
    return (
        <table className="mx-auto mb-10 text-sm font-sans">
            <thead>
            <tr className="bg-gray-100 text-[#1A4F83]">
                <th className="p-4 pl-10 pr-5 font-semibold text-left">NAME</th>
                <th className="p-4 px-5 font-semibold text-left">EMAIL</th>
                <th className="p-4 px-5 font-semibold text-left">TELEPHONE</th>
                <th className="p-4 px-5 font-semibold text-left">MEMBERSHIP POINT</th>
                <th className="p-4 px-5 font-semibold text-left">TIER</th>
                <th className="p-4 px-5 font-semibold text-left">CREDIT</th>
            </tr>
            </thead>
            <tbody>
            {   
                users?.map((userItem: UserItem) => (
                    <ProfileRow profile={userItem} />
                ))
            }
            </tbody>
        </table>
    );
}