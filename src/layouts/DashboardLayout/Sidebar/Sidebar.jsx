import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import {
  User,
  BookOpen,
  CreditCard,
  BarChart3,
  Briefcase,
  LogOut,
  Menu,
  X,
  CalendarHeartIcon,
  CalendarHeart,
  LayoutDashboard,
} from "lucide-react";
import useAuth from "../../../Hooks/useAuth";
import { GoSidebarCollapse } from "react-icons/go";
import Logo from "../../../Components/Logo/Logo";
import CollapsedLogo from "../../../Components/Logo/CollapsedLogo";
import { FaServicestack, FaUser, FaUserPlus } from "react-icons/fa";

const Sidebar = ({ role = "user" }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { logOut } = useAuth();

  const isActive = (path) => location.pathname === path;

  const menuGroups = {
    user: [
      { label: "Dasboard", path: "/dashboard", icon: LayoutDashboard },
      { label: "Profile", path: "/dashboard/profile", icon: User },
      { label: "My Bookings", path: "/dashboard/bookings", icon: BookOpen },
      {
        label: "Payment History",
        path: "/dashboard/payment-history",
        icon: CreditCard,
      },
    ],
    admin: [
       { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      {
        label: "Analytics",
        path: "/dashboard/admin/analytics",
        icon: BarChart3,
      },
      {
        label: "Manage Bookings",
        path: "/dashboard/admin/manage-bookings",
        icon: Briefcase,
      },
      {
        label: "Manage Services",
        path: "/dashboard/admin/manage-services",
        icon: FaServicestack ,
      },
      {
        label: "Manage Decorators",
        path: "/dashboard/admin/manage-decorators",
        icon: FaUser,
      },
      {
        label: "Accept Decorators",
        path: "/dashboard/admin/decorator-applications",
        icon: FaUserPlus,
      },
    ],
    decorator: [
       { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
      {
        label: "Assigned Projects",
        path: "/dashboard/decorator/projects",
        icon: Briefcase,
      },
      { label: "Today's Schedule",
        path: "/dashboard/decorator/schedule",
        icon: CalendarHeart
      },
      { label: "Earnings",
        path: "/dashboard/decorator/earnings",
        icon: CreditCard
      },
    ],
  };

  const currentMenu = menuGroups[role] || menuGroups.user;

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed md:top-20 md:left-4 right-0 z-50 btn btn-ghost btn-circle"
      >
        {mobileOpen ? <X /> : <Menu />}
      </button>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className={`hidden md:flex items-center justify-center fixed top-22.5 z-30 h-9 w-9 rounded-full bg-gray-800 text-gray-200 border border-gray-600 shadow cursor-pointer transition-all hover:scale-105
    ${collapsed ? "left-20" : "left-64"}`}
      >
        <div className="flex gap-1">
          <GoSidebarCollapse size={24} />
        </div>
      </button>

      <aside
        className={`fixed md:static inset-y-0 left-0 bg-black text-white transform transition-all z-40
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        ${collapsed ? "md:w-20" : "md:w-64"} w-64`}
      >
        <div className="p-6 border-b border-gray-700 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3">
            {!collapsed ? <Logo /> : <CollapsedLogo />}
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          {currentMenu.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors
                  ${
                    active
                      ? "bg-[#ff6a4a] text-white"
                      : "text-gray-300 hover:bg-gray-900"
                  }`}
              >
                <Icon size={20} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-0 right-0 px-4">
          <button
            onClick={logOut}
            className="flex items-center gap-3 w-full px-3 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition text-sm"
          >
            <LogOut size={20} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
