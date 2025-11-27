import React, { useState, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(null);
  const [sidebar, setSidebar] = useState(false);

  // ⭐ NEW: Scroll state
  const [scrolled, setScrolled] = useState(false);

  // ⭐ Detect Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 120) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "HOME" },
    { name: "TAILOR-MADE TOURS" },
    { name: "DESTINATIONS" },
    { name: "TOURS", dropdown: ["Day Tours", "Round Tours"] },
    {
      name: "OUR STORY",
      dropdown: ["About", "Our Team", "Our Journey", "Community Impact"],
    },
    { name: "BLOG" },
    { name: "EXPERIENCE" },
    { name: "CONTACT US" },
  ];

  const getPath = (text) => {
    switch (text) {
      case "HOME":
        return "/";
      case "TAILOR-MADE TOURS":
        return "/tailor-made-tours";
      case "DESTINATIONS":
        return "/destinations";
      case "TOURS":
        return "/tours";
      case "Day Tours":
        return "/day-tours";
      case "Round Tours":
        return "/round-tours";
      case "OUR STORY":
        return "/our-story";
      case "About":
        return "/about";
      case "Our Team":
        return "/our-team";
      case "Our Journey":
        return "/our-journey";
      case "Community Impact":
        return "/community-impact";
      case "BLOG":
        return "/blog";
      case "EXPERIENCE":
        return "/experience";
      case "CONTACT US":
        return "/contact";
      default:
        return "/";
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".nav-link") &&
        !event.target.closest(".dropdown")
      ) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="w-full fixed top-0 left-0 z-[1000] font-[Poppins]">

      {/* ⭐ HEADER AREA WITH SCROLL EFFECT */}
      <div
        className={`w-full px-[6%] transition-all duration-300 
        ${scrolled ? "bg-black/90 py-6 shadow-lg" : "bg-header-gradient pt-6 pb-10"}
      `}
      >
        {/* ⭐ TOP ROW (hidden when scrolled) */}
        <div
          className={`w-full flex items-center justify-between transition-all duration-300 
          ${
            scrolled
              ? "opacity-0 h-0 overflow-hidden mb-0 mt-0"
              : "opacity-100 h-auto mb-7 mt-10"
          }
        `}
        >
          <div className="hidden md:flex items-center gap-2 border border-white/60 rounded-md px-4 py-1 text-white text-[15px] h-[42px]">
            🇬🇧 English <IoChevronDown className="text-[16px]" />
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <img src="/images/logo.png" alt="Logo" className="w-[170px] opacity-95" />
          </div>


          <div className="hidden md:flex items-center gap-8 text-white">
            <div className="flex items-center gap-2 text-[15px]">
              <FaWhatsapp className="text-xl" />
              (+94) 77 730 0852
            </div>
            <button className="px-6 py-[9px] border border-white text-white rounded-full text-[14px] font-medium hover:bg-white hover:text-black transition">
              ENQUIRE NOW
            </button>
          </div>

          <button
            className="text-white text-3xl md:hidden"
            onClick={() => setSidebar(true)}
          >
            <FiMenu />
          </button>
        </div>

{/* ⭐ NAV ROW — ALWAYS VISIBLE */}
<nav
  className={`hidden md:flex items-center justify-center relative text-white font-semibold 
  text-[14px] tracking-widest transition-all duration-300
  ${scrolled ? "mt-2 px-4" : "mt-6"}
  `}
>
  {/* ⭐ LOGO — ONLY VISIBLE WHEN SCROLLED */}
  <div
    className={`absolute flex items-center transition-all duration-300
      ${scrolled ? "left-[6%] opacity-100" : "opacity-0 pointer-events-none"}
    `}
  >
    <img
      src="/images/logo.png"
      alt="logo"
      className={`transition-all duration-300
        ${scrolled ? "w-[100px]" : "w-[0px]"}
      `}
    />
  </div>

  {/* ⭐ CENTER MENU */}
  <div className="flex justify-center gap-10 pl-[180px]">
    {menuItems.map((item, idx) => (
      <div key={idx} className="relative">
        {!item.dropdown ? (
          <Link
            to={getPath(item.name)}
            className={`nav-link flex items-center gap-1 py-0 px-1 whitespace-nowrap ${
              window.location.pathname === getPath(item.name) ? "active" : ""
            }`}
          >
            {item.name}
          </Link>
        ) : (
          <>
            <button
              onClick={() => setOpenMenu(openMenu === idx ? null : idx)}
              className="nav-link flex items-center gap-1 py-0 px-1 whitespace-nowrap"
            >
              {item.name}
              <IoChevronDown className="text-[13px] mt-[1px]" />
            </button>

            {openMenu === idx && (
              <div className="dropdown absolute top-full left-0 bg-white text-black rounded-md shadow-lg w-48 py-2 z-50">
                {item.dropdown.map((d, i) => (
                  <Link
                    key={i}
                    to={getPath(d)}
                    className="block px-4 py-2 hover:bg-gray-200 cursor-pointer text-sm"
                  >
                    {d}
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    ))}
  </div>
</nav>


      </div>

      {/* ⭐ MOBILE SIDEBAR (Glassmorphism Style) */}
<div
  className={`fixed top-0 right-0 h-full w-[78%] max-w-[300px] 
  backdrop-blur-xl bg-black/70 border-l border-white/30
  shadow-[0_8px_30px_rgba(0,0,0,0.25)]
  z-[2000] transition-transform duration-500
  ${sidebar ? "translate-x-0" : "translate-x-full"}
  `}
>
  {/* Header */}
  <div className="flex items-center justify-between px-5 py-5 border-b border-white/20">
    <img src="/images/logo.png" alt="logo" className="w-28" />
    <button
      onClick={() => setSidebar(false)}
      className="text-white text-3xl"
    >
      <FiX />
    </button>
  </div>

  {/* MENU */}
  <div className="px-6 mt-6 text-white">
    {menuItems.map((item, idx) => (
      <div key={idx} className="mb-5">
        {!item.dropdown ? (
          <Link
            to={getPath(item.name)}
            onClick={() => setSidebar(false)}
            className="block text-[16px] tracking-wide font-medium py-2"
          >
            {item.name}
          </Link>
        ) : (
          <>
            <button
              onClick={() => setMobileOpen(mobileOpen === idx ? null : idx)}
              className="flex justify-between items-center w-full text-[16px] font-medium py-2"
            >
              {item.name}
              <IoChevronDown
                className={`transition-transform duration-300 ${
                  mobileOpen === idx ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown */}
            {mobileOpen === idx && (
              <div className="ml-3 mt-2 flex flex-col gap-2">
                {item.dropdown.map((d, i) => (
                  <Link
                    key={i}
                    to={getPath(d)}
                    className="text-white/80 text-[15px]"
                    onClick={() => setSidebar(false)}
                  >
                    {d}
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    ))}
  </div>

  {/* Footer */}
  <div className="px-6 mt-10 text-white">
    <div className="flex items-center gap-2 mb-4 text-white">
      <FaWhatsapp className="text-2xl text-green-400" />
      (+94) 77 730 0852
    </div>

    <button className="w-full py-2 border border-white/40 bg-white/10 rounded-full">
      ENQUIRE NOW
    </button>
  </div>
</div>

    </div>
  );
}
