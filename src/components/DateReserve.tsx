"use client"
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Dayjs } from "dayjs"

export default function DateReserve( { onDateChange }: { onDateChange: (date: Date | null) => void } ) {
    return (
        <div className="bg-slate-100 rounded-lg px-5 py-3 flex flex-col items-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                    className="bg-white"
                    onChange={(newValue: Dayjs | null) => {
                        onDateChange(newValue ? newValue.toDate() : null);
                    }}
                    />
            </LocalizationProvider>
        </div>
    );
}
