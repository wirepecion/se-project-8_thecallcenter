import { ClassNames } from "@emotion/react";
import HotelCard from "./HotelCard";
import Link from "next/link";

export default async function HotelCatalog( {hotelsJson} : {hotelsJson:Promise<HotelJson>} ) {
    
    const hotelJsonReady = await hotelsJson
    
    return (
        <>
            <div className="text-center mb-3">Explore {hotelJsonReady.count} hotels in our catalog</div>
            <div className="flex flex-wrap center justify-center gap-5 py-20">
                    {
                        hotelJsonReady.data.map((hotelItem:HotelItem)=>(
                            <Link href={`/hotel/${hotelItem.id}`} className="w-1/6 min-w-[250px]" key={hotelItem.name}>
                                <HotelCard key={hotelItem.name} hotelName={hotelItem.name} imgSrc={hotelItem.picture} address={hotelItem.address}/>
                            </Link>
                        ))
                    }
            </div>
        </>
    );
}