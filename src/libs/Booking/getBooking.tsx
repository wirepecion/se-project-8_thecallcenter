export default async function getBooking(id:string, token: string | undefined) {
    
    const response = await fetch(`http://localhost:5000/api/v1/bookings/${id}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Send user's token
        }
    })
    if (!response.ok) {
        return new Error("Failed to fetch booking")
    }

    return await response.json()
}