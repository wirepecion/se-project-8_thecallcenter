"use client";

import { Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress } from "@mui/material";
import DateReserve from "@/components/DateReserve"; // Import the DateReserve component
import { useState, useEffect } from "react";
import updateBooking from "@/libs/Booking/updateBooking";
import { useRouter } from "next/navigation";
import DateReserveForUpdate from "./DateReserveForUpdate";
import Swal from "sweetalert2";

export default function EditBookingModal({
    booking,
    onClose,
    sessionToken,
    userRole,
}: {
    booking: BookingItem;
    onClose: () => void;
    sessionToken: string;
    userRole: string
}) {
    const [checkInDate, setCheckInDate] = useState<Date | null>(null);
    const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
    const [loading, setLoading] = useState(false);  // Add loading state

    const router = useRouter(); 

    // Initialize dates from the selected booking
    useEffect(() => {
        if (booking) {
            setCheckInDate(new Date(booking.checkInDate));
            setCheckOutDate(new Date(booking.checkOutDate));
        }
    }, [booking]);

    // Handle date changes from DateReserve
    const handleDateChange = (dates: [Date | null, Date | null]) => {
        setCheckInDate(dates[0]);
        setCheckOutDate(dates[1]);
    };

    const handleSave = () => {
        onClose();  // Close the modal after saving
        Swal.fire({
            title: "Confirm?",
            text: "Are you sure to update your booking?",
            icon: "question",
            confirmButtonText: "Yes, update!",
            
        }).then((result) => {
            if(result.isConfirmed){
                
                if (!checkInDate || !checkOutDate) return;

                // Create updated booking object
                const updatedBooking = {
                    // ...booking,
                    checkInDate: checkInDate.toISOString(),
                    checkOutDate: checkOutDate.toISOString(),
                };

                setLoading(true); // Set loading to true to indicate the operation is in progress

                // Update the booking (example: API call to update the booking)
                updateBooking(booking._id, updatedBooking, sessionToken)
                    .then(() => {
                        // setLoading(false);  // Set loading to false once the API call is complete
                        // setBookings((prevBookings) =>
                        //     prevBookings.map((b) =>
                        //         b._id === booking._id ? updatedBooking : b
                        //     )
                        // );
                    })
                    .catch((err) => {
                        console.error(err);
                        setLoading(false);  // Set loading to false if there's an error
                        Swal.fire({
                            title: "Error!",
                            text: "Sorry, unable to update booking!.",
                            icon: "error"
                        })
                    });
                Swal.fire({
                    title: "Update!",
                    text: "Your booking have been update succesfully!.",
                    icon: "success"
                }).then((result) => {
                    if(result.isConfirmed) {
                        router.refresh();
                    }
                })
            }
        });
    };

    return (
        <Dialog open={true} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Edit Booking</DialogTitle>
            <DialogContent>
                <div className="space-y-4">
                    <p><strong>Customer:</strong> {booking.user.name}</p>
                    <p><strong>Room No.:</strong> {booking.room.number}</p>
                    <p><strong>Hotel:</strong> {booking.hotel?.name}</p>

                    {/* Date Reserve Component */}
                    <DateReserveForUpdate
                        onDateChange={handleDateChange}
                        role={userRole} // You can adjust this based on role logic
                        booking={booking}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSave} color="primary" disabled={loading}>
                    {loading ? <CircularProgress size={24} /> : "Save"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
