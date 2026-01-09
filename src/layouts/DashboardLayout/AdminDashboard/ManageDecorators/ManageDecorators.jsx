import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../../Components/Spinner/LoadingSpinner";

const StatusBadge = ({ status }) => {
  const key = status?.toLowerCase() || "inactive";

  const badgeStyles = {
    active: "bg-green-500/10 text-green-600 border-green-500/30",
    inactive: "bg-base-300/50 text-base-content/60 border-base-300",
    pending: "bg-[#ff6a4a]/10 text-[#ff6a4a] border-[#ff6a4a]/30",
  };
  motion

  const label = status
    ? status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Inactive";

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold border ${
        badgeStyles[key] || badgeStyles.inactive
      }`}
    >
      {label}
    </span>
  );
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.25,
      ease: "easeOut",
    },
  }),
  exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.2 } },
};

const ManageDecorators = () => {

  useEffect(()=>{
    document.title = "Style Decor | Manage Decorator"
  },[])
  const axiosSecure = useAxiosSecure();

  const {
    data: decorators = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["decorators-admin"],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorators");
      return res.data;
    },
  });

  const handleDeleteDecorator = async (decorator) => {
    const result = await Swal.fire({
      title: "Delete decorator?",
      html: `<strong>${decorator.name}</strong><br/>${decorator.email}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/decorators/${decorator._id}`);
      await refetch();
      await Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Decorator removed successfully",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete decorator", "error");
    }
  };

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="text-center mb-8">
          <motion.h1
            className="text-3xl md:text-4xl font-black text-base-content"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            Manage Decorators
          </motion.h1>
          <motion.p
            className="text-sm md:text-base text-base-content/60 mt-2"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.25, delay: 0.05 }}
          >
            View, manage and remove decorators from the platform.
          </motion.p>
          <motion.p
            className="text-base text-[#ff6a4a] mt-1 "
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.25, delay: 0.1 }}
          >
            {decorators.length} decorator
            {decorators.length !== 1 && "s"} in the system
          </motion.p>
        </div>

        {decorators.length === 0 && (
          <motion.div
            className="bg-base-100 rounded-2xl shadow-md p-12 text-center"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
          >
            <div className="text-6xl mb-4 text-gray-300">🎨</div>
            <p className="text-xl font-semibold text-base-content/80">
              No decorators found
            </p>
            <p className="text-base-content/60 mt-1">
              Add decorators to see them listed here.
            </p>
          </motion.div>
        )}

        <AnimatePresence>
          <div className="space-y-5">
            {decorators.map((d, index) => {
              const imageSrc = d.photoURL || d.photo;

              return (
                <motion.div
                  key={d._id}
                  className="bg-base-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-base-300 p-4 md:p-5"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={index}
                  whileHover={{ y: -3, scale: 1.01 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-base-content/50">
                      Decorator #{index + 1}
                    </h3>
                    <StatusBadge status={d.status} />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
                    <motion.div
                      className="shrink-0"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: 0.05 }}
                    >
                      <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-[#ff6a4a]/5 border border-[#ff6a4a]/20 flex items-center justify-center text-3xl text-[#ff6a4a]/70">
                        {imageSrc ? (
                          <img
                            src={imageSrc}
                            alt={d.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          d.name?.charAt(0)?.toUpperCase() || "🎨"
                        )}
                      </div>
                    </motion.div>

                    <div className="flex-1 w-full">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
                        <div>
                          <p className="text-xs font-medium text-base-content/40 uppercase tracking-wide">
                            ID. {index + 1}
                          </p>
                          <h4 className="text-xl md:text-2xl font-bold text-base-content">
                            {d.name}
                          </h4>
                          {d.email && (
                            <p className="text-base-content/70 text-sm mt-0.5">
                              {d.email}
                            </p>
                          )}
                        </div>

                        <motion.button
                          onClick={() => handleDeleteDecorator(d)}
                          whileTap={{ scale: 0.95 }}
                          className="mt-2 md:mt-0 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500 text-white text-xs md:text-sm font-semibold shadow-sm hover:bg-red-600 transition cursor-pointer"
                        >
                          <Trash2 size={16} />
                          Remove
                        </motion.button>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 mt-4">
                        <div>
                          <p className="text-xs font-medium text-base-content/60 mb-1">
                            Specialty
                          </p>
                          <p className="font-semibold text-base text-base-content">
                            {d.specialty || "General Decorator"}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-medium text-base-content/60 mb-1">
                            Rating
                          </p>
                          <p className="font-semibold text-base">
                            {d.rating ?? "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm mt-4">
                        {d.phone && (
                          <div>
                            <span className="text-base-content/60">Phone: </span>
                            <span className="font-semibold">{d.phone}</span>
                          </div>
                        )}
                        {d.location && (
                          <div>
                            <span className="text-base-content/60">Location: </span>
                            <span className="font-semibold text-base-content">
                              {d.location}
                            </span>
                          </div>
                        )}
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

export default ManageDecorators;

