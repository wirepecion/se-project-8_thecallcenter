export default async function deleteBooking(id: string, token: string | undefined) {
    const response = await fetch(`http://localhost:5000/api/v1/bookings/${id}`, {
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
