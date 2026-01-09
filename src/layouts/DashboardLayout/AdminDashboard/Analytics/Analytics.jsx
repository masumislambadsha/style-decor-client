import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { User, Briefcase, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../../Components/Spinner/LoadingSpinner";

const Analytics = () => {

    useEffect(()=>{
      document.title = "Style Decor | Analytics"
    },[])
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

  // Prepare data for charts
  const barChartData = serviceDemand.slice(0, 8).map(s => ({
    name: s.service_name.length > 15 ? s.service_name.substring(0, 15) + '...' : s.service_name,
    bookings: s.count
  }));

  const pieChartData = serviceDemand.slice(0, 5).map(s => ({
    name: s.service_name,
    value: s.count
  }));

  const COLORS = ['#ff6a4a', '#f97316', '#fb923c', '#fdba74', '#fed7aa'];

  return (
    <div className="space-y-6 sm:space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6"
      >
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Analytics</h2>
        <p className="text-xs sm:text-sm text-base-content/60">
          Overview of revenue, users, bookings and service demand.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {[
          {
            label: "Total Revenue",
            value: `${totalRevenue} $`,
            icon: TrendingUp,
            color: "text-[#ff6a4a]",
            bg: "bg-[#ff6a4a]/10",
          },
          {
            label: "Total Users",
            value: totalUsers,
            icon: User,
            color: "text-blue-500",
            bg: "bg-blue-100 dark:bg-blue-500/10",
          },
          {
            label: "Total Bookings",
            value: totalBookings,
            icon: Briefcase,
            color: "text-emerald-500",
            bg: "bg-emerald-100 dark:bg-emerald-500/10",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariant}
            initial="hidden"
            animate="show"
            className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4 transition-all hover:shadow-md"
          >
            <div className={`p-4 rounded-xl ${card.bg} ${card.color}`}>
              <card.icon size={24} />
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">{card.label}</p>
              <p className="text-xl sm:text-2xl font-black text-gray-800 dark:text-white mt-1">{card.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-base-100 rounded-xl sm:rounded-2xl shadow-md border border-base-300 p-6"
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-4">Service Bookings</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} fontSize={12} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookings" fill="#ff6a4a" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-base-100 rounded-xl sm:rounded-2xl shadow-md border border-base-300 p-6"
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-4">Top 5 Services Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        className="bg-base-100 rounded-xl sm:rounded-2xl shadow-md border border-base-300"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 pt-4 sm:pt-6 pb-3 sm:pb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold">Service Demand</h3>
            <p className="text-xs sm:text-xs text-base-content/60">
              Most frequently booked services.
            </p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-xs uppercase text-base-content/60">
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

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6"
      >
        <Link to="/dashboard/profile" className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between hover:border-[#ff6a4a]/50 transition-all group">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-500/10 text-blue-500">
              <User size={20} />
            </div>
            <span className="font-bold text-gray-700 dark:text-gray-300">My Profile</span>
          </div>
          <ArrowRight size={18} className="text-[#ff6a4a] transform group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link to="/dashboard/bookings" className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between hover:border-[#ff6a4a]/50 transition-all group">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-100 dark:bg-amber-500/10 text-amber-500">
              <Briefcase size={20} />
            </div>
            <span className="font-bold text-gray-700 dark:text-gray-300">My Personal Bookings</span>
          </div>
          <ArrowRight size={18} className="text-[#ff6a4a] transform group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link to="/dashboard/payment-history" className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-between hover:border-[#ff6a4a]/50 transition-all group">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 text-emerald-500">
              <TrendingUp size={20} />
            </div>
            <span className="font-bold text-gray-700 dark:text-gray-300">Payment History</span>
          </div>
          <ArrowRight size={18} className="text-[#ff6a4a] transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
};

export default Analytics;

