import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../../Components/Spinner/LoadingSpinner";
motion

const StatusBadge = ({ status }) => {
  const base =
    "px-2 sm:px-3 py-1 rounded-full text-xs font-semibold border inline-flex items-center justify-center";
  if (status === "assigned") {
    return (
      <span className={`${base} bg-green-100 text-green-700 border-green-300`}>
        Assigned
      </span>
    );
  }
  if (status === "cancelled") {
    return (
      <span className={`${base} bg-red-100 text-red-600 border-red-300`}>
        Cancelled
      </span>
    );
  }
  return (
    <span className={`${base} bg-yellow-100 text-yellow-700 border-yellow-300`}>
      {status?.replace("_", " ") || "Pending"}
    </span>
  );
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

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedDecorator, setSelectedDecorator] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const {
    data: bookings = [],
    isLoading: bookingsLoading,
    refetch: refetchBookings,
  } = useQuery({
    queryKey: ["bookings-admin"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings");
      return res.data;
    },
  });

  const { data: decorators = [], isLoading: decoratorsLoading } = useQuery({
    queryKey: ["decorators-active"],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorators?status=active");
      return res.data;
    },
  });

  const handleCancelBooking = async (id, isCancelled) => {
    if (isCancelled) return;

    const result = await Swal.fire({
      title: "Cancel this booking?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, cancel it",
      cancelButtonText: "No, keep it",
    });

    if (!result.isConfirmed) return;

    try {
      setActionLoading(true);
      await axiosSecure.patch(`/bookings/${id}/cancel`);
      await refetchBookings();
      await Swal.fire({
        icon: "success",
        title: "Cancelled",
        text: "The booking has been cancelled.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to cancel booking", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const openAssignModal = (booking) => {
    setSelectedBooking(booking);
    setSelectedDecorator(null);
  };

  const handleConfirmAssign = async () => {
    if (!selectedBooking || !selectedDecorator) return;
    try {
      setActionLoading(true);
      await axiosSecure.patch(`/bookings/${selectedBooking._id}/assign`, {
        decoratorId: selectedDecorator._id,
        decoratorName: selectedDecorator.name,
        decoratorEmail: selectedDecorator.email,
      });
      await refetchBookings();
      toast.success("Decorator assigned");
      setSelectedBooking(null);
      setSelectedDecorator(null);
    } catch (err) {
      console.error(err);
      alert("Failed to assign decorator");
    } finally {
      setActionLoading(false);
    }
  };

  const visibleBookings = bookings.filter((b) =>
    ["assigned_pending", "assigned", "cancelled"].includes(b.status)
  );

  if (bookingsLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 px-4">
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
            Manage Bookings
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-[#ff6a4a] mt-2">
            Only bookings with completed payment or cancelled status are shown.
          </p>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Total: {visibleBookings.length} booking
            {visibleBookings.length !== 1 && "s"}
          </p>
        </motion.div>

        {visibleBookings.length === 0 && (
          <motion.div
            className="bg-white rounded-xl sm:rounded-2xl shadow-md p-8 sm:p-12 text-center"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
          >
            <div className="text-4xl sm:text-6xl mb-4 text-gray-300">📅</div>
            <p className="text-lg sm:text-xl font-semibold text-gray-700">
              No bookings to manage
            </p>
            <p className="text-gray-500 mt-1">
              New paid bookings will appear here.
            </p>
          </motion.div>
        )}

        <AnimatePresence>
          <div className="space-y-4 sm:space-y-6">
            {visibleBookings.map((b, index) => {
              const isAssigned = b.status === "assigned";
              const isCancelled = b.status === "cancelled";

              return (
                <motion.div
                  key={b._id}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  custom={index}
                  whileHover={{ y: -2, scale: 1.01 }}
                >
                  <div className="bg-[#ff6a4a] text-white px-4 sm:px-5 py-3 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
                    <h3 className="text-lg sm:text-xl font-bold">
                      Booking #{index + 1}
                    </h3>
                    <StatusBadge status={b.status} />
                  </div>

                  <div className="p-4 sm:p-5">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
                      <div className="lg:col-span-2 space-y-4">
                        <div>
                          <h4 className="text-xl sm:text-2xl font-bold text-gray-800">
                            {b.serviceName}
                          </h4>
                          <p className="text-gray-600 text-xs sm:text-sm mt-0.5">
                            Event date:{" "}
                            {b.bookingDate
                              ? new Date(b.bookingDate).toLocaleDateString("en-GB")
                              : "N/A"}
                          </p>
                          <p className="text-gray-500 text-xs mt-1">
                            Booked by: {b.userEmail}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">
                              Location
                            </p>
                            <p className="text-gray-700 text-xs sm:text-sm wrap-break-word">
                              {b.location || "Not specified"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">
                              Decorator
                            </p>
                            <p className="font-semibold text-xs sm:text-sm">
                              {b.decoratorName || "Not assigned"}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm md:text-base">
                          <div>
                            <span className="text-gray-500">Cost: </span>
                            <span className="font-bold text-white px-2 py-1 rounded-xl sm:rounded-2xl bg-[#ff6a4a]">
                              {b.cost} BDT
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Payment: </span>
                            <span className="font-semibold capitalize">
                              {b.paymentStatus || "paid"}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Status: </span>
                            <span className="font-mono font-semibold text-white px-2 py-1 rounded-xl sm:rounded-2xl bg-gray-800">
                              {b.status === "assigned" ? "Decorator Assigned" : "Pending"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-center items-center gap-4">
                        <motion.div
                          className=" sm:w-24 lg:w-28 h-20 sm:h-24 lg:h-28 bg-[#ff6a4a]/5 border-2 border-dashed border-[#ff6a4a]/40 rounded-xl sm:rounded-2xl flex items-center justify-center text-2xl sm:text-3xl text-[#ff6a4a]/60 w-full"
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.25, delay: 0.05 }}
                        >
                          🎉
                        </motion.div>

                        <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-3">
                          {!isAssigned && (
                            <motion.button
                              whileTap={{ scale: 0.97 }}
                              onClick={() => handleCancelBooking(b._id, isCancelled)}
                              disabled={actionLoading || isCancelled}
                              className={
                                isCancelled
                                  ? "flex-1 bg-red-500 text-white font-semibold py-2 rounded-lg shadow-sm text-xs sm:text-sm cursor-not-allowed opacity-80"
                                  : "flex-1 bg-purple-500 text-white hover:bg-purple-700 font-semibold py-2 rounded-lg shadow-sm text-xs sm:text-sm transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                              }
                            >
                              {isCancelled ? "Canceled" : "Cancel"}
                            </motion.button>
                          )}

                          {isAssigned ? (
                            <button className="flex-1 bg-green-500 text-white font-semibold py-2 rounded-lg shadow-sm text-xs sm:text-sm cursor-not-allowed">
                              Assigned
                            </button>
                          ) : isCancelled ? null : (
                            <motion.button
                              whileTap={{ scale: 0.97 }}
                              onClick={() => openAssignModal(b)}
                              disabled={actionLoading}
                              className="flex-1 bg-[#ff6a4a] hover:bg-[#b62302] text-white font-semibold py-2 rounded-lg shadow-sm text-xs sm:text-sm transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                              Assign Decorator
                            </motion.button>
                          )}
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

      {selectedBooking && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <motion.div
            className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-lg p-4 sm:p-6 space-y-4"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg sm:text-xl font-bold">Assign Decorator</h3>
              <button
                onClick={() => setSelectedBooking(null)}
                className="btn btn-ghost btn-sm btn-circle"
              >
                <X size={18} />
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-3 sm:p-4 text-xs sm:text-sm space-y-1">
              <p className="font-semibold">{selectedBooking.serviceName}</p>
              <p className="text-gray-500">User: {selectedBooking.userEmail}</p>
              <p className="text-gray-500">
                Event date:{" "}
                {selectedBooking.bookingDate
                  ? new Date(selectedBooking.bookingDate).toLocaleDateString("en-GB")
                  : "N/A"}
              </p>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto border rounded-xl">
              {decoratorsLoading ? (
                <LoadingSpinner/>
              ) : decorators.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No active decorators found.
                </div>
              ) : (
                decorators.map((d) => (
                  <button
                    key={d._id}
                    type="button"
                    onClick={() => setSelectedDecorator(d)}
                    className={`w-full flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm border-b last:border-b-0 hover:bg-gray-50 ${
                      selectedDecorator?._id === d._id
                        ? "bg-[#ff6a4a]/10 border-l-4 border-l-[#ff6a4a]"
                        : ""
                    }`}
                  >
                    <div>
                      <div className="font-semibold">{d.name}</div>
                      <div className="text-gray-500">
                        {d.email} • {d.specialty || "Decorator"}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">
                      Rating: {d.rating ?? 5}
                    </div>
                  </button>
                ))
              )}
            </div>

            <div className="flex justify-end gap-2 sm:gap-3 pt-2">
              <button
                onClick={() => setSelectedBooking(null)}
                className="btn btn-ghost bg-purple-500 hover:bg-purple-800 py-6 text-white "
              >
                Close
              </button>
              <button
                onClick={handleConfirmAssign}
                disabled={!selectedDecorator || actionLoading}
                className="btn btn-ghost bg-[#ff6a4a] text-white py-6 disabled:btn-disabled "
              >
                Confirm Assign
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
