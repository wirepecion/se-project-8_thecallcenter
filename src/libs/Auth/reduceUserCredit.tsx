import BACKEND_URL from "../config";

export default async function reduceUserCredit(amount: number, token: string) {
    const response = await fetch(`${BACKEND_URL}/api/v1/auth/reduceCredit`, {
        method: "POST",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount })
    })

    if (!response.ok) {
        throw new Error("Failed to reduce user credit")
    }

    return await response.json()
}