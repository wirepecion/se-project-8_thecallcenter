import HotelPage from "@/components/HotelPage";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import getHotel from "@/libs/Hotel/getHotel";

export default function HotelDetailPage({ params }: { params: { hid: string } }) {
    const hotelDetail = getHotel(params.hid);

    return (
        <main className="text-center p-5">
            <Suspense fallback={ <p className="text-center">Loading...<LinearProgress/></p> }>
                <HotelPage hotelDetail={hotelDetail}/>
            </Suspense>
        </main>
    );
}
