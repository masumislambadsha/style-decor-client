import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../../Components/Spinner/LoadingSpinner";
motion
const Analytics = () => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/analytics");
      return res.data;
    },
  });

  if (isLoading) {
   return (
      <LoadingSpinner/>
    );
  }

  const {
    totalRevenue = 0,
    totalUsers = 0,
    totalBookings = 0,
    serviceDemand = [],
  } = data || {};

  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * i, duration: 0.4, ease: "easeOut" },
    }),
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6"
      >
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Analytics</h2>
        <p className="text-xs sm:text-sm text-gray-500">
          Overview of revenue, users, bookings and service demand.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
        {[
          {
            label: "Total Revenue",
            value: `${totalRevenue} $`,
            accent: "from-orange-500 to-pink-500",
          },
          {
            label: "Total Users",
            value: totalUsers,
            accent: "from-sky-500 to-indigo-500",
          },
          {
            label: "Total Bookings",
            value: totalBookings,
            accent: "from-emerald-500 to-lime-500",
          },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            custom={i}
            variants={cardVariant}
            initial="hidden"
            animate="show"
            whileHover={{
              y: -6,
              boxShadow: "0 18px 45px rgba(15,23,42,0.18)",
            }}
            className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-linear-to-br from-slate-900 via-slate-900 to-slate-950 text-white p-px"
          >
            <div className="absolute inset-0 opacity-60 bg-linear-to-tr blur-xl pointer-events-none" />
            <div className="relative z-10 flex flex-col gap-2 h-full rounded-xl sm:rounded-2xl bg-slate-950/90 px-4 sm:px-5 py-3 sm:py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                {card.label}
              </p>
              <p className="text-2xl sm:text-3xl font-semibold">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>


      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        className="bg-white rounded-xl sm:rounded-2xl shadow-md border border-slate-100"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold">Service Demand</h3>
            <p className="text-xs sm:text-xs text-gray-500">
              Most frequently booked services.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-xs uppercase text-gray-500">
                <th>#</th>
                <th>Service Name</th>
                <th>Bookings</th>
              </tr>
            </thead>
            <tbody>
              {serviceDemand.map((s, i) => (
                <motion.tr
                  key={s._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                  whileHover={{ backgroundColor: "rgba(248,250,252,1)" }}
                  className="text-xs sm:text-sm"
                >
                  <td>{i + 1}</td>
                  <td className="font-medium">{s.service_name}</td>
                  <td>{s.count}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;
