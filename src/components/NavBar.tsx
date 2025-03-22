import { useState } from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function NavBar() {

    const session = await getServerSession(authOptions)

    return (
        <nav className="bg-blue-900 p-4">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
            {/* Logo */}
            <a href="/">
                <div className="text-white text-2xl font-bold">STGP</div> 
                <div className="text-white text-md font-">HotelBooking</div>
            </a>

            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-8">
            <li>
                <a href="/hotel" className="text-white hover:text-blue-300">
                Hotel
                </a>
            </li>
            <li>
                <a href="#" className="text-white hover:text-blue-300">
                Booking
                </a>
            </li>
            <li>
                <a href="#" className="text-white hover:text-blue-300">
                About Us
                </a>
            </li>
            <li>
                {
                    session? <a href="/api/auth/signout" className="text-white hover:text-blue-300">Sign-Out{session.user?.name}</a>
                    : <a href="/api/auth/signin" className="text-white hover:text-blue-300">Sign-In</a>
                }
            </li>
            </ul>
        </div>
        </nav>
    );
}