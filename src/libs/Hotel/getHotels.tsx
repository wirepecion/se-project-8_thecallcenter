export default async function getHotels() {

    await new Promise( (resolve)=>setTimeout(resolve, 300) )

    const response = await fetch(".../api/v1/hotels")
    if (!response.ok) {
        return new Error("Failed to fetch hotels")
    }

    return await response.json()
}