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
            case 'Bronze': return 'bg-gradient-to-br from-[#A64F3C] via-[#D9805F] to-[#A64F3C]';
            case 'Silver': return 'bg-gradient-to-br from-[#8594AE] via-[#DDDAE0] to-[#8594AE]';
            case 'Gold': return 'bg-gradient-to-br from-[#D99E32] via-[#F2C744] to-[#D99E32]';
            case 'Platinum': return 'bg-gradient-to-br from-[#C786EB] via-[#E2B3FC] to-[#C786EB]';
            case 'Diamond': return 'bg-gradient-to-br from-[#3e8dc9] via-[#7dd7ff] to-[#3e8dc9]';
            default: return 'bg-slate-200';

        }
    });

    return (
        <div>
            <div className={`${highlight ? bgcolor() : 'bg-white'} rounded-md shadow p-3  h-[80px]  flex justify-between items-center w-full max-w-md transition-transform duration-300 hover:scale-105 hover:shadow-lg`}>
                <div className="flex flex-col items-start">
                    <p className="text-gray-800 font-outfit font-bold text-2xl">{rank}</p>
                    {/* <p className="text-sm font-semibold text-blue-500 mt-1 ">
                        → see more
                    </p> */}
                </div>
                <div className=" w-14 h-14 relative">
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