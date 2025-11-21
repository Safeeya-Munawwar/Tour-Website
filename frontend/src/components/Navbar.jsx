import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTiktok, FaTripadvisor } from "react-icons/fa";

const Navbar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Packages", path: "/packages" },
    { name: "Destinations", path: "/destinations" },
    { name: "Services", path: "/services" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    { icon: FaFacebookF, url: "https://facebook.com", label: "Facebook" },
    { icon: FaInstagram, url: "https://instagram.com", label: "Instagram" },
    { icon: FaTiktok, url: "https://tiktok.com", label: "TikTok" },
    { icon: FaTripadvisor, url: "https://tripadvisor.com", label: "Tripadvisor" },
  ];

  return (
    <nav className="bg-black text-gray-200 px-6 py-4 flex items-center justify-between font-poppins shadow-lg">
      {/* Logo */}
      <div className="flex items-center space-x-3">
       <img src="/Logo.PNG" alt="NetLanka Tours" className="h-10 w-auto" />
        <span className="text-gray-200 font-bold text-xl">NetLanka Tours</span>
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex items-center space-x-6 text-gray-300">
        {navLinks.map((link, idx) => (
          <li key={idx}>
            <Link
              to={link.path}
              className="hover:text-[#91BAD6] transition-colors duration-300"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Social Icons */}
      <div className="hidden md:flex items-center space-x-4">
        {socialLinks.map((social, idx) => {
          const Icon = social.icon;
          return (
            <a
              key={idx}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#91BAD6] transition-colors duration-300"
              title={social.label}
            >
              <Icon className="w-5 h-5" />
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
