import React, { useEffect } from "react";
import { motion } from "framer-motion";

const pageVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const leftVariants = {
  hidden: { opacity: 0, x: -18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.38, ease: "easeOut", delay: 0.08 },
  },
};

const rightVariants = {
  hidden: { opacity: 0, x: 18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut", delay: 0.14 },
  },
};

const Contact = () => {
   useEffect(() => {
    document.title = "Style Decor | Contact";
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <motion.div
      className="min-h-screen bg-base-200 pt-24 pb-16 px-4"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-5xl mx-auto grid md:grid-cols-5 gap-10">
        <motion.div
          className="md:col-span-2 space-y-4"
          variants={leftVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff6a4a]/10 text-[#ff6a4a] text-xs font-semibold uppercase tracking-[0.2em]"
            initial={{ opacity: 0, y: -8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
          >
            Contact
          </motion.span>

          <motion.h1
            className="text-3xl md:text-4xl font-extrabold text-base-content"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut", delay: 0.16 }}
          >
            Let’s plan your next space or event
          </motion.h1>

          <motion.p
            className="text-base-content/70 text-sm md:text-base"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.22 }}
          >
            Share a few details and our team or a verified decorator will get
            back to you with concepts, timelines, and an estimated budget.
          </motion.p>

          <motion.div
            className="space-y-3 text-sm text-base-content/80"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.28 }}
          >
            <p>
              <span className="font-semibold">Phone:</span> +8801XXXXXXXXX
            </p>
            <p>
              <span className="font-semibold">Email:</span> hello@styledecor.com
            </p>
            <p>
              <span className="font-semibold">Office:</span> Dhaka, Bangladesh
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="md:col-span-3"
          variants={rightVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.form
            onSubmit={handleSubmit}
            className="bg-base-100 rounded-3xl shadow-xl border border-base-300 p-6 md:p-8 space-y-5 relative overflow-hidden"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: "easeOut", delay: 0.2 }}
            whileHover={{
              y: -4,
              boxShadow: "0 24px 60px rgba(15,23,42,0.14)",
            }}
          >
            <motion.div
              className="pointer-events-none absolute -top-16 -right-10 w-40 h-40 rounded-full bg-[#ff6a4a]/20 blur-3xl"
              initial={{ opacity: 0, scale: 0.6, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.28 }}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: "easeOut", delay: 0.26 }}
              >
                <label className="block text-xs font-semibold text-base-content/60 mb-1 uppercase tracking-wide">
                  Full name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="input input-bordered w-full bg-base-200 text-base-content border-base-300"
                  placeholder="Your name"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: "easeOut", delay: 0.3 }}
              >
                <label className="block text-xs font-semibold text-base-content/60 mb-1 uppercase tracking-wide">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="input input-bordered w-full bg-base-200 text-base-content border-base-300"
                  placeholder="you@example.com"
                />
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: "easeOut", delay: 0.34 }}
              >
                <label className="block text-xs font-semibold text-base-content/60 mb-1 uppercase tracking-wide">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="input input-bordered w-full bg-base-200 text-base-content border-base-300"
                  placeholder="+8801XXXXXXXXX"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: "easeOut", delay: 0.38 }}
              >
                <label className="block text-xs font-semibold text-base-content/60 mb-1 uppercase tracking-wide">
                  Project type
                </label>
                <select
                  name="type"
                  className="select select-bordered w-full bg-base-200 text-base-content border-base-300"
                  defaultValue="event"
                >
                  <option value="event">Event decor</option>
                  <option value="home">Home interior</option>
                  <option value="commercial">Commercial space</option>
                  <option value="other">Other</option>
                </select>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut", delay: 0.42 }}
            >
              <label className="block text-xs font-semibold text-base-content/60 mb-1 uppercase tracking-wide">
                Message
              </label>
              <textarea
                name="message"
                rows={4}
                className="textarea textarea-bordered w-full bg-base-200 text-base-content border-base-300"
                placeholder="Tell us about your event, date, location and budget range."
              />
            </motion.div>

            <motion.button
              type="submit"
              className="btn bg-[#ff6a4a] hover:bg-black text-white font-semibold px-10 border-none rounded-full shadow-md"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              Send message
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
