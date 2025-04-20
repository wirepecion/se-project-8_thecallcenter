"use client";

import { Button } from "@mui/material"
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { refundCalculation } from "@/libs/libs/refundCalculation";

export default function BookingCard2({
    bookingData,
    // setBookings,
    onEditClick,  // New prop to trigger edit
    onRefundClick,
    onDeleteClick,  // New prop to trigger delete
    amount,
    role
}: {
    bookingData: BookingItem;
    // setBookings: React.Dispatch<React.SetStateAction<BookingItem[]>>;
    onEditClick: (booking: BookingItem) => void;  // Prop type for the edit click handler
    onRefundClick: (booking: BookingItem) => void;
    onDeleteClick: (booking: BookingItem) => void;  // Prop type for the delete click handler
    amount: number;
    role: string;
}) {

    console.log("Role from bookingCard: " + role)

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
                onDeleteClick(bookingData);
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

    const statusColor = bookingData.status === "confirmed"
        ? "bg-green-100 text-green-800"
        : bookingData.status === "pending"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-red-100 text-red-800";


    return (
        <div className="rounded-2xl bg-white flex flex-col justify-between shadow-md h-full p-6 text-blue-900">
            <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-sky-800">Booking Summary</h2>
                            <span className={`text-sm font-medium px-3 py-1 rounded-full ${statusColor}`}>
                                {bookingData.status.charAt(0).toUpperCase() + bookingData.status.slice(1)}
                            </span>
                        </div>
            
                        <div className="space-y-1 text-sm text-gray-700">
                            <div><span className="font-medium">Customer:</span> {bookingData.user.name || "Unknown"}</div>
                            <div><span className="font-medium">Room No.:</span> {bookingData.room.number || "Unknown"}</div>
                            <div><span className="font-medium">Hotel:</span> {bookingData.hotel?.name || "Unknown"}</div>
                            <div><span className="font-medium">Check-In Date:</span> {dayjs(bookingData.checkInDate).format("MMMM D, YYYY")}</div>
                            <div><span className="font-medium">Check-Out Date:</span> {dayjs(bookingData.checkOutDate).format("MMMM D, YYYY")}</div>
                        </div>
            <div className="flex space-x-3 items-center justify-end">
                {/* Edit Button */}
                {
                    bookingData.status !== "canceled" ?
                    <Button variant="contained" color="success" onClick={() => onEditClick(bookingData)}>
                        Edit
                    </Button>
                    : ""
                }   

                { 
                    (bookingData.status !== "canceled" && role === "user" && amount != 0) ? 
                        <Button variant="contained" color="success" onClick={handleRefund}>
                            Refund
                        </Button>
                    : ""
                }

                {/* Delete Button */}
                <Button variant="contained" color="error" onClick={handleDelete}>
                    Delete
                </Button>
            </div>
        </div>
    );
}
