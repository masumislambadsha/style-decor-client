import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const BeADecorator = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleRequest = async (e) => {
    e.preventDefault();
    const form = e.target;

    const payload = {
      name: user.displayName || user.name,
      email: user.email,
      photoURL: user.photoURL || null,
      phone: form.phone.value.trim(),
      city: form.city.value.trim(),
      specialty: form.specialty.value.trim(),
      experienceYears: Number(form.experienceYears.value) || 0,
      portfolioUrl: form.portfolioUrl.value.trim() || null,
      bio: form.bio.value.trim(),
      availability: form.availability.value,
      agreedToTerms: form.terms.checked,
      status: "pending",
      createdAt: new Date(),
    };

    if (!payload.agreedToTerms) {
      toast.error("You must agree to the terms to apply");
      return;
    }

    try {
      await axiosSecure.post("/decorator-applications", payload);
      toast.success("Decorator application submitted");
      form.reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit application");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white shadow-lg rounded-xl sm:rounded-3xl px-6 sm:px-8 py-8 sm:py-10 max-w-md text-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900">
            Login required
          </h2>
          <p className="text-gray-600">
            Please login or create an account to apply as a decorator.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff6a4a]/10 text-[#ff6a4a] text-xs font-semibold uppercase tracking-[0.2em]">
            Become a partner
          </span>
          <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
            Apply as a StyleDecor decorator
          </h1>
          <p className="mt-3 text-slate-600 max-w-xl sm:max-w-2xl mx-auto text-sm sm:text-base">
            Fill out this short application so the admin can review your experience and add you to the official decorator team.
          </p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-3xl shadow-xl border border-slate-100 p-6 sm:p-8 space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center ring-2 ring-[#ff6a4a]/60">
                <img
                  src={user.photoURL || "https://i.ibb.co.com/5Y0X5gY/user.png"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  Applying as
                </p>
                <p className="text-lg font-semibold text-slate-900">
                  {user.displayName || user.name || "User"}
                </p>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
            </div>

            <div className="flex-1">
              <ol className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-500">
                <li className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ff6a4a] text-white text-[11px] font-bold">
                    1
                  </span>
                  <span>Share basic details</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-slate-700 text-[11px] font-bold">
                    2
                  </span>
                  <span>Submit portfolio & bio</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 text-slate-700 text-[11px] font-bold">
                    3
                  </span>
                  <span>Admin reviews & approves</span>
                </li>
              </ol>
            </div>
          </div>

          <div className="h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />

          <form onSubmit={handleRequest} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">
                  Full name
                </label>
                <input
                  type="text"
                  disabled
                  defaultValue={user.displayName || user.name || ""}
                  className="input input-bordered w-full bg-slate-50 text-slate-700 border-slate-200 text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">
                  Email
                </label>
                <input
                  type="email"
                  disabled
                  defaultValue={user.email}
                  className="input input-bordered w-full bg-slate-50 text-slate-700 border-slate-200 text-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">
                  Phone number
                </label>
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="+8801XXXXXXXXX"
                  className="input input-bordered w-full text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">
                  City / District
                </label>
                <input
                  name="city"
                  type="text"
                  required
                  placeholder="Dhaka, Chattogram, etc."
                  className="input input-bordered w-full text-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">
                  Specialty
                </label>
                <input
                  name="specialty"
                  type="text"
                  required
                  placeholder="Wedding decor, corporate, birthday, etc."
                  className="input input-bordered w-full text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">
                  Years of experience
                </label>
                <input
                  name="experienceYears"
                  type="number"
                  min="0"
                  max="50"
                  required
                  placeholder="2"
                  className="input input-bordered w-full text-xs sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">
                Portfolio link (optional)
              </label>
              <input
                name="portfolioUrl"
                type="url"
                placeholder="Website, Facebook page, Instagram, etc."
                className="input input-bordered w-full text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">
                Short bio
              </label>
              <textarea
                name="bio"
                rows={4}
                required
                className="textarea textarea-bordered w-full text-xs sm:text-sm"
                placeholder="Describe your style, services, locations you cover and notable projects."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">
                  Availability
                </label>
                <select
                  name="availability"
                  className="select select-bordered w-full text-xs sm:text-sm"
                  defaultValue="weekends"
                  required
                >
                  <option value="weekends">Weekends only</option>
                  <option value="weekdays">Weekdays only</option>
                  <option value="full_time">Weekdays & weekends</option>
                </select>
              </div>
              <div className="hidden md:block text-xs text-slate-500 pt-7">
                Tip: Mention your peak seasons and dates you usually cannot work in the bio above.
              </div>
            </div>

            <label className="flex items-start gap-2 text-xs text-slate-600 bg-slate-50 border border-dashed border-slate-200 rounded-xl p-3">
              <input
                type="checkbox"
                name="terms"
                className="checkbox checkbox-xs mt-0.5"
                required
              />
              <span>
                I confirm that the information provided is accurate and I agree to StyleDecor contacting me regarding decorator opportunities and bookings.
              </span>
            </label>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-xs text-slate-500">
                After submission, an admin will review your details. You will see decorator options in your dashboard once approved.
              </p>
              <button
                type="submit"
                className="btn bg-[#ff6a4a] hover:bg-[#d94823] text-white px-8 sm:px-10 border-none shadow-md self-start sm:self-auto text-xs sm:text-sm"
              >
                Submit application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BeADecorator;
