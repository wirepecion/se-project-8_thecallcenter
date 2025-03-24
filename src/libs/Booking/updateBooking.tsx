export default async function updateHotel(id: string, hotelData: object) {
    
    const response = await fetch(`https://hotel-back-end.vercel.app/api/v1/hotels/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(hotelData),
    });

    if (!response.ok) {
        return new Error("Failed to update hotel");
    }

    return await response.json();
}
