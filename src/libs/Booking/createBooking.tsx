import BACKEND_URL from "../config";

export default async function createBooking(roomId: string, bookingData: object, token: string) {
    
    const response = await fetch(`${BACKEND_URL}/api/v1/rooms/${roomId}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Ensure the user is authenticated
        },
        body: JSON.stringify(bookingData),
    });
    
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to create booking");
    }

    return data;
    
}
