import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/Auth/getUserProfile";

export default async function DiscountCard({ uid }: { uid: string }): Promise<JSX.Element | null> {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

    const userProfile = await getUserProfile(session.user.token);
    const user = userProfile.data;

    const points = user.membershipPoints || 0;

    const ranks = [
        { name: "none", point: 0, discount: 0 },
        { name: "bronze", point: 50, discount: 3 },
        { name: "silver", point: 125, discount: 5 },
        { name: "gold", point: 250, discount: 10 },
        { name: "platinum", point: 500, discount: 15 },
        { name: "diamond", point: 750, discount: 20 },
    ];

    const rank = ranks
        .slice()
        .reverse()
        .find((r) => points >= r.point) || ranks[0];

    return (
        <div className="bg-white rounded-xl shadow-md p-6 w-80 h-[150px] text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <div className="flex justify-between items-start mb-2">
            <div className="flex flex-col items-start mb-1">
            <p className="text-gray-800 font-semibold text-3xl leading-tight">Member</p>
            <p className="text-gray-800 font-semibold text-3xl leading-tight">Discount</p>
        </div>
                <p className="text-green-400 text-7xl font-bold">
                    {rank.discount}<span className="text-3xl align-top">%</span>
                </p>
            </div>
            <p className="text-sm text-gray-800">
                Enjoy <span className="text-green-500 font-semibold">{rank.discount}% savings</span> on your next booking.
            </p>
        </div>
    );
}
