export default function PaymentRow({ payment, booking }: { payment: PaymentItem, booking: BookingItem }) {

    const handlePaymentUpdate = (paymentId: string) => {
        // Logic to update payment status
        console.log(`Update payment with ID: ${paymentId}`);
    };

    return (
      <tr className="border-t border-gray-200 bg-gray-50">
        <td className="p-3 px-10">{payment.amount ? payment.amount.toString() : 'N/A'}</td>
        <td className="p-3 px-10">{payment.method ? payment.method : 'N/A'}</td>
        <td className="p-3 px-10">{payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString() : 'N/A'}</td>
        <td className="p-3 px-10">
          <span
            className={`${
              payment.status === 'pending'
                ? 'text-yellow-500 bg-yellow-100'
                : payment.status === 'completed'
                ? 'text-green-500 bg-green-100'
                : payment.status === 'failed'
                ? 'text-red-500 bg-red-100'
                : payment.status === 'canceled'
                ? 'text-red-800 bg-red-100'
                : 'text-gray-500 bg-gray-200'
            } rounded-xl p-1 px-2`}
          >
            {payment.status || 'N/A'}
          </span>
        </td>
        <td className="p-3 text-right">
          <button
            type="button"
            className="text-lg font-bold px-5 hover:text-blue-600 transition-colors"
            onClick={() => {handlePaymentUpdate(payment._id)}}
          >
            &#8942;
          </button>
        </td>
      </tr>
    );
  }
  