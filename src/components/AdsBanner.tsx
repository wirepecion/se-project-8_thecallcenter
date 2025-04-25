'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Button from './Button';
import InteractiveButton from './InteractiveButton';
import { motion, AnimatePresence } from 'framer-motion';
import randomBanners from '@/libs/Ads/randomBanners';
import getHotels from '@/libs/Hotel/getHotels';

export default function AdsBanner() {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0); 
    const [hotels, setHotels] = useState<HotelItem[]>([]);
    const [bannerNames, setBannerNames] = useState<string[]>([]);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startInterval = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            setDirection(1);
            setIndex((prevIndex) => (prevIndex + 1) % 5);
        }, 5000);
    };

    const handleLeftClick = () => {
        setDirection(-1);
        setIndex((prevIndex) => (prevIndex + 4) % 5);
        startInterval();
    };

    const handleRightClick = () => {
        setDirection(1);
        setIndex((prevIndex) => (prevIndex + 1) % 5);
        startInterval();
    };

    useEffect(() => {
        const fetchHotels = async () => {
            const hotelsJson = await getHotels();
            setHotels(hotelsJson.data);
            const bannerJson = await randomBanners();
            setBannerNames(bannerJson.data);
        };

        fetchHotels();
        startInterval();

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const currentBannerName = bannerNames[index % 5];
    const currentHotel = hotels.find((hotel) => hotel.name === currentBannerName);

    if (!currentHotel) return <p className="text-center text-gray-500">Loading ads...</p>;
    return (
        <div className="flex flex-col justify-center items-center text-black mt-40 mb-20">  
            <div className="relative w-[1100px] h-[600px] rounded-lg overflow-hidden shadow-lg">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentHotel?._id}
                        custom={direction}
                        initial={{ x: direction > 0 ? 1100 : -1100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: direction > 0 ? -1100 : 1100, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0"
                    >
                        {currentHotel?.picture && (
                            <Image
                                src={currentHotel.picture}
                                alt="cover"
                                fill
                                priority
                                className="object-cover"
                            />
                        )}
                    </motion.div>
                </AnimatePresence>

                <div className="absolute top-1/2 left-5 -translate-y-1/2 z-10 opacity-70">
                    <InteractiveButton>
                        <Button onClick={handleLeftClick} variant="white-outline">{"<"}</Button>
                    </InteractiveButton>
                </div>

                <div className="absolute top-1/2 right-5 -translate-y-1/2 z-10 opacity-70">
                    <InteractiveButton>
                        <Button onClick={handleRightClick} variant="white-outline">{">"}</Button>
                    </InteractiveButton>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-5 px-10 bg-gradient-to-r from-transparent to-white text-right z-10">
                    <h2 className="text-3xl font-bold">{currentHotel?.name}</h2>
                    <h4 className="text-xl font-bold">{currentHotel?.address}</h4>
                    <h4 className="text-xl font-bold">Tel: {currentHotel?.tel}</h4>
                    <div className="mt-5">
                        <InteractiveButton>
                            <Button href={`/hotel/${currentHotel?._id}`} variant="primary">VIEW MORE</Button>
                        </InteractiveButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
