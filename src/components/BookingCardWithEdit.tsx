"use client";

import { Button } from "@mui/material"
import dayjs from "dayjs";
import Swal from "sweetalert2";

export default function BookingCardWithEdit({
    bookingData,
    onEditClick, 
    onRefundClick,
    onDeleteClick, 
    amount,
    role
}: {
    bookingData: BookingItem;
    onEditClick: (booking: BookingItem) => void; 
    onRefundClick: (booking: BookingItem) => void;
    onDeleteClick: (booking: BookingItem) => void;
    amount: number;
    role: string;
}) {

    const isRefundable = (bookingData.status !== "canceled" && role === "user" && amount != 0);
    const isEditable = (bookingData.status === "pending" || bookingData.status === "confirmed") && (dayjs().isBefore(dayjs(bookingData.checkInDate).subtract(3, 'day')));

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

    const getTierStyle = (tier: string | undefined) => {
        switch (tier) {
            case "bronze":
                return "text-orange-800 bg-orange-100";
            case "silver":
                return "text-gray-800 bg-gray-200";
            case "gold":
                return "text-yellow-500 bg-yellow-100";
            case "platinum":  
                return "text-purple-500 bg-purple-100";
            case "diamond":
                return "text-blue-500 bg-blue-100";
            default:
                return "text-white bg-gray-500";
        }
    };

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
                            <div>
                                <span className="font-medium">Tier At Booking: </span> 
                                <span className={`rounded-xl px-2 inline-block ${getTierStyle(bookingData.tierAtBooking)}`}>{bookingData.tierAtBooking || "Unknown"}</span>
                            </div>
                        </div>
            <div className="flex space-x-3 items-center justify-end">
                {/* Edit Button */}

                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => onEditClick(bookingData)} 
                    disabled={!isEditable}>
                        Edit
                </Button>

                <Button 
                    variant="contained" 
                    color="success" 
                    onClick={handleRefund}
                    disabled={!isRefundable}>
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
