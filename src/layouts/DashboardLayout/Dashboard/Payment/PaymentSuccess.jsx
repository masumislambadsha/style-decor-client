import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../../Components/Spinner/LoadingSpinner";
const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (!sessionId) {
      setLoading(false);
      return;
    }
    const confirm = async () => {
      try {
        const res = await axiosSecure.patch(
          `/payment-success?session_id=${sessionId}`
        );
        setInfo(res.data);
      } finally {
        setLoading(false);
      }
    };
    confirm();
  }, [searchParams, axiosSecure]);
  if (loading) {
    return (
         <LoadingSpinner/>
       );
  }
  return (
    <div className="max-w-xl mx-auto text-center space-y-4 py-10 px-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Payment Successful</h2>
      <p className="text-gray-600 text-sm sm:text-base">
        Thank you for your payment. Your booking has been confirmed.
      </p>
      {info && info.success && (
        <div className="bg-white rounded-xl sm:rounded-3xl shadow-lg p-4 sm:p-6 text-left space-y-2">
          <p>
            <span className="font-semibold">Transaction ID:</span>{" "}
            {info.transactionId}
          </p>
          <p>
            <span className="font-semibold">Tracking ID:</span>{" "}
            {info.trackingId}
          </p>
        </div>
      )}
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-4">
        <Link to="/dashboard/bookings" className="btn btn-outline btn-sm sm:btn-md">
          View My Bookings
        </Link>
        <Link
          to="/dashboard/payment-history"
          className="btn bg-[#ff6a4a] text-white btn-sm sm:btn-md"
        >
          Payment History
        </Link>
      </div>
    </div>
  );
};
export default PaymentSuccess;