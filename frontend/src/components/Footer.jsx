import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    { icon: FaFacebookF, url: "https://facebook.com", label: "Facebook" },
    { icon: FaInstagram, url: "https://instagram.com", label: "Instagram" },
    { icon: FaTwitter, url: "https://twitter.com", label: "Twitter" },
    { icon: FaTiktok, url: "https://tiktok.com", label: "TikTok" },
  ];

  const navLinks = [
    "Home",
    "About Us",
    "Tours",
    "Destinations",
    "Activities",
    "Gallery",
    "Contact Us",
  ];

  return (
    <footer className="bg-black text-gray-200 pt-16 pb-10 font-poppins">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Logo & Description */}
        <div className="flex flex-col items-center md:items-start space-y-3 md:col-span-1">
          <img src="/images/Logo.png" alt="NetLanka Tours" className="w-36" />
          <p className="text-gray-400 text-sm text-center md:text-left leading-relaxed">
            Discover Sri Lanka like never before with NetLanka Tours. Exclusive
            journeys, expert guides, and unforgettable memories.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center md:items-start md:col-span-1">
          <h4 className="text-white font-semibold mb-4 text-lg tracking-wide">
            Quick Links
          </h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            {navLinks.map((link, idx) => (
              <li
                key={idx}
                className="hover:text-red-500 cursor-pointer transition-colors duration-300"
              >
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center md:items-start md:col-span-1">
          <h4 className="text-white font-semibold mb-4 text-lg tracking-wide">
            Follow Us
          </h4>
          <div className="flex space-x-3">
            {socialLinks.map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-600 transition-colors duration-300"
                  title={social.label}
                >
                  <Icon className="text-white w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-start md:col-span-1">
          <h4 className="text-white font-semibold mb-4 text-lg tracking-wide">
            Contact Us
          </h4>
          <p className="text-gray-400 text-sm leading-relaxed text-center md:text-left">
            10/20, Kandy Road, Ampitiya,
            <br />
            Kandy, Sri Lanka
            <br />
            <span className="block mt-2">Phone: +94 771 234 567</span>
            <span className="block mt-1">Guide Team: +94 777 654 321</span>
            <a
              href="mailto:info@netlankatours.com"
              className="hover:underline block mt-1"
            >
              info@netlankatours.com
            </a>
          </p>
        </div>

        {/* Simple Newsletter Form */}
        <div className="flex flex-col items-center md:items-start md:col-span-1">
          <h4 className="text-white font-semibold mb-4 text-lg tracking-wide">
            Subscribe
          </h4>
          <p className="text-gray-400 text-sm mb-3 text-center md:text-left">
            Get exclusive offers & travel updates.
          </p>
          <form className="flex flex-col space-y-2 w-full">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-red-500 transition-all"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-red-500 transition-all"
            />
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <hr className="border-gray-700 my-8" />

      {/* Footer Bottom */}
      <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs md:text-sm space-y-2 md:space-y-0">
        <p>© 2025 NetLanka Tours. All rights reserved.</p>
        <p>Website Design & Development by NetIT Technology</p>
      </div>
    </footer>
  );
};

export default Footer;
