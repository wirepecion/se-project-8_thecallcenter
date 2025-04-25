"use client";

import getUsers from "@/libs/Auth/getUsers";
import { useEffect, useState } from "react";
import GreetingBox from "@/components/profile-component/WelcomeCard";
import MembershipProgressCard from "@/components/profile-component/MembershipProgressCard";
import TierCountCard from "./TierCountCard";
import ProfileTable from "./ProfileTable";
import PageBar from "../PageBar";

export default function MyProfilePage({
    sessionToken,
    name
}: {
    sessionToken: string;
    name: string
}) {

    const [users, setUsers] = useState<UserItem[] | null>(null);
    const [statistics, setStatistic] = useState<StatisticItem[] | null>(null);

    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [filter, setFilter] = useState<string>('');
    const [loading, setLoading] = useState(true);

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
                setLoading(true)
                const allUsers: UsersJson = await getUsers(sessionToken, page ? page.toString() : undefined, filter);
                setLoading(false)
                setUsers(allUsers.data);
                setStatistic(allUsers.statistic);
                setTotalPages(allUsers.totalPages);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchData();
    }, [page, filter]);

    return (
        <>
            <div className="p-6 space-y-20 max-w-[80%] mx-auto">
                <div className="grid grid-cols-5 gap-8">
                    <div className="col-span-3">
                        <GreetingBox name={name} />
                    </div>
                    <div className="col-span-2">
                        <MembershipProgressCard data={statistics} />
                    </div>
                </div>
    
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {rank.map((currentRank) => (
                        <TierCountCard key={currentRank} data={statistics} tier={currentRank} />
                    ))}
                </div>
    
                <div className="my-14">
                    <div className="w-full max-w-xs mb-10">
                        <select
                            value={filter}
                            onChange={(e) => { setFilter(e.target.value); setPage(1); }}
                            className="w-full p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-300"
                        >
                            <option value="">All Tier</option>
                            <option value="bronze">Bronze</option>
                            <option value="silver">Silver</option>
                            <option value="gold">Gold</option>
                            <option value="platinum">Platinum</option>
                            <option value="diamond">Diamond</option>
                            <option value="none">None</option>
                        </select>
                    </div>
    
                    <PageBar
                        currentPage={page}
                        allPage={totalPages}
                        handlePageChange={(newPage: number) => setPage(newPage)}
                    />
    
                    {
                        loading && ( 
                            <div className="flex justify-center items-center">
                                <div className="text-gray-500 text-lg">Loading...</div>
                            </div>
                        )
                    }

                    <ProfileTable users={users} />

                </div>
            </div>
        </>
    );    
}
