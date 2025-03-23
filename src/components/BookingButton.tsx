'use client'

import { useState } from 'react';
import { Alert, Button } from '@mui/material';

export default function BookingButton() {
  const [alertType, setAlertType] = useState<'success' | 'error' | null>(null); 
  const [showAlert, setShowAlert] = useState(false);

  const handleBooking = () => {
    setAlertType('success');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
    // try {
    //   const response = await fetch('/api/book-room', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       hotelId: 'your_hotel_id',  // Pass hotel id
    //       roomId: 'your_room_id',    // Pass room id
    //       checkInDate: '2025-03-25', // Check-in date
    //       checkOutDate: '2025-03-30', // Check-out date
    //     }),
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   });

    //   // Check if the response is successful
    //   if (!response.ok) {
    //     throw new Error('Booking failed');
    //   }

    //   const data = await response.json();

    //   // Handle the successful booking response
    //   setAlertType('success');
    //   setShowAlert(true);

    //   // Hide the alert after 3 seconds
    //   setTimeout(() => setShowAlert(false), 3000);

    // } catch (error) {
    //   // Handle booking failure
    //   setAlertType('error');
    //   setShowAlert(true);

    //   // Hide the alert after 3 seconds
    //   setTimeout(() => setShowAlert(false), 3000);
    // }
  };

  return (
    <div className="w-full">
      <Button
        onClick={handleBooking}
        variant="contained"
        color="primary"
        className="w-full bg-cyan-700 hover:bg-indigo-600 text-white py-2 rounded-lg"
      >
        Book Room
      </Button>

      {/* Conditional Rendering for Success or Error Alert */}
      {showAlert && alertType === 'success' && (
        <Alert
          severity="success"
          variant="filled"
          className="w-full mt-4"
        >
          Your booking was successful!
        </Alert>
      )}

      {showAlert && alertType === 'error' && (
        <Alert
          severity="error"
          variant="filled"
          className="w-full mt-4"
        >
          Something went wrong with your booking. Please try again.
        </Alert>
      )}
    </div>
  );
}
