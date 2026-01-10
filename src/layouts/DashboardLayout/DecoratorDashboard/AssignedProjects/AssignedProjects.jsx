import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../../Components/Spinner/LoadingSpinner";
const statusColors = {
  pending_payment: "bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20",
  assigned: "bg-sky-100 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-200 dark:border-sky-500/20",
  planning: "bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20",
  materials_prepared: "bg-violet-100 dark:bg-violet-500/10 text-violet-700 dark:text-violet-400 border-violet-200 dark:border-violet-500/20",
  on_the_way: "bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/20",
  setup_in_progress: "bg-fuchsia-100 dark:bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-400 border-fuchsia-200 dark:border-fuchsia-500/20",
  completed: "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20",
  cancelled: "bg-rose-100 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-500/20",
};
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.05, duration: 0.25, ease: "easeOut" },
  }),
};
const getNextStatus = (current) => {
  switch (current) {
    case "assigned":
      return "planning";
    case "planning":
      return "materials_prepared";
    case "materials_prepared":
      return "on_the_way";
    case "on_the_way":
      return "setup_in_progress";
    case "setup_in_progress":
      return "completed";
    default:
      return null;
  }
};
const getNextLabel = (nextStatus) => {
  switch (nextStatus) {
    case "planning":
      return "Move to Planning Phase";
    case "materials_prepared":
      return "Mark Materials Prepared";
    case "on_the_way":
      return "On the Way to Venue";
    case "setup_in_progress":
      return "Setup in Progress";
    case "completed":
      return "Mark as Completed";
    default:
      return "";
  }
};
const AssignedProjects = () => {
    useEffect(() => {
    document.title = "Style Decor | Assigned Projects";
  }, []);
  const axiosSecure = useAxiosSecure();
  const [updatingId, setUpdatingId] = useState(null);
  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["decorator-bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorator/bookings");
      return res.data;
    },
  });
  const handleUpdateStatus = async (booking) => {
    const nextStatus = getNextStatus(booking.status);
    if (!nextStatus) return;
    const nextLabel = getNextLabel(nextStatus);
    const result = await Swal.fire({
      title: "Update project status?",
      text: `Do you want to move this project to "${nextLabel}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, update",
      cancelButtonText: "Cancel",
    });
    if (!result.isConfirmed) return;
    try {
      setUpdatingId(booking._id);
      await axiosSecure.patch(`/bookings/${booking._id}/status`, {
        status: nextStatus,
      });
      await Swal.fire({
        icon: "success",
        title: "Status updated",
        text: `Project is now in "${nextLabel}".`,
        timer: 1900,
        showConfirmButton: true,
      });
      refetch();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update status", "error");
    } finally {
      setUpdatingId(null);
    }
  };
  if (isLoading) {
     return (
      <LoadingSpinner/>
    );
  }
  if (!bookings.length) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-6 sm:py-8 px-4">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
              My Assigned Projects
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              All bookings where you are the assigned decorator will appear here.
            </p>
          </div>
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-md p-8 sm:p-12 text-center"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
          >
            <div className="text-4xl sm:text-6xl mb-4 text-gray-300 dark:text-gray-700">🗓️</div>
            <p className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-200">
              No assigned projects yet
            </p>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Once an admin assigns you to a booking, you'll see it here.
            </p>
          </motion.div>
        </motion.div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 sm:py-8 px-4">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <motion.div
          className="text-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            My Assigned Projects
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1">
            Total: {bookings.length} project{bookings.length !== 1 && "s"}
          </p>
        </motion.div>
        <AnimatePresence>
          <div className="space-y-4 sm:space-y-6">
            {bookings.map((b, idx) => {
              const statusKey = b.status || "assigned";
              const badgeClass =
                statusColors[statusKey] ||
                "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700";
              const dateLabel = b.bookingDate
                ? new Date(b.bookingDate).toLocaleDateString("en-GB")
                : "Not set";
              const nextStatus = getNextStatus(statusKey);
              const nextLabel = getNextLabel(nextStatus);
              const isUpdating = updatingId === b._id;
              return (
                <motion.div
                  key={b._id}
                  className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800 overflow-hidden"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  custom={idx}
                  whileHover={{ y: -2, scale: 1.01 }}
                >
                  <div className="bg-[#ff6a4a] text-white px-4 sm:px-5 py-3 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
                    <h3 className="text-lg sm:text-xl font-bold">
                      Project #{idx + 1}
                    </h3>
                    <span
                      className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold border ${badgeClass}`}
                    >
                      {statusKey
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase())}
                    </span>
                  </div>
                  <div className="p-4 sm:p-5">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
                      <div className="lg:col-span-2 space-y-4">
                        <div>
                          <h4 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                            {b.serviceName || "Decoration Service"}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-0.5">
                            Event date: {dateLabel}
                          </p>
                          {b.userName && (
                            <p className="text-gray-500 dark:text-gray-500 text-xs sm:text-xs mt-1">
                              Client: <span className="text-gray-700 dark:text-gray-300 font-medium">{b.userName}</span> ({b.userEmail})
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex items-start gap-2">
                            <CalendarDays className="w-4 h-4 text-gray-500 mt-0.5" />
                            <div>
                              <p className="text-xs font-medium text-gray-500 mb-1">
                                Booking created
                              </p>
                              <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm">
                                {b.createdAt
                                  ? new Date(b.createdAt).toLocaleString()
                                  : "N/A"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                            <div>
                              <p className="text-xs font-medium text-gray-500 mb-1">
                                Location
                              </p>
                              <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm">
                                {b.location || "Not provided"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm md:text-base">
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Budget: </span>
                            <span className="font-bold text-white px-2 py-1 rounded-xl sm:rounded-2xl bg-[#ff6a4a]">
                              {b.cost
                                ? `${b.cost.toLocaleString()} BDT`
                                : "N/A"}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500 dark:text-gray-400">Payment: </span>
                            <span className="font-semibold capitalize text-gray-700 dark:text-gray-200">
                              {b.paymentStatus || "paid"}
                            </span>
                          </div>
                          {b.trackingId && (
                            <div>
                              <span className="text-gray-500 dark:text-gray-400">Tracking: </span>
                              <span className="font-mono text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                                {b.trackingId}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col justify-center items-center gap-4">
                        <motion.div
                          className="h-20 sm:w-24 sm:h-24 bg-[#ff6a4a]/5 dark:bg-[#ff6a4a]/10 border-2 border-dashed border-[#ff6a4a]/40 rounded-xl sm:rounded-2xl flex items-center justify-center text-xl sm:text-3xl text-[#ff6a4a]/60 w-full"
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.25, delay: 0.05 }}
                        >
                          🎨
                        </motion.div>
                        <div className="w-full flex flex-col gap-2">
                          {nextStatus ? (
                            <button
                              onClick={() => handleUpdateStatus(b)}
                              disabled={isUpdating}
                              className="w-full bg-[#ff6a4a] hover:bg-[#b62302] text-white font-semibold py-2 rounded-lg shadow-sm flex items-center justify-center gap-2 text-xs sm:text-sm transition disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                              {isUpdating ? "Updating..." : nextLabel}
                            </button>
                          ) : (
                            <button
                              disabled
                              className="w-full bg-emerald-500 text-white font-semibold py-2 rounded-lg shadow-sm text-xs sm:text-sm cursor-not-allowed"
                            >
                              {statusKey === "completed"
                                ? "Completed"
                                : "No actions available"}
                            </button>
                          )}
                          <a
                            href={`/services/${b.serviceId}`}
                            className="w-full bg-gray-900 text-white hover:bg-black font-semibold py-2 rounded-lg shadow-sm flex items-center justify-center gap-2 text-xs sm:text-sm transition cursor-pointer"
                          >
                            View project details
                            <ArrowRight className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
export default AssignedProjects;