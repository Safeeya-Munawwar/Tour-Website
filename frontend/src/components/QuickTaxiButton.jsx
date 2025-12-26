import React, { useState } from "react";
import { FaCar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function QuickTaxiButton() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpenBooking = () => {
    navigate("/quick-taxi");
  };

  return (
    <div className="fixed bottom-28 right-6 z-50 flex flex-col items-end">
      {/* CARD ABOVE BUTTON */}
      {open && (
        <div className="fixed bottom-44 mb-4 w-80 bg-white rounded-xl shadow-2xl overflow-hidden animate-slideUp">
          <div className="bg-blue-600 p-4 text-white flex justify-between">
            <div>
              <p className="font-semibold text-lg">Quick Taxi</p>
              <p className="text-sm opacity-90">Book your ride quickly</p>
            </div>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          {/* Contact */}
          <div className="flex items-center gap-4 p-4 border-b">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <FaCar className="text-white text-xl" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Net Lanka Travels</p>
              <p className="text-sm text-gray-500">
                Typically replies in a few minutes
              </p>
            </div>
          </div>

          <div className="p-3 space-y-2">
            <button
              onClick={handleOpenBooking}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Book Now
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-28 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition"
      >
        <FaCar className="text-white text-3xl" />
      </button>
    </div>
  );
}
