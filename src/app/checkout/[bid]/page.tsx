import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/Auth/getUserProfile";
import CheckoutPage from "@/components/CheckoutPage";

import { getPayment } from "@/libs/Payment/getPayment";
import getBooking from "@/libs/Booking/getBooking";
import { get } from "http";

export default async function Checkout({ params }: { params: { bid: string } }) {

    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

    const profile = await getUserProfile(session.user.token);

    const payment: PaymentJsonOne = await getPayment(params.bid, session.user.token);
    
    console.log("Payment", payment.data);
    
    return (
        <main>
            <CheckoutPage token={session.user.token} paymentJson={payment} userProfile={profile.data}/>
        </main>
    );
}