import BACKEND_URL from "../config";

export default async function getHotel(id:string) {
    
    const response = await fetch(`${BACKEND_URL}/api/v1/hotels/${id}`)
    if (!response.ok) {
        return new Error("Failed to fetch hotel")
    }

    return await response.json()
    
}