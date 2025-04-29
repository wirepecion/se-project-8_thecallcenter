"use client";

import { useEffect, useState } from "react";
import getUserProfile from "@/libs/Auth/getUserProfile";
import { getPayments } from "@/libs/Payment/getPayments";
import PaymentCard from "@/components/PaymentCard";
import getBookings from "@/libs/Booking/getBookings";
import PaymentTable from "@/components/PaymentTable";
import HeroSection from "@/components/HeroSection";
import PageBar from "@/components/Pagebar";

export default function PaymentPage({
    sessionToken,
    updatePayment,
    deletePayment
} : {
    sessionToken: string,
    updatePayment: (paymentId: string, updatedData: object) => Promise<any>,
    deletePayment: (paymentId: string) => Promise<any>
}) {
    const [payments, setPayments] = useState<PaymentItem[]>([]);
    const [bookings, setBookings] = useState<BookingWithPopulate[]>([]);
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState<UserItem | null>(null);
    const [earning, setEarning] = useState(0);
    const [refreshKey, setRefreshKey] = useState(0);
    const [filterStatus, setFilterStatus] = useState<string>("unpaid");
    
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    
    useEffect(() => {
        async function fetchData() {

            setLoading(true)
            const profile = await getUserProfile(sessionToken);
            setUserProfile(profile.data);
            
            if (profile.data.role === "hotelManager" || profile.data.role === "admin") {
                const bookingJson: BookingJson = await getBookings(sessionToken , page.toString());
                setTotalPages(bookingJson.totalPages);
                setBookings(bookingJson.data);

                const earnings = bookingJson.data
                    .flatMap((booking: any) => booking.payments || [])
                    .filter((payment: PaymentItem) => (payment.status || "unpaid") === "completed")
                    .reduce((sum: number, payment: PaymentItem) => sum + Number(payment.amount || 0), 0);

                setEarning(earnings);
            } else {
                const paymentJson: PaymentJson = await getPayments(sessionToken , page.toString(), filterStatus);
                setPayments(paymentJson.data);
                setTotalPages(paymentJson.totalPages);
            }
            setLoading(false);
        }

        fetchData();
    }, [refreshKey, filterStatus, page]);

    const handlePaymentUpdate = (paymentId: string, updatedData: object) => {
        updatePayment(paymentId, updatedData);
        triggerRefresh();
    };

    const handleDeletePayment = (paymentId: string) => {
        deletePayment(paymentId);
        triggerRefresh();
    };

    const triggerRefresh = () => {
        setRefreshKey((prev) => prev + 1);
    };

    return (
        <main className="w-full min-h-screen flex flex-col items-center">
                    <HeroSection
                        title={
                            <>
                                Payments <br /> Dashboard
                            </>
                        }
                        description="View and manage payment transactions here."
                        imageSrc={"/img/Card.png"}
                    />

                    <div className="max-w-3xl w-full p-4 rounded-lg bg-white">
                        { loading ? (
                            <p className="text-center text-gray-500">Loading payments...</p>
                        ) : (
                        <div className="pb-10 bg-white">
                        {userProfile?.role === "hotelManager" && (
                            <div className="max-w-4xl w-full p-4 text-right text-lg font-medium text-green-600">
                                <span className="font-medium bg-green-100 p-2 rounded-lg">
                                    Total Earnings: ${earning.toFixed(2)}
                                </span>
                            </div>
                        )}

                        {userProfile?.role !== "hotelManager" && userProfile?.role !== "admin" && (
                            <div className="mb-4 flex justify-end">
                                <select
                                    value={filterStatus}
                                    onChange={(e) => { setFilterStatus(e.target.value); setPage(1) }}
                                    className="rounded px-4 py-2 bg-white text-gray-700"
                                > 

                                    <option value="unpaid">Unpaid</option>
                                    <option value="failed">Failed</option>
                                    <option value="">All</option>
                                </select>
                            </div>
                        )}

                        {/* 🧾 Display for each role */}
                        {userProfile?.role === "hotelManager" || userProfile?.role === "admin" ? (
                            bookings.length > 0 ? (
                                <div>
                                <PaymentTable
                                    bookings={bookings}
                                    onStatusChange={handlePaymentUpdate}
                                    onDelete={handleDeletePayment}
                                />
                                </div>
                            ) : (
                                <p className="text-center text-gray-500">No payments found.</p>
                            )
                        ) : (
                            payments.length > 0 ? (
                                <div>
                                    {payments
                                        .map((paymentItem) => (
                                            <PaymentCard
                                                key={paymentItem._id}
                                                paymentData={paymentItem}
                                                handlePaymentUpdate={handlePaymentUpdate}
                                                onDelete={handleDeletePayment}
                                            />
                                        ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500">No payments found.</p>
                            )
                        )}
                        </div>)
                        }
                        <PageBar
                            currentPage={page}
                            allPage={totalPages}
                            handlePageChange={(newPage: number) => setPage(newPage)}
                        />
                    </div>
        </main>
    );
}