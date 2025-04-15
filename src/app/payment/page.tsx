"use client";

import { useEffect, useState } from "react";
import getUserProfile from "@/libs/Auth/getUserProfile";
import { getPayments } from "@/libs/Payment/getPayments";
import PaymentCard from "@/components/PaymentCard";
import { useSession } from "next-auth/react";
import getBookings from "@/libs/Booking/getBookings";
import PaymentTable from "@/components/PaymentTable";

export default function Payment() {
    const { data: session } = useSession();
    const [payments, setPayments] = useState<PaymentItem[]>([]);
    const [bookings, setBookings] = useState<BookingItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState<UserItem | null>(null);

    useEffect(() => {
        async function fetchData() {
            if (!session?.user?.token) return;
            
            const profile = await getUserProfile(session.user.token);
            setUserProfile(profile.data);
            if (profile.data.role === "hotelManager" || profile.data.role === "admin") {
                const bookingJson = await getBookings(session.user.token);
                setBookings(bookingJson.data);
            } else {
                const paymentJson = await getPayments(session.user.token);
                setPayments(paymentJson.data);
            }
            setLoading(false);
        }

        fetchData();
    }, []);

    // Callback function to update payment status in the state
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
        <main className="w-full min-h-screen flex flex-col items-center">
            <div className="max-w-4xl w-full p-8 rounded-lg">
                {/* Title */}
                {userProfile?.role === "admin" || userProfile?.role === "hotelManager" ? (
                    <h1 className="text-3xl font-semibold text-center text-whie mb-6">All Payments</h1>
                ) : (
                    <h1 className="text-3xl font-semibold text-center text-white mb-6">My Payments</h1>
                )}


            {userProfile?.role === "hotelManager" ? (
                bookings.length > 0 ? (
                    <div>
                        {bookings.map((bookingItem: any) => (
                            <div key={bookingItem._id}>
                                {bookingItem.payments.map((paymentItem: PaymentItem) => (
                                    <PaymentCard 
                                        key={paymentItem._id} 
                                        paymentData={paymentItem} 
                                        onStatusChange={handlePaymentUpdate}
                                        onDelete={handleDeletePayment} 
                                        role={userProfile?.role || 'user'}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No payments found.</p>
                )
            ) :
            userProfile?.role === "admin" ? (
                bookings.length > 0 ? (
                    <div>
                        <PaymentTable bookings ={bookings}/>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No payments found.</p>
                )
            ) : (
                payments.length > 0 ? (
                    <div>
                        {payments.map((paymentItem) => (
                            <PaymentCard 
                                key={paymentItem._id} 
                                paymentData={paymentItem} 
                                onStatusChange={handlePaymentUpdate}
                                onDelete={handleDeletePayment} 
                                role={userProfile?.role || 'user'}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No payments found.</p>
                )
            )}
            </div>
        </main>
    );
}