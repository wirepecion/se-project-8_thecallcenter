"use client";

import { useState } from 'react';
import { useRouter} from 'next/navigation';
import CheckoutPayment from '@/components/CheckoutPayment';
import CheckoutSummary from '@/components/CheckoutSummary';
import CheckoutSuccess from '@/components/CheckoutSuccess';

export default function CheckoutPage({ 
    token,
    paymentJson
}: { 
    token: string
    paymentJson: PaymentJsonOne
}) {

    const subtotal = Number(paymentJson.data.amount);
    const discount = subtotal / 20;
    const total = (subtotal - discount);

    const router = useRouter();
    const [checkSuccess, setCheckSuccess] = useState(false);

    return (
        <>
        {checkSuccess ? (
            
            <CheckoutSuccess 
                hotelName={paymentJson.data.booking.hotel.name}
                roomNumber={paymentJson.data.booking.room.number}
            />

        ) : (

            <main className="w-full min-h-screen flex flex-row">
                
                <CheckoutPayment
                    token={token}
                    paymentData={paymentJson.data}
                    total={total}
                    handleSuccess={setCheckSuccess}
                />
                <CheckoutSummary 
                    paymentData={paymentJson.data}
                    subtotal={subtotal}
                    discount={discount}
                    total={total}
                />

            </main>
        )}
        </>
    );

}