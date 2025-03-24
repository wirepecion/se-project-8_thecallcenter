"use client"
import Image from 'next/image';
import { useState } from 'react';
import InteractiveCard from './InteractiveCard';
import { Rating } from '@mui/material';
import { CircularProgress } from '@mui/material';

export default function Card({ hotelName, address, imgSrc, onRate }: { hotelName: string, address: string, imgSrc: string, onRate?: Function }) {
    
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    return (
        <InteractiveCard contentName={hotelName}>
            <div className='w-full h-[70%] relative rounded-t-lg flex items-center justify-center bg-gray-200'>
                {loading && !error && (
                    <div className="absolute z-10">
                        <CircularProgress /> {/* Material UI Spinner */}
                    </div>
                )}
                {!error ? (
                    <Image 
                        src={imgSrc}
                        alt='Card'
                        fill
                        className={`object-cover rounded-t-lg transition-opacity ${loading ? 'opacity-0' : 'opacity-100'}`}
                        onLoad={() => setLoading(false)}
                        onError={() => { setLoading(false); setError(true); }}
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                        Failed to load image
                    </div>
                )}
            </div>
            <div className='w-full h-[15%] text-center'>
                <h3>{hotelName}</h3>
                <h5 className='text-gray-500'>{address}</h5>
                {onRate ? (
                    <Rating
                        id={`${hotelName} Rating`}
                        name={`${hotelName} Rating`}
                        data-testid={`${hotelName} Rating`}
                        value={rating}
                        onClick={(e) => { e.stopPropagation(); }}
                        onChange={(e, newRating) => {
                            e.stopPropagation();
                            onRate(hotelName, newRating);
                            setRating(newRating ?? 0);
                        }}
                    />
                ) : null}
            </div>
        </InteractiveCard>
    );
}
