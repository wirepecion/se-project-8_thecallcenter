export default async function getRooms() {

    const response = await fetch("https://localhost:5000/api/v1/rooms")
    if (!response.ok) {
        return new Error("Failed to fetch rooms")
    }

    return await response.json()
}