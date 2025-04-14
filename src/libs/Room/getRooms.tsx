import BACKEND_URL from "../config";

export default async function getRooms() {

    const response = await fetch(`${BACKEND_URL}/api/v1/rooms`)
    if (!response.ok) {
        return new Error("Failed to fetch rooms")
    }

    return await response.json()

}