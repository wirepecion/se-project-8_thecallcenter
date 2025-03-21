export default async function deleteHotel(id: string) {
    const response = await fetch(`/api/v1/hotels/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        return new Error("Failed to delete hotel");
    }

    return await response.json(); 
}
