import React, { useEffect, useState } from "react";
import {
  FaWhatsapp,
  FaGlobeAmericas,
  FaStar,
  FaTimes,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { axiosInstance } from "../lib/axios";

export default function WhatsAppFAB() {
  const location = useLocation();
  const [phone, setPhone] = useState("94729171089");
  const [tourTitle, setTourTitle] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
  axiosInstance
    .get("/contact")
    .then((res) => {
      const p = res.data?.whatsapp || res.data?.phone;
      if (p) setPhone(p.replace(/\D/g, ""));
    })
    .catch(() => setPhone("94729171089"));
}, []);


  // ---------------- Get tour title ----------------
  useEffect(() => {
    const path = location.pathname;
    const parts = path.split("/").filter(Boolean);
    const id = parts[parts.length - 1];

    if (path.startsWith("/day-tour-detail/") && id) {
      axiosInstance.get(`/day-tours/${id}`).then((res) => {
        setTourTitle(
          res.data?.details?.heroTitle || res.data?.tour?.title || ""
        );
      });
    } else if (path.startsWith("/round-tours/") && id) {
      axiosInstance.get(`/round-tours/${id}`).then((res) => {
        setTourTitle(
          res.data?.details?.heroTitle || res.data?.tour?.title || ""
        );
      });
    } else {
      setTourTitle("");
    }
  }, [location.pathname]);

  // ---------------- Open WhatsApp ----------------
  const openWhatsApp = (message) => {
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  // ---------------- Messages (UNCHANGED) ----------------
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
  <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
    {/* CARD ABOVE BUTTON */}
    {open && (
      <div className="mb-4 w-80 bg-white rounded-xl shadow-2xl overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="bg-green-500 p-4 text-white flex justify-between">
          <div>
            <p className="font-semibold text-lg">Start a Conversation</p>
            <p className="text-sm opacity-90">
              Click an option to chat on WhatsApp
            </p>
          </div>
          <button onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>

        {/* Contact */}
        <div className="flex items-center gap-4 p-4 border-b">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <FaWhatsapp className="text-white text-xl" />
          </div>
          <div>
            <p className="font-semibold text-gray-800">
              Net Lanka Tours
            </p>
            <p className="text-sm text-gray-500">
              Typically replies in a few minutes
            </p>
          </div>
        </div>

        {/* Options */}
        <div className="p-3 space-y-2">
          <button
            onClick={() => openWhatsApp(getMessage("book"))}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
          >
            Book Tour
          </button>

          <button
            onClick={() => openWhatsApp(getMessage("question"))}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Ask Question
          </button>

          <button
            onClick={() => openWhatsApp(getMessage("info"))}
            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            More Info
          </button>
        </div>
      </div>
    )}

    {/* FLOATING BUTTON */}
    <button
      onClick={() => setOpen(!open)}
      className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition"
    >
      <FaWhatsapp className="text-white text-3xl" />
    </button>
  </div>
);

};
