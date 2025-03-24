"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import userRegister from "@/libs/Auth/userRegister";
import { Alert } from "@mui/material";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [tel, setTel] = useState("");
    const [role, setRole] = useState("user");
    const [loading, setLoading] = useState(false);
    const [alertType, setAlertType] = useState<'success' | 'error' | null>(null); 
    const [showAlert, setShowAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState("Falied to Register.")
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {

        e.preventDefault();
        setLoading(true);

        try {

            if (!name || !email || !password || !tel || !role) {
                throw new Error("All fields are required.")
            }
    
            if (password !== confirmPassword) {
                throw new Error("Passwords do not match.")
            }

            if (password.length < 6) {
                throw new Error("Your password must be at least 6 characters.")
            }
            
            const userData = {
                name: name,
                email: email,
                password: password,
                tel: tel,
                role: role
            };
            const result = await userRegister(userData)

            setAlertType('success')
            setShowAlert(true)
            setTimeout(() => setShowAlert(false), 3000);
            setTimeout(() => {
                router.push("/api/auth/signin"); // Redirect to login page
            }, 500);
        } catch (err) {
            setAlertType('error')
            setErrorMessage(err instanceof Error ? err.message : "Failed to Register.")
            setShowAlert(true)
            setTimeout(() => setShowAlert(false), 3000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>

                {showAlert && alertType === 'success' && (
                <Alert severity="success" className="w-full max-w-[300px] mt-4 justify-center mx-auto my-5">
                Registration successful!
                </Alert>
                )}

                {showAlert && alertType === 'error' && (
                <Alert severity="error" className="w-full max-w-[300px] mt-4 justify-center mx-auto my-5">
                {errorMessage}
                </Alert>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                    <input 
                        type="text" 
                        placeholder="Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    <input 
                        type="tel" 
                        placeholder="Telephone Number" 
                        value={tel} 
                        onChange={(e) => setTel(e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                    <div className="w-full">
                        <p className="text-sm text-gray-600 mb-1">Choose Your Role:</p>
                        <select 
                            value={role} 
                            onChange={(e) => setRole(e.target.value)} 
                            className="w-full p-2 border rounded"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    
                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <p className="text-sm text-center mt-4">
                    Already have an account? <a href="/api/auth/signin" className="text-blue-500 hover:underline">Log-In</a>
                </p>
            </div>
        </main>
    );
}