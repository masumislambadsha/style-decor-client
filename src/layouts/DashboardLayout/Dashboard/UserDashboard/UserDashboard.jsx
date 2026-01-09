import React, { useEffect } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from "recharts";
import { ShoppingBag, Clock, CheckCircle, CreditCard, ArrowRight } from "lucide-react";
import useRole from "../../../../Hooks/useRole";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import StatCardSkeleton from "../../../../Components/Skeletons/StatCardSkeleton";
import TableSkeleton from "../../../../Components/Skeletons/TableSkeleton";

const containerVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, duration: 0.4, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const UserDashboard = () => {
  const { user } = useAuth();
  const [role] = useRole();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    document.title = "Style Decor | Dashboard";
  }, []);

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["user-bookings-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-6 sm:py-8 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header Skeleton */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 animate-pulse">
            <div>
              <div className="h-10 bg-base-300 rounded-lg w-64 mb-2"></div>
              <div className="h-5 bg-base-300 rounded-md w-48"></div>
            </div>
          </div>

          {/* Stats Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(4)].map((_, i) => (
              <StatCardSkeleton key={i} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chart Placeholder */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 h-[400px] animate-pulse">
              <div className="h-7 bg-base-300 rounded-lg w-48 mb-6"></div>
              <div className="h-[300px] bg-base-300 rounded-2xl w-full"></div>
            </div>
            {/* Quick Actions Placeholder */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 h-[400px] animate-pulse">
              <div className="h-7 bg-base-300 rounded-lg w-32 mb-6"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-16 bg-base-300 rounded-2xl w-full"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Table Skeleton */}
          <TableSkeleton />
        </div>
      </div>
    );
  }

  const normalizedRole = (role || "user").toLowerCase();
  const isAdmin = normalizedRole.includes("admin");
  const isDecorator = normalizedRole.includes("decorator");

  // Calculate Stats
  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === "pending_payment").length,
    active: bookings.filter(b => ["assigned", "assigned_pending"].includes(b.status)).length,
    completed: bookings.filter(b => b.status === "completed").length,
  };

  // Chart Data
  const chartData = [
    { name: "Pending", count: stats.pending, color: "#f59e0b" },
    { name: "Active", count: stats.active, color: "#3b82f6" },
    { name: "Completed", count: stats.completed, color: "#10b981" },
  ];

  const statCards = [
    { label: "Total Bookings", value: stats.total, icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-500/10" },
    { label: "Pending Payment", value: stats.pending, icon: Clock, color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-500/10" },
    { label: "Active Services", value: stats.active, icon: CreditCard, color: "text-indigo-500", bg: "bg-indigo-100 dark:bg-indigo-500/10" },
    { label: "Completed", value: stats.completed, icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-500/10" },
  ];

  return (
    <div className="min-h-screen py-6 sm:py-8 px-4 ">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
              Hello, {user?.displayName || "User"} 👋
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Here's what's happening with your bookings.
            </p>
          </div>
          {isAdmin && (
            <Link to="/dashboard/admin/analytics" className="btn bg-[#ff6a4a] hover:bg-black text-white border-none shadow-lg">
              View Admin Analytics
            </Link>
          )}
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {statCards.map((stat, i) => (
            <motion.div key={i} variants={cardVariants} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4 transition-all hover:shadow-md">
              <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Booking Status Overview</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.1} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                  <Tooltip
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', backgroundColor: '#1f2937', color: '#fff' }}
                  />
                  <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={40}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Recent Activity / Quick Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col"
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Quick Actions</h3>
            <div className="space-y-4 flex-1">
              <Link to="/services" className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-[#ff6a4a]/10 transition-colors group">
                <span className="font-medium text-gray-700 dark:text-gray-300">Book New Service</span>
                <ArrowRight size={18} className="text-[#ff6a4a] transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/dashboard/bookings" className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-[#ff6a4a]/10 transition-colors group">
                <span className="font-medium text-gray-700 dark:text-gray-300">Manage Bookings</span>
                <ArrowRight size={18} className="text-[#ff6a4a] transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/dashboard/profile" className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-[#ff6a4a]/10 transition-colors group">
                <span className="font-medium text-gray-700 dark:text-gray-300">Account Settings</span>
                <ArrowRight size={18} className="text-[#ff6a4a] transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="mt-8 p-4 rounded-2xl bg-linear-to-br from-[#ff6a4a] to-[#ff8e75] text-white">
              <p className="text-xs font-bold uppercase tracking-wider opacity-80">Support</p>
              <h4 className="font-bold mt-1">Need help with a project?</h4>
              <p className="text-sm mt-2 opacity-90">Our decorators are ready to assist you.</p>
              <Link to={'/contact'}>
              <button className="mt-4 w-full py-2 bg-white text-[#ff6a4a] rounded-xl font-bold text-sm shadow-md hover:scale-105 transition-transform">
                Contact Support
              </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Recent Bookings Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Recent Bookings</h3>
            <Link to="/dashboard/bookings" className="text-sm font-semibold text-[#ff6a4a] hover:underline">
              View All
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {bookings.slice(0, 5).map((b, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-800 dark:text-gray-200">{b.serviceName}</p>
                      <p className="text-xs text-gray-500">{b.location}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {new Date(b.bookingDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border
                        ${b.status === 'completed' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                          b.status === 'pending_payment' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                          'bg-blue-100 text-blue-700 border-blue-200'}`}
                      >
                        {b.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-gray-800 dark:text-white">
                      {b.cost} BDT
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {bookings.length === 0 && (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="text-gray-400" size={30} />
              </div>
              <p className="text-gray-500 dark:text-gray-400">No bookings yet. Start decorating!</p>
              <Link to="/services" className="btn btn-sm mt-4 bg-[#ff6a4a] text-white border-none rounded-xl">
                Explore Services
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;
