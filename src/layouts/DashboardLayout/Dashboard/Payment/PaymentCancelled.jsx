import React from "react";
import { Link } from "react-router";
const PaymentCancelled = () => (
  <div className="max-w-xl mx-auto text-center space-y-4 py-10 px-4">
    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Payment Cancelled</h2>
    <p className="text-gray-600 text-sm sm:text-base">
      Your payment was cancelled. You can try again from your bookings page.
    </p>
    <Link to="/dashboard/bookings" className="btn bg-[#ff6a4a] text-white btn-sm sm:btn-md mt-4">
      Back to My Bookings
    </Link>
  </div>
);
export default PaymentCancelled;