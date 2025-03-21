import { ClassNames } from "@emotion/react";
import HotelCard from "./HotelCard";
import Link from "next/link";

export default async function HotelCatalog( {hotelsJson} : {hotelsJson:Promise<HotelJson>} ) {
    
    const hotelJsonReady = await hotelsJson
    
    return (
        <>
            <div className="text-center">Explore {hotelJsonReady.count} hotels in our catalog</div>
            <div>
                    {
                        hotelJsonReady.data.map((hotelItem:HotelItem)=>(
                            <Link href={`/hotel/${hotelItem.id}`} className="w-1/5" key={hotelItem.name}>
                                <HotelCard key={hotelItem.name} hotelName={hotelItem.name}/>
                            </Link>
                        ))
                    }
            </div>
        </>
    );
}