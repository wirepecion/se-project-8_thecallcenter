"use client";
import { useState } from "react";
import BookingCard2 from "@/components/BookingCardWithEdit";
import PaymentCard from "@/components/PaymentCard";
import deleteBooking from "@/libs/Booking/deleteBooking";
import updateBooking from "@/libs/Booking/updateBooking";
import EditBookingModal from "./EditBookingModal";
import Swal from "sweetalert2";
import { refundCalculation } from "@/libs/libs/refundCalculation";
import { useRouter } from "next/navigation";


type Props = {
    bookingItem: BookingItem;
    paymentList: PaymentItem[];
    sessionToken: string;
    userRole: string;
};

export default function BookingClientView({
    bookingItem,
    paymentList,
    sessionToken,
    userRole,
}: Props) {
    const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const amount = refundCalculation(bookingItem, Number(paymentList[0].amount))

    const handleEditClick = (booking: BookingItem) => {
        setSelectedBooking(booking);
        setIsModalOpen(true);
    };

    const handleRefundBooking = async (booking: BookingItem) => {
        try {
            // Create an update object with the new status
            const updateData = {
                status: "canceled"
            };
    
            // Call API to update the booking
            
            await updateBooking(booking._id, updateData, sessionToken);

            Swal.fire({
                title: "Refund!",
                text: "Your refund has been approved!.",
                icon: "success"
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });    
        } catch (error: any) {
            console.error("Error occurred during refunding:", error);
            Swal.fire({
                title: "Error!",
                text: "Sorry, unable to update booking!.",
                icon: "error"
            });    
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedBooking(null);
    };

    const handleDeleteBooking = async (booking: BookingItem) => {
        try {
            
            await deleteBooking(booking._id, sessionToken);
            // setBookings((prev) => prev.filter((b) => b._id !== booking._id));
            Swal.fire({
                title: "Delete!",
                text: "Your booking have been deleted succesfully!.",
                icon: "success"
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push("/mybooking");
                    router.refresh();
                }
            }); 
            
        } catch (error) {
            console.error("Error deleting booking:", error);
            Swal.fire({
                title: "Error!",
                text: "Sorry, unable to update booking!.",
                icon: "error"
            });  
        }
    };


    return (
        <main>
            <BookingCard2
                key={bookingItem._id}
                bookingData={bookingItem}
                // setBookings={setBookings}
                onEditClick={handleEditClick}
                onRefundClick={handleRefundBooking}
                onDeleteClick={handleDeleteBooking}
                amount={refundCalculation(bookingItem, paymentList[0].amount)}
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
                    // setBookings={setBookings}
                />
            )}

        
        </main>
    );
}
