import React from "react";
import useRole from "../../../Hooks/useRole";
import LoadingSpinner from "../../../Components/Spinner/LoadingSpinner";
import UserDashboard from "./UserDashboard/UserDashboard";
import DecoratorDashboard from "../DecoratorDashboard/DecoratorDashboard";
import Analytics from "../AdminDashboard/Analytics/Analytics";

const DashboardHome = () => {
  const [role, isLoading] = useRole();

  if (isLoading) return <LoadingSpinner />;

  const normalizedRole = (role || "user").toLowerCase();

  if (normalizedRole.includes("admin")) {
    return <Analytics />;
  }

  if (normalizedRole.includes("decorator")) {
    return <DecoratorDashboard />;
  }

  return <UserDashboard />;
};

export default DashboardHome;
