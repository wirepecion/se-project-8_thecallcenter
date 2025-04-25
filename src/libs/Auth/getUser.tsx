import BACKEND_URL from "../config";

export default async function getUser(token: string, userId: string) {
    const response = await fetch(`${BACKEND_URL}/api/v1/auth/users/${userId}`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Cannot get user details");
    }

    return await response.json();
}
