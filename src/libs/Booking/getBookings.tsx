import BACKEND_URL from "../config";

export default async function getBookings(token: string | undefined) {
    
    const response = await fetch(`${BACKEND_URL}/api/v1/bookings`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Send user's token
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch bookings");
    }

    return await response.json();
    
}
