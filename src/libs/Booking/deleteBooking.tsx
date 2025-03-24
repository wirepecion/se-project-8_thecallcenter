export default async function deleteHotel(id: string) {
    
    const response = await fetch(`https://hotel-back-end.vercel.app/api/v1/hotels/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        return new Error("Failed to delete hotel");
    }

    return await response.json(); 
}
