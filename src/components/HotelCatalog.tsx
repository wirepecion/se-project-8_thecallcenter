import { ClassNames } from "@emotion/react";
import HotelCard from "./HotelCard";
import Link from "next/link";

export default async function HotelCatalog( {hotelsJson} : {hotelsJson:Promise<HotelJson>} ) {
    
    const hotelJsonReady = await hotelsJson
    
    return (
        <>
            <div className="text-center mb-8 text-white">Explore {hotelJsonReady.count} hotels in our catalog</div>
            <div className="flex flex-wrap center justify-center gap-8 mb-5">
            {
            [...hotelJsonReady.data] // Create a new array to avoid mutating state
                .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically by name
                .map((hotelItem: HotelItem) => (
                    <Link href={`/hotel/${hotelItem.id}`} className="w-1/6 min-w-[250px]" key={hotelItem.id}>
                        <HotelCard 
                            hotelName={hotelItem.name} 
                            address={hotelItem.address} 
                            imgSrc={hotelItem.picture} 
                        />
                    </Link>
                ))
            }

            </div>
        </>
    );
}