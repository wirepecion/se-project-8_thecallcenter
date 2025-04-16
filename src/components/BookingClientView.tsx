"use client";
import { useState } from "react";
import BookingCard2 from "@/components/BookingCardWithEdit";
import PaymentCard from "@/components/PaymentCard";
import deleteBooking from "@/libs/Booking/deleteBooking";
import EditBookingModal from "./EditBookingModal";
import Swal from "sweetalert2";


type Props = {
    bookingItem: BookingItem;
    paymentList: PaymentItem[];
    initialBookings: BookingItem[];
    sessionToken: string;
    userRole: string;
};

export default function BookingClientView({
    bookingItem,
    paymentList,
    initialBookings,
    sessionToken,
    userRole,
}: Props) {
    const [bookings, setBookings] = useState<BookingItem[]>(initialBookings);
    const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            setBookings((prev) => prev.filter((b) => b._id !== booking._id));
            
        } catch (error) {
            console.error("Error deleting booking:", error);
        }
    };


    return (
        <main>
            <BookingCard2
                key={bookingItem._id}
                bookingData={bookingItem}
                setBookings={setBookings}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteBooking}
            />

            {paymentList.map((payment) => (
                <PaymentCard
                    key={payment._id}
                    paymentData={payment}
                    onStatusChange={() => console.log("Status updated")}
                    onDelete={() => console.log("Payment deleted")}
                    role={userRole}
                />
            ))}

            {isModalOpen && selectedBooking && (
                                <EditBookingModal
                                    booking={selectedBooking}
                                    onClose={handleModalClose}
                                    sessionToken={sessionToken}
                                    userRole={userRole}
                                    setBookings={setBookings}
                                />
                            )}

        
        </main>
    );
}
