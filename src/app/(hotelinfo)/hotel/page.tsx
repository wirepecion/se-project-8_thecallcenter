import getHotels from "@/libs/Hotel/getHotels";
import { Suspense } from "react";
import HotelCatalog from "@/components/HotelCatalog";
import { LinearProgress } from "@mui/material";

export default function hotel() {

const hotels = getHotels()

    return (
        <div>
            
            <div className="text-center font-serif text-4xl mt-4">Hotel</div>

            <Suspense fallback={ <p className="text-center">Loading...<LinearProgress/></p> }>
                <HotelCatalog hotelsJson={hotels}/>
            </Suspense>
        </div>
    );
}