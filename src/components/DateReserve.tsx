"use client";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

interface DateReserveProps {
    selectedDate: Dayjs | null;
    setSelectedDate: (date: Dayjs) => void;
}

export default function DateReserve({ selectedDate, setSelectedDate }: DateReserveProps) {
    return (
        <div className="bg-slate-100 rounded-lg px-5 py-3 flex flex-col items-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    value={selectedDate}
                    onChange={(newValue) => newValue && setSelectedDate(newValue)}
                    className="bg-white"
                />
            </LocalizationProvider>
        </div>
    );
}
