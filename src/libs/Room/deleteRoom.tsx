import BACKEND_URL from "../config";

export default async function deleteRoom(id: string) {
    
    const response = await fetch(`${BACKEND_URL}/api/v1/rooms/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        return new Error("Failed to delete room");
    }

    return await response.json(); 
    
}
