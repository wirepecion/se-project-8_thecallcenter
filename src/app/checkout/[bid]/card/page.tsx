"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CountdownTimer from '@/components/CountdownTimer';


export default function CheckoutCard() {
    const subtotal = 49.80;
    const discount = 7.24;
    const total = (subtotal - discount).toFixed(2);

    const router = useRouter();
    const searchParams = useSearchParams(); // เพิ่มมาใช้รับค่า query param
    const [paymentMethod, setPaymentMethod] = useState('card');

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
                                onChange={() => {
                                    router.push('/checkout?paymentMethod=bank');
                                }}
                            />
                            <span>Bank</span>
                        </label>
                        <label className="flex items-center text-black text-gray-500 font-semibold space-x-1">
                            <input
                                type="radio"
                                name="payment"
                                checked={paymentMethod === 'thaiqr'}
                                onChange={() => {
                                    router.push('/checkout?paymentMethod=thaiqr');
                                }}
                            />
                            <span>ThaiQR</span>
                        </label>
                    </div>
                </div>


                {paymentMethod === 'card' && (
                    <div className="flex flex-col items-center mb-6">
                        <p className="text-gray-600 text-base font-medium mb-6">
                            Enter your 4-digit card pin to confirm this payment
                        </p>
                        <div className="flex gap-4">
                            <input
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                className="w-14 h-14 text-2xl text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <input
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                className="w-14 h-14 text-2xl text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <input
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                className="w-14 h-14 text-2xl text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <input
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                className="w-14 h-14 text-2xl text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    </div>
                )}


                <button
                     onClick={() => {
                        router.push('/checkout/success');
                      }}
                    
                    className="w-full bg-[#20589a] hover:bg-[#E0401D] text-white py-2 rounded font-semibold">
                    Confirm Payment
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
