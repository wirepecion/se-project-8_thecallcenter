export default async function userRegister(userData: object) {

    const response = await fetch("http://localhost:5000/api/v1/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData),
    })

    const data = await response.json();
    console.log(data)

    if (!response.ok) {
        throw new Error("Failed to register")
    }

    return data   
}