'use client'
import { useState } from "react";

export default function NavBar() {

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-blue-900 p-4">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
            {/* Logo */}
            <a href="#">
                <div className="text-white text-2xl font-bold">STGP</div> 
                <div className="text-white text-md font-">HotelBooking</div>
            </a>

            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-8">
            <li>
                <a href="/" className="text-white hover:text-blue-300">
                Home
                </a>
            </li>
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
            </ul>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center" onClick={toggleMobileMenu}>
            <button className="text-white">
                <span className="text-2xl">☰</span>
            </button>
            </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
            <ul className="md:hidden flex flex-col items-center space-y-4 bg-blue-800 py-4">
            <li>
                <a href="/" className="text-white hover:text-blue-300">
                Home
                </a>
            </li>
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
            </ul>
        )}
        </nav>
    );
}