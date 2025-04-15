'use client'
import PaymentRow from './PaymentRow';

export default function PaymentTable({ bookings } : {bookings: BookingItem[]}) {
  return (
      <div className="overflow-x-auto mt-4 border rounded-lg shadow-lg">
        <table className="min-w-full text-sm text-left text-black">
          <thead>
            <tr className="bg-gray-200 text-xs"> 
              <th className="p-3 px-10 font-medium">Amount</th>
              <th className="p-3 px-10 font-medium">Method</th>
              <th className="p-3 px-10 font-medium">Date</th>
              <th className="p-3 px-10 font-medium">Status</th>
              <th className="p-3 px-10 font-medium">User</th>
              <th className="p-3 px-10 w-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {bookings.flatMap((bookingItem: any) =>
                bookingItem.payments.map((paymentItem: PaymentItem) => (
                <PaymentRow key={paymentItem._id} payment={paymentItem} booking={bookingItem} />
                ))
            )}
          </tbody>
        </table>
      </div>
  )
}
