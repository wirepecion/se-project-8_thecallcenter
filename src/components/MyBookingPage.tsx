"use client";

import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import BookingCard from "@/components/BookingCard";
import EditBookingModal from "./EditBookingModal";
import deleteBooking from "@/libs/Booking/deleteBooking";

export default function MyBookingPage({
    initialBookings,
    initialUserProfile,
    sessionToken,
}: {
    initialBookings: BookingItem[];
    initialUserProfile: UserItem;
    sessionToken: string;
}) {
    const [bookings, setBookings] = useState<BookingItem[]>(initialBookings);
    const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userProfile = initialUserProfile;

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

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <main className="w-[1065px] mx-auto grid grid-cols-12 gap-[15px] pt-6 pb-16 text-black">
                <div className="col-span-12 w-full rounded-lg">
                    <h1 className="text-3xl font-outfit font-semibold text-left text-white mb-6">
                        {userProfile?.role === "admin" ? "Bookings" : "My Bookings"}
                    </h1>

                    {bookings.length > 0 ? (
                        <div className="w-full space-y-4">
                            {bookings.map((bookingItem) => (
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
                        <p className="text-center text-gray-500">No bookings found.</p>
                    )}
                </div>

                {isModalOpen && selectedBooking && (
                    <EditBookingModal
                        booking={selectedBooking}
                        onClose={handleModalClose}
                        sessionToken={sessionToken}
                        userRole={initialUserProfile.role}
                        setBookings={setBookings}
                    />
                )}
            </main>
        </LocalizationProvider>
    );
}
