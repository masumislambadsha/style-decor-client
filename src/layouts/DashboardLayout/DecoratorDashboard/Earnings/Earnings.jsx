import React, { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { CreditCard, CalendarDays, Briefcase } from "lucide-react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../../Components/Spinner/LoadingSpinner";
const SHARE = 0.3;

const Earnings = () => {
    useEffect(() => {
    document.title = "Style Decor | Earnings";
  }, []);
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

    const avg = completedBookings.length > 0 ? sum / completedBookings.length : 0;

    return {
      completed: completedBookings,
      totalEarnings: sum,
      avgPerProject: avg,
    };
  }, [bookings]);

  if (isLoading) {
     return (
      <LoadingSpinner/>
    );
  }
   if (!bookings.length) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white pt-7">
              Earnings & Incentives
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              You haven't earned any rewards yet.
            </p>
          </div>

          <motion.div
            className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-md p-8 sm:p-12 text-center"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
          >
            <div className="text-4xl sm:text-6xl mb-4 text-gray-300 dark:text-gray-700">💰</div>
            <p className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-200">
              No earnings to display
            </p>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Complete assigned projects to see your earnings accumulate here.
            </p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 sm:py-8 px-[20px] ">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white pt-7">
            Earnings & Revenue
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Your current share is <span className="text-[#ff6a4a] font-bold">30%</span> per project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <motion.div
            className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800"
            whileHover={{ y: -5 }}
          >
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-4">
              <CreditCard size={24} />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Total Rewards</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mt-1">
              {totalEarnings.toLocaleString()} BDT
            </h3>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800"
            whileHover={{ y: -5 }}
          >
            <div className="w-12 h-12 bg-sky-100 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-xl flex items-center justify-center mb-4">
              <Briefcase size={24} />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Projects Done</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mt-1">
              {completed.length}
            </h3>
          </motion.div>

          <motion.div
            className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800"
            whileHover={{ y: -5 }}
          >
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center mb-4">
              <CalendarDays size={24} />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Avg per Project</p>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mt-1">
              {avgPerProject.toFixed(0)} BDT
            </h3>
          </motion.div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden mb-10">
          <div className="p-5 border-b border-gray-50 dark:border-gray-800">
            <h3 className="font-bold text-gray-800 dark:text-white">Recent Payouts</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                  <th className="bg-transparent border-0">Project</th>
                  <th className="bg-transparent border-0">Client</th>
                  <th className="bg-transparent border-0">Total Budget</th>
                  <th className="bg-transparent border-0">Your Share (30%)</th>
                </tr>
              </thead>
              <tbody>
                {completed.map((b) => (
                  <tr key={b._id} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="font-medium text-gray-800 dark:text-gray-200">
                      {b.serviceName}
                    </td>
                    <td className="text-gray-600 dark:text-gray-400">
                      {b.userName}
                    </td>
                    <td className="text-gray-600 dark:text-gray-400">
                      {b.cost?.toLocaleString()} BDT
                    </td>
                    <td className="font-bold text-[#ff6a4a]">
                      {(b.cost * SHARE).toLocaleString()} BDT
                    </td>
                  </tr>
                ))}
                {completed.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-gray-500">
                      No completed payouts yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Earnings;
