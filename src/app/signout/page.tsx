"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutConfirmationPage() {
  const router = useRouter();

  const handleYes = () => {
    signOut({ callbackUrl: "/" });
  };

  const handleNo = () => {
    router.back();
  };

  return (
    <div className="flex min-h-screen items-center justify-center text-black bg-white">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[400px] transition-all ease-in-out transform hover:scale-105">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">Are you sure you want to log out?</h2>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleYes}
            className="w-[45%] bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Yes
          </button>

          <button
            onClick={handleNo}
            className="w-[45%] bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
