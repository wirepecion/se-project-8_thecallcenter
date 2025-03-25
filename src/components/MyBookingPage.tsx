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
    const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(null);  // Track selected booking
    const [isModalOpen, setIsModalOpen] = useState(false);  // Manage modal visibility
    const userProfile = initialUserProfile;

    const handleEditClick = (booking: BookingItem) => {
        setSelectedBooking(booking);  // Set the booking to be edited
        setIsModalOpen(true);  // Open the modal
    };

    const handleModalClose = () => {
        setIsModalOpen(false);  // Close the modal
        setSelectedBooking(null);  // Clear selected booking
    };

    // Handle booking deletion
    const handleDeleteBooking = async (booking: BookingItem) => {
        try {
            // Call API to delete the booking
            await deleteBooking(booking._id, sessionToken);  // Replace with actual API call
            // Update the state to remove the deleted booking
            setBookings((prevBookings) => prevBookings.filter((b) => b._id !== booking._id));
        } catch (error) {
            console.error("Error deleting booking:", error);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}> {/* Wrapping with LocalizationProvider */}
            <main className="w-[1065px] mx-auto grid grid-cols-12 gap-[15px] pt-6 pb-16 text-black">
                <div className="col-span-12 w-full rounded-lg">
                    {/* Title */}
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
                                    onDeleteClick={handleDeleteBooking}  // Pass delete handler
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No bookings found.</p>
                    )}
                </div>

                {/* Edit Booking Modal */}
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
