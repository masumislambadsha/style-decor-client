import React, { useEffect, useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader2, User as UserIcon, Mail, Phone, MapPin, Camera, Lock, Eye, EyeOff } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import useUserProfile from "../../../../Hooks/useUserProfile";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../../../Components/Spinner/LoadingSpinner";
const MyProfile = () => {
  useEffect(() => {
    document.title = "Style Decor | My Profile";
  }, []);
  const { user, updateUserProfile, updateUserPassword, reAuthenticateUser } = useAuth();
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
    reset: resetProfileForm,
  } = useForm();
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    watch: watchPassword,
    reset: resetPasswordForm,
    formState: { errors: passwordErrors },
  } = useForm();
  const [passwordUpdating, setPasswordUpdating] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  useEffect(() => {
    if (user) {
      setValue("name", profile?.name || user?.displayName || "");
      setValue("phone", profile?.phone || "");
      setValue("address", profile?.address || "");
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
  const onChangePassword = async (data) => {
    try {
      setPasswordUpdating(true);
      await reAuthenticateUser(data.currentPassword);
      await updateUserPassword(data.newPassword);
      toast.success("Password updated successfully!");
      resetPasswordForm();
    } catch (err) {
      console.error(err);
      if (err.code === "auth/wrong-password") {
        toast.error("Current password is incorrect");
      } else if (err.code === "auth/requires-recent-login") {
        toast.error("Sensitive operation requires recent login. Please log out and log back in.");
      } else {
        toast.error(err.message || "Failed to update password");
      }
    } finally {
      setPasswordUpdating(false);
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100 dark:border-gray-800 transition-colors duration-300 h-full flex flex-col">
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
        <form onSubmit={handleSubmit(onUpdateProfile)} className="space-y-6 flex-1 flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                <UserIcon size={16} /> Full Name
              </label>
              <input
                defaultValue={profile?.name || user?.displayName || ""}
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
            <div className="pt-4 mt-auto">
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

      {user?.providerData?.some((p) => p.providerId === "password") && (
        <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100 dark:border-gray-800 transition-colors duration-300 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-[#ff6a4a]/10 rounded-lg">
              <Lock className="text-[#ff6a4a]" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Security Settings</h3>
          </div>

          <form onSubmit={handleSubmitPassword(onChangePassword)} className="space-y-4 flex-1 flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 sm:gap-4">
              <label className="sm:col-span-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                Current Password :
              </label>
              <div className="sm:col-span-8 relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="********"
                  {...registerPassword("currentPassword", {
                    required: "Current password is required",
                  })}
                  className="input input-bordered w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white outline-0 focus:border-[#ff6a4a] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-[#ff6a4a] transition-colors"
                >
                  {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {passwordErrors.currentPassword && (
                  <p className="text-red-500 text-xs mt-1">{passwordErrors.currentPassword.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 sm:gap-4">
              <label className="sm:col-span-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                New Password :
              </label>
              <div className="sm:col-span-8 relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="********"
                  {...registerPassword("newPassword", {
                    required: "New password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                  })}
                  className="input input-bordered w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white outline-0 focus:border-[#ff6a4a] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-[#ff6a4a] transition-colors"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {passwordErrors.newPassword && (
                  <p className="text-red-500 text-xs mt-1">{passwordErrors.newPassword.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 sm:gap-4">
              <label className="sm:col-span-4 text-sm font-semibold text-gray-600 dark:text-gray-400">
                Confirm Password :
              </label>
              <div className="sm:col-span-8 relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="********"
                  {...registerPassword("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (val) => {
                      if (watchPassword("newPassword") !== val) {
                        return "Passwords do not match";
                      }
                    },
                  })}
                  className="input input-bordered w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white outline-0 focus:border-[#ff6a4a] pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-[#ff6a4a] transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {passwordErrors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{passwordErrors.confirmPassword.message}</p>
                )}
              </div>
            </div>

            <div className="pt-2 mt-auto">
              <button
                type="submit"
                disabled={passwordUpdating}
                className="btn btn-primary bg-[#ff6a4a] border-none text-white hover:bg-black w-full"
              >
                {passwordUpdating && <Loader2 className="animate-spin" size={18} />}
                Update Password
              </button>
            </div>
          </form>
        </div>
      )}
      </div>
    </div>
  );
};
export default MyProfile;
