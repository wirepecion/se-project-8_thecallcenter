import getUser from "@/libs/Auth/getUser";
import getUserProfile from "@/libs/Auth/getUserProfile";
import getHotel from "@/libs/Hotel/getHotel";

export default async function AdsTokenCard({ 
    token, 
    uid 
}: { 
    token: string
    uid?: string 
}) {

    const userProfile = await (uid ? getUser(token, uid) : getUserProfile(token));
    const user = userProfile.data;

    const resHotel = await getHotel(user.responsibleHotel);
    const adsToken = resHotel.data.subscriptionRank

    return (

        <div className="bg-white h-80 rounded-xl shadow-lg p-6 w-full max-w-sm text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl mx-0">
            <p className="text-2xl font-semibold m-6 text-gray-700">Ads Token</p>
            <p className="text-6xl font-semibold m-8 text-blue-400">{adsToken}</p>
            <p className="text-xl font-semibold m-6 text-gray-700">Tokens Available</p>
            <p className="text-gray-500 text-sm">You have {adsToken} chances left to display your ads banner.</p>
        </div>
    );
}
