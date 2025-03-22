"use client"
import Image from 'next/image';
import InteractiveCard from './InteractiveCard';
import { Rating } from '@mui/material';

export default function Card ( { roomItem } : { roomItem:RoomItem } ) {
    
    return (
        <InteractiveCard contentName={ roomItem.number.toString() }>
            {/* <div className='w-full h-[70%] relative rounded-t-lg'>
                <Image src={imgSrc}
                alt='Card'
                fill={true}
                className='object-cover rounded-t-lg'
                />
            </div> */}
            <div className='w-full h-[15%] p-[10px] text-center'>
                <h3>Room No.{roomItem.number}</h3>
                
                <h3>{roomItem.type} room</h3>
                <h3>{roomItem.price} baht</h3>
            </div>
        </InteractiveCard>
    );
}