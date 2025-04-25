import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/Auth/getUserProfile";
import getHotel from "@/libs/Hotel/getHotel";

export default async function SubscriptionCard({ uid }: { uid: string }): Promise<JSX.Element | null> {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

    const userProfile = await getUserProfile(session.user.token);
    const user = userProfile.data;

    const resHotel = await getHotel(user.responsibleHotel);
    const subRank = resHotel.data.subscriptionRank;

    const maxRank = 5;
    const displayRank = Math.min(subRank, maxRank);
    const progress = displayRank / maxRank; 

    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - progress);

    return (
        <div className="bg-white h-80 rounded-xl shadow-lg p-6 w-full max-w-sm text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Hotel's Subscription Rank</h2>

            <div className="relative w-40 h-40 mx-auto">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                    <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        stroke="#e5e7eb"
                        strokeWidth="10"
                        fill="none"
                    />
                    <circle
                        cx="80"
                        cy="80"
                        r={radius}
                        stroke="#4f46e5"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                    />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-4xl font-bold text-gray-700">Lv. {subRank}</p>
                </div>
            </div>
            <p className="mt-4 text-gray-600">Your hotel's subscription rank determines how often it possibly appears on the homepage.</p>
        </div>
    );
}
