import React from "react";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 px-4">
      <div className="container mx-auto grid md:grid-cols-5 gap-10">
        <div className="md:col-span-2 space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff6a4a]/10 text-[#ff6a4a] text-xs font-semibold uppercase tracking-[0.2em]">
            Contact
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Let’s plan your next space or event
          </h1>
          <p className="text-slate-600 text-sm md:text-base">
            Share a few details and our team or a verified decorator will get
            back to you with concepts, timelines, and an estimated budget.
          </p>

          <div className="space-y-3 text-sm text-slate-700">
            <p>
              <span className="font-semibold">Phone:</span> +8801XXXXXXXXX
            </p>
            <p>
              <span className="font-semibold">Email:</span> hello@styledecor.com
            </p>
            <p>
              <span className="font-semibold">Office:</span> Dhaka, Bangladesh
            </p>
          </div>
        </div>

        <div className="md:col-span-3">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8 space-y-5"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">
                  Full name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="input input-bordered w-full bg-slate-50 text-slate-800 border-slate-200"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="input input-bordered w-full bg-slate-50 text-slate-800 border-slate-200"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="input input-bordered w-full bg-slate-50 text-slate-800 border-slate-200"
                  placeholder="+8801XXXXXXXXX"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">
                  Project type
                </label>
                <select
                  name="type"
                  className="select select-bordered w-full bg-slate-50 text-slate-800 border-slate-200"
                  defaultValue="event"
                >
                  <option value="event">Event decor</option>
                  <option value="home">Home interior</option>
                  <option value="commercial">Commercial space</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">
                Message
              </label>
              <textarea
                name="message"
                rows={4}
                className="textarea textarea-bordered w-full bg-slate-50 text-slate-800 border-slate-200"
                placeholder="Tell us about your event, date, location and budget range."
              />
            </div>

            <button
              type="submit"
              className="btn bg-[#ff6a4a] hover:bg-black text-white font-semibold px-10 border-none rounded-full shadow-md"
            >
              Send message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
