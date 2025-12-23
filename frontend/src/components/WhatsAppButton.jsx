import React, { useEffect, useState } from "react";
import { FaWhatsapp, FaGlobeAmericas, FaPlane, FaStar, FaCompass } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { axiosInstance } from "../lib/axios";

export default function WhatsAppButton() {
  const location = useLocation();
  const [phone, setPhone] = useState("94729171089");
  const [message, setMessage] = useState("");

  // ---------------- Get WhatsApp Number ----------------
  useEffect(() => {
    axiosInstance
      .get("/contact")
      .then((res) => {
        const p = res.data?.phones?.[0];
        if (p) setPhone(p.replace(/\D/g, ""));
      })
      .catch(() => setPhone("94729171089"));
  }, []);

  // ---------------- Generate Message ----------------
  useEffect(() => {
    const path = location.pathname;
    const parts = path.split("/").filter(Boolean);
    const id = parts[parts.length - 1];

    const fallbackMessage = () => {
      setMessage(
        `*Net Lanka Travel*\n\nI’m interested in traveling with Net Lanka Tours.\n\nPlease help me plan an unforgettable journey!`
      );
    };

    if (path.startsWith("/day-tour-detail/") && id) {
      axiosInstance
        .get(`/day-tours/${id}`)
        .then((res) => {
          const title = res.data?.details?.heroTitle || res.data?.tour?.title;
          if (title) {
            setMessage(
              `*Net Lanka Travel*\n\nI’m interested in this *Day Tour*:\n*${title}*\n\nCould you please share more details?`
            );
          } else fallbackMessage();
        })
        .catch(fallbackMessage);
    } else if (path.startsWith("/round-tours/") && id) {
      axiosInstance
        .get(`/round-tours/${id}`)
        .then((res) => {
          const title = res.data?.details?.heroTitle || res.data?.tour?.title;
          if (title) {
            setMessage(
              `*Net Lanka Travel*\n\nI’m interested in this *Round Tour*:\n*${title}*\n\nPlease send itinerary & pricing.`
            );
          } else fallbackMessage();
        })
        .catch(fallbackMessage);
    } else {
      fallbackMessage();
    }
  }, [location.pathname]);

  return (
    <a
      href={`https://wa.me/${phone}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-16 sm:w-20 h-16 sm:h-20"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Main WhatsApp button */}
        <div className="absolute w-12 sm:w-16 h-12 sm:h-16 bg-green-500 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition">
          <FaWhatsapp size={24} sm={{ size: 32 }} className="text-white" />
        </div>

        {/* Orbiting icons closer to the button */}
        <div className="absolute w-20 sm:w-24 h-20 sm:h-24 animate-spin-slow">
          <FaGlobeAmericas className="absolute top-0 left-1/2 transform -translate-x-1/2 text-white" size={10} sm={{ size: 12 }} />
          <FaPlane className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white" size={10} sm={{ size: 12 }} />
          <FaStar className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-white" size={10} sm={{ size: 12 }} />
          <FaCompass className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white" size={10} sm={{ size: 12 }} />
        </div>
      </div>

      {/* Tailwind CSS custom animation */}
      <style>
        {`
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 6s linear infinite;
          }
        `}
      </style>
    </a>
  );
}
