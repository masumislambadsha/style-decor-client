import React from "react";
import { NavLink, Link, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import toast from "react-hot-toast";
import Logo from "../Logo/Logo";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [role] = useRole();
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

  const menuItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-4 text-white hover:text-[#ff6a4a] text-lg font-medium ${
              isActive ? "text-[#ff6a4a]" : ""
            }`
          }
        >
          {({ isActive }) => (
            <>
              <span
                className={`text-3xl font-bold transition-all duration-200 ${
                  isActive ? "text-[#ff6a4a]" : "text-transparent bg-clip-text bg-linear-to-r from-transparent to-transparent"
                }`}
              >
                →
              </span>
              Home
            </>
          )}
        </NavLink>
      </li>

      {["Services", "About", "Contact Us", "Coverage"].map((item) => {
        const path =
          item === "Services"
            ? "/services"
            : item === "About"
            ? "/about"
            : item === "Coverage"
            ? "/service-coverage"
            : "/contact";

        return (
          <li key={item}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `flex items-center gap-4 justify-between text-white hover:text-[#ff6a4a] text-lg font-medium py-3 transition-all duration-200 ${
                  isActive ? "text-[#ff6a4a]" : ""
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="flex items-center gap-4">
                    <span
                      className={`text-3xl font-bold transition-all duration-200 ${
                        isActive ? "text-[#ff6a4a]" : "text-transparent bg-clip-text bg-linear-to-r from-transparent to-transparent"
                      }`}
                    >
                      →
                    </span>
                    <span>{item}</span>
                  </span>
                  <span
                    className={`text-3xl transition-all duration-200 ${
                      isActive ? "text-[#ff6a4a]" : "text-gray-500"
                    }`}
                  >
                    +
                  </span>
                </>
              )}
            </NavLink>
          </li>
        );
      })}
    </>
  );

  return (
    <>
      <div className="navbar  justify-between backdrop-blur-sm fixed top-0 z-400000 shadow-sm px-6 lg:px-20 h-20 border-b">
        <div className="navbar-start">
          <Link to="/" className="flex items-center gap-3">
            <div className="relative">
              <Logo />
            </div>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-12 text-black font-bold text-lg">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-4 hover:text-[#ff6a4a] transition-all duration-200 ${
                    isActive ? "text-[#ff6a4a] font-bold" : ""
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `flex items-center gap-4 hover:text-[#ff6a4a] transition-all duration-200 ${
                    isActive ? "text-[#ff6a4a] font-bold" : ""
                  }`
                }
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `flex items-center gap-4 hover:text-[#ff6a4a] transition-all duration-200 ${
                    isActive ? "text-[#ff6a4a] font-bold" : ""
                  }`
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `flex items-center gap-4 hover:text-[#ff6a4a] transition-all duration-200 ${
                    isActive ? "text-[#ff6a4a] font-bold" : ""
                  }`
                }
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/service-coverage"
                className={({ isActive }) =>
                  `flex items-center gap-4 hover:text-[#ff6a4a] transition-all duration-200 ${
                    isActive ? "text-[#ff6a4a] font-bold" : ""
                  }`
                }
              >
                Coverage
              </NavLink>
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
                      user.photoURL || user.photo || "https://i.ibb.co.com/5Y0X5gY/user.png"
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
                {role !== "decorator" && (
                  <li>
                    <Link
                      to="/be-a-decorator"
                      className="font-medium text-[#ff6a4a]"
                    >
                      Be a Decorator
                    </Link>
                  </li>
                )}
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
              <button className="btn bg-[#ff6a4a] hover:bg-black text-white font-bold px-10 rounded-lg border-none shadow-lg text-lg">
                Login
              </button>
            </Link>
          )}
        </div>

        <div className="lg:hidden">
  <label htmlFor="mobile-drawer" className="btn btn-ghost">
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault(); // stop scroll-to-top
        const checkbox = document.getElementById("mobile-drawer");
        if (checkbox) checkbox.checked = !checkbox.checked;
      }}
      className="w-8 h-8 flex items-center justify-center"
    >
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
    </button>
  </label>
</div>

      </div>

      <div className="drawer lg:hidden">
        <input
          id="mobile-drawer"
          type="checkbox"
          className="input outline-0 drawer-toggle"
        />
        <div className="drawer-side z-50">
          <label
            htmlFor="mobile-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <div className="min-h-full w-80 bg-black text-white p-8 pt-10 flex flex-col">
            <div className="flex justify-between items-start mb-12 relative">
              <label
                htmlFor="mobile-drawer"
                className="btn btn-ghost btn-circle absolute -right-5 top-10"
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
                  {role !== "decorator" && (
                    <Link
                      to="/be-a-decorator"
                      className="block text-xl font-bold text-[#ff6a4a]"
                    >
                      Be a Decorator
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-red-500 text-xl font-bold"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login">
                  <button className="btn bg-[#ff6a4a] hover:bg:white hover:text-black text-white font-bold w-full rounded-lg text-xl h-14  shadow-xl cursor-pointer border-0">
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
