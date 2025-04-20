"use client";

import { useRouter } from "next/navigation";
import { useState, Dispatch, SetStateAction } from "react";
import { updatePayment } from "@/libs/Payment/updatePayment";
import CardForm from '@/components/Cardform'; 
import BankForm from '@/components/BankForm'; 
import CountdownTimer from "./CountdownTimer";

export default function CheckoutPayment({
    token,
    paymentData,
    total,
    handleSuccess
} : {
    token: string
    paymentData: PaymentItem
    total: number
    handleSuccess: Dispatch<SetStateAction<boolean>>
}) {

    const [paymentMethod, setPaymentMethod] = useState(paymentData.method);
    const [selectedBank, setSelectedBank] = useState('');

    const router = useRouter();

    const handleUpdate = async () => {

        console.log(total)

        const response = await updatePayment(paymentData._id, { status: 'pending', method: paymentMethod, amount: total }, token);
        console.log(response);

    };

    const handleNavigation = () => {
        if (paymentMethod === 'card') {
            router.push('/checkout/card');
        } else if (paymentMethod === 'bank') {
            router.push(`/checkout/bank?bankType=${selectedBank}`);
        } else if (paymentMethod === 'thaiqr') {
            router.push('/checkout/success');
        }
    };

    return (
        <div className="w-1/2 bg-white p-12 flex flex-col">
            <h1 className="text-3xl font-semibold mb-8 text-black">Payment</h1>
            <hr className="mb-4" />

            <div className="mb-6">
                <label className="block font-medium mb-2 text-black">Pay With:</label>
                <div className="flex items-center space-x-6">
                {['Card', 'Bank', 'ThaiQR'].map((method) => (
                    <label key={method} className="flex items-center text-gray-500 font-semibold space-x-1">
                    <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === method}
                        onChange={() => {
                        setPaymentMethod(method);
                        setSelectedBank('');
                        }}
                    />
                    <span className="capitalize">{method}</span>
                    </label>
                ))}
                </div>
            </div>



            {paymentMethod === 'Card' && (
                <CardForm
                total={total}
                onSuccess={(amount) => {
                    handleUpdate()
                    handleNavigation();
                    handleSuccess(true);
                }}
                />
            )}

            {paymentMethod === 'Bank' && (
                <BankForm
                total={total}
                onSuccess={(amount, bank) => {
                    handleUpdate()
                    setSelectedBank(bank);
                    handleNavigation();
                    handleSuccess(true);
                }}
                />
            )}

            {paymentMethod === 'ThaiQR' && (
                <div className="mb-6 flex flex-col items-center text-center">
                <p className="text-gray-400 mb-6 text-lg">thaiqr USD ${total} to:</p>
                <p className="text-black font-semibold text-2xl">Polaris Bank</p>
                <p className="text-black font-bold text-3xl">0123456781</p>
                <div className="mt-6">
                    <CountdownTimer duration={600} />
                </div>
                <button
                    onClick={() => {
                        handleUpdate()
                        handleNavigation();
                        handleSuccess(true);
                    }}
                    className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold"
                >
                    Confirm Payment
                </button>
                </div>
            )}

            <p className="text-xs text-gray-500 mt-4">
                Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
            </p>
        </div>
    )
}