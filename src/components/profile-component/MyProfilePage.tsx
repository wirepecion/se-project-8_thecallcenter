"use client";

import getUsers from "@/libs/Auth/getUsers";
import { useEffect, useState } from "react";
import GreetingBox from "@/components/profile-component/WelcomeCard";
import MembershipProgressCard from "@/components/profile-component/MembershipProgressCard";
import TierCountCard from "./TierCountCard";
import ProfileTable from "./ProfileTable";

export default function MyProfilePage({
    sessionToken,
    name
}: {
    sessionToken: string;
    name: string
}) {

    // const [page, setPage] = useState<number>(1);
    const [users, setUsers] = useState<UserItem[] | null>(null);
    const [statistics, setStatistic] = useState<StatisticItem[] | null>(null);

    const rank = ['bronze', 'silver', 'gold', 'platinum', 'diamond'];

    const data = [
        { name: 'Label 1', value: 139, color: '#A0522D' },
        { name: 'Label 2', value: 139, color: '#FF6347' },
        { name: 'Label 3', value: 139, color: '#4682B4' },
        { name: 'Label 4', value: 139, color: '#FFD700' },
        { name: 'Label 5', value: 139, color: '#DA70D6' },
        { name: 'Label 6', value: 139, color: '#1E90FF' },
      ];
      
      const tiers = [
        { name: 'Bronze', accounts: 5, color: 'text-rose-300' },
        { name: 'Silver', accounts: 5, color: 'text-sky-200' },
        { name: 'Gold', accounts: 5, color: 'text-yellow-200' },
        { name: 'Platinum', accounts: 5, color: 'text-purple-200' },
        { name: 'Diamond', accounts: 5, color: 'text-cyan-300' },
      ];
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const allUsers: UsersJson = await getUsers(sessionToken);
                setUsers(allUsers.data);
                setStatistic(allUsers.statistic)
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <div className="p-6 space-y-20 max-w-[80%] mx-auto">
                <div className="grid grid-cols-5 gap-8">
                    <div className="col-span-3">
                        <GreetingBox name={name}/>
                    </div>
                    <div className="col-span-2">
                        <MembershipProgressCard data={statistics} />
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                { rank.map((currentRank) => (
                    <TierCountCard key={currentRank} data={statistics} tier={currentRank} />
                ))}
                </div>
            </div>
            
            <div className="my-14">
                <ProfileTable users={users}/>
            </div>
        </>
    );
}
