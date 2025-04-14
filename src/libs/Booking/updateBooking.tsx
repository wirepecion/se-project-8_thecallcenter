import BACKEND_URL from "../config";

export default async function updateBooking(id: string, bookingData: object, token: string | undefined) {
    
    const response = await fetch(`${BACKEND_URL}/api/v1/bookings/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(bookingData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to update booking");
    }

    return data;
    
}
