"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import BookingCard from "@/components/BookingCard";
import EditBookingModal from "./EditBookingModal";
import deleteBooking from "@/libs/Booking/deleteBooking";
import { Alert } from "@mui/material";
import getBookings from "@/libs/Booking/getBookings";
import PageBar from "@/components/Pagebar";

export default function MyBookingPage({
    initialUserProfile,
    sessionToken,
}: {
    initialUserProfile: UserItem;
    sessionToken: string;
}) {
    const [bookings, setBookings] = useState<BookingItem[]>([]);
    const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [alertType, setAlertType] = useState<"success" | "error" | null>(null);
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [refundStatus, setRefundStatus] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const userProfile = initialUserProfile;

    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const updatedBookings = await getBookings(sessionToken, page ? page.toString() : undefined, refundStatus ? refundStatus : status ? status : undefined)
                setLoading(false);
                setTotalPages(updatedBookings.totalPages);
                setBookings(updatedBookings.data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchData();
    }, [page, status, refundStatus]);

    const handleEditClick = (booking: BookingItem) => {
        setSelectedBooking(booking);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedBooking(null);
    };

    const handleDeleteBooking = async (booking: BookingItem) => {
        try {
            await deleteBooking(booking._id, sessionToken);
            setBookings((prevBookings) => prevBookings.filter((b) => b._id !== booking._id));
        } catch (error) {
            console.error("Error deleting booking:", error);
        }
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'refundStatus') setRefundStatus(value);
        setPage(1);
    };

    const handleFilterStatusChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'status') setStatus(value);
        setPage(1);
    };

    const filterBookings = (bookings: BookingItem[]) => {
        return bookings.filter((booking) => {
            const latestPayment = booking.payments[booking.payments.length - 1];

            if (refundStatus === "refundable") {
                if (latestPayment.status !== "completed") return false;
                if (booking.status !== "confirmed" && booking.status !== "checkedIn") return false;
            }

            if (refundStatus === "nonrefundable") {
                if ((booking.status === "confirmed" || booking.status === "checkedIn") && latestPayment.status === "completed") {
                    return false;
                }
            }

            if (status && booking.status !== status) {
                return false;
            }

            return true;
        });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {showAlert && alertType && (
                <div className="fixed top-10 left-0 w-full z-[9999] flex justify-center p-4">
                    <div className="w-full max-w-md">
                        <Alert severity={alertType} onClose={() => setShowAlert(false)}>
                            {alertType === "success"
                                ? "Your refunding was successful!"
                                : errorMessage}
                        </Alert>
                    </div>
                </div>
            )}
            <main className="w-[1065px] mx-auto grid grid-cols-12 gap-[15px] py-20 text-black">
                <div className="col-span-12 w-full rounded-lg">
                    <h1 className="text-3xl font-outfit font-semibold text-left mb-6">
                        {userProfile?.role === "admin" ? "Bookings" : "My Bookings"}
                    </h1>

                    {userProfile?.role === "user" && (
                        <div className="w-full max-w-xs mb-10">
                            <select
                                name="refundStatus"
                                value={refundStatus}
                                onChange={handleFilterChange}
                                className="w-full p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-300"
                            >
                                <option value="">All</option>
                                <option value="confirmed,checkedIn">Refundable</option>
                                <option value="pending,canceled,completed">Non-Refundable</option>
                            </select>
                        </div>

                    )}

                    {(userProfile?.role === "hotelManager" || userProfile?.role === "admin") && (
                        <div className="w-full max-w-xs mb-10">
                            <select
                                name="status"
                                value={status}
                                onChange={handleFilterStatusChange}
                                className="w-full p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-300"
                            >
                                <option value="">All Status</option>
                                <option value="pending" >Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="canceled">Canceled</option>
                                <option value="checkedIn">Checked In</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    )}

                    {
                        loading ? (
                            <div className="flex justify-center items-center">
                                <div className="text-gray-500 text-lg">Loading...</div>
                            </div>
                        ) : (

                            <div>
                                {filterBookings(bookings).length > 0 ? (
                                    <div className="w-full space-y-4 pb-10 justify-end">
                                        {filterBookings(bookings).map((bookingItem) => (
                                            <BookingCard
                                                key={bookingItem._id}
                                                bookingData={bookingItem}
                                                setBookings={setBookings}
                                                onEditClick={handleEditClick}
                                                onDeleteClick={handleDeleteBooking}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-center text-gray-500 h-screen">
                                        {refundStatus === "refundable"
                                            ? "No refundable bookings found."
                                            : refundStatus === "nonrefundable"
                                                ? "No non-refundable bookings found."
                                                : "No bookings found."}
                                    </p>
                                )}
                            </div>
                        )
                    }
                    <PageBar
                        currentPage={page}
                        allPage={totalPages}
                        handlePageChange={(newPage: number) => setPage(newPage)}
                    />
                </div>

                {isModalOpen && selectedBooking && (
                    <EditBookingModal
                        booking={selectedBooking}
                        onClose={handleModalClose}
                        sessionToken={sessionToken}
                        userRole={initialUserProfile.role}
                    />
                )}
            </main>
        </LocalizationProvider>
    );
}