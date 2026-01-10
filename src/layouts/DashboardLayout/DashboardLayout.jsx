import React from "react";
import { Outlet, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import Sidebar from "./Sidebar/Sidebar";
import LoadingSpinner from "../../Components/Spinner/LoadingSpinner";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../Context/ThemeProvider";
const DashboardLayout = () => {
  const { user, loading } = useAuth();
  const [role, roleLoading] = useRole();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  if (loading || roleLoading) {
    return <LoadingSpinner />;
  }
  if (!user) {
    navigate("/login");
    return null;
  }
  const normalizedRole = (role || "user").toLowerCase();
  return (
    <div className="flex h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Sidebar role={normalizedRole} />
      <main className="flex-1 overflow-auto relative">
        <div className="fixed top-4 right-4 z-30">
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-base-100/50 backdrop-blur-sm text-base-content shadow-md hover:scale-110 transition-all border border-base-content/10 cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 md:w-6 md:h-6" />
            ) : (
              <Sun className="w-5 h-5 md:w-6 md:h-6" />
            )}
          </button>
        </div>
        <div className="p-4 mt-16 md:p-10 ">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default DashboardLayout;