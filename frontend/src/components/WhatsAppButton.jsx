import React, { useEffect, useState } from "react";
import {
  FaWhatsapp,
  FaGlobeAmericas,
  FaPlane,
  FaStar,
  FaCompass,
  FaChevronUp,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { axiosInstance } from "../lib/axios";

export default function WhatsAppFAB() {
  const location = useLocation();
  const [phone, setPhone] = useState("94729171089");
  const [tourTitle, setTourTitle] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // ---------------- Get WhatsApp Number ----------------
  useEffect(() => {
    axiosInstance
      .get("/contact")
      .then((res) => {
        const p = res.data?.whatsapp || res.data?.phone;
        if (p) setPhone(p.replace(/\D/g, ""));        
      })
      .catch(() => setPhone("94729171089"));
  }, []);

  // ---------------- Get tour title from page ----------------
  useEffect(() => {
    const path = location.pathname;
    const parts = path.split("/").filter(Boolean);
    const id = parts[parts.length - 1];

    if (path.startsWith("/day-tour-detail/") && id) {
      axiosInstance
        .get(`/day-tours/${id}`)
        .then((res) => {
          const title = res.data?.details?.heroTitle || res.data?.tour?.title;
          if (title) setTourTitle(title);
          else setTourTitle("");
        })
        .catch(() => setTourTitle(""));
    } else if (path.startsWith("/round-tours/") && id) {
      axiosInstance
        .get(`/round-tours/${id}`)
        .then((res) => {
          const title = res.data?.details?.heroTitle || res.data?.tour?.title;
          if (title) setTourTitle(title);
          else setTourTitle("");
        })
        .catch(() => setTourTitle(""));
    } else {
      setTourTitle(""); // fallback
    }
  }, [location.pathname]);

  // ---------------- Helper to open WhatsApp ----------------
  const openWhatsApp = (customMessage) => {
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(customMessage)}`,
      "_blank"
    );
  };

  // ---------------- Menu Messages ----------------
  const getMessage = (option) => {
    const base = "*Net Lanka Travel*";
    if (tourTitle) {
      switch (option) {
        case "book":
          return `${base}\n\nI’m interested in this tour:\n*${tourTitle}*\n\nI want to book it.`;
        case "question":
          return `${base}\n\nI have a question about this tour:\n*${tourTitle}*`;
        case "info":
          return `${base}\n\nI want more information about this tour:\n*${tourTitle}*`;
        default:
          return `${base}\n\nHello!`;
      }
    } else {
      switch (option) {
        case "book":
          return `${base}\n\nI want to book a tour.`;
        case "question":
          return `${base}\n\nI have a question about your tours.`;
        case "info":
          return `${base}\n\nI want more information about your tours.`;
        default:
          return `${base}\n\nHello!`;
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center space-y-2">
      {/* Menu options */}
      {menuOpen && (
        <div className="flex flex-col items-center space-y-2 mb-2">
          <button
            onClick={() => openWhatsApp(getMessage("book"))}
            className="w-36 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-green-600 transition flex items-center justify-center space-x-2"
          >
            <FaWhatsapp /> <span>Book Tour</span>
          </button>
          <button
            onClick={() => openWhatsApp(getMessage("question"))}
            className="w-36 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition flex items-center justify-center space-x-2"
          >
            <FaGlobeAmericas /> <span>Ask Question</span>
          </button>
          <button
            onClick={() => openWhatsApp(getMessage("info"))}
            className="w-36 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-yellow-600 transition flex items-center justify-center space-x-2"
          >
            <FaStar /> <span>More Info</span>
          </button>
        </div>
      )}

      {/* Main WhatsApp button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition relative"
      >
        <FaWhatsapp size={28} className="text-white" />
        <FaChevronUp
          className={`absolute text-white right-1 top-1 transition-transform duration-300 ${
            menuOpen ? "rotate-180" : ""
          }`}
          size={14}
        />
      </button>
    </div>
  );
}
