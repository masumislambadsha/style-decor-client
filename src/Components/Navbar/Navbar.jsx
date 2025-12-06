import React from "react";
import { Link, useNavigate, useLocation } from "react-router";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully");
      navigate("/");
    } catch {
      toast.error("Logout failed");
    }
  };

  const menuItems = (
    <>
      <li>
        <Link
          to="/"
          className={`flex items-center gap-4 text-white hover:text-[#ff6a4a] text-lg font-medium ${
            location.pathname === "/" ? "text-[#ff6a4a]" : ""
          }`}
        >
          <span
            className={`text-3xl font-bold ${
              location.pathname === "/" ? "text-[#ff6a4a]" : "text-transparent"
            }`}
          >
            ›
          </span>
          Home
        </Link>
      </li>
      {["Services", "About", "Contact Us"].map((item) => {
        const path =
          item === "Services"
            ? "/services"
            : item === "About"
            ? "/about"
            : "/contact";
        const isActive = location.pathname === path;

        return (
          <li key={item}>
            <Link
              to={path}
              className="flex items-center justify-between text-white hover:text-[#ff6a4a] text-lg font-medium py-3"
            >
              <span className={isActive ? "text-[#ff6a4a]" : ""}>{item}</span>
              <span
                className={`text-3xl ${
                  isActive ? "text-[#ff6a4a]" : "text-gray-500"
                }`}
              >
                +
              </span>
            </Link>
          </li>
        );
      })}
    </>
  );

  return (
    <>
      <div className="navbar  justify-between backdrop-blur-sm fixed top-0 z-40 shadow-sm px-6 lg:px-20 h-20 border-b">
        <div className="navbar-start">
          <Link to="/" className="flex items-center gap-3">
            <div className="relative">
              <div className="w-14 h-14 bg-[#ff6a4a] rounded-full flex items-center justify-center text-white text-3xl font-black shadow-xl">
                S
              </div>
              <div className="absolute -top-1 -right-1 w-7 h-7 bg-white rounded-full border-4 border-[#ff6a4a]"></div>
            </div>
            <div>
              <h1 className="text-2xl font-black text-black leading-none">
                StyleDecor
              </h1>
              <p className="text-xs text-gray-600 font-semibold tracking-wider">
                Interior Solutions
              </p>
            </div>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-12 text-black font-bold text-lg">
            <li>
              <Link
                to="/"
                className={`hover:text-[#ff6a4a] transition ${
                  location.pathname === "/" ? "text-[#ff6a4a]" : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className={`hover:text-[#ff6a4a] transition ${
                  location.pathname === "/services" ? "text-[#ff6a4a]" : ""
                }`}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`hover:text-[#ff6a4a] transition ${
                  location.pathname === "/about" ? "text-[#ff6a4a]" : ""
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`hover:text-[#ff6a4a] transition ${
                  location.pathname === "/contact" ? "text-[#ff6a4a]" : ""
                }`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar-end hidden lg:flex">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="avatar cursor-pointer">
                <div className="w-12 rounded-full ring-4 ring-[#ff6a4a] ring-offset-2">
                  <img
                    src={
                      user.photoURL || "https://i.ibb.co.com/5Y0X5gY/user.png"
                    }
                    alt="Profile"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-4 shadow-lg bg-white rounded-box w-56 mt-3 z-50"
              >
                <li className="font-bold text-black">
                  {user.displayName || "User"}
                </li>
                <div className="divider my-1"></div>
                <li>
                  <Link to="/dashboard" className="font-medium">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 font-medium"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login">
              <button className="btn bg-[#ff6a4a] hover:bg-black text-white font-bold px-10 rounded-none border-none shadow-lg text-lg">
                Login
              </button>
            </Link>
          )}
        </div>

        <div className="lg:hidden">
          <label htmlFor="mobile-drawer" className="btn btn-ghost">
            <svg
              className="w-8 h-8"
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
      </div>

      <div className="drawer lg:hidden">
        <input id="mobile-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side z-50">
          <label
            htmlFor="mobile-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <div className="min-h-full w-80 bg-black text-white p-8 flex flex-col">
            <div className="flex justify-between items-start mb-12">
              <Link to="/" className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-[#ff6a4a] rounded-full flex items-center justify-center text-white text-4xl font-black">
                    S
                  </div>
                  <div className="absolute -top-1 -right-1 w-8 h-8 bg-white rounded-full border-4 border-[#ff6a4a]"></div>
                </div>
                <div>
                  <h1 className="text-3xl font-black">StyleDecor</h1>
                  <p className="text-sm text-gray-400 font-medium">
                    Interior Solutions
                  </p>
                </div>
              </Link>
              <label
                htmlFor="mobile-drawer"
                className="btn btn-ghost btn-circle"
              >
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </label>
            </div>

            <ul className="space-y-8 flex-1">{menuItems}</ul>

            <div className="mt-auto pt-10 border-t border-gray-800">
              {user ? (
                <div className="space-y-6">
                  <Link
                    to="/dashboard"
                    className="block text-xl font-bold hover:text-[#ff6a4a]"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 text-xl font-bold"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login">
                  <button className="btn bg-[#ff6a4a] hover:bg-white hover:text-black text-white font-bold w-full text-xl h-14 rounded-none shadow-xl">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
