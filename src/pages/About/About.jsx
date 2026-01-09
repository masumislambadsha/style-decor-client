import React, { useEffect } from "react";
import { motion } from "framer-motion";

const pageVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const leftColumnVariants = {
  hidden: { opacity: 0, x: -18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: "easeOut", delay: 0.1 },
  },
};

const rightColumnVariants = {
  hidden: { opacity: 0, x: 18 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: "easeOut", delay: 0.18 },
  },
};

const cardStagger = {
  hidden: { opacity: 0, y: 18, scale: 0.96 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: "easeOut",
      delay: 0.18 + i * 0.05,
    },
  }),
};

const About = () => {
   useEffect(() => {
    document.title = "Style Decor | About";
  }, []);
  return (
    <motion.div
      className="min-h-screen bg-base-200 pt-24 pb-16 px-4"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-10"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff6a4a]/10 text-[#ff6a4a] text-xs font-semibold uppercase tracking-[0.2em]"
            initial={{ opacity: 0, y: -8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.05 }}
          >
            About us
          </motion.span>
          <motion.h1
            className="mt-4 text-3xl md:text-4xl font-extrabold text-base-content"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.12 }}
          >
            StyleDecor – Home, Event & Interior
          </motion.h1>
          <motion.p
            className="mt-3 text-base-content/70 max-w-2xl mx-auto text-sm md:text-base"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut", delay: 0.18 }}
          >
            StyleDecor connects homeowners and brands with professional
            decorators to design memorable homes and events with zero hassle.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            className="md:col-span-2 space-y-5"
            variants={leftColumnVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="bg-base-100 rounded-3xl shadow-sm border border-base-300 p-6"
              custom={0}
              variants={cardStagger}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -4, scale: 1.01, boxShadow: "0 22px 45px rgba(15,23,42,0.08)" }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
            >
              <h2 className="text-lg font-semibold text-base-content mb-2">
                What we do
              </h2>
              <p className="text-base-content/70 text-sm md:text-base">
                From cozy living rooms and modern kitchens to full wedding
                venues and corporate stages, our curated decorators handle
                planning, materials, setup, and execution so clients can relax
                and enjoy the moment.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  label: "Residential",
                  text: "Living rooms, bedrooms, kitchens, rooftop gardens, and more.",
                },
                {
                  label: "Events",
                  text: "Weddings, birthdays, mehendi, receptions, and private parties.",
                },
                {
                  label: "Commercial",
                  text: "Offices, showrooms, restaurants, and brand activations.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={item.label}
                  className="bg-base-100 rounded-2xl shadow-sm border border-base-300 p-4"
                  custom={idx + 1}
                  variants={cardStagger}
                  initial="hidden"
                  animate="visible"
                  whileHover={{
                    y: -4,
                    scale: 1.02,
                    boxShadow: "0 18px 35px rgba(15,23,42,0.08)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 240,
                    damping: 20,
                  }}
                >
                  <p className="text-xs font-semibold text-base-content/60 uppercase mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm text-base-content/80">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="space-y-4"
            variants={rightColumnVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="bg-base-100 rounded-3xl shadow-sm border border-base-300 p-6"
              custom={4}
              variants={cardStagger}
              initial="hidden"
              animate="visible"
              whileHover={{
                y: -4,
                scale: 1.01,
                boxShadow: "0 20px 40px rgba(15,23,42,0.08)",
              }}
            >
              <h3 className="text-sm font-semibold text-base-content/60 uppercase mb-3">
                Why clients choose us
              </h3>
              <ul className="space-y-2 text-sm text-base-content/80">
                <li>• Curated, verified decorators across multiple cities.</li>
                <li>• Transparent pricing and clear project tracking.</li>
                <li>• End‑to‑end support from planning to setup.</li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-[#ff6a4a] rounded-3xl text-white p-6 relative overflow-hidden"
              custom={5}
              variants={cardStagger}
              initial="hidden"
              animate="visible"
              whileHover={{
                y: -4,
                scale: 1.02,
                boxShadow: "0 24px 55px rgba(248,113,113,0.55)",
              }}
              transition={{ type: "spring", stiffness: 230, damping: 21 }}
            >
              <motion.div
                className="pointer-events-none absolute inset-0 opacity-50"
                initial={{ scale: 0.9, rotate: -4, opacity: 0 }}
                animate={{ scale: 1.05, rotate: 0, opacity: 0.6 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
                style={{
                  background:
                    "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.35), transparent 55%), radial-gradient(circle at 100% 100%, rgba(248,250,252,0.4), transparent 55%)",
                }}
              />
              <div className="relative">
                <h3 className="text-lg font-semibold mb-2">
                  Color your life with StyleDecor
                </h3>
                <p className="text-sm text-white/90">
                  Tell us your vision and budget; our decorators handle the rest
                  with creative, practical designs tailored to your space.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
