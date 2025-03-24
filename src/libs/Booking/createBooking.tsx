export default async function createBooking(roomId: string, bookingData: object) {
    const response = await fetch(`http://localhost:5000/api/v1/rooms/${roomId}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YmVkYjZjNjFmMGUxOTNhMGY5ZjdiNSIsImlhdCI6MTc0Mjc5ODc2OCwiZXhwIjoxNzQ1MzkwNzY4fQ.Roo9y6riI5bRsLUxlSE9oAfEOUQ_dqdbhOsFm0mV33c`, // Ensure the user is authenticated
        },
        body: JSON.stringify(bookingData),
    });
    
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data || "Failed to create booking");
    }

    return data;
}
