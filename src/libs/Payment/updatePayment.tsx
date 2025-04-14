import BACKEND_URL from "../config";

export async function updatePayment(paymentId: string, updatedData: object, token: string | undefined) {
    
    const response = await fetch(`${BACKEND_URL}/api/v1/payments/${paymentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to update payment");

    return data;
    
}