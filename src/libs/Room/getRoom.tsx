import BACKEND_URL from "../config";

export default async function getRoom(id:string) {

    const response = await fetch(`${BACKEND_URL}/api/v1/rooms/${id}`)
    if (!response.ok) {
        return new Error("Failed to fetch room")
    }

    return await response.json()
    
}