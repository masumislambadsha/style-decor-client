import React, { useEffect, useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader2, User as UserIcon, Mail, Phone, MapPin, Camera } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import useUserProfile from "../../../../Hooks/useUserProfile";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../../Components/Spinner/LoadingSpinner";
const MyProfile = () => {
  useEffect(() => {
    document.title = "Style Decor | My Profile";
  }, []);
  const { user, updateUserProfile } = useAuth();
  const { profile, isLoading: profileLoading } = useUserProfile();
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  const [updating, setUpdating] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (profile) {
      setValue("name", profile.name || user?.displayName || "");
      setValue("phone", profile.phone || "");
      setValue("address", profile.address || "");
    }
  }, [profile, user, setValue]);
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    return data.data.url;
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const onUpdateProfile = async (data) => {
    try {
      setUpdating(true);
      let photoURL = user?.photoURL;
      if (data.photo?.[0]) {
        photoURL = await uploadImage(data.photo[0]);
      }
      await updateUserProfile({
        displayName: data.name,
        photoURL: photoURL,
      });
      const userData = {
        name: data.name,
        email: user?.email,
        photoURL: photoURL,
        phone: data.phone,
        address: data.address,
      };
      await axiosSecure.post("/users", userData);
      await queryClient.invalidateQueries(["user-profile", user?.email]);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      setImagePreview(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };
  if (!user || profileLoading) {
    return (
     <LoadingSpinner/>
    );
  }
  return (
    <div className="space-y-6 mt-10 sm:mt-15">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">My Profile</h2>
        <button
          onClick={() => {
            setIsEditing((prev) => !prev);
            setImagePreview(null);
          }}
          className={`btn btn-sm ${isEditing ? "btn-error btn-outline" : "btn-primary bg-[#ff6a4a] border-none text-white hover:bg-black"}`}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
          <div className="relative group mx-auto sm:mx-0">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-[#ff6a4a] overflow-hidden relative">
              <img
                src={imagePreview || profile?.photoURL || user.photoURL || "https://i.ibb.co.com/5Y0X5gY/user.png"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              {isEditing && (
                <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <Camera className="text-white" size={24} />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    {...register("photo")}
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
              {profile?.name || user.displayName || "User"}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 font-medium">{user.email}</p>
            <div className="mt-2 text-xs px-3 py-1 bg-[#ff6a4a]/10 text-[#ff6a4a] rounded-full inline-block font-bold">
              {profile?.role || "Member"}
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onUpdateProfile)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                <UserIcon size={16} /> Full Name
              </label>
              <input
                disabled={!isEditing}
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 3, message: "Minimum 3 characters" },
                })}
                className="input outline-0 input-bordered w-full text-sm sm:text-base dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                <Mail size={16} /> Email
              </label>
              <input
                disabled
                defaultValue={user.email || ""}
                className="input outline-0 input-bordered w-full text-sm sm:text-base bg-gray-100 dark:bg-gray-800/50 dark:border-gray-700 text-gray-500"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                <Phone size={16} /> Phone
              </label>
              <input
                disabled={!isEditing}
                placeholder="Add phone number"
                {...register("phone")}
                className="input outline-0 input-bordered w-full text-sm sm:text-base dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                <MapPin size={16} /> Address
              </label>
              <input
                disabled={!isEditing}
                placeholder="Add address"
                {...register("address")}
                className="input outline-0 input-bordered w-full text-sm sm:text-base dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
          </div>
          {isEditing && (
            <div className="pt-4">
              <button
                type="submit"
                disabled={updating}
                className="btn bg-[#ff6a4a] hover:bg-black text-white w-full sm:w-auto px-10 h-12 text-lg rounded-xl shadow-xl flex items-center justify-center gap-2 border-none transition-all hover:scale-[1.02]"
              >
                {updating && <Loader2 className="animate-spin" size={20} />}
                {updating ? "Saving Changes..." : "Save Changes"}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
export default MyProfile;