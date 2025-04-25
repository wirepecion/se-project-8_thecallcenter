// Add a default export for the RankCardmember component.
import Image from "next/image";


export default function RankCardmember({ 
    rank,
    highlight 
}: { 
    rank: string 
    highlight?: boolean
}) {
    
    const bgcolor = (() => {
        switch (rank) {
            case 'Bronze':
                return 'bg-gradient-to-br from-[#C17547] via-[#E0A58A] to-[#C17547]';
              case 'Silver':
                return 'bg-gradient-to-br from-[#AFBCCA] via-[#ECECEA] to-[#AFBCCA]';
              case 'Gold':
                return 'bg-gradient-to-br from-[#E5BA47] via-[#F7D96A] to-[#E5BA47]';
              case 'Platinum':
                return 'bg-gradient-to-br from-[#D09FED] via-[#F0CAF2] to-[#D09FED]';
              case 'Diamond':
                return 'bg-gradient-to-br from-[#65A8E4] via-[#B3E5FF] to-[#65A8E4]';
              default:
                return 'bg-slate-100';

        }
    });

    return (
        <div>
            <div className={`${highlight ? bgcolor() : 'bg-white'} rounded-md shadow p-3 w-[165px] h-[80px]  flex justify-between items-center  max-w-md `}>
                <div className="flex flex-col items-start">
                    <p className="text-gray-800 font-outfit font-bold text-2xl">{rank}</p>
                    
                </div>
                <div className=" w-12 h-12 relative">
                    <Image
                        src={`/img/Membership_tier/${rank.toLowerCase()}.png`}
                        alt={`${rank} rank`}
                        fill
                        className="object-contain"
                    />
                </div>
            </div>
        </div>
    );
}