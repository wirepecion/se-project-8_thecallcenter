import BACKEND_URL from "../config";

export async function createPayment(bookingId: string, paymentData: object, token: string | undefined) {
    
    const response = await fetch(`${BACKEND_URL}/api/v1/bookings/${bookingId}/payments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to create payment");

    return data;
    
}