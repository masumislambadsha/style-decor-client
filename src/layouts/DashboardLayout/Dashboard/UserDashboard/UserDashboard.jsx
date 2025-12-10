import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import useRole from "../../../../Hooks/useRole";
motion
const containerVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.08, duration: 0.3, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const UserDashboard = () => {
  const [role] = useRole();

  const normalizedRole = (role || "user").toLowerCase();
  const isAdmin = normalizedRole.includes("admin");
  const isDecorator = normalizedRole.includes("decorator");

  const commonCards = [
    {
      title: "My Profile",
      description: "View and update your personal information.",
      linkText: "Go to Profile →",
      to: "/dashboard/profile",
    },
    {
      title: "My Bookings",
      description: "See your upcoming and past decoration bookings.",
      linkText: "View Bookings →",
      to: "/dashboard/bookings",
    },
    {
      title: "Payment History",
      description: "Track all completed payments and receipts.",
      linkText: "View Payments →",
      to: "/dashboard/payment-history",
    },
  ];

  const adminCards = [
    {
      title: "Analytics",
      description: "View platform performance and key metrics.",
      linkText: "Open Analytics →",
      to: "/dashboard/admin/analytics",
    },
    {
      title: "Manage Bookings",
      description: "Assign decorators and manage all bookings.",
      linkText: "Manage Bookings →",
      to: "/dashboard/admin/manage-bookings",
    },
    {
      title: "Manage Services",
      description: "Create, edit and control service visibility.",
      linkText: "Manage Services →",
      to: "/dashboard/admin/manage-services",
    },
    {
      title: "Manage Decorators",
      description: "View and manage decorator accounts.",
      linkText: "Manage Decorators →",
      to: "/dashboard/admin/manage-decorators",
    },
    {
      title: "Manage Users",
      description: "Update Users Role To Admin.",
      linkText: "Manage Users →",
      to: "/dashboard/admin/manage-user",
    },
  ];

  const decoratorCards = [
    {
      title: "Assigned Projects",
      description: "See all decoration projects assigned to you.",
      linkText: "View Projects →",
      to: "/dashboard/decorator/projects",
    },
    {
      title: "Today’s Schedule",
      description: "Check your schedule for today’s events.",
      linkText: "View Schedule →",
      to: "/dashboard/decorator/schedule",
    },
    {
      title: "Earnings",
      description: "Check your completed work and earnings.",
      linkText: "View Earnings →",
      to: "/dashboard/decorator/earnings",
    },
  ];

  const roleCards = isAdmin ? adminCards : isDecorator ? decoratorCards : [];
  const allCards = [...commonCards, ...roleCards];

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {isAdmin ? "Admin" : isDecorator ? "Decorator" : "User"}
          </h1>
          <p className="text-gray-600 mb-6 sm:mb-8 max-w-xl sm:max-w-2xl text-sm sm:text-base">
            Manage your profile, view your bookings, and track payments in one place.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {allCards.map((card, ind) => (
            <motion.div
              key={ind}
              variants={cardVariants}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
            >
              <Link to={card.to}>
                <div className="bg-white rounded-xl sm:rounded-3xl shadow-md hover:shadow-xl transition-all duration-200 p-4 sm:p-6 h-48 sm:h-56 flex flex-col cursor-pointer">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                    {card.title}
                  </h2>
                  <p className="text-sm sm:text-sm text-gray-600 flex-1">
                    {card.description}
                  </p>
                  <span className="mt-4 text-[#ff6a4a] font-semibold text-sm">
                    {card.linkText}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default UserDashboard;
