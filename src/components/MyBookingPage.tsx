"use client";

import { useEffect, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import BookingCard from "@/components/BookingCard";
import EditBookingModal from "./EditBookingModal";
import deleteBooking from "@/libs/Booking/deleteBooking";
import updateBooking from "@/libs/Booking/updateBooking";
import { Alert } from "@mui/material";
import getBookings from "@/libs/Booking/getBookings";
import { stat } from "fs";
import PageBar from "./pageBar";

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

    const initialPage = new URLSearchParams(window.location.search).get("page");
    const [page, setPage] = useState<number>(initialPage ? parseInt(initialPage, 10) : 1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const updatedBookings = await getBookings(sessionToken, page ? page.toString() : undefined);
                setLoading(false);
                setTotalPages(updatedBookings.totalPages);
                setBookings(updatedBookings.data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchData();
    }, [page]);

    const handleEditClick = (booking: BookingItem) => {
        setSelectedBooking(booking);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedBooking(null);
    };

    const handleRefundBooking = async (booking: BookingItem) => {
        try {
            // Create an update object with the new status
            const updateData = {
                status: "canceled"
            };
    
            // Call API to update the booking
            await updateBooking(booking._id, updateData, sessionToken);

            setAlertType("success");
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
    
        } catch (error: any) {
            console.error("Error occurred during refunding:", error);
            setAlertType("error");
            setErrorMessage(error.message || "An error occurred during refunding.");
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        }
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
    };

    const handleFilterStatusChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'status') setStatus(value);
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
                            <option value="refundable">Refundable</option>
                            <option value="nonrefundable">Non-Refundable</option>
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
                                <option value="failed">Failed</option>
                                <option value="canceled">Canceled</option>
                                <option value="checkedIn">Checked In</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    )}

                    
                    <PageBar
                        allPage={totalPages}
                        handlePageChange={(newPage: number) => setPage(newPage)}
                    />

                    {
                        loading?( 
                            <div className="flex justify-center items-center">
                                <div className="text-gray-500 text-lg">Loading...</div>
                            </div>
                        ):(

                    <div>
                    {filterBookings(bookings).length > 0 ? (
                        <div className="w-full space-y-4">
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
