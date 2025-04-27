import getUser from "@/libs/Auth/getUser";
import getUserProfile from "@/libs/Auth/getUserProfile";
import { Bitcoin } from "lucide-react";

export default async function CreditsCard({ 
    token,
    uid 
}: { 
    token: string
    uid?: string 
}) {

    const userProfile = await (uid ? getUser(token, uid) : getUserProfile(token));
    const user = userProfile.data;

    return (

        <div className="max-w-sm mx-auto w-6/12 h-[150px] p-6 bg-white rounded-2xl shadow-md flex items-center space-x-4 transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <div className="bg-blue-100 p-4 rounded-full ">
                <Bitcoin className="w-8 h-8 text-blue-600" />
            </div>
            <div>
                <p className="text-2xl font-bold text-blue-600">{user.credit}</p>
                <p className="text-sm text-gray-600 font-semibold">Credits Remaining</p>
                { user.role === "hotelManager" ? (
                    <p className="text-xs text-gray-500 mt-1">You can use your credits to buy ads token.</p>
                ) : (
                    <p className="text-xs text-gray-500 mt-1">Tip: You can use your credits just like cash when making a payment.</p>
                )}
            </div>
        </div>
    );
}
