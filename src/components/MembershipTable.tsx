import RankCardmember from "@/components/RankCardmember";

export default function MembershipTable({ user }: { user: UserItem | null }) {
  const tiers = ["None","Bronze","Silver","Gold","Platinum","Diamond"];
  const points = [
    { point: "-", estimate: null },
    { point: 50, estimate: 2 },
    { point: 125, estimate: 5 },
    { point: 250, estimate: 10 },
    { point: 500, estimate: 20 },
    { point: 750, estimate: 30 },
  ];
  const discountRates = ["-", "3%", "5%", "10%", "15%", "20%"];
  const facilityPoints: string[] = ["80", "113", "155", "197", "234", "277++"];
  const getBgColor = (tier: string) => {
    switch (tier) {
      case "Bronze":
        return "bg-gradient-to-br from-[#A64F3C] via-[#D9805F] to-[#A64F3C]";
      case "Silver":
        return "bg-gradient-to-br from-[#8594AE] via-[#DDDAE0] to-[#8594AE]";
      case "Gold":
        return "bg-gradient-to-br from-[#D99E32] via-[#F2C744] to-[#D99E32]";
      case "Platinum":
        return "bg-gradient-to-br from-[#C786EB] via-[#E2B3FC] to-[#C786EB]";
      case "Diamond":
        return "bg-gradient-to-br from-[#3e8dc9] via-[#7dd7ff] to-[#3e8dc9]";
      default:
        return "bg-slate-200";
    }
  };

  const isUserTier = (tier: string) =>
    user?.membershipTier?.toLowerCase() === tier.toLowerCase();

  return (
    <div className="overflow-x-auto px-2 pt-8 ">
      <div className="w-max mx-auto">
        <table className="table-auto text-center border-collapse">
          <colgroup>
            {/* column 0: labels */}
            <col key="col-0" />
            {/* columns 1–6: tiers */}
            {tiers.map((tier) => (
              <col 
                key={tier} 
                className={isUserTier(tier) ? getBgColor(tier) : ""} 
              />
            ))}
          </colgroup>
          
          <tbody>
            {/* Tier Row */}
            <tr>
              <td className="font-outfit font-bold text-3xl px-4 py-2">
                Tier
              </td>
              {tiers.map((tier) => (
                <td key={tier} className="px-4 py-2">
                  <RankCardmember
                    rank={tier}
                    highlight={isUserTier(tier)}
                  />
                </td>
              ))}
            </tr>

            {/* Require Row */}
            <tr className="text-2xl">
              <td className="font-outfit font-bold text-3xl px-4 py-6">
                Require
              </td>
              {points.map((item, idx) => (
                <td key={idx} className="font-outfit font-bold text-2xl px-4 py-2">
                  {item.point === "-" 
                    ? "-" 
                    : (
                      <>
                        {item.point} point
                        <div className="text-sm text-gray-600">
                          estimate {item.estimate} bookings
                        </div>
                      </>
                    )
                  }
                </td>
              ))}
            </tr>

            {/* Discount Row */}
            <tr className="text-2xl">
              <td className="font-outfit font-bold text-3xl px-4 py-6">
                Discount
              </td>
              {discountRates.map((rate, idx) => (
                <td key={idx} className="font-outfit font-bold text-2xl px-4 py-2">
                  {rate}
                </td>
              ))}
            </tr>

            {/* Facility Row */}
            <tr className="text-2xl">
              <td className="font-outfit font-bold text-3xl px-4 py-6">
                Facility
              </td>
              {facilityPoints.map((pt, idx) => (
                <td key={idx} className="font-outfit font-bold text-2xl px-4 py-2">
                  {pt}
                </td>
              ))}
            </tr>

          </tbody>
        </table>

              

      </div>
    </div>
  );
}


