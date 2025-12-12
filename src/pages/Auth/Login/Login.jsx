import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import useAuth from "../../../Hooks/useAuth";
import LoadingSpinner from "../../../Components/Spinner/LoadingSpinner";
motion
const Login = () => {
   useEffect(() => {
    document.title = "Style Decor | Login";
  }, []);
  const { signInUser, signInGoogle, loading } = useAuth();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await signInUser(data.email, data.password);
      toast.success("Welcome back to StyleDecor!");
      navigate("/");
    } catch (err) {
      const msg = err.message.includes("wrong-password")
        ? "Incorrect password"
        : err.message.includes("user-not-found")
        ? "No account found with this email"
        : "Login failed";
      toast.error(msg);
    }
  };

  const handleGoogle = async () => {
    try {
      await signInGoogle();
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      toast.error("Google login failed", err);
    }
  };

  if (loading) {
     return (
      <LoadingSpinner/>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-orange-50 flex items-center justify-center py-10 px-4">
      <div className="max-w-lg w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="bg-linear-to-r from-[#ff6a4a] to-orange-600 p-8 sm:p-10 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Welcome Back</h1>
            <p className="text-orange-100 mt-3 text-base sm:text-lg">
              Login to your account
            </p>
          </div>

          <div className="p-8 sm:p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
              {/* email */}
              <div>
                <label className="flex items-center gap-3 text-gray-700 font-semibold mb-3">
                  <Mail size={20} sm:size={22} className="text-[#ff6a4a]" />
                  Email Address
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                  })}
                  className="input outline-0 input-bordered w-full h-12 sm:h-14 pl-10 sm:pl-12 text-base sm:text-lg"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* password */}
              <div className="relative">
                <label className="flex items-center gap-3 text-gray-700 font-semibold mb-3">
                  <Lock size={20} sm:size={22} className="text-[#ff6a4a]" />
                  Password
                </label>
                <input
                  type={showPass ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="input outline-0 input-bordered w-full h-12 sm:h-14 pl-10 sm:pl-12 pr-12 sm:pr-14 text-base sm:text-lg"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 sm:right-4 top-15.5 -translate-y-1/2 text-gray-600 hover:text-[#ff6a4a] z-10 cursor-pointer"
                >
                  {showPass ? <EyeOff size={24} /> : <Eye size={24} />}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="btn bg-[#ff6a4a] hover:bg-black text-white font-bold w-full h-12 sm:h-14 text-base sm:text-xl rounded-lg sm:rounded-xl shadow-xl"
              >
                Login Now
              </button>
            </form>

            <div className="mt-8 sm:mt-10">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 sm:px-6 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <button
                onClick={handleGoogle}
                className="mt-6 sm:mt-8 btn btn-outline w-full h-12 sm:h-14 text-base sm:text-lg hover:bg-[#ff6a4a] hover:text-white font-semibold flex items-center justify-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl"
              >
                <svg className="w-5 sm:w-6 h-5 sm:h-6" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>
            </div>

            <p className="text-center mt-8 sm:mt-10 text-gray-600 text-sm sm:text-lg">
              New to StyleDecor?{" "}
              <Link
                to="/register"
                className="text-[#ff6a4a] font-bold hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
