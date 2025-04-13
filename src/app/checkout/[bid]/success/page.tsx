"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function CheckoutSuccess() {
    const router = useRouter();
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        setIsAnimating(true);
    }, []);

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <h1 className="text-gray-700 text-lg mb-6">Thank You For Your Purchase</h1>

            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: isAnimating ? 1 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="bg-green-400 rounded-full p-6 mb-8 relative"
            >
                <CheckCircle size={64} className="text-white" />
                {/* Optionally: confetti effect can be added here */}
            </motion.div>

            <h2 className="text-2xl font-semibold text-black mb-8">
                Order #123RGR231567Y Confirmed
            </h2>

            <button
                //onClick={() => router.push('/orders/track')}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded mb-4"
            >
                Track Order
            </button>

            <button
                className="text-gray-400 font-medium"
                disabled
            >
                Generate Receipt
            </button>
        </main>
    );
}
