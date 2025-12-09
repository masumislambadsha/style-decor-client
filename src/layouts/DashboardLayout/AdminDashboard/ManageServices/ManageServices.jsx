import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
motion
const emptyService = {
  service_name: "",
  service_category: "home",
  cost: "",
  unit: "per event",
  description: "",
  image: "",
  isActive: true,
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

const ManageServices = () => {
  const axiosSecure = useAxiosSecure();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: emptyService });

  const {
    data: services = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-services"],
    queryFn: async () => {
      const res = await axiosSecure.get("/services");
      return res.data;
    },
  });

  const openCreate = () => {
    setEditing(null);
    reset(emptyService);
    setModalOpen(true);
  };

  const openEdit = (service) => {
    setEditing(service);
    reset({
      service_name: service.service_name,
      service_category: service.service_category,
      cost: service.cost,
      unit: service.unit,
      description: service.description,
      image: service.image,
      isActive: service.isActive ?? true,
    });
    setModalOpen(true);
  };

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      cost: Number(data.cost),
      isActive: data.isActive === true || data.isActive === "true",
    };

    try {
      if (editing) {
        await axiosSecure.patch(`/services/${editing._id}`, payload);
        toast.success("Service updated");
      } else {
        await axiosSecure.post("/services", payload);
        toast.success("Service created");
      }
      setModalOpen(false);
      setEditing(null);
      reset(emptyService);
      refetch();
    } catch (err) {
      console.error("Service save error:", err.response?.data || err.message);
      toast.error("Failed to save service");
    }
  };

  const handleDelete = async (service) => {
    const result = await Swal.fire({
      title: "Delete this service?",
      html: `<strong>${service.service_name}</strong><br/><span class="text-gray-500 text-sm">This action cannot be undone.</span>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/services/${service._id}`);
      toast.success("Service deleted");
      refetch();
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      toast.error("Failed to delete service");
    }
  };

  const toggleActive = async (service) => {
    try {
      await axiosSecure.patch(`/services/${service._id}`, {
        isActive: !service.isActive,
      });
      toast.success(`Service ${service.isActive ? "deactivated" : "activated"}`);
      refetch();
    } catch {
      toast.error("Failed to update status");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-[#ff6a4a]" />
      </div>
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
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
              Manage Services
            </h2>
            <p className="text-gray-500 mt-1">
              Create, edit, activate or remove StyleDecor services.
            </p>
            <p className="text-xs sm:text-sm text-[#ff6a4a] mt-1">
              Total: {services.length} service{services.length !== 1 && "s"}
            </p>
          </div>
          <div className="flex justify-center sm:justify-end">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={openCreate}
              className="btn bg-[#ff6a4a] hover:bg-black text-white flex items-center gap-2 btn-xs sm:btn-sm"
            >
              <Plus size={18} />
              Add Service
            </motion.button>
          </div>
        </motion.div>

        {services.length === 0 && (
          <motion.div
            className="bg-white rounded-xl sm:rounded-2xl shadow-md p-8 sm:p-12 text-center"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
          >
            <div className="text-4xl sm:text-6xl mb-4 text-gray-300">🎨</div>
            <p className="text-lg sm:text-xl font-semibold text-gray-700">
              No services found
            </p>
            <p className="text-gray-500 mt-1">
              Click “Add Service” to create your first one.
            </p>
          </motion.div>
        )}

        <AnimatePresence>
          <div className="space-y-4 sm:space-y-6">
            {services.map((s, idx) => (
              <motion.div
                key={s._id}
                className="bg-white rounded-xl sm:rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                custom={idx}
                whileHover={{ y: -2, scale: 1.01 }}
              >
                <div className="bg-[#ff6a4a] text-white px-4 sm:px-5 py-3 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
                  <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2">
                    Service #{idx + 1}
                  </h3>
                  <span
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold border ${
                      s.isActive
                        ? "bg-green-100 text-green-800 border-green-300"
                        : "bg-gray-100 text-gray-600 border-gray-300"
                    }`}
                  >
                    {s.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
                    <div className="lg:col-span-2 space-y-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        {s.image && (
                          <motion.img
                            src={s.image}
                            alt={s.service_name}
                            className="w-full sm:w-32 md:w-40 h-24 sm:h-28 object-cover rounded-xl border border-gray-100"
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                        <div>
                          <h4 className="text-xl sm:text-2xl font-bold text-gray-900">
                            {s.service_name}
                          </h4>
                          <p className="text-xs sm:text-xs uppercase tracking-wide text-gray-500 mt-1">
                            Category:{" "}
                            <span className="font-semibold capitalize">
                              {s.service_category}
                            </span>
                          </p>
                          <p className="text-gray-600 text-xs sm:text-sm mt-2 line-clamp-3">
                            {s.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm md:text-base mt-2">
                        <div>
                          <span className="text-gray-500">Cost: </span>
                          <span className="font-bold text-white px-2 py-1 rounded-xl sm:rounded-2xl bg-[#ff6a4a]">
                            ৳{s.cost?.toLocaleString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Unit: </span>
                          <span className="font-semibold">{s.unit}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col lg:flex-col justify-center lg:px-4 items-center gap-4">
                      <div className="w-full flex flex-col sm:flex-row lg:flex-col gap-2 sm:gap-3">
                        <motion.button whileTap={{ scale: 0.97 }}>
                          <button
                            onClick={() => toggleActive(s)}
                            title="Toggle active"
                            className="flex-1 bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200 font-semibold py-2 rounded-lg shadow-sm flex items-center justify-center gap-2 text-xs sm:text-sm transition cursor-pointer px-2"
                          >
                            {s.isActive ? (
                              <>
                                <ToggleRight className="text-gray-500" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <ToggleLeft className="text-green-400" />
                                Activate
                              </>
                            )}
                          </button>
                        </motion.button>

                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          onClick={() => openEdit(s)}
                          className="flex-1 bg-gray-900 text-white hover:bg-black font-semibold py-2 rounded-lg shadow-sm flex items-center justify-center gap-2 text-xs sm:text-sm transition cursor-pointer"
                        >
                          <Pencil size={16} />
                          Edit
                        </motion.button>

                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleDelete(s)}
                          className="flex-1 bg-red-500 text-white hover:bg-red-700 font-semibold py-2 rounded-lg shadow-sm flex items-center justify-center gap-2 text-xs sm:text-sm transition cursor-pointer"
                        >
                          <Trash2 size={16} />
                          Delete
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl sm:rounded-3xl shadow-2xl max-w-lg w-full p-4 sm:p-8 relative"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>

              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                {editing ? "Edit Service" : "Add New Service"}
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium text-gray-700">
                      Service Name
                    </label>
                    <input
                      type="text"
                      className="input outline-0 input-bordered w-full text-xs sm:text-sm"
                      {...register("service_name", { required: true })}
                    />
                    {errors.service_name && (
                      <p className="text-xs text-red-500 mt-1">
                        Name is required.
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      className="select select-bordered w-full text-xs sm:text-sm"
                      {...register("service_category", { required: true })}
                    >
                      <option value="home">Home</option>
                      <option value="office">Office</option>
                      <option value="commercial">Commercial</option>
                      <option value="hospitality">Hospitality</option>
                      <option value="wedding">Wedding</option>
                      <option value="event">Event</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="font-medium text-gray-700">Cost</label>
                    <input
                      type="number"
                      className="input outline-0 input-bordered w-full text-xs sm:text-sm"
                      {...register("cost", { required: true, min: 1 })}
                    />
                    {errors.cost && (
                      <p className="text-xs text-red-500 mt-1">
                        Valid cost is required.
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="font-medium text-gray-700">Unit</label>
                    <input
                      type="text"
                      className="input outline-0 input-bordered w-full text-xs sm:text-sm"
                      {...register("unit", { required: true })}
                      placeholder="per event / per sq ft / per room"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-medium text-gray-700">Image URL</label>
                  <input
                    type="text"
                    className="input outline-0 input-bordered w-full text-xs sm:text-sm"
                    {...register("image", { required: true })}
                  />
                  {errors.image && (
                    <p className="text-xs text-red-500 mt-1">
                      Image URL is required.
                    </p>
                  )}
                </div>

                <div>
                  <label className="font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full min-h-[90px] text-xs sm:text-sm"
                    {...register("description", { required: true })}
                  />
                  {errors.description && (
                    <p className="text-xs text-red-500 mt-1">
                      Description is required.
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="toggle toggle-success"
                    {...register("isActive")}
                    defaultChecked
                  />
                  <span className="text-xs sm:text-sm font-medium text-gray-700">
                    Service is active (visible to users)
                  </span>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="btn btn-ghost btn-xs sm:btn-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn bg-[#ff6a4a] hover:bg-black text-white btn-xs sm:btn-sm"
                  >
                    {editing ? "Save Changes" : "Create Service"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageServices;
