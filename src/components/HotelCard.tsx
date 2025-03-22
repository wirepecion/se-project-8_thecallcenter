"use client"
import Image from 'next/image';
import { useState } from 'react';
import InteractiveCard from './InteractiveCard';
import { Rating } from '@mui/material';

export default function Card ( { hotelName, imgSrc, onRate } : { hotelName:string, imgSrc:string, onRate?:Function } ) {
    
    const [ rating, setRating ] = useState(0)
    
    return (
        <InteractiveCard contentName={ hotelName }>
            { <div className='w-full h-[70%] relative rounded-t-lg'>
                <Image src={imgSrc}
                alt='Card'
                fill={true}
                className='object-cover rounded-t-lg'
                />
            </div> }
            <div className='w-full h-[15%] p-[10px] text-center'>
                <h3>{hotelName}</h3>
                {
                    onRate? <Rating
                    id={`${hotelName} Rating`}
                    name={`${hotelName} Rating`}
                    data-testid={`${hotelName} Rating`}
                    value={rating}
                    onClick={ (e) => {e.stopPropagation();}}
                    onChange={ (e, newRating) => {
                        e.stopPropagation(); 
                        onRate(hotelName, newRating); 
                        setRating(newRating ?? 0) }}
                    /> : ''
                }
            </div>
        </InteractiveCard>
    );
}