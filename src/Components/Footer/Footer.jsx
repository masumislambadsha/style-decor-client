import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10">

        {/* Logo + Description - Left Column */}
        <div className="md:col-span-4">
          <Link to="/" className="flex items-center gap-3 mb-6">
            <div className="relative">
              <div className="w-14 h-14 bg-[#ff6a4a] rounded-full flex items-center justify-center text-white text-3xl font-black">
                S
              </div>
              <div className="absolute -top-1 -right-1 w-7 h-7 bg-white rounded-full border-4 border-[#ff6a4a]"></div>
            </div>
            <div>
              <h1 className="text-3xl font-black leading-none">StyleDecor</h1>
              <p className="text-xs text-gray-500 tracking-wider">INTERIOR SOLUTIONS</p>
            </div>
          </Link>

          <h3 className="text-xl font-bold mb-3">Color Your Life With StyleDecor</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Our aim is to make our clients' life easier, maintaining quality, and also contribute to
            the industry with our visionary interior solutions.
          </p>
        </div>

        {/* Residential Links */}
        <div className="md:col-span-2">
          <h4 className="text-lg font-bold mb-5 text-white">Residential</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            {["Living Room", "Drawing Room", "Bedroom", "Duplex House", "Kitchen", "Apartment", "Rooftop Garden"].map((item) => (
              <li key={item}>
                <Link
                  to="/services"
                  className="hover:text-[#ff6a4a] transition relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-px after:bg-[#ff6a4a] after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Commercial Links */}
        <div className="md:col-span-2">
          <h4 className="text-lg font-bold mb-5 text-white">Commercial</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            {["Hospital", "Islamic Center", "Penthouse", "Corporate Office", "Showroom", "Shopping Mall"].map((item) => (
              <li key={item}>
                <Link
                  to="/services"
                  className="hover:text-[#ff6a4a] transition relative after:absolute after:left-0 after:bottom-0 after:w-0 after:h-px after:bg-[#ff6a4a] after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Follow Us + Social Icons */}
        <div className="md:col-span-4 flex flex-col items-start md:items-end">
          <h4 className="text-lg font-bold mb-6">Follow Us On</h4>
          <div className="flex gap-4">
            <a href="#" className="w-12 h-12 bg-[#ff6a4a] rounded-full flex items-center justify-center hover:bg-white hover:text-black transition text-white text-xl">
              f
            </a>
            <a href="#" className="w-12 h-12 bg-[#ff6a4a] rounded-full flex items-center justify-center hover:bg-white hover:text-black transition text-white text-xl">
              in
            </a>
            <a href="#" className="w-12 h-12 bg-[#ff6a4a] rounded-full flex items-center justify-center hover:bg-white hover:text-black transition text-white text-xl">
              ig
            </a>
            <a href="#" className="w-12 h-12 bg-[#ff6a4a] rounded-full flex items-center justify-center hover:bg-white hover:text-black transition text-white text-xl">
              yt
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-16 pt-8 border-t border-gray-800 text-center">
        <p className="text-gray-500 text-sm">
          © 2025 StyleDecor. All rights reserved. Developed with ❤️ by YourName
        </p>
      </div>
    </footer>
  );
};

export default Footer;
