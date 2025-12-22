// src/components/WhyMapSection.js
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  FaUmbrellaBeach,
  FaHiking,
  FaLandmark,
  FaUtensils,
  FaShip,
  FaMountain,
} from "react-icons/fa";

// Fix default Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png",
});

// Data for each category
const categoryPlaces = {
  Beaches: [
    { name: "Unawatuna Beach", lat: 6.0171, lng: 80.2498 },
    { name: "Mirissa Beach", lat: 5.9481, lng: 80.4547 },
    { name: "Bentota Beach", lat: 6.4205, lng: 79.9939 },
  ],
  Adventure: [
    { name: "Adam's Peak", lat: 6.8003, lng: 80.4912 },
    { name: "Knuckles Range", lat: 7.333, lng: 80.825 },
    { name: "Ella Rock", lat: 6.865, lng: 81.044 },
  ],
  History: [
    { name: "Sigiriya Rock Fortress", lat: 7.9577, lng: 80.7606 },
    { name: "Polonnaruwa", lat: 7.9393, lng: 81.0009 },
    { name: "Galle Fort", lat: 6.0328, lng: 80.217 },
  ],
  Gastronomy: [
    { name: "Colombo Food Street", lat: 6.9271, lng: 79.8612 },
    { name: "Kandy Market", lat: 7.2906, lng: 80.6337 },
  ],
  Cruises: [
    { name: "Negombo", lat: 7.2096, lng: 79.8353 },
    { name: "Trincomalee", lat: 8.5679, lng: 81.233 },
  ],
  Mountains: [
    { name: "Pidurutalagala", lat: 7.0034, lng: 80.7659 },
    { name: "Horton Plains", lat: 6.8027, lng: 80.8128 },
  ],
};

// Map bounds helper
function FitBounds({ places }) {
  const map = useMap();
  if (places.length === 0) return null;
  const bounds = L.latLngBounds(places.map((p) => [p.lat, p.lng]));
  map.fitBounds(bounds, { padding: [50, 50] });
  return null;
}

export default function WhyMapSection() {
  const [selectedCategory, setSelectedCategory] = useState("Beaches");

  // All buttons
  const buttons = [
    { title: "Beaches", icon: <FaUmbrellaBeach /> },
    { title: "Adventure", icon: <FaHiking /> },
    { title: "History", icon: <FaLandmark /> },
    { title: "Gastronomy", icon: <FaUtensils /> },
    { title: "Cruises", icon: <FaShip /> },
    { title: "Mountains", icon: <FaMountain /> },
  ];

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Subtitle */}
        <p className="text-sm md:text-lg font-semibold tracking-widest text-gray-500 mb-4">
          EXPLORE WITH US
        </p>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-16">
          Discover Sri Lanka's Best Experiences
        </h2>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {buttons.map((btn) => (
            <button
              key={btn.title}
              onClick={() => setSelectedCategory(btn.title)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full font-semibold text-lg transition w-20 md:w-48 justify-center ${
                selectedCategory === btn.title
                  ? "bg-white text-black border-2 border-gray-900"
                  : "bg-[#1A1A1A] hover:bg-black text-white"
              }`}
            >
              <span className="text-xl">{btn.icon}</span>
              {/* Hide text on small screens */}
              <span className="hidden md:inline">{btn.title}</span>
            </button>
          ))}
        </div>

        {/* Map */}
        <div className="w-full h-[500px] rounded-2xl border-4 border-gray-300 shadow-xl overflow-hidden">
          <MapContainer center={[7.8731, 80.7718]} zoom={7} className="w-full h-full">
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {categoryPlaces[selectedCategory].map((place, i) => (
              <Marker key={i} position={[place.lat, place.lng]}>
                <Tooltip permanent direction="top" offset={[0, -10]}>
                  {place.name}
                </Tooltip>
              </Marker>
            ))}

            <FitBounds places={categoryPlaces[selectedCategory]} />
          </MapContainer>
        </div>
      </div>
    </section>
  );
}
