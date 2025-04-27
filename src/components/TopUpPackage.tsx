"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import getUserProfile from "@/libs/Auth/getUserProfile";
import reduceUserCredit from "@/libs/Auth/reduceUserCredit";
import Button from "./Button";
import InteractiveButton from "./InteractiveButton";

const packages = [
  { name: "Starter Pack", tokens: 100, price: 150, costPerView: 1.5, bonus: "—" },
  { name: "Growth Pack", tokens: 500, price: 700, costPerView: 1.4, bonus: "+5% extra" },
  { name: "Business Pack", tokens: 1200, price: 1500, costPerView: 1.25, bonus: "+10% extra" },
  { name: "Premium Pack", tokens: 3000, price: 3500, costPerView: 1.16, bonus: "+15% extra" },
  { name: "Enterprise Pack", tokens: 10000, price: 10000, costPerView: 1.0, bonus: "+20% extra" },
];

export default function TopUpPackage() {
  const { data: session } = useSession();
  const [userProfile, setUserProfile] = useState<UserItem>();
  const [tokenPackage, setTokenPackage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!session?.user?.token) return;
      const profile = await getUserProfile(session.user.token);
      setUserProfile(profile.data);
    }
    fetchData();
  }, [session]);

  const handleBuyPackage = async (pack: typeof packages[number]) => {
    Swal.fire({
      title: `Are you sure you want to buy ${pack.name}?`,
      text: `Amount of cost : ${pack.price} THB`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I want!",
    }).then((result) => {
      if (result.isConfirmed) onBuyClick(pack);
    });
  };

  const onBuyClick = async (pack: typeof packages[number]) => {
    if ((userProfile?.credit ?? 0) < pack.price) {
      Swal.fire("Error!", "You don't have enough credits.", "error");
      return;
    }
    if (!session?.user?.token) {
      Swal.fire("Error!", "User token is missing. Please log in again.", "error");
      return;
    }
    await reduceUserCredit(pack.price, session.user.token);
    Swal.fire("Success!", `You have successfully purchased ${pack.name}`, "success")
      .then((result) => result.isConfirmed && window.location.reload());
  };

  return (
    <div className="flex flex-col justify-center items-center py-10 w-[1069px]">
      <div className="overflow-x-auto w-full max-w-6xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-700 font-semibold border-b">
              {["Package Name", "Ads Tokens", "Price (THB)", "Cost per Ad View (THB)", "Bonus"].map((head) => (
                <th key={head} className="py-4 px-6">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-black font-normal">
            {packages.map((pack) => (
              <tr
                key={pack.name}
                className={`border-b cursor-pointer transition-colors duration-200 ${
                  tokenPackage === pack.name ? "bg-blue-500 text-white" : "hover:bg-blue-100"
                }`}
                onClick={() => setTokenPackage(pack.name)}
              >
                <td className="py-4 px-6">{pack.name}</td>
                <td className="py-4 px-6">{pack.tokens.toLocaleString()} tokens</td>
                <td className="py-4 px-6">฿{pack.price.toLocaleString()}</td>
                <td className="py-4 px-6">฿{pack.costPerView.toFixed(2)}</td>
                <td className="py-4 px-6">{pack.bonus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-10">
        <InteractiveButton>
          <Button
            variant="primary"
            disabled={!tokenPackage}
            onClick={() => {
              const selected = packages.find((p) => p.name === tokenPackage);
              if (selected) handleBuyPackage(selected);
            }}
            className={!tokenPackage ? "opacity-50 hover:opacity-50" : ""}
          >
            Buy Package
          </Button>
        </InteractiveButton>
      </div>
    </div>
  );
}
