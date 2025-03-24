"use client";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

export default function DateReserve({
  onDateChange,
}: {
  onDateChange: (dates: [Date | null, Date | null]) => void;
}) {
  const [checkInDate, setCheckInDate] = useState<Dayjs | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(null);

  const tomorrow = dayjs().add(1, "day");

  // Handle Check-in Date Change
  const handleCheckInChange = (date: Dayjs | null) => {
    setCheckInDate(date);
    if (date) {
      const newCheckOut = date.add(1, "day"); // Default checkout is 1 day after check-in
      setCheckOutDate(newCheckOut);
      onDateChange([date.toDate(), newCheckOut.toDate()]);
    } else {
      setCheckOutDate(null);
      onDateChange([null, null]);
    }
  };

  // Handle Check-out Date Change
  const handleCheckOutChange = (date: Dayjs | null) => {
    setCheckOutDate(date);
    onDateChange([checkInDate ? checkInDate.toDate() : null, date ? date.toDate() : null]);
  };

  return (
    <div className="bg-slate-100 rounded-lg px-5 py-3 flex flex-col items-center space-y-4">
      {/* Check-in Date Picker */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">Check-In Date:</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={checkInDate}
            onChange={handleCheckInChange}
            minDate={tomorrow} // Can only select from tomorrow onwards
          />
        </LocalizationProvider>
      </div>

      {/* Check-out Date Picker */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">Check-Out Date:</label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={checkOutDate}
            onChange={handleCheckOutChange}
            minDate={checkInDate ? checkInDate.add(1, "day") : tomorrow} // Min checkout is 1 day after check-in
            maxDate={checkInDate ? checkInDate.add(3, "day") : undefined} // Max checkout is 3 days after check-in
          />
        </LocalizationProvider>
      </div>
    </div>
  );
}
