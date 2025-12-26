import React from "react";
import { useNavigate } from "react-router-dom";
import { Truck } from "lucide-react";
import { useFloatingButtons } from "../context/FloatingButtonsContext";

export default function QuickTaxiButton() {
  const navigate = useNavigate();
  const { isWhatsAppOpen } = useFloatingButtons();

  // 🔥 HIDE when WhatsApp is open
  if (isWhatsAppOpen) return null;

  return (
    <button
      onClick={() => navigate("/quick-taxi")}
      className="fixed bottom-28 right-6 h-16 bg-orange-600 text-white rounded-full shadow-xl flex items-center gap-2 px-8 py-5 hover:scale-110 transition-transform z-50"
      title="Quick Taxi"
    >
      <Truck size={24} />
      <span className="font-semibold">Quick Taxi</span>
    </button>
  );
}
