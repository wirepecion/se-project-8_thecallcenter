import Image from 'next/image';

export default function ProfileRow({
    profile
  }: {
    profile: UserItem
  }) {

    const getTierStyle = (tier: string | undefined) => {
        switch (tier) {
          case "bronze":
            return "bg-gradient-to-b from-[#D9805F] via-[#A64F3C] to-[#D9805F]";
          case "silver":
            return "bg-gradient-to-b from-[#DDDAE0] via-[#8594AE] to-[#DDDAE0]";
          case "gold":
            return "bg-gradient-to-b from-[#F2C744] via-[#D99E32] to-[#F2C744]";
          case "platinum":
            return "bg-gradient-to-b from-[#E2B3FC] via-[#C786EB] to-[#E2B3FC]";
          case "diamond":
            return "bg-gradient-to-b from-[#52BCEB] via-[#2F85C7] to-[#52BCEB]";
          default:
            return "bg-gray-300";
        }
      };

    return (
        <>
            <tr className="border-t border-gray-200 shadow-md bg-gray-50 text-[#1A4F83]">
                <td className="p-3 pl-10 pr-5 flex items-center gap-2 font-medium">
                    <Image
                        src="/img/userDark.png"
                        alt="user"
                        width={20}
                        height={20}
                        className="w-[20px] h-[20px] object-contain mr-2"
                    />
                    {profile.name}
                </td>
                <td className="p-3 px-5">{profile.email}</td>
                <td className="p-3 px-5">{profile.tel}</td>
                <td className="p-3 px-5">{profile.membershipPoints}</td>
                <td className={`p-3 px-5`}>
                    <span className={`rounded-xl p-1 px-2 text-gray-100 ${getTierStyle(profile.membershipTier)}`}>
                        {profile.membershipTier}
                    </span>
                </td>
                <td className="p-3 px-5">{profile.credit}</td>
            </tr>
        </>
    );
}