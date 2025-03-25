import HotelCard from "./HotelCard";
import Link from "next/link";

export default async function HotelCatalog({ hotelsJson }: { hotelsJson: Promise<HotelJson> }) {
    const hotelJsonReady = await hotelsJson;
    
    // Sort hotels alphabetically by name
    const sortedHotels = hotelJsonReady.data.sort((a, b) => a.name.localeCompare(b.name));

    return (
        <>
            <div className="text-center mb-3 text-xl font-semibold">
                Explore {hotelJsonReady.count} hotels in our catalog
            </div>
            <div className="flex flex-wrap items-center justify-center gap-5 py-10">
                {sortedHotels.length > 0 ? (
                    sortedHotels.map((hotelItem: HotelItem) => (
                        <Link 
                            href={`/hotel/${hotelItem.id}`} 
                            className="w-1/6 min-w-[250px]" 
                            key={hotelItem.id}
                        >
                            <HotelCard 
                                hotelName={hotelItem.name} 
                                imgSrc={hotelItem.picture} 
                                address={hotelItem.address} 
                            />
                        </Link>
                    ))
                ) : (
                    <p className="text-gray-500">No hotels available.</p>
                )}
            </div>
        </>
    );
}
