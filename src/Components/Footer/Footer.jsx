import React from "react";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10">

        <div className="md:col-span-4">
          <Link to="/" className="flex items-center gap-3 mb-6">
            <Logo />
          </Link>

          <h3 className="text-xl font-bold mb-3">
            Color Your Life With StyleDecor
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Our aim is to make our clients&apos; life easier, maintaining
            quality, and also contribute to the industry with our visionary
            interior solutions.
          </p>
        </div>


        <div className="md:col-span-2">
          <h4 className="text-lg font-bold mb-5 text-white">Residential</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            {[
              "Living Room",
              "Drawing Room",
              "Bedroom",
              "Duplex House",
              "Kitchen",
              "Apartment",
              "Rooftop Garden",
            ].map((item) => (
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


        <div className="md:col-span-2">
          <h4 className="text-lg font-bold mb-5 text-white">Commercial</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            {[
              "Hospital",
              "Islamic Center",
              "Penthouse",
              "Corporate Office",
              "Showroom",
              "Shopping Mall",
            ].map((item) => (
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


        <div className="md:col-span-4 flex flex-col items-start md:items-end">
          <h4 className="text-lg font-bold mb-6">Follow Us On</h4>
          <div className="flex gap-4">
            <a
              href="#"
              aria-label="Facebook"
              className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center  hover:bg-white hover:text-black transition text-xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition text-white/80 text-xl"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
              className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition text-white text-xl"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="w-12 h-12 bg-[red] rounded-full flex items-center justify-center hover:bg-white hover:text-black transition text-white text-xl"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>


      <div className="mt-16 pt-8 border-t border-gray-800 text-center">
        <p className="text-gray-500 text-sm">
          © 2025 StyleDecor. All rights reserved. Developed with ❤️ by MasunIslamBadsha
        </p>
      </div>
    </footer>
  );
};

export default Footer;
