"use client";

import getUsers from "@/libs/Auth/getUsers";
import { useEffect, useState } from "react";
import ProfileTable from "./ProfileTable";

export default function MyProfilePage({
    sessionToken,
}: {
    sessionToken: string;
}) {

    // const [page, setPage] = useState<number>(1);
    const [users, setUsers] = useState<UserItem[] | null>(null);
    const [statistics, setStatistic] = useState<StatisticItem[] | null>(null);
    
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
            <h2>User Statistics</h2>
            <ul>
                {statistics?.map((item) => (
                <li key={item._id}>
                    Membership Tier: <strong>{item._id}</strong> — Total Users: {item.totalUsers}
                </li>
                ))}
            </ul>

            <h2>All Users</h2>
            <ProfileTable users={users}/>
        </>
    );
}
