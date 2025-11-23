import React from "react";
import { FaMapMarkerAlt, FaBusAlt, FaHiking, FaCampground, FaFire, FaRoad } from "react-icons/fa";

const cards = [
  { title: "Exploring", icon: <FaMapMarkerAlt size={40} /> },
  { title: "Adventure", icon: <FaBusAlt size={40} /> },
  { title: "Trekking", icon: <FaHiking size={40} /> },
  { title: "Camping", icon: <FaCampground size={40} /> },
  { title: "Camp Fire", icon: <FaFire size={40} /> },
  { title: "Off Road", icon: <FaRoad size={40} /> },
];

export default function ExperienceSection() {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
          {/* Subtitle */}
        <p className="text-center text-gray-500 text-lg font-semibold tracking-wide">
          EXPERIENCES
        </p>

        {/* Title */}
        <h2 className="text-center text-4xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-14">
          Top Activities 
        </h2>

        {/* Cards – 2 rows × 3 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex items-center bg-white shadow-md rounded-lg px-9 py-3 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
              style={{
                width: "300px",   // adjust card width here
                height: "120px",   // adjust card height here
              }}
            >
              <div className="text-[#2E5B84] mr-3 px-4">
                {card.icon}
              </div>
              <p className="text-lg font-serif text-black">
                {card.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
