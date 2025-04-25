import RankCardmember from "@/components/RankCardmember";

export default function MembershipTable({ user }: { user: UserItem | null }) {

  const tiers = ["None", "Bronze", "Silver", "Gold", "Platinum", "Diamond"];




  return (
    <div className="overflow-x-auto px-2 pt-8">
      <div className="w-max mx-auto">
        <table className="table-auto text-center border-separate border-spacing-y-10 border-spacing-x-1">
          <tbody>
            <tr>
              <td className="font-outfit font-bold text-3xl px-4 py-2">Tier</td>
              {tiers.map((tier) => (
                <td key={tier} className= " px-4 py-2">
                  <RankCardmember  
                    rank={tier}
                    highlight={user?.membershipTier?.toLowerCase() === tier.toLowerCase()}
                  
                  />
                </td>
              ))}
            </tr>

            <tr className="text-2xl">
              <td className="font-outfit font-bold text-3xl px-4 py-6">Require</td>
              <td className="font-outfit font-bold text-2xl px-4 py-2">-</td>
              <td className="font-outfit font-bold text-2xl px-4 py-2">50 point<br /><div className="text-sm text-gray-500">estimate 2 bookings</div></td>
              <td className="font-outfit font-bold text-2xl px-4 py-2">125 point<br /><div className="text-sm text-gray-500">estimate 5 bookings</div></td>
              <td className="font-outfit font-bold text-2xl px-4 py-2">250 point<br /><div className="text-sm text-gray-500">estimate 10 bookings</div></td>
              <td className="font-outfit font-bold text-2xl px-4 py-2">500 point<br /><div className="text-sm text-gray-500">estimate 20 bookings</div></td>
              <td className="font-outfit font-bold text-2xl px-4 py-2">750 point<br /><div className="text-sm text-gray-500">estimate 30 bookings</div></td>
            </tr>

            <tr className="text-2xl">
              <td className="font-outfit font-bold text-3xl px-4 py-6">Discount</td>
              <td className="font-outfit font-bold text-2xl px-4 py-2">-</td>
              <td className="font-outfit font-bold text-2xl px-4 py-2">3%</td>
              <td className="font-outfit font-bold text-2xl px-4 py-2">5%</td>
              <td className="font-outfit font-bold text-2xl px-4 py-2">10%</td>
              <td className="font-outfit font-bold text-2xl px-4 py-2">15%</td>
              <td className="font-outfit font-bold text-2xl px-4 py-2">20%</td>
            </tr>

            <tr className="text-2xl">
              <td className="font-outfit font-bold text-3xl px-4 py-6">Facility</td>
              <td className="font-outfit font-bold text-2xl px-4 py-2">80</td>
              <td className="font-outfit font-bold text-2xl px-4 py-2">113</td>
              <td className="font-outfit font-bold text-2xl px-4 py-2">155</td>
              <td className="font-outfit font-bold text-2xl px-4 py-2">197</td>
              <td className="font-outfit font-bold text-2xl px-4 py-2">234</td>
              <td className="font-outfit font-bold text-2xl px-4 py-2">277++</td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
}