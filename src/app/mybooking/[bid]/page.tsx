// src/app/mybooking/[bid]/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/Auth/getUserProfile";
import getBooking from "@/libs/Booking/getBooking";
import BookingClientView from "@/components/BookingClientView";
import { updatePayment } from "@/libs/Payment/updatePayment";

export default async function View({ params }: { params: { bid: string } }) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

    const userProfile = await getUserProfile(session.user.token);
    const bookingJson = await getBooking(params.bid, session.user.token);

    const paymentList = bookingJson.data.payments;

    const updatePaymentFunc = async (paymentId: string, updatedData: object) => {
        "use server"
        return await updatePayment(paymentId, updatedData, session.user.token);
    };

    return (
        <main className="p-7 h-[1200px] text-white min-h-screen">
         
        <BookingClientView
            bookingItem={bookingJson.data}
            paymentList={paymentList}
            updatePayment={updatePaymentFunc}
            sessionToken={session.user.token}
            userRole={userProfile.data.role || "user"}
        />
        </main>
    );
}
