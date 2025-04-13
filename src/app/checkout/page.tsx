"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import CountdownTimer from '@/components/CountdownTimer';

export default function Checkout() {
    const subtotal = 49.80;
    const discount = 7.24;
    const total = (subtotal - discount).toFixed(2);

    const router = useRouter();
    const searchParams = useSearchParams();

    const [paymentMethod, setPaymentMethod] = useState(() => searchParams.get('paymentMethod') || 'card');
    const [selectedBank, setSelectedBank] = useState('');


    useEffect(() => {
        const currentPayment = searchParams.get('paymentMethod');
        if (currentPayment) {
            setPaymentMethod(currentPayment);
        }
    }, [searchParams]);

    return (
        <main className="w-full min-h-screen flex flex-row">

            <div className="w-1/2 bg-white p-12 flex flex-col">
                <h1 className="text-3xl font-semibold mb-8 text-black">Payment</h1>
                <hr />
                <div className="p-2"></div>
                <div className="mb-6">
                    <label className="block font-medium mb-2 text-black">Pay With:</label>
                    <div className="flex items-center space-x-6">
                        <label className="flex items-center text-gray-500 font-semibold space-x-1">
                            <input
                                type="radio"
                                name="payment"
                                checked={paymentMethod === 'card'}
                                onChange={() => setPaymentMethod('card')}
                            />
                            <span>Card</span>
                        </label>
                        <label className="flex items-center text-black text-gray-500 font-semibold space-x-1">
                            <input
                                type="radio"
                                name="payment"
                                checked={paymentMethod === 'bank'}
                                onChange={() => setPaymentMethod('bank')}
                            />
                            <span>Bank</span>
                        </label>
                        <label className="flex items-center text-black text-gray-500 font-semibold space-x-1">
                            <input
                                type="radio"
                                name="payment"
                                checked={paymentMethod === 'thaiqr'}
                                onChange={() => setPaymentMethod('thaiqr')}
                            />
                            <span>ThaiQR</span>
                        </label>
                    </div>
                </div>


                {paymentMethod === 'card' && (
                    <>
                        <div className="mb-4">
                            <label className="block font-medium mb-1 text-black">Card Number:</label>
                            <input
                                type="text"
                                placeholder="1234 5678 9101 1121"
                                className="w-full border border-gray-300 p-2 rounded"
                            />
                        </div>
                        <div className="flex space-x-4 mb-6">
                            <div className="w-1/2">
                                <label className="block font-medium mb-1 text-black">Expiration Date</label>
                                <input
                                    type="text"
                                    placeholder="MM/YY"
                                    className="w-full border border-gray-300 p-2 rounded"
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block font-medium mb-1 text-black">CVV</label>
                                <input
                                    type="text"
                                    placeholder="123"
                                    className="w-full border border-gray-300 p-2 rounded"
                                />
                            </div>
                        </div>
                    </>
                )}

                {paymentMethod === 'bank' && (
                    <div className="mb-6">
                        <label className="block font-medium mb-2 text-black">Choose your bank:</label>
                        <select
                            value={selectedBank}
                            onChange={(e) => setSelectedBank(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded text-black"
                        >
                            <option value="">Select a bank</option>
                            <option value="kbank">Kasikornbank</option>
                            <option value="scb">SCB</option>
                            <option value="bbl">Bangkok Bank</option>
                        </select>

                    </div>
                )}

                {paymentMethod === 'thaiqr' && (
                    <div className="mb-6 flex flex-col items-center text-center">
                        <p className="text-gray-400 mb-6 text-lg ">thaiqr USD ${total} to:</p>
                        <p className="text-black list-none font-semibold  text-2xl space-y-2">
                            Polaris Bank</p>
                        <p className="text-black list-none font-bold  text-3xl space-y-2">
                            0123456781</p>


                        <div className="mt-6">
                            <CountdownTimer duration={600} />
                        </div>
                    </div>
                )}


                <button
                    onClick={() => {
                        if (paymentMethod === 'card') {
                          router.push('/checkout/card');
                        } else if (paymentMethod === 'bank') {
                          router.push(`/checkout/bank?bankType=${selectedBank}`);
                        } else if (paymentMethod === 'thaiqr') {
                          router.push('/checkout/success');
                        }
                      }}
                      
                    className="w-full bg-[#20589a] hover:bg-[#E0401D] text-white py-2 rounded font-semibold">
                    Pay USD {total}
                </button>

                <p className="text-xs text-gray-500 mt-4">
                    Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
                </p>
            </div>


            <div className="w-1/2 bg-gray-100 p-12 flex flex-col">
                <h1 className="text-3xl font-semibold mb-8 text-black">Order Summary</h1>
                <hr />
                <div className="p-2"></div>
                <div className="flex items-center mb-6 ">
                    <img src="img\paymentui\rom303.jpg" alt="hotel item" className="w-14 h-14 mr-4 rounded-lg" />
                    <div>
                        <p className="font-medium text-black text-xl">Hotel-Name</p>
                        <p className="text-sm text-gray-600 font-semibold">Room Number 01</p>
                    </div>
                    <div className="ml-auto text-right">
                        <p className="font-semibold text-black text-xl">${subtotal.toFixed(2)}</p>
                        <p className="text-sm text-gray-600 font-semibold">Qty: 1</p>
                    </div>
                </div>

                <div className="flex mb-6">
                    <input
                        type="text"
                        placeholder="Gift or discount code"
                        className="flex-1 border border-gray-300 p-2 rounded-l text-black"
                    />
                    <button className="bg-gray-400 hover:bg-[#E0401D] text-white px-4 rounded-r transition-colors">Apply</button>

                </div>

                <div className="border-t pt-4 space-y-5 text-sm text-gray-700">
                    <div className="flex justify-between font-medium text-lg">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-medium text-lg">
                        <span>Membership discount</span>
                        <span className="text-red-500">- ${discount.toFixed(2)}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>${total}</span>
                    </div>
                    <p className="text-xs text-gray-400">Including your $21.4 tax</p>
                </div>
            </div>
        </main>
    );
}
