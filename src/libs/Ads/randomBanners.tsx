import BACKEND_URL from "../config";

export default async function randomBanners() {
    
    const response = await fetch(`${BACKEND_URL}/api/v1/ads`)
    if (!response.ok) {
        return new Error("Failed to fetch ads")
    }

    return await response.json()
    
}