import React from "react";
import { Link, useLocation } from "react-router";
import {
  Home, Package, Calendar, CreditCard, Users, Settings,
  BarChart3, Briefcase, Clock, DollarSign, LogOut
} from "lucide-react";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";
import { CgProfile } from "react-icons/cg";


const Sidebar = () => {
  const { logOut } = useAuth();
  const [role] = useRole();
  const location = useLocation();

  const isActive = (path) => location.pathname.startsWith(path);

  const userMenu = [
    { name: "My Profile", path: "/dashboard/profile", icon: CgProfile  },
    { name: "My Bookings", path: "/dashboard/my-bookings", icon: Calendar },
    { name: "Payment History", path: "/dashboard/payment-history", icon: CreditCard },
  ];

  const adminMenu = [
    { name: "Admin Home", path: "/dashboard/admin", icon: Home },
    { name: "Manage Services", path: "/dashboard/admin/services", icon: Package },
    { name: "Manage Decorators", path: "/dashboard/admin/decorators", icon: Users },
    { name: "Manage Bookings", path: "/dashboard/admin/bookings", icon: Briefcase },
    { name: "Analytics", path: "/dashboard/admin/analytics", icon: BarChart3 },
  ];

  const decoratorMenu = [
    { name: "Dashboard", path: "/dashboard/decorator", icon: Home },
    { name: "Assigned Projects", path: "/dashboard/decorator/projects", icon: Briefcase },
    { name: "Today's Schedule", path: "/dashboard/decorator/schedule", icon: Clock },
    { name: "Earnings", path: "/dashboard/decorator/earnings", icon: DollarSign },
  ];

  const menuItems = role === "admin" ? adminMenu : role === "decorator" ? decoratorMenu : userMenu;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-6 border-b border-white/20">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl font-black text-[#ff6a4a]">S</span>
          </div>
          <div className="hidden xl:block">
            <h1 className="text-2xl font-black">StyleDecor</h1>
            <p className="text-xs opacity-90">Dashboard</p>
          </div>
        </Link>
      </div>

      <div className="px-6 py-4 hidden xl:block">
        <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-bold uppercase">
          {role || "User"}
        </span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <div
              key={item.path}
              className="tooltip tooltip-right lg:tooltip-none"
              data-tip={item.name}
            >
              <Link
                to={item.path}
                className={`flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-200 font-medium text-lg ${
                  active
                    ? "bg-white text-[#ff6a4a] shadow-xl"
                    : "hover:bg-white/20"
                }`}
              >
                <Icon size={24} />
                <span className="hidden xl:block">{item.name}</span>
              </Link>
            </div>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-6 border-t border-white/20">
        <div className="tooltip tooltip-right lg:tooltip-none" data-tip="Logout">
          <button
            onClick={logOut}
            className="flex items-center gap-4 px-5 py-3.5 rounded-xl hover:bg-white/20 transition-all w-full text-lg font-medium"
          >
            <LogOut size={24} />
            <span className="hidden xl:block">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
