import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { CreditCard, CalendarDays, Briefcase } from "lucide-react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const SHARE = 0.3;

const Earnings = () => {
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["decorator-bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorator/bookings");
      return res.data;
    },
  });

  const { completed, totalEarnings, avgPerProject } = useMemo(() => {
    const completedBookings =
      bookings.filter(
        (b) => b.status === "completed" && b.paymentStatus === "paid"
      ) || [];

    const sum = completedBookings.reduce((acc, b) => {
      const bookingAmount = Number(b.cost) || 0;
      return acc + bookingAmount * SHARE;
    }, 0);

    const avg =
      completedBookings.length > 0 ? sum / completedBookings.length : 0;

    return {
      completed: completedBookings,
      totalEarnings: sum,
      avgPerProject: avg,
    };
  }, [bookings]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-[#ff6a4a]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-15 sm:py-8 px-4">
      <motion.div
        className="container mx-auto"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Earnings Summary
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Completed, paid projects and your share of earnings from StyleDecor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center gap-3">
            <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-[#ff6a4a]/10 flex items-center justify-center text-[#ff6a4a]">
              <CreditCard size={18} sm:size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Total earnings (30%)
              </p>
              <p className="text-lg font-bold text-gray-900">
                {totalEarnings.toLocaleString()} BDT
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center gap-3">
            <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <Briefcase size={18} sm:size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Completed projects
              </p>
              <p className="text-lg font-bold text-gray-900">
                {completed.length}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 flex items-center gap-3">
            <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500">
              <CalendarDays size={18} sm:size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Avg. earning / project
              </p>
              <p className="text-lg font-bold text-gray-900">
                {avgPerProject.toFixed(0)} BDT
              </p>
            </div>
          </div>
        </div>

        {completed.length === 0 ? (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-6 sm:p-10 text-center border border-gray-100">
            <p className="text-lg font-semibold text-gray-800">
              No completed, paid projects yet
            </p>
            <p className="text-gray-500 mt-1 text-xs sm:text-sm">
              Once you finish projects and they are marked as completed with
              payment, they will show up here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {completed.map((b) => {
              const base = Number(b.cost || 0) || 0;
              const share = base * SHARE;

              return (
                <div
                  key={b._id}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div>
                    <p className="text-xs text-gray-400 mb-1">
                      Booking ID {b._id.slice(-6)} · Tracking {b.trackingId}
                    </p>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {b.serviceName || "Decoration Service"}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Client: {b.userName} ({b.userEmail})
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Event date:{" "}
                      {b.bookingDate
                        ? new Date(b.bookingDate).toLocaleDateString("en-GB")
                        : "N/A"}
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Your earning (30% of {base.toLocaleString()} BDT)
                    </p>
                    <p className="text-xl font-bold text-[#ff6a4a]">
                      {share.toFixed(0)} BDT
                    </p>
                    <p className="text-xs text-gray-500">
                      Payment status:{" "}
                      <span className="font-semibold text-emerald-600">
                        {b.paymentStatus}
                      </span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Earnings;
