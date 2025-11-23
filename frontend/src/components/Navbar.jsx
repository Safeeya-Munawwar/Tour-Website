import React, { useState, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [sidebar, setSidebar] = useState(false);

  const menuItems = [
    { name: "HOME" },
    { name: "TAILOR-MADE TOURS" },
    { name: "DESTINATIONS" },
    {
      name: "TOURS",
      dropdown: ["City Tours", "Round Tours"],
    },
    {
      name: "OUR STORY",
      dropdown: ["About", "Our Team", "Blooming Smiles", "Little Hearts Projects"],
    },
    { name: "BLOG" },
    { name: "EXPERIENCE" },
    { name: "CONTACT US" },
  ];

  // Map all menu and dropdown items to paths
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
      case "City Tours":
        return "/city-tours";
      case "Round Tours":
        return "/round-tours";
      case "OUR STORY":
      case "About":
        return "/about";
      case "Our Team":
        return "/our-team";
      case "Blooming Smiles":
        return "/blooming-smiles";
      case "Little Hearts Projects":
        return "/little-hearts-projects";
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
      {/* Header gradient */}
      <div className="w-full bg-header-gradient px-[6%] pt-6 pb-10">
        {/* Top Row */}
        <div className="w-full flex items-center justify-between mb-7 mt-10">
          {/* Language Selector */}
          <div className="hidden md:flex items-center gap-2 border border-white/60 rounded-md px-4 py-1 text-white text-[15px] h-[42px]">
            🇬🇧 English <IoChevronDown className="text-[16px]" />
          </div>

          {/* Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <img src="/logo.png" alt="Logo" className="w-[170px] opacity-95" />
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-8 text-white">
            <div className="flex items-center gap-2 text-[15px]">
              <FaWhatsapp className="text-xl" />
              (+94) 77 730 0852
            </div>
            <button className="px-6 py-[9px] border border-white text-white rounded-full text-[14px] font-medium hover:bg-white hover:text-black transition">
              ENQUIRE NOW
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <button
            className="text-white text-3xl md:hidden"
            onClick={() => setSidebar(true)}
          >
            <FiMenu />
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex justify-center gap-10 text-white font-semibold text-[14px] tracking-widest mt-2">
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
                    onClick={() =>
                      setOpenMenu(openMenu === idx ? null : idx)
                    }
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
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-[2000] transform transition-transform duration-300 ${
          sidebar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b relative">
          <img src="/logo.png" className="w-32 mx-auto" />
          <button
            className="text-2xl absolute right-4"
            onClick={() => setSidebar(false)}
          >
            <FiX />
          </button>
        </div>

        <div className="px-6 mt-5">
          {menuItems.map((item, idx) => (
            <div key={idx} className="mb-4">
              {!item.dropdown ? (
                <Link
                  to={getPath(item.name)}
                  className="flex justify-between items-center w-full text-[15px] font-semibold py-2 text-gray-700"
                  onClick={() => setSidebar(false)}
                >
                  {item.name}
                </Link>
              ) : (
                <>
                  <button
                    className="flex justify-between items-center w-full text-[15px] font-semibold py-2"
                    onClick={() =>
                      setOpenMenu(openMenu === idx ? null : idx)
                    }
                  >
                    {item.name}
                    <IoChevronDown className="text-lg" />
                  </button>

                  {openMenu === idx && (
                    <div className="ml-3 flex flex-col gap-2 mt-1">
                      {item.dropdown.map((d, i) => (
                        <Link
                          key={i}
                          to={getPath(d)}
                          className="text-gray-700 text-[14px]"
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

        <div className="px-6 mt-10">
          <div className="flex items-center gap-2 text-black mb-4">
            <FaWhatsapp className="text-xl text-green-600" />
            (+94) 77 730 0852
          </div>
          <button className="w-full py-2 border border-black text-black rounded-full">
            ENQUIRE NOW
          </button>
        </div>
      </div>
    </div>
  );
}
