"use client";

import { useEffect, useState } from 'react';
import { useRouter} from 'next/navigation';
import CheckoutPayment from '@/components/CheckoutPayment';
import CheckoutSummary from '@/components/CheckoutSummary';
import CheckoutSuccess from '@/components/CheckoutSuccess';
import { membershipDiscount } from '@/libs/libs/membershipDiscount';

export default function CheckoutPage({ 
    token,
    paymentJson,
    userProfile
}: { 
    token: string
    paymentJson: PaymentJsonOne
    userProfile: UserProfile
}) {
    // console.log('userProfile', userProfile);
    const subtotal = Number(paymentJson.data.amount);
    const discount = membershipDiscount(userProfile.membershipTier) / 100 * subtotal;
    const total = (subtotal - discount);

    const router = useRouter();
    const [checkSuccess, setCheckSuccess] = useState(false);
    const [useCredit, setUseCredit] = useState(false);
    const [credit, setCredit] = useState(userProfile.credit);
    const [finalPrice, setFinalPrice] = useState(total);

    useEffect(() => {
        if (useCredit) {
            if (userProfile.credit - total >= 100) {
                    setCredit(total - 100);
                    setFinalPrice(100);
            } else {
                setCredit(userProfile.credit);
                setFinalPrice(total - userProfile.credit);
            }
        } else {
            setCredit(0);
            setFinalPrice(total);
        }
        
    },[useCredit]);

    return (
        <>
        {checkSuccess ? (
            
            <CheckoutSuccess 
                hotelName={paymentJson.data.booking.hotel.name}
                roomNumber={paymentJson.data.booking.room.number}
            />

        ) : (

            <main className="w-full flex flex-row">
                
                <CheckoutPayment
                    token={token}
                    paymentData={paymentJson.data}
                    total={finalPrice}
                    currentCredit={userProfile.credit}
                    usedCredit={credit}
                    handleSuccess={setCheckSuccess}
                    handleUseCredit={setUseCredit}
                />
                <CheckoutSummary 
                    paymentData={paymentJson.data}
                    subtotal={subtotal}
                    discount={discount}
                    total={finalPrice}
                    currentCredit={credit}
                    useCredit={useCredit}

                />

            </main>
        )}
        </>
    );

}