import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import { Calendar, MapPin, User, Mail } from "lucide-react";
import { motion } from "framer-motion";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: service, isLoading } = useQuery({
    queryKey: ["service", id],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/services/${id}`);
      return res.data;
    },
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
      status: "pending",
      createdAt: new Date(),
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/bookings`, bookingData);
      toast.success("Booking request sent!");
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Booking failed", err);
    }
  };

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg text-[#ff6a4a]"></div>
      </div>
    );

  if (!service) return <p className="text-center py-20">Service not found</p>;

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

          {/* Service Image */}
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            src={service.image}
            alt={service.service_name}
            className="w-full h-96 object-cover rounded-3xl shadow-xl border"
          />

          {/* Service Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
              {service.service_name}
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              {service.description}
            </p>

            {/* Pricing Card */}
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-4xl font-black text-[#ff6a4a]">
                  ৳{service.cost.toLocaleString()}
                </span>
                <span className="text-gray-500 text-lg">per {service.unit}</span>
              </div>

              <div className="badge badge-lg badge-outline text-gray-700">
                {service.service_category}
              </div>

              <button
                onClick={() => (user ? setIsModalOpen(true) : navigate("/login"))}
                className="btn bg-[#ff6a4a] hover:bg-black text-white font-bold w-full h-14 text-xl rounded-full shadow-md transition-all"
              >
                {user ? "Book Now" : "Login to Book"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-10 relative"
          >
            <h2 className="text-3xl font-extrabold mb-8">
              Complete Your Booking
            </h2>

            <form onSubmit={handleBooking} className="space-y-6">
              {/* Name */}
              <div>
                <label className="flex items-center gap-3 mb-2 font-medium text-gray-700">
                  <User size={20} /> Name
                </label>
                <input
                  type="text"
                  value={user?.displayName || ""}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-3 mb-2 font-medium text-gray-700">
                  <Mail size={20} /> Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>

              {/* Date */}
              <div>
                <label className="flex items-center gap-3 mb-2 font-medium text-gray-700">
                  <Calendar size={20} /> Preferred Date
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  className="input input-bordered w-full"
                />
              </div>

              {/* Location */}
              <div>
                <label className="flex items-center gap-3 mb-2 font-medium text-gray-700">
                  <MapPin size={20} /> Location
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  placeholder="Your full address"
                  className="input input-bordered w-full"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="btn bg-[#ff6a4a] hover:bg-black text-white flex-1 h-12 text-lg"
                >
                  Confirm Booking
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-outline flex-1 h-12 text-lg"
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
