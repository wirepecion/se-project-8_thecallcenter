import BACKEND_URL from "../config";

export default async function updateRoom(id: string, roomData: object) {
    
    const response = await fetch(`${BACKEND_URL}/api/v1/rooms/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(roomData),
    });

    if (!response.ok) {
        return new Error("Failed to update room");
    }

    return await response.json();
    
}
