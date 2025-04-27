"use client"

import getUserProfile from "@/libs/Auth/getUserProfile";
import reduceUserCredit from "@/libs/Auth/reduceUserCredit";
import getHotel from "@/libs/Hotel/getHotel";
import updateHotel from "@/libs/Hotel/updateHotel";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";


export default function TopUpPackage() {

    const { data: session } = useSession();
    const [userProfile, setUserProfile] = useState<UserItem>();
    const [resHotel, setResHotel] = useState<HotelItem>();

     useEffect(() => {
        async function fetchData() {
          if (!session?.user?.token) return;
          const profile = await getUserProfile(session.user.token);
          const hotel = await getHotel(profile.data.responsibleHotel);
          setUserProfile(profile.data);
          setResHotel(hotel.data);
        }
        fetchData();
    }, [session]);

    const handleBuyPackage = async (name: string, token: number, credit: number) => {
        Swal.fire({
            title: `Are you sure yo want to buy ${name}?`,
            text: `Amount of cost : ${credit} THB`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, i want!"
        }).then((result) => {
            if (result.isConfirmed) {
                onBuyClick(name, token, credit);
            }
        });
    };
    
    const onBuyClick = async (name: string, token: number, credit: number) => {
       if ((userProfile?.credit ?? 0) < credit) {
            Swal.fire({
                title: "Error!",
                text: "You don't have enough credits to buy this package.",
                icon: "error"
            });
            return;
        }
        if (session?.user?.token) {
            reduceUserCredit(credit, session.user.token);
           // add tokens to the hotel manager's responsible hotel
        } else {
            Swal.fire({
                title: "Error!",
                text: "User token is missing. Please log in again.",
                icon: "error"
            });
            return;
        }
        Swal.fire({
        title: "Success!",
          text: `You have successfully purchased ${name}`,
          icon: "success"
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload();
            }
        });
    }

    return (
      <div className="flex justify-center items-center py-10 w-[1069px]">
        <div className="overflow-x-auto w-full max-w-6xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-700 font-semibold border-b">
                <th className="py-4 px-6">Package Name</th>
                <th className="py-4 px-6">Ads Tokens</th>
                <th className="py-4 px-6">Price (THB)</th>
                <th className="py-4 px-6">Cost per Ad View (THB)</th>
                <th className="py-4 px-6">Bonus</th>
              </tr>
            </thead>
            <tbody className="text-black font-normal">
              <tr className="border-b hover:bg-gray-100" onClick={() => handleBuyPackage("Starter Pack", 100, 150)}>
                <td className="py-4 px-6">Starter Pack</td>
                <td className="py-4 px-6">100 tokens</td>
                <td className="py-4 px-6">฿150</td>
                <td className="py-4 px-6">฿1.50</td>
                <td className="py-4 px-6">—</td>
              </tr>
              <tr className="border-b hover:bg-gray-100" onClick={() => handleBuyPackage("Growth Pack" , 500, 700)}>
                <td className="py-4 px-6">Growth Pack</td>
                <td className="py-4 px-6">500 tokens</td>
                <td className="py-4 px-6">฿700</td>
                <td className="py-4 px-6">฿1.40</td>
                <td className="py-4 px-6">+5% extra</td>
              </tr>
              <tr className="border-b hover:bg-gray-100" onClick={() => handleBuyPackage("Business Pack" , 1200, 1500)}>
                <td className="py-4 px-6">Business Pack (Popular)</td>
                <td className="py-4 px-6">1,200 tokens</td>
                <td className="py-4 px-6">฿1,500</td>
                <td className="py-4 px-6">฿1.25</td>
                <td className="py-4 px-6">+10% extra</td>
              </tr>
              <tr className="border-b hover:bg-gray-100" onClick={() => handleBuyPackage("Premium Pack" , 3000, 3500)}>
                <td className="py-4 px-6">Premium Pack</td>
                <td className="py-4 px-6">3,000 tokens</td>
                <td className="py-4 px-6">฿3,500</td>
                <td className="py-4 px-6">฿1.16</td>
                <td className="py-4 px-6">+15% extra</td>
              </tr>
              <tr className="border-b hover:bg-gray-100" onClick={() => handleBuyPackage("Enterprise Pack" , 10000, 10000)} >
                <td className="py-4 px-6">Enterprise Pack</td>
                <td className="py-4 px-6">10,000 tokens</td>
                <td className="py-4 px-6">฿10,000</td>
                <td className="py-4 px-6">฿1.00</td>
                <td className="py-4 px-6">+20% extra</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  