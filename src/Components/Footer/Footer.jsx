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
          <h4 className="text-lg font-bold mb-6 text-white tracking-tight uppercase text-xs">Company</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            {[
              { label: "About Us", path: "/about" },
              { label: "Our Blog", path: "/blog" },
              { label: "Service Categories", path: "/services" },
              { label: "Our Coverage", path: "/service-coverage" },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  to={link.path}
                  className="hover:text-[#ff6a4a] transition-all duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <h4 className="text-lg font-bold mb-6 text-white tracking-tight uppercase text-xs">Support</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
             {[
              { label: "Help Center", path: "/help" },
              { label: "Contact Us", path: "/contact" },
              { label: "Privacy Policy", path: "/privacy" },
              { label: "Terms of Service", path: "/terms" },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  to={link.path}
                  className="hover:text-[#ff6a4a] transition-all duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4 flex flex-col items-start md:items-end">
          <h4 className="text-lg font-bold mb-6 text-white tracking-tight uppercase text-xs">Connect With Us</h4>
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-900 border border-gray-800 rounded-2xl flex items-center justify-center hover:bg-[#ff6a4a] hover:border-[#ff6a4a] hover:text-white transition-all duration-300 transform hover:-translate-y-1"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-900 border border-gray-800 rounded-2xl flex items-center justify-center hover:bg-[#ff6a4a] hover:border-[#ff6a4a] hover:text-white transition-all duration-300 transform hover:-translate-y-1"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-900 border border-gray-800 rounded-2xl flex items-center justify-center hover:bg-[#ff6a4a] hover:border-[#ff6a4a] hover:text-white transition-all duration-300 transform hover:-translate-y-1"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-900 border border-gray-800 rounded-2xl flex items-center justify-center hover:bg-[#ff6a4a] hover:border-[#ff6a4a] hover:text-white transition-all duration-300 transform hover:-translate-y-1"
            >
              <FaYoutube />
            </a>
          </div>
          <div className="mt-8 text-right">
            <p className="text-gray-500 text-xs italic">
              "Transforming spaces, one pixel at a time."
            </p>
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