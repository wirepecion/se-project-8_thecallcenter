import BACKEND_URL from "../config";

export default async function getHotels() {
    
    const response = await fetch(`${BACKEND_URL}/api/v1/hotels`)
    if (!response.ok) {
        return new Error("Failed to fetch hotels")
    }

    return await response.json()
    
}