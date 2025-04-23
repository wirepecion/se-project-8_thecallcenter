import BACKEND_URL from "../config";

export async function getPayments(token: string | undefined,  pageQuery?: string) {
    let page = pageQuery ? `page=${pageQuery}` : '';

    const response = await fetch(`${BACKEND_URL}/api/v1/payments?${page}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to fetch payments");

    return data;

}