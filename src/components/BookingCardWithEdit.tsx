"use client";

import { Button } from "@mui/material";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { refundCalculation } from "@/libs/libs/refundCalculation";

export default function BookingCard2({
    bookingData,
    setBookings,
    onEditClick,  // New prop to trigger edit
    onRefundClick,
    onDeleteClick,  // New prop to trigger delete
    amount,
}: {
    bookingData: BookingItem;
    setBookings: React.Dispatch<React.SetStateAction<BookingItem[]>>;
    onEditClick: (booking: BookingItem) => void;  // Prop type for the edit click handler
    onRefundClick: (booking: BookingItem) => void;
    onDeleteClick: (booking: BookingItem) => void;  // Prop type for the delete click handler
    amount: number;
}) {
    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
    };

    const handleRefund = async () => {
        Swal.fire({
            title: "Are you sure to refund?",
            text: `Your Refund amount : ${amount}`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, refund it!"
          }).then((result) => {
            if (result.isConfirmed) {
                onRefundClick(bookingData);
            }
          });
    };


    return (
        <div className="rounded-2xl bg-white flex flex-col justify-between shadow-md h-full p-6 text-blue-900">
            <p><span className="font-semibold">Customer: </span>{bookingData.user.name || "Unknown"}</p>
            <p><span className="font-semibold">Room No. </span>{bookingData.room.number || "Unknown"}</p>
            <p><span className="font-semibold">Hotel: </span>{bookingData.hotel?.name || "Unknown"}</p>
            <p><span className="font-semibold">Check-In Date: </span>{dayjs(bookingData.checkInDate).format("MMMM D, YYYY")}</p>
            <p><span className="font-semibold">Check-Out Date: </span>{dayjs(bookingData.checkOutDate).format("MMMM D, YYYY")}</p>

            <div className="flex space-x-3 items-center justify-end">
                {/* Edit Button */}
                <Button variant="contained" color="success" onClick={() => onEditClick(bookingData)}>
                    Edit
                </Button>

                <Button variant="contained" color="success" onClick={handleRefund}>
                    Refund
                </Button>

                {/* Delete Button */}
                <Button variant="contained" color="error" onClick={handleDelete}>
                    Delete
                </Button>
            </div>
        </div>
    );
}
