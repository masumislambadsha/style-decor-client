import React from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col min-h-screen bg-gray-50">
        <div className="navbar bg-white border-b border-gray-200 px-6">
          <div className="flex-none">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-ghost lg:hidden"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-black text-gray-800">
              StyleDecor Dashboard
            </h1>
          </div>
        </div>
        <main className="flex-1 p-6 lg:p-10">
          <Outlet />
        </main>
      </div>

      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <aside className="w-64 lg:w-20 xl:w-64 min-h-full bg-linear-to-b from-[#ff6a4a] to-orange-600 text-white">
          <Sidebar />
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
