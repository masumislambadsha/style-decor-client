import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Calendar, MapPin, User, Mail } from "lucide-react";
import { motion } from "framer-motion";
import LoadingSpinner from "../../Components/Spinner/LoadingSpinner";
motion
const ServiceDetails = () => {
   useEffect(() => {
    document.title = "Style Decor | Service Details";
  }, []);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const { data: service, isLoading } = useQuery({
    queryKey: ["service", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/services/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to book");
      return;
    }
    const bookingData = {
      serviceId: service._id,
      serviceName: service.service_name,
      userEmail: user.email,
      userName: user.displayName,
      bookingDate: e.target.date.value,
      location: e.target.location.value,
      cost: service.cost,
      status: "pending_payment",
      createdAt: new Date(),
    };
    try {
      setBookingLoading(true);
      const res = await axiosSecure.post("/bookings", bookingData);
      if (res.data.insertedId) {
        toast.success("Booking request sent successfully!");
        setIsModalOpen(false);
        navigate("/dashboard/bookings");
      } else {
        toast.error("Failed to create booking");
      }
    } catch (err) {
      console.error("Booking error:", err);
      if (err.response?.status === 401) {
        toast.error("Please login again to book");
        navigate("/login");
      } else if (err.response?.status === 403) {
        toast.error("You don't have permission to book");
      } else {
        toast.error("Booking failed. Please try again.");
      }
    } finally {
      setBookingLoading(false);
    }
  };
  if (isLoading)
     return (
      <LoadingSpinner/>
    );
  if (!service) return <p className="text-center py-20">Service not found</p>;
  return (
    <div className="min-h-screen bg-base-200 py-10 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-14 items-center">
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            src={service.image}
            alt={service.service_name}
            className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-2xl sm:rounded-3xl shadow-xl border"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 sm:space-y-8"
          >
            <h1 className="text-3xl sm:text-4xl md:text-[55px] font-bold text-base-content leading-tight">
              {service.service_name}
            </h1>
            <p className="text-base sm:text-lg text-base-content/70 leading-relaxed">
              {service.description}
            </p>
            <div className="bg-base-100 rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 border border-base-300 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#ff6a4a]">
                  {service.cost?.toLocaleString() || 0} BDT
                </span>
                <span className="text-base-content/60 text-sm sm:text-lg">
                  per {service.unit}
                </span>
              </div>
              <div className="badge badge-sm sm:badge-lg badge-outline text-base-content/80">
                {service.service_category}
              </div>
              <button
                onClick={() =>
                  user ? setIsModalOpen(true) : navigate("/login")
                }
                className="btn bg-[#ff6a4a] hover:bg-black text-white font-bold w-full h-12 sm:h-14 text-base sm:text-xl rounded-lg sm:rounded-full shadow-md transition-all"
                disabled={!service.isActive}
              >
                {!service.isActive
                  ? "Service Unavailable"
                  : user
                  ? "Book Now"
                  : "Login to Book"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-base-100 text-base-content rounded-2xl sm:rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-10 relative"
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-base-content/40 hover:text-base-content"
            >
              ✕
            </button>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">
              Complete Your Booking
            </h2>
            <form onSubmit={handleBooking} className="space-y-6">
              <div className="bg-base-200 p-4 rounded-xl">
                <p className="font-semibold text-base-content">
                  Service: {service.service_name}
                </p>
                <p className="text-[#ff6a4a] font-bold">
                  {service.cost?.toLocaleString() || 0} BDT
                </p>
              </div>
              <div>
                <label className="flex items-center gap-3 mb-2 font-medium text-base-content/80">
                  <User size={18} sm:size={20} /> Name
                </label>
                <input
                  type="text"
                  value={user?.displayName || user?.name || ""}
                  readOnly
                  className="input outline-0 input-bordered w-full bg-base-200 text-base-content/60 text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="flex items-center gap-3 mb-2 font-medium text-base-content/80">
                  <Mail size={18} sm:size={20} /> Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="input outline-0 input-bordered w-full bg-base-200 text-base-content/60 text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="flex items-center gap-3 mb-2 font-medium text-base-content/80">
                  <Calendar size={18} sm:size={20} /> Preferred Date
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  className="input outline-0 input-bordered w-full bg-base-100 text-base-content text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="flex items-center gap-3 mb-2 font-medium text-base-content/80">
                  <MapPin size={18} sm:size={20} /> Location
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  placeholder="Your full address"
                  className="input outline-0 input-bordered w-full bg-base-100 text-base-content text-xs sm:text-sm"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={bookingLoading}
                  className="btn bg-[#ff6a4a] hover:bg-black text-white flex-1 h-10 sm:h-12 text-sm sm:text-lg flex items-center justify-center gap-2"
                >
                  {bookingLoading && <span className="loading loading-spinner loading-xs"></span>}
                  {bookingLoading ? "Confirming..." : "Confirm Booking"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-outline flex-1 h-10 sm:h-12 text-sm sm:text-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
export default ServiceDetails;