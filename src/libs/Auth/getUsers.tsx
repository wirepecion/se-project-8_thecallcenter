import BACKEND_URL from "../config";

export default async function getUsers(token: string, pageQuery?: string, filter?: string, search?: string) {
    const queryParams = new URLSearchParams();
    
    if (pageQuery) queryParams.append("page", pageQuery);
    if (filter) queryParams.append("filter", filter);
    if (search) queryParams.append("search", search);

    const response = await fetch(`${BACKEND_URL}/api/v1/auth/users?${queryParams.toString()}`, {
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
