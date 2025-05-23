"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { getPayments } from "@/libs/Payment/getPayments";
import getUserProfile from "@/libs/Auth/getUserProfile";
import Swal from "sweetalert2";
import { useRouter } from 'next/navigation'; 


export default function BookingCard({
    bookingData,
    setBookings,
    onEditClick,
    onDeleteClick,
}: {
    bookingData: BookingItem;
    setBookings: React.Dispatch<React.SetStateAction<BookingItem[]>>;
    onEditClick: (booking: BookingItem) => void;
    onDeleteClick: (booking: BookingItem) => void;
}) {
    const { data: session } = useSession();
    const [payments, setPayments] = useState<PaymentItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState<UserItem | null>(null);

    useEffect(() => {
        async function fetchData() {
            if (!session?.user?.token) return;

            const profile = await getUserProfile(session.user.token);
            setUserProfile(profile.data);

            const paymentJson: PaymentJson = await getPayments(session.user.token);
            setPayments(paymentJson.data);

            setLoading(false);
        }

        fetchData();
    }, [session]);

    const handleDelete = () => {
        Swal.fire({
            title: "Do you want to delete?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't delete`
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire("DELETE!", "", "success");
            } else if (result.isDenied) {
              Swal.fire("Changes are not delete", "", "info");
            }
          });
    };

    const handlePaymentUpdate = (paymentId: string, newStatus: string) => {
        setPayments((prevPayments) =>
            prevPayments.map((payment) =>
                payment._id === paymentId ? { ...payment, status: newStatus } : payment
            )
        );
    };

    const router = useRouter();

    const handleView = () => {
        router.push(`/mybooking/${bookingData._id}`);
    }

    const statusColor = bookingData.status === "confirmed"
        ? "bg-green-100 text-green-800"
        : bookingData.status === "pending"
            ? "bg-yellow-100 text-yellow-800"
        : bookingData.status === "canceled"
            ? "bg-red-100 text-red-800"
        : bookingData.status === "checkedIn"
            ? "bg-blue-100 text-blue-800"
        : bookingData.status === "completed"
            ? "bg-purple-100 text-purple-800"
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
        <div className="rounded-2xl bg-white shadow-md h-full p-6 space-y-4 border border-gray-200">
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
                <Button variant="contained" color="success" onClick={handleView}>
                    SEE ALL
                </Button>
            </div>
        </div>
    );
}

