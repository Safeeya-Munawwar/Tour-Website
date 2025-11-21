import React, { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [sidebar, setSidebar] = useState(false);

  const menuItems = [
    { name: "TAILOR-MADE TOURS" },
    { name: "ITINERARIES" },
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

  return (
    <div className="w-full fixed top-0 left-0 z-[1000] font-[Poppins]">
      {/* Header gradient */}
      <div className="w-full bg-header-gradient px-[6%] pt-6 pb-10">

        {/* ======= TOP ROW ======= */}
        <div className="w-full flex items-center justify-between mb-7 mt-10">

          {/* Language Selector (Desktop only) */}
          <div className="hidden md:flex items-center gap-2 border border-white/60 rounded-md px-4 py-1 text-white text-[15px] h-[42px]">
            🇬🇧 English <IoChevronDown className="text-[16px]" />
          </div>

          {/* Center Logo */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <img src="/logo.png" alt="Logo" className="w-[170px] opacity-95" />
          </div>

          {/* Right Desktop actions */}
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

        {/* ======= DESKTOP NAVIGATION ======= */}
        <nav className="hidden md:flex justify-center gap-10 text-white font-semibold text-[14px] tracking-widest mt-2">
          {menuItems.map((item, idx) => (
            <div key={idx} className="relative">
              <button
                onClick={() => setOpenMenu(openMenu === idx ? null : idx)}
                className="flex items-center gap-1 py-2 px-1 hover:opacity-70 whitespace-nowrap"
              >
                {item.name}
                {item.dropdown && <IoChevronDown className="text-[13px]" />}
              </button>

              {/* Desktop Dropdown */}
              {openMenu === idx && item.dropdown && (
                <div className="absolute top-full left-0 bg-white text-black rounded-md shadow-lg w-48 py-2 z-50">
                  {item.dropdown.map((d, i) => (
                    <div key={i} className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-sm">
                      {d}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* ======= MOBILE SIDEBAR ======= */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-[2000] transform transition-transform duration-300 ${
          sidebar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header with Centered Logo */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <img src="/logo.png" className="w-32 mx-auto" />
          <button className="text-2xl absolute right-4" onClick={() => setSidebar(false)}>
            <FiX />
          </button>
        </div>

        {/* Sidebar Menu Items */}
        <div className="px-6 mt-5">
          {menuItems.map((item, idx) => (
            <div key={idx} className="mb-4">
              <button
                className="flex justify-between items-center w-full text-[15px] font-semibold py-2"
                onClick={() => setOpenMenu(openMenu === idx ? null : idx)}
              >
                {item.name}
                {item.dropdown && <IoChevronDown className="text-lg" />}
              </button>

              {/* Mobile Dropdown */}
              {openMenu === idx && item.dropdown && (
                <div className="ml-3 flex flex-col gap-2 mt-1">
                  {item.dropdown.map((d, i) => (
                    <span key={i} className="text-gray-700 text-[14px]">
                      {d}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Sidebar Bottom */}
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
