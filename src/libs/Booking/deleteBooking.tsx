import BACKEND_URL from "../config";

export default async function deleteBooking(id: string, token: string | undefined) {
    
    const response = await fetch(`${BACKEND_URL}/api/v1/bookings/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await response.json(); // Extract response JSON

    if (!response.ok) {
        throw new Error(data.message || "Failed to delete booking");
    }

    return data; // Return successful response
    
}
