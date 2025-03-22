export default async function getRooms() {

    const response = await fetch(".../api/v1/rooms")
    if (!response.ok) {
        return new Error("Failed to fetch rooms")
    }

    return await response.json()
}