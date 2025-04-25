import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/Auth/getUserProfile";

export default async function MembershipCard({ uid }: { uid: string }): Promise<JSX.Element | null> {
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

    const currentRank = ranks.reduce((acc, rank) => {
        if (points >= rank.point) return rank;
        return acc;
    });

    const nextRank = ranks.find(r => r.point > points);
    const nextGoal = nextRank?.point || currentRank.point;
    const remaining = nextGoal - points;
    const percent = Math.min((points / nextGoal) * 100, 100);

    return (

        <div className="bg-white h-80 rounded-xl shadow-lg p-6 w-full max-w-sm text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl mx-0">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Membership</h2>

            <div className="relative w-50 h-40 mx-auto">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                    <circle
                        className="text-gray-200"
                        cx="18"
                        cy="18"
                        r="15.9155"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                    />
                    <circle
                        className="text-indigo-500"
                        cx="18"
                        cy="18"
                        r="15.9155"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray={`${percent}, 100`}
                        strokeDashoffset="0"
                        strokeLinecap="round"
                        transform="rotate(230 18 18)"
                    />
                    <text x="18" y="18" textAnchor="middle" className="fill-black text-[5px] font-bold" dy=".3em">
                        {points.toLocaleString()} p
                    </text>
                    <text x="18" y="22" textAnchor="middle" className="fill-black text-[2px] font-semibold" dy=".3em">
                        {Math.floor(percent)} percent on progress
                    </text>
                </svg>
            </div>

            {/* <p className="text-sm text-gray-600 mt-4">
                Rank: <strong className="capitalize">{currentRank.name}</strong> ({currentRank.discount}% discount)
            </p> */}

            {nextRank && (
                <p className="text-sm text-gray-600 mt-2">
                    Spend more <strong>{remaining.toLocaleString()}</strong> P to reach{" "}
                    <strong className="capitalize">{nextRank.name}</strong>
                </p>
            )}
        </div>
    );
}
