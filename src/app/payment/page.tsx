"use client";

import { useEffect, useState } from "react";
import getUserProfile from "@/libs/Auth/getUserProfile";
import { getPayments } from "@/libs/Payment/getPayments";
import PaymentCard from "@/components/PaymentCard";
import { useSession } from "next-auth/react";
import getBookings from "@/libs/Booking/getBookings";
import PaymentTable from "@/components/PaymentTable";
import HeroSection from "@/components/HeroSection";
import PageBar from "@/components/pageBar";

export default function Payment() {
    const { data: session } = useSession();
    const [payments, setPayments] = useState<PaymentItem[]>([]);
    const [bookings, setBookings] = useState<BookingItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState<UserItem | null>(null);
    const [earning, setEarning] = useState(0);
    const [refreshKey, setRefreshKey] = useState(0);
    const [filterStatus, setFilterStatus] = useState("unpaid");
    
    const initialPage = typeof window !== "undefined" 
        ? new URLSearchParams(window.location.search).get("page") 
        : null;
    const [page, setPage] = useState<number>(initialPage ? parseInt(initialPage, 10) : 1);
    const [totalPages, setTotalPages] = useState<number>(0);
    
    useEffect(() => {
        async function fetchData() {
            if (!session?.user?.token) return;

            const profile = await getUserProfile(session.user.token);
            setUserProfile(profile.data);

            if (profile.data.role === "hotelManager" || profile.data.role === "admin") {
                const bookingJson = await getBookings(session.user.token , page ? page.toString() : undefined);
                setTotalPages(bookingJson.totalPages);
                setBookings(bookingJson.data);

                const earnings = bookingJson.data
                    .flatMap((booking: any) => booking.payments || [])
                    .filter((payment: PaymentItem) => (payment.status || "unpaid") === "completed")
                    .reduce((sum: number, payment: PaymentItem) => sum + Number(payment.amount || 0), 0);

                setEarning(earnings);
            } else {
                const paymentJson = await getPayments(session.user.token);
                setPayments(paymentJson.data);
            }
            setLoading(false);
        }

        fetchData();
    }, [refreshKey, page]);

    const handlePaymentUpdate = (paymentId: string, newStatus: string) => {
        setBookings((prevBookings) =>
            prevBookings.map((booking) => ({
                ...booking,
                payments: booking.payments.map((payment: PaymentItem) =>
                    payment._id === paymentId
                        ? { ...payment, status: newStatus }
                        : payment
                ),
            }))
        );
        triggerRefresh();
    };

    const handleDeletePayment = (paymentId: string) => {
        setBookings((prevBookings) =>
            prevBookings.map((booking) => ({
                ...booking,
                payments: booking.payments.filter((payment: PaymentItem) => payment._id !== paymentId),
            }))
        );
        triggerRefresh();
    };

    const triggerRefresh = () => {
        setRefreshKey((prev) => prev + 1);
    };

    if (loading) return <p className="text-center text-gray-500">Loading payments...</p>;

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
            <div className="max-w-4xl w-full p-8 rounded-lg">

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
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="border border-gray-300 rounded px-4 py-2 text-gray-700"
                        >
                            
                            <option value="unpaid">Unpaid</option>
                            <option value="failed">Failed</option>
                            <option value="all">All</option>
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

                        <PageBar
                            allPage={totalPages}
                            handlePageChange={(newPage: number) => setPage(newPage)}
                        />
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No payments found.</p>
                    )
                ) : (
                    payments.length > 0 ? (
                        <div>
                            {payments
                                .filter((paymentItem) => {
                                    const status = paymentItem.status || "unpaid";
                                    if (filterStatus === "all") return true;
                                    return status === filterStatus;
                                })
                                .map((paymentItem) => (
                                    <PaymentCard
                                        key={paymentItem._id}
                                        paymentData={paymentItem}
                                        onStatusChange={handlePaymentUpdate}
                                        onDelete={handleDeletePayment}
                                        role={userProfile?.role || "user"}
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
