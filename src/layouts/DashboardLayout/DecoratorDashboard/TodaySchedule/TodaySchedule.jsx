import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, MapPin, Clock } from "lucide-react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../../Components/Spinner/LoadingSpinner";
motion
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.05, duration: 0.25, ease: "easeOut" },
  }),
};

const TodaysSchedule = () => {
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["decorator-bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorator/bookings");
      return res.data;
    },
  });

  const todayStr = new Date().toISOString().slice(0, 10);
  const todaysBookings = bookings.filter(
    (b) => b.bookingDate && b.bookingDate.slice(0, 10) === todayStr
  );

  if (isLoading) {
     return (
      <LoadingSpinner/>
    );
  }

  if (!todaysBookings.length) {
    return (
      <div className="min-h-screen bg-gray-50 px-4">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
              Today's Schedule
            </h1>
            <p className="text-gray-500 mt-1">
              No events scheduled for today ({new Date().toLocaleDateString("en-GB")}).
            </p>
          </div>

          <motion.div
            className="bg-white rounded-xl sm:rounded-2xl shadow-md p-8 sm:p-12 text-center"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
          >
            <div className="text-4xl sm:text-6xl mb-4 text-gray-300">✅</div>
            <p className="text-lg sm:text-xl font-semibold text-gray-700">
              You have no projects today
            </p>
            <p className="text-gray-500 mt-1">
              When an event is booked for today, it will appear in your schedule.
            </p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-15 px-4">
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
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            Today's Schedule
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-[#ff6a4a] mt-2">
            Events scheduled for {new Date().toLocaleDateString("en-GB")}.
          </p>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Total: {todaysBookings.length} project{todaysBookings.length !== 1 && "s"}
          </p>
        </motion.div>

        <AnimatePresence>
          <div className="space-y-4 sm:space-y-5">
            {todaysBookings.map((b, idx) => (
              <motion.div
                key={b._id}
                className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 p-4 sm:p-5"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                custom={idx}
                whileHover={{ y: -2, scale: 1.01 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">
                      Today's project #{idx + 1}
                    </p>
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                      {b.serviceName || "Decoration Service"}
                    </h2>
                    {b.userName && (
                      <p className="text-sm text-gray-600">
                        Client: <span className="font-semibold">{b.userName}</span>
                      </p>
                    )}
                  </div>
                  <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-semibold border bg-emerald-50 text-emerald-700 border-emerald-200">
                    {b.status?.replace(/_/g, " ").toUpperCase() || "ASSIGNED"}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm mt-2">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-gray-500 text-xs">Event date</p>
                      <p className="font-medium text-gray-800">
                        {new Date(b.bookingDate).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-gray-500 text-xs">Time</p>
                      <p className="font-medium text-gray-800">
                        {b.eventTime || "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-gray-500 text-xs">Location</p>
                      <p className="font-medium text-gray-800">
                        {b.location || "Not provided"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 mt-4 text-xs sm:text-sm">
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {b.trackingId && (
                      <span className="px-2 sm:px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs sm:text-xs font-mono">
                        Tracking: {b.trackingId}
                      </span>
                    )}
                    {b.cost && (
                      <span className="px-2 sm:px-3 py-1 rounded-full bg-[#ff6a4a]/10 text-[#ff6a4a] text-xs sm:text-xs font-semibold">
                        Budget: {b.cost.toLocaleString()} BDT
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default TodaysSchedule;
