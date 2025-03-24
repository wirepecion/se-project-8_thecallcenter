export default async function createBooking(roomId: string, bookingData: object, token: string | undefined) {
    const response = await fetch(`https://hotel-back-end.vercel.app/api/v1/rooms/${roomId}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Ensure the user is authenticated
        },
        body: JSON.stringify(bookingData),
    });
    
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data || "Failed to create booking");
    }

    return data;
}
