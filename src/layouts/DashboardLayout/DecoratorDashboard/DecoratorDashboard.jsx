import React, { useEffect, useMemo } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import {
  Briefcase, CheckCircle2, AlertCircle, TrendingUp, Calendar, ArrowRight, User
} from "lucide-react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import StatCardSkeleton from "../../../Components/Skeletons/StatCardSkeleton";
import TableSkeleton from "../../../Components/Skeletons/TableSkeleton";

const SHARE = 0.3; // Decorator gets 30% share

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

const DecoratorDashboard = () => {
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    document.title = "Style Decor | Decorator Dashboard";
  }, []);

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["decorator-bookings-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorator/bookings");
      return res.data;
    },
  });

  const stats = useMemo(() => {
    const completed = bookings.filter(b => b.status === "completed");
    const pending = bookings.filter(b => !["completed", "cancelled"].includes(b.status));

    const totalEarnings = completed.reduce((acc, b) => {
      const cost = Number(b.cost) || 0;
      return acc + (cost * SHARE);
    }, 0);

    return {
      total: bookings.length,
      completed: completed.length,
      pending: pending.length,
      earnings: totalEarnings,
    };
  }, [bookings]);

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

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Table Skeleton */}
            <div className="lg:col-span-3">
              <TableSkeleton />
            </div>
            {/* Chart Placeholder */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 h-[400px] animate-pulse">
              <div className="h-7 bg-base-300 rounded-lg w-48 mb-6 mx-auto"></div>
              <div className="h-[200px] w-[200px] bg-base-300 rounded-full mx-auto mb-6"></div>
              <div className="h-20 bg-base-300 rounded-2xl w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Chart Data
  const chartData = [
    { name: "Completed", value: stats.completed, color: "#10b981" },
    { name: "Ongoing", value: stats.pending, color: "#3b82f6" },
    { name: "Others", value: stats.total - stats.completed - stats.pending, color: "#9ca3af" },
  ].filter(d => d.value > 0);

  const statCards = [
    { label: "Assigned Projects", value: stats.total, icon: Briefcase, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-500/10" },
    { label: "Earnings (30% Share)", value: `${stats.earnings.toLocaleString()} BDT`, icon: TrendingUp, color: "text-[#ff6a4a]", bg: "bg-[#ff6a4a]/10" },
    { label: "Active Tasks", value: stats.pending, icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-500/10" },
    { label: "Completed", value: stats.completed, icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-500/10" },
  ];

  return (
    <div className="min-h-screen py-6 sm:py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
              Decorator Overview
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Track your earnings and project progress in real-time.
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/dashboard/decorator/projects" className="btn bg-[#ff6a4a] hover:bg-black text-white border-none shadow-lg rounded-xl">
              Projects List
            </Link>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {statCards.map((stat, i) => (
            <motion.div key={i} variants={cardVariants} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4">
              <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">{stat.label}</p>
                <p className="text-xl sm:text-2xl font-black text-gray-800 dark:text-white mt-1">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Recent Projects Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-3 bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Upcoming Projects</h3>
              <Link to="/dashboard/decorator/projects" className="text-sm font-semibold text-[#ff6a4a] hover:underline">
                View Schedule
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-widest">
                    <th className="px-6 py-4">Client / Service</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {bookings.filter(b => b.status !== 'completed').slice(0, 5).map((b, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/20 transition-colors cursor-pointer group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <User size={18} className="text-gray-400" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-800 dark:text-gray-200 group-hover:text-[#ff6a4a] transition-colors">{b.userName || "Client"}</p>
                            <p className="text-xs text-gray-500">{b.serviceName}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-gray-600 dark:text-gray-400 font-medium">
                        {b.location}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400">
                          {b.status.replace('_', ' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {bookings.length === 0 && (
                <div className="py-20 text-center text-gray-400">
                  No projects assigned.
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Column: Distribution & Quick Actions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Distribution Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col"
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Project Distribution</h3>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ borderRadius: '16px', border: 'none', backgroundColor: '#1f2937', color: '#fff' }}
                    />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-bold text-gray-600 dark:text-gray-300">Earnings Goal</span>
                  <span className="text-xs font-bold text-[#ff6a4a]">Next Milestone: 10k</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((stats.earnings / 10000) * 100, 100)}%` }}
                    className="bg-[#ff6a4a] h-full"
                  />
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col"
            >
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Quick Actions</h3>
              <div className="space-y-4">
                <Link to="/dashboard/profile" className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-[#ff6a4a]/10 transition-colors group">
                  <span className="font-medium text-gray-700 dark:text-gray-300">My Profile</span>
                  <ArrowRight size={18} className="text-[#ff6a4a] transform group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/dashboard/bookings" className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-[#ff6a4a]/10 transition-colors group">
                  <span className="font-medium text-gray-700 dark:text-gray-300">My Personal Bookings</span>
                  <ArrowRight size={18} className="text-[#ff6a4a] transform group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/dashboard/payment-history" className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-[#ff6a4a]/10 transition-colors group">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Payment History</span>
                  <ArrowRight size={18} className="text-[#ff6a4a] transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecoratorDashboard;
