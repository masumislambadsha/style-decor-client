import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../../Components/Spinner/LoadingSpinner";
motion;
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
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: emptyService });

  const { data: services = [], isLoading, refetch } = useQuery({
    queryKey: ["admin-services"],
    queryFn: async () => {
      const res = await axiosSecure.get("/services");
      return res.data;
    },
  });

  const imageValue = watch("image");

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
    const body = {
      ...data,
      cost: Number(data.cost),
      isActive: !!data.isActive,
    };

    if (!body.image) {
      toast.error("Please upload an image");
      return;
    }

    try {
      if (editing) {
        await axiosSecure.patch(`/services/${editing._id}`, body);
        toast.success("Service updated");
      } else {
        await axiosSecure.post("/services", body);
        toast.success("Service created");
      }
      setModalOpen(false);
      setEditing(null);
      reset(emptyService);
      refetch();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save service");
    }
  };

  const handleDelete = async (service) => {
    const result = await Swal.fire({
      title: "Delete this service?",
      html: `<strong>${service.service_name}</strong>`,
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
      console.error(err);
      toast.error("Failed to delete service");
    }
  };

  const toggleActive = async (service) => {
    try {
      await axiosSecure.patch(`/services/${service._id}`, {
        isActive: !service.isActive,
      });
      toast.success(service.isActive ? "Service deactivated" : "Service activated");
      refetch();
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const key = import.meta.env.VITE_image_host_key;
    if (!key) {
      toast.error("Image API key missing");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!data.success) throw new Error("Upload failed");
      const url = data.data.display_url;
      setValue("image", url, { shouldValidate: true });
      toast.success("Image uploaded");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 px-4">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
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
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={openCreate}
            className="btn bg-[#ff6a4a] hover:bg-black text-white flex items-center gap-2 btn-xs sm:btn-sm self-center"
          >
            <Plus size={18} />
            Add Service
          </motion.button>
        </div>

        {services.length === 0 && (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-8 sm:p-12 text-center">
            <div className="text-4xl sm:text-6xl mb-4 text-gray-300">🎨</div>
            <p className="text-lg sm:text-xl font-semibold text-gray-700">
              No services found
            </p>
            <p className="text-gray-500 mt-1">
              Click “Add Service” to create your first one.
            </p>
          </div>
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
                  <h3 className="text-lg sm:text-xl font-bold">Service #{idx + 1}</h3>
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
                          <p className="text-xs uppercase tracking-wide text-gray-500 mt-1">
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

                      <div className="flex flex-wrap gap-3 text-xs sm:text-sm md:text-base mt-2">
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

                    <div className="flex flex-col justify-center lg:px-4 gap-2 sm:gap-3">
                      <motion.button whileTap={{ scale: 0.97 }}>
                        <button
                          onClick={() => toggleActive(s)}
                          className="w-full bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200 font-semibold py-2 rounded-lg shadow-sm flex items-center justify-center gap-2 text-xs sm:text-sm"
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
                        className="w-full bg-gray-900 text-white hover:bg-black font-semibold py-2 rounded-lg shadow-sm flex items-center justify-center gap-2 text-xs sm:text-sm"
                      >
                        <Pencil size={16} />
                        Edit
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleDelete(s)}
                        className="w-full bg-red-500 text-white hover:bg-red-700 font-semibold py-2 rounded-lg shadow-sm flex items-center justify-center gap-2 text-xs sm:text-sm"
                      >
                        <Trash2 size={16} />
                        Delete
                      </motion.button>
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
                onClick={() => {
                  setModalOpen(false);
                  reset(emptyService);
                }}
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
                    <label className="font-medium text-gray-700">Service Name</label>
                    <input
                      type="text"
                      className="input input-bordered w-full text-xs sm:text-sm"
                      {...register("service_name", { required: true })}
                    />
                    {errors.service_name && (
                      <p className="text-xs text-red-500 mt-1">Name is required.</p>
                    )}
                  </div>

                  <div>
                    <label className="font-medium text-gray-700">Category</label>
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
                      className="input input-bordered w-full text-xs sm:text-sm"
                      {...register("cost", { required: true, min: 1 })}
                    />
                    {errors.cost && (
                      <p className="text-xs text-red-500 mt-1">Valid cost is required.</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="font-medium text-gray-700">Unit</label>
                    <input
                      type="text"
                      className="input input-bordered w-full text-xs sm:text-sm"
                      {...register("unit", { required: true })}
                      placeholder="per event / per sq ft / per room"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-medium text-gray-700">Image</label>
                  <div className="mt-1 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                    <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-dashed border-gray-300 cursor-pointer bg-slate-50 hover:bg-slate-100 text-xs sm:text-sm text-gray-700">
                      <Upload size={16} />
                      <span>{uploading ? "Uploading..." : "Upload image"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        disabled={uploading}
                      />
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full text-xs sm:text-sm"
                      placeholder="Or paste image URL"
                      {...register("image", { required: true })}
                    />
                  </div>
                  {errors.image && (
                    <p className="text-xs text-red-500 mt-1">Image is required.</p>
                  )}

                  {imageValue && (
                    <div className="mt-3">
                      <p className="text-xs text-gray-500 mb-1">Preview</p>
                      <img
                        src={imageValue}
                        alt="Service preview"
                        className="w-full h-40 object-cover rounded-xl border border-gray-200"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="font-medium text-gray-700">Description</label>
                  <textarea
                    className="textarea textarea-bordered w-full min-h-[90px] text-xs sm:text-sm"
                    {...register("description", { required: true })}
                  />
                  {errors.description && (
                    <p className="text-xs text-red-500 mt-1">Description is required.</p>
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
                    onClick={() => {
                      setModalOpen(false);
                      reset(emptyService);
                    }}
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
