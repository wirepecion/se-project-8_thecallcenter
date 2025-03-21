export default async function getHotel(id:string) {
    const response = await fetch(`.../api/v1/hotels/${id}`)
    if (!response.ok) {
        return new Error("Failed to fetch hotel")
    }

    return await response.json()
}