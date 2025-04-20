"use client"

import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';
import Link from 'next/link';

export default function CheckoutSuccess({ 
    hotelName,
    roomNumber
}: { 
    hotelName: string
    roomNumber: number
}) {

    return (
        <div className="flex flex-col items-center justify-center text-center w-full min-h-screen bg-white p-12">
            <h1 className="text-gray-700 text-lg mb-6">Thank You For Your Purchase</h1>

            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="bg-green-400 rounded-full p-6 mb-8 relative"
            >
                <FaCheckCircle size={64} className="text-white" />
            </motion.div>

            <h2 className="text-2xl font-semibold text-black mb-8">
                Order {hotelName} Room{roomNumber} Confirmed
            </h2>

            <Link href="/mybooking" className="text-gray-400 font-medium mb-4">
                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded mb-4">See Your Booking</button>
            </Link>

            <button
                className="text-gray-400 font-medium"
                disabled
            >
                Generate Receipt
            </button>
        </div>
    );

}