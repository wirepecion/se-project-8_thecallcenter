"use client";

import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import updateBooking from "@/libs/Booking/updateBooking";
import DateReserve from "./DateReserve";
import deleteBooking from "@/libs/Booking/deleteBooking";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";

export default function BookingCard({ bookingData }: { bookingData: BookingItem }) {
    const [isEdit, setIsEdit] = useState(false);

    // Keep original booking dates (for displaying on the card)
    const [checkIn, setCheckIn] = useState<Dayjs>(dayjs(bookingData.checkInDate));
    const [checkOut, setCheckOut] = useState<Dayjs>(dayjs(bookingData.checkOutDate));

    // Temporary states for the date picker in the edit popup
    const [tempCheckIn, setTempCheckIn] = useState<Dayjs>(checkIn);
    const [tempCheckOut, setTempCheckOut] = useState<Dayjs>(checkOut);

    const { data:session } = useSession()

    const handleUpdate = async () => {
        try {
            await updateBooking(bookingData._id, {
                checkInDate: tempCheckIn.toISOString(),
                checkOutDate: tempCheckOut.toISOString(),
            }, session?.user.token);
    
            // Update only after success
            setCheckIn(tempCheckIn);
            setCheckOut(tempCheckOut);
    
            setIsEdit(false);
            alert("Booking updated successfully!");
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to update booking.";
            alert(errorMessage);
        }
    };
    

    const handleDelete = async () => {
        const isConfirmed = window.confirm("Are you sure you want to delete this booking?");
        if (!isConfirmed) return;
        console.log("User Token:", session?.user.token);
        
        try {
            await deleteBooking(bookingData._id, session?.user.token);
            setIsEdit(false);
            alert("Booking deleted successfully!");
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to delete booking.";
            alert(errorMessage);
        }
    };
    
    return (
        <>
            {/* Booking Card */}
            <main className="flex flex-col bg-white p-6 rounded-xl shadow-lg my-5 relative z-10">
                <p><span className="font-semibold">Hotel: </span> {bookingData.hotel ?? "Unknown"}</p>
                <p><span className="font-semibold">Check-In Date: </span> {checkIn.format("MMMM D, YYYY h:mm A")}</p>
                <p><span className="font-semibold">Check-Out Date: </span> {checkOut.format("MMMM D, YYYY h:mm A")}</p>

                <div className="absolute top-6 right-6 flex space-x-3">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 transition"
                        onClick={() => setIsEdit(true)}>
                        Edit
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition"
                        onClick={() => handleDelete()}>
                        Delete
                    </button>
                </div>
            </main>

            {/* Edit Popup */}
            {isEdit && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h2 className="text-lg font-semibold mb-4">Edit Booking</h2>

                            {/* Two DatePickers for Check-In & Check-Out */}
                            <div className="flex flex-col space-y-4">
                                <p className="text-sm text-gray-600 mb-1">Check-In Date:</p>
                                <DateReserve
                                   onDateChange={setTempCheckIn}
                                />
                                <p className="text-sm text-gray-600 mb-1">Check-Out Date:</p>
                                <DateReserve
                                   onDateChange={setTempCheckOut}
                                />
                            </div>

                            {/* Update and Cancel Buttons */}
                            <div className="flex justify-end space-x-3 mt-4">
                                <button className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                                    onClick={() => setIsEdit(false)}>
                                    Cancel
                                </button>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                    onClick={handleUpdate}>
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
