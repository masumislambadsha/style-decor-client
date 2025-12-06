// src/components/Navbar/Navbar.jsx

import React from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully");
      navigate("/");
    } catch {
      toast.error("Logout failed");
    }
  };

  const navLinks = (
    <>
      <li>
        <Link
          to="/"
          className="text-white hover:text-[#ff6a4a] flex items-center gap-3 text-lg font-medium"
        >
          <span className="text-[#ff6a4a] text-xl">›</span> Home
        </Link>
      </li>
      <li>
        <Link
          to="/services"
          className="text-white hover:text-[#ff6a4a] flex items-center justify-between text-lg font-medium"
        >
          Services <span className="text-2xl">+</span>
        </Link>
      </li>
      <li>
        <Link
          to="/about"
          className="text-white hover:text-[#ff6a4a] flex items-center justify-between text-lg font-medium"
        >
          About <span className="text-2xl">+</span>
        </Link>
      </li>
      <li>
        <Link
          to="/contact"
          className="text-white hover:text-[#ff6a4a] flex items-center justify-between text-lg font-medium"
        >
          Contact Us <span className="text-2xl">+</span>
        </Link>
      </li>
      <li>
        <Link
          to="/contact"
          className="text-white hover:text-[#ff6a4a] flex items-center justify-between text-lg font-medium"
        >
          Coverage <span className="text-2xl">+</span>
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-white shadow-sm fixed top-0 z-50 px-4 lg:px-20 border-b">
      {/* Desktop Logo */}
      <div className="navbar-start">
        <Link to="/" className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 bg-[#ff6a4a] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              S
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full border-4 border-[#ff6a4a]"></div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-black leading-none">
              StyleDecor
            </h1>
            <p className="text-xs text-gray-600 font-medium">
              Interior Solutions
            </p>
          </div>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-black font-semibold text-lg gap-10">
          <li>
            <Link to="/" className="hover:text-[#ff6a4a] transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/services" className="hover:text-[#ff6a4a] transition">
              Services
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-[#ff6a4a] transition">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-[#ff6a4a] transition">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-[#ff6a4a] transition">
              Coverage
            </Link>
          </li>
        </ul>
      </div>

      {/* Desktop Login / Profile */}
      <div className="navbar-end">
        <div className="hidden lg:block">
          {user ? (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost avatar rounded-full p-1"
              >
                <div className="w-11 h-11 rounded-full ring-4 ring-[#ff6a4a] ring-offset-2 overflow-hidden">
                  <img
                    src={
                      user.photoURL || "https://i.ibb.co.com/5Y0X5gY/user.png"
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-4 shadow bg-white rounded-box w-52 z-10 mt-2"
              >
                <li className="menu-title text-black font-bold">
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
                    className="text-red-600 font-medium hover:bg-red-50"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login">
              <button className="btn bg-[#ff6a4a] hover:bg-black text-white font-bold px-8 rounded-none border-none shadow-md">
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="dropdown dropdown-end lg:hidden">
          <label tabIndex={0} className="btn btn-ghost">
            <svg
              className="w-7 h-7 text-black"
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

          {/* Mobile Menu - EXACTLY like rongininterior.com */}
          <ul
            tabIndex={0}
            className="menu dropdown-content mt-3 z-50 p-8 shadow-lg bg-black text-white rounded-box w-80 right-0"
            style={{ minHeight: "100vh" }}
          >
            <div className="flex justify-between items-center mb-8">
              <Link to="/" className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-14 h-14 bg-[#ff6a4a] rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    S
                  </div>
                  <div className="absolute -top-1 -right-1 w-7 h-7 bg-white rounded-full border-4 border-[#ff6a4a]"></div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">StyleDecor</h1>
                  <p className="text-sm text-gray-400">Interior Solutions</p>
                </div>
              </Link>
              <label tabIndex={0} className="btn btn-ghost btn-circle"></label>
            </div>

            <div className="space-y-6 text-left">{navLinks}</div>

            <div className="mt-12">
              {user ? (
                <div className="space-y-4">
                  <Link
                    to="/dashboard"
                    className="block text-white text-lg font-medium hover:text-[#ff6a4a]"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 text-lg font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login">
                  <button className="btn bg-[#ff6a4a] hover:bg-white hover:text-black text-white font-bold w-full rounded-none">
                    Login
                  </button>
                </Link>
              )}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
