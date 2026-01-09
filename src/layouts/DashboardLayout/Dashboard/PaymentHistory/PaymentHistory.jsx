import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../../Components/Spinner/LoadingSpinner";

const PaymentHistory = () => {
    useEffect(() => {
    document.title = "Style Decor | Payment History";
  }, []);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-base-content mt-15">Payment History</h2>

      {payments.length === 0 ? (
        <div className="text-center py-16 bg-base-100 rounded-xl sm:rounded-3xl shadow">
          <p className="text-base-content/60 text-sm sm:text-lg">No payments yet</p>
        </div>
      ) : (
        <div className="bg-base-100 rounded-xl sm:rounded-3xl shadow overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-base-content/70 text-xs sm:text-sm">
                <th>Service</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Transaction</th>
                <th>Tracking</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p._id} className="hover:bg-base-200 text-xs sm:text-sm">
                  <td>{p.serviceName}</td>
                  <td>{p.amount} BDT</td>
                  <td>{new Date(p.paidAt).toLocaleDateString()}</td>
                  <td className="break-all">{p.transactionId}</td>
                  <td className="break-all">{p.trackingId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
