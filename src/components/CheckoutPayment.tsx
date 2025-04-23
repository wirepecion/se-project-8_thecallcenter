"use client";

import { useRouter } from "next/navigation";
import { useState, Dispatch, SetStateAction, useEffect, use } from "react";
import { updatePayment } from "@/libs/Payment/updatePayment";
import reduceUserCredit from "@/libs/Auth/reduceUserCredit";    
import CardForm from '@/components/Cardform'; 
import BankForm from '@/components/BankForm'; 
import CountdownTimer from "./CountdownTimer";
import { esES } from "@mui/x-date-pickers/locales";

export default function CheckoutPayment({
    token,
    paymentData,
    total,
    currentCredit,
    usedCredit,
    handleSuccess,
    handleUseCredit
} : {
    token: string
    paymentData: PaymentItem
    total: number
    currentCredit: number,
    usedCredit: number,
    handleSuccess: Dispatch<SetStateAction<boolean>>
    handleUseCredit: Dispatch<SetStateAction<boolean>>
}) {

    const [paymentMethod, setPaymentMethod] = useState(paymentData.method);
    const [selectedBank, setSelectedBank] = useState('');
    const [useCredit, setUseCredit] = useState(false);

    const router = useRouter();

    const handleUpdate = async () => {

        let creditReduce = 0 ;
        console.log(total)
        if(useCredit) {
            const responseReduceCredit = await reduceUserCredit(usedCredit, token);
            console.log(responseReduceCredit);
            console.log("total paid", total);
        } else {
            console.log("not use credit")
        }
        const response = await updatePayment(paymentData._id, { status: 'pending', method: paymentMethod, amount: total }, token);
        console.log(response);

    };

    return (
        <div className="w-1/2 bg-white p-12 flex flex-col py-20">
            <h1 className="text-3xl font-semibold mb-8 text-black">Payment</h1>
            <hr className="mb-4" />

            <div>
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={useCredit}
                        onChange={(e) =>{ setUseCredit(e.target.checked); 
                                        handleUseCredit(e.target.checked); }}
                    />
                    <span className="text-black">Use credit</span>
                    <span className="text-gray-500">({currentCredit} credits available)</span>
                    
                </label>
            </div>

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