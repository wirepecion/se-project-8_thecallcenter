import BACKEND_URL from "../config";

export default async function getUsers(token:string) {
    const response = await fetch(`${BACKEND_URL}/api/v1/auth/users`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Cannot get users");
    }

    return await response.json();
}
