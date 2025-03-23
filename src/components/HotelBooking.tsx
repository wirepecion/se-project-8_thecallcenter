"use client";
import { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from '@mui/material/TextField';

export default function HotelBooking({ hotels }: { hotels: HotelItem[] }) {
    const [selectedHotel, setSelectedHotel] = useState<string>("");
    const [rooms, setRooms] = useState<RoomItem[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<RoomItem | null>(null);

    const handleHotelChange = (hotelName: string|undefined) => {
        if (hotelName === undefined) {
            setSelectedHotel(""); // Reset hotel selection
            setRooms([]); // Clear rooms as no hotel is selected
        } else {
            setSelectedHotel(hotelName);
            // Find the hotel object and set its rooms
            const hotel = hotels.find(h => h.name === hotelName);
            setRooms(hotel ? hotel.rooms : []);
        }
    };

    return (
        <div>
            {/* Hotel Selection */}
            <div className="space-y-1 py-5">
                <Autocomplete
                disablePortal
                options={hotels}
                getOptionLabel={(option) => option.name}
                sx={{ width: 300 }}
                onChange={(event, newValue) => {
                    setSelectedRoom(null);
                    handleHotelChange(newValue?.name);
                }}
                renderInput={(params:any) => <TextField {...params} label="Hotel" />}
                />
            </div>

            {/* Room Selection */}
            <div className="space-y-1 py-5">
                <Autocomplete
                    disablePortal
                    options={rooms}
                    getOptionLabel={(option) => `Room ${option.number} - ${option.type} - $${option.price}`}
                    sx={{ width: 300 }}
                    value={selectedRoom}
                    onChange={(event, newValue) => setSelectedRoom(newValue)}
                    renderInput={(params) => <TextField {...params} label="Room" />}
                    disabled={rooms.length === 0}
                />
            </div>
        </div>
    );
}
