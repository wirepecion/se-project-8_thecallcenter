import RoomCatalog from "@/components/RoomCatalog";
import getRoom from "@/libs/Room/getRoom";

export default async function RoomDetailPage({ params }: { params: { rid: string } }) {
    const roomDetail = await getRoom(params.rid);

    return (
        <main className="text-center p-5">
            <h1 className="text-lg font-bold">Room {roomDetail.data.number}</h1>
            <h1 className="text-md text-gray-800">{roomDetail.data.hotel.name} Hotel</h1>

            <div className="flex flex-row my-5">
                <div className="flex justify-center w-[60%]">
                    <div className="text-md mx-5 text-left">
                        <div>Room No. {roomDetail.data.number}</div>
                        <div>Type: {roomDetail.data.type}</div>
                        <div>Price: {roomDetail.data.price}</div>
                    </div>
                </div>
            </div>
        </main>
    );
}
