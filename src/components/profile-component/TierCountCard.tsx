import Image from 'next/image';

export default function TierCountCard({
    data,
    tier
} : {
    data: StatisticItem[] | null;
    tier: string;
}) {

    const tierMap = new Map<string, { name: string, color: string; imgPath: string }>([
        ['none', { name: "None", color: '#E4EDF4', imgPath: '/img/Membership_tier/none.png' }],
        ['bronze', { name: "Bronze", color: '#752D0F', imgPath: '/img/Membership_tier/bronze.png' }],
        ['silver', { name: "Silver", color: '#74BDE7', imgPath: '/img/Membership_tier/silver.png' }],
        ['gold', { name: "Gold", color: '#FFC556', imgPath: '/img/Membership_tier/gold.png' }],
        ['platinum', { name: "Platinum", color: '#DD80F9', imgPath: '/img/Membership_tier/platinum.png' }],
        ['diamond', { name: "Diamond", color: '#3069D6', imgPath: '/img/Membership_tier/diamond.png' }],
        ['null', { name: "ETC.", color: '#DEDCDC', imgPath: '/img/Membership_tier/none.png' }]
    ]);
    const value = data?.find((item) => item._id === tier)?.totalUsers || 0;
    
  return (
    <div className="flex rounded-lg shadow-[0_6px_6px_rgba(0,0,0,0.2)]">
        <div className="p-6 py-6 flex items-center">
            <div>
            <h4 className="font-extrabold text-2xl">{tierMap.get(tier)?.name}</h4>
            <p className="font-medium text-lg">{value} Accounts</p>
            </div>
            <img src={tierMap.get(tier)?.imgPath} 
             alt={tierMap.get(tier)?.name}
             className="w-12 h-12 object-contain ml-8" />
        </div>
    </div>
  );
}