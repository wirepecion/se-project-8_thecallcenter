import BACKEND_URL from "../config";

export async function getPayments(token: string | undefined,  pageQuery?: string, statusQuery?: string) {
    const queryParams = new URLSearchParams();
    
    if (pageQuery) queryParams.append("page", pageQuery);
    if (statusQuery) queryParams.append("status", statusQuery);

    const response = await fetch(`${BACKEND_URL}/api/v1/payments?${queryParams.toString()}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to fetch payments");

    return data;

}