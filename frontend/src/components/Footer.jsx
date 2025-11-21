import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    {
      icon: FaFacebookF,
      url: "https://facebook.com",
      label: "Facebook",
      color: "bg-[#2E5984]",
    },
    {
      icon: FaInstagram,
      url: "https://instagram.com",
      label: "Instagram",
      color: "bg-[#528AA3]",
    },
    {
      icon: FaTwitter,
      url: "https://twitter.com",
      label: "Twitter",
      color: "bg-[#73A5C6]",
    },
    {
      icon: FaTiktok,
      url: "https://tiktok.com",
      label: "TikTok",
      color: "bg-[#1E3F66]",
    },
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
    <footer className="bg-gradient-to-t from-black to-[#1E3F66] text-gray-200 pt-20 pb-12 font-poppins relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-12">
        {/* Logo & Description */}
        <div className="flex flex-col items-center md:items-start space-y-4 md:col-span-1">
          <img src="/Logo.PNG" alt="NetLanka Tours" className="w-36" />
          <p className="text-gray-400 text-sm md:text-base text-center md:text-left leading-relaxed">
            Discover Sri Lanka like never before with NetLanka Tours. Exclusive
            journeys, expert guides, and unforgettable memories.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center md:items-start md:col-span-1">
          <h4 className="text-white font-semibold mb-5 text-lg md:text-xl tracking-wide">
            Quick Links
          </h4>
          <ul className="space-y-3 text-gray-400 text-sm md:text-base">
            {navLinks.map((link, idx) => (
              <li
                key={idx}
                className="hover:text-[#73A5C6] cursor-pointer transition-all duration-300"
              >
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media Vertical with Names and Floating Glow */}
        <div className="flex flex-col items-center md:items-start space-y-6 relative md:col-span-1">
          <h4 className="text-white font-semibold mb-3 text-lg md:text-xl tracking-wide">
            Follow Us
          </h4>
          <div className="flex flex-col space-y-6">
            {socialLinks.map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 relative transition-all duration-500 hover:scale-105"
                  title={social.label}
                >
                  {/* Animated Glow */}
                  <span
                    className={`absolute w-14 h-14 rounded-full ${social.color} opacity-25 animate-pulse-float -z-10`}
                  ></span>

                  {/* Icon */}
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full bg-[#1E3F66] shadow-xl transition-all duration-500 hover:scale-110`}
                  >
                    <Icon className="text-white w-6 h-6 relative z-10" />
                  </div>

                  {/* Social Name */}
                  <span className="text-gray-200 text-sm md:text-base font-medium transition-colors duration-300 hover:text-[#73A5C6]">
                    {social.label}
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-start md:col-span-1">
          <h4 className="text-white font-semibold mb-5 text-lg md:text-xl tracking-wide">
            Contact Us
          </h4>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed text-center md:text-left">
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

        {/* Newsletter / Small Form */}
        <div className="flex flex-col items-center md:items-start md:col-span-1">
          <h4 className="text-white font-semibold mb-5 text-lg md:text-xl tracking-wide">
            Subscribe
          </h4>
          <p className="text-gray-400 text-sm md:text-base mb-4 text-center md:text-left">
            Sign up to receive exclusive offers & travel updates.
          </p>
          <form className="w-full flex flex-col space-y-3 relative">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded bg-[#2E5984] text-gray-100 border border-[#528AA3] focus:outline-none focus:border-[#73A5C6] transition-all"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 rounded bg-[#2E5984] text-gray-100 border border-[#528AA3] focus:outline-none focus:border-[#73A5C6] transition-all"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#73A5C6] to-[#91BAD6] text-black font-semibold py-2 rounded hover:from-[#91BAD6] hover:to-[#73A5C6] transition-all"
            >
              Subscribe
            </button>

            {/* Floating Glow Under Form */}
            <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-3/4 h-2 rounded-full bg-[#73A5C6] opacity-20 animate-pulse-float"></span>
          </form>
        </div>
      </div>

      <hr className="border-[#528AA3] my-10" />

      {/* Footer Bottom */}
      <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs md:text-sm space-y-2 md:space-y-0">
        <p>© 2025 NetLanka Tours. All rights reserved.</p>
        <p>Website Design & Development by NetIT Technology</p>
      </div>
    </footer>
  );
};

export default Footer;
