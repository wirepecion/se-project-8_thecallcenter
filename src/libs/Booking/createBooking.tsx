export default async function createBooking(roomId: string, bookingData: object) {
    const response = await fetch(`https://hotel-back-end.vercel.app/api/v1/rooms/${roomId}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure the user is authenticated
        },
        body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create booking");
    }

    return await response.json();
}
