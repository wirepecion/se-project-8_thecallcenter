import getHotels from "@/libs/Hotel/getHotels";
import { Suspense } from "react";
import HotelCatalog from "@/components/HotelCatalog";
import { LinearProgress } from "@mui/material";
import ExploreHero from "@/components/ExploreHero";

export default function hotel() {

const hotels = getHotels()

    return (
        <div className="w-[1065px] h-auto mx-auto grid grid-cols-12 gap-[15px] mt-10 rounded-2xl">
            
            <ExploreHero />
            <div className="col-span-12 text-center font-serif mt-4 text-8xl text-white md:text-7xl font-Outfit font-bold leading-tight">
                
            </div>
            {/* <div className="col-span-12 text-center font-serif text-2xl mt-4">Explore Stay</div> */}
            <div className="col-span-12">
            <Suspense fallback={ <p className="text-center font-roboto font-semibold text-base">Loading...<LinearProgress/></p> }>
                <HotelCatalog  hotelsJson={hotels}/>
            </Suspense>
            </div>
        </div>
    );
}