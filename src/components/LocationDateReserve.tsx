"use client"
import { useState, useEffect } from "react"
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Select, MenuItem } from "@mui/material"
import getHotels from "@/libs/Hotel/getHotels"
import getRooms from "@/libs/Room/getRooms"
import { Dayjs } from "dayjs"

export default function LocationDateReserve() {
    const [checkInDate, setCheckInDate] = useState<Dayjs | null>(null)
    const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(null)
    const [hotel, setHotel] = useState<string | null>(null)
    const [room, setRoom] = useState<number | null>(null)

    const [hotels, setHotels] = useState<HotelItem[]>([])
    const [rooms, setRooms] = useState<RoomItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Fetch hotels and rooms
        async function fetchData() {
            try {
                const hotelJsonReady = await getHotels()
                const roomJsonReady = await getRooms()
            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div className="space-y-4">
            <Select variant="outlined" id="hotel" className="w-full" value={hotel} onChange={(e) => setHotel(e.target.value)}>
                {hotels.map((hotelItem) => (
                    <MenuItem key={hotelItem.name} value={hotelItem.name}>
                        {hotelItem.name}
                    </MenuItem>
                ))}
            </Select>

            <Select variant="outlined" id="room" className="w-full" value={room} onChange={(e) => setRoom(Number(e.target.value))}>
                {rooms.map((roomItem) => (
                    <MenuItem key={roomItem.number} value={roomItem.number}>
                        {roomItem.number}
                    </MenuItem>
                ))}
            </Select>

            <div className="w-full">
                <p className="text-sm text-gray-600 mb-1">Check-In Date:</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker className="bg-white" value={checkInDate} onChange={(value) => { setCheckInDate(value) }} />
                </LocalizationProvider>
            </div>

            <div className="w-full">
                <p className="text-sm text-gray-600 mb-1">Check-Out Date:</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker className="bg-white" value={checkOutDate} onChange={(value) => { setCheckOutDate(value) }} />
                </LocalizationProvider>
            </div>
        </div>
    )
}
