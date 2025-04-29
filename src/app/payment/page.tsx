import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import PaymentPage from "@/components/PaymentPage";
import { updatePayment } from "@/libs/Payment/updatePayment";
import { deletePayment } from "@/libs/Payment/deletePayment";

export default async function Payment() {

    const session = await getServerSession(authOptions);
    if (!session?.user?.token) {
        return <p className="text-center text-gray-500">Unauthorized. Please log in.</p>;
    }

    const updatePaymentFunc = async (paymentId: string, updatedData: object) => {
        "use server"
        return await updatePayment(paymentId, updatedData, session.user.token);
    };
    
    const deletePaymentFunc = async (paymentId: string) => {
        "use server"
        return await deletePayment(paymentId, session.user.token);
    };

    return (
        <PaymentPage
            sessionToken={session.user.token}
            updatePayment={updatePaymentFunc}
            deletePayment={deletePaymentFunc}
        />
    );
}
