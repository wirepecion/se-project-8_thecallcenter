"use client";

import getUserProfile from '@/libs/Auth/getUserProfile';
import { useEffect, useState } from "react";
import { getPayments } from "@/libs/Payment/getPayments";
import PaymentCard from "@/components/PaymentCard";
import { useSession } from "next-auth/react";
import CheckoutCard from './[bid]/card/page';

export default function Checkout() {    
    
    const { data: session } = useSession();
    const [payments, setPayments] = useState<PaymentItem>();
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState<UserItem | null>(null);


    useEffect(() => {
        async function fetchData() {
            if (!session?.user?.token) return;
            
            const profile = await getUserProfile(session.user.token);
            setUserProfile(profile.data);

            const paymentJson: PaymentJson = await getPayments(session.user.token);
            setPayments(paymentJson.data.find((payment) => payment._id === params.id));
            setLoading(false);
        }

        fetchData();
    }, []);

    const handlePaymentUpdate = (paymentId: string, newStatus: string) => {
        setPayments((prevPayments) =>
            prevPayments.map((payment) =>
                payment._id === paymentId ? { ...payment, status: newStatus } : payment
            )
        );
    };

    const handleDeletePayment = (paymentId: string) => {
        setPayments((prevPayments) => prevPayments.filter((payment) => payment._id !== paymentId));
    };    

    if (loading) return <p className="text-center text-gray-500">Loading payments...</p>;

    return (
        <main className="w-full min-h-screen flex flex-row">

            
            <CheckoutCard key={payments._id}
                paymentData={paymentItem}
                onStatusChange={handlePaymentUpdate}
                onDelete={handleDeletePayment}
                role={userProfile?.role || 'user'} />
        </main>
    );
}