import React from "react";
import { Outlet, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import Sidebar from "./Sidebar/Sidebar";
import LoadingSpinner from "../../Components/Spinner/LoadingSpinner";

const DashboardLayout = () => {
  const { user, loading } = useAuth();
  const [role, roleLoading] = useRole();
  const navigate = useNavigate();

  if (loading || roleLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  const normalizedRole = (role || "user").toLowerCase();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role={normalizedRole} />
      <main className="flex-1 overflow-auto">
        <div className="p-4 mt-10 md:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
