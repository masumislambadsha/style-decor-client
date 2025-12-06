import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { User, Mail, Lock, Camera, Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import useAuth from "../../../Hooks/useAuth";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const { registerUser, updateUserProfile, signInGoogle } = useAuth();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    return data.data.url;
  };

  const onSubmit = async (data) => {
    try {
      setUploading(true);
      let photoURL = "https://i.ibb.co.com/5Y0X5gY/user.png";

      if (data.photo[0]) {
        photoURL = await uploadImage(data.photo[0]);
      }

      await registerUser(data.email, data.password);
      await updateUserProfile({ displayName: data.name, photoURL });
      toast.success("Welcome to StyleDecor!");
      navigate("/");
    } catch (err) {
      toast.error(
        err.message.includes("email-already-in-use")
          ? "Email already registered"
          : "Registration failed. Try again."
      );
    } finally {
      setUploading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleGoogle = async () => {
    try {
      await signInGoogle();
      toast.success("Welcome to StyleDecor!");
      navigate("/");
    } catch (err) {
      toast.error("Google signup failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-orange-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-lg w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="bg-linear-to-r from-[#ff6a4a] to-orange-600 p-10 text-center">
            <h1 className="text-5xl font-black text-white">Join StyleDecor</h1>
            <p className="text-orange-100 mt-3 text-lg">
              Create your free account
            </p>
          </div>

          <div className="p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
              <div>
                <label className="flex items-center gap-3 text-gray-700 font-semibold mb-2">
                  <User size={22} className="text-[#ff6a4a]" />
                  Full Name
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: "Name is required",
                    minLength: { value: 3, message: "Minimum 3 characters" },
                  })}
                  className="input input-bordered w-full h-14 pl-12 text-lg"
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-3 text-gray-700 font-semibold mb-2">
                  <Mail size={22} className="text-[#ff6a4a]" />
                  Email Address
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                  })}
                  className="input input-bordered w-full h-14 pl-12 text-lg"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="relative">
                <label className="flex items-center gap-3 text-gray-700 font-semibold mb-2">
                  <Lock size={22} className="text-[#ff6a4a]" />
                  Password
                </label>

                <input
                  type={showPass ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                    validate: (v) =>
                      (/[A-Z]/.test(v) && /\d/.test(v)) ||
                      "Must have 1 uppercase & 1 number",
                  })}
                  className="input input-bordered w-full h-14 pl-12 pr-14 text-lg"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute inset-y-0 right-4 top-15 -translate-y-1/2 flex items-center text-gray-600 hover:text-[#ff6a4a] z-10 cursor-pointer"
                >
                  {showPass ? <EyeOff size={26} /> : <Eye size={26} />}
                </button>

                {errors.password && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <label className="flex items-center gap-3 text-gray-700 font-semibold mb-3">
                  <Camera size={22} className="text-[#ff6a4a]" />
                  Profile Photo{" "}
                  <span className="font-normal text-gray-500">(optional)</span>
                </label>
                <div className="flex items-center gap-5">
                  <div className="avatar">
                    <div className="w-24 h-24 rounded-full ring-4 ring-[#ff6a4a] ring-offset-4 overflow-hidden">
                      <img src={imagePreview} />
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    {...register("photo")}
                    onChange={handleImageChange}
                    className="file-input file-input-bordered w-full h-14"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="btn bg-[#ff6a4a] hover:bg-black text-white font-bold w-full h-14 text-xl rounded-2xl shadow-xl flex items-center justify-center gap-3"
              >
                {uploading ? (
                  <>
                    <Loader2 className="animate-spin" size={28} />
                    Creating Account...
                  </>
                ) : (
                  "Register Now"
                )}
              </button>
            </form>

            <div className="mt-10">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-6 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <button
                onClick={handleGoogle}
                className="mt-8 btn btn-outline w-full h-14 text-lg hover:bg-[#ff6a4a] hover:text-white font-semibold rounded-2xl "
              >
                <FcGoogle className="mx-2" size={24} /> Continue with Google
              </button>
            </div>

            <p className="text-center mt-10 text-gray-600 text-lg">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#ff6a4a] font-bold hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
