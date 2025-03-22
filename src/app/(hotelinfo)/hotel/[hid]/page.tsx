import getHotel from "@/libs/Hotel/getHotel";

export default async function HotelDetailPage( {params} : { params: {hid:string} }) {
    
    const hotelDetail = await getHotel(params.hid)
    console.log(await getHotel(params.hid))

    return (
        <main className="text-center p-5">
            <h1 className="text-lg font-medium">{ hotelDetail.data.name }</h1>
            <div className="flex flex-row my-5">
                {/* <Image src={ hotelDetail.data.picture }
                    alt="hotel Image"
                    width={0} height={0} sizes="100vw"
                    className="rounded-lg w-[30%]"/> */}
                <div className="flex justify-center h-screen w-[60%] ">
                    <div className="text-md mx-5 text-left">
                        <div>Name: { hotelDetail.data.name }</div>
                        <div>Address: { hotelDetail.data.address }</div>
                    </div>
                </div>
            </div>
        </main>
    );
}