import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RoundTour() {
  const [tours, setTours] = useState([]);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowText(true), 200);
  }, []);

  useEffect(() => {
    async function fetchTours() {
      try {
        const res = await axios.get("http://localhost:5000/api/round-tours");
        if (res.data.success) setTours(res.data.tours || []);
      } catch (err) {
        console.error("Error fetching round tours:", err);
      }
    }
    fetchTours();
  }, []);

  return (
    <div className="font-poppins bg-white text-[#222] pb-16">
      {/* HERO HEADER */}
      <div
        className="w-full h-[360px] md:h-[560px] bg-cover bg-center relative flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/images/d2.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div
          className={`absolute bottom-6 md:bottom-10 right-4 md:right-10 max-w-[90%] md:w-[360px] bg-black/80 text-white p-4 md:p-6 backdrop-blur-sm shadow-lg border-none flex items-center justify-end transition-all duration-700 ease-out ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-xl md:text-3xl leading-snug text-right mr-4">
            Explore Sri Lanka With <br /> Our Round Tours
          </h2>
          <div className="w-[2px] bg-white h-10 md:h-12"></div>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto text-center px-6 mt-14">
        <div className="text-sm md:text-lg text-gray-600 tracking-widest font-semibold mb-3">
          Round Tours
        </div>

        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5">
          Discover Sri Lanka Across Every Corner
        </h2>

        <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          Our expertly crafted round tours take you through the island’s most
          breathtaking landscapes — from ancient kingdoms to misty mountains,
          wildlife parks, and sun-kissed beaches. Each journey offers a perfect
          balance of culture, nature, and adventure.
        </p>

        <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-6"></div>
      </div>

      <div className="max-w-[1350px] mx-auto mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
        {tours.map((t) => (
          <div
            key={t._id}
            className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col"
          >
            <img
              src={t.img}
              alt={t.title}
              className="w-full h-[260px] object-cover"
            />

            <div className="px-8 py-10 flex flex-col flex-grow">
              <h3 className="text-2xl font-serif font-semibold mb-2">
                {t.title}
              </h3>

              {/* Location */}
              {t.location && (
                <div className="text-gray-500 italic mb-2">{t.location}</div>
              )}

              {/* Days */}
              {t.days && (
                <div className="font-semibold text-gray-700 mb-4">{t.days}</div>
              )}

              <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
                {t.desc}
              </p>

              <Link to={`/round-tours/${t._id}`} className="mx-auto">
                <button className="mt-5 bg-gradient-to-r from-[#73A5C6] to-[#2E5B84] hover:from-[#82B3D2] hover:to-[#254A6A] text-white font-semibold rounded-full px-6 py-2 flex items-center gap-2 transition">
                  READ MORE →
                </button>
              </Link>
            </div>
          </div>
        ))}

        {tours.length === 0 && (
          <div className="col-span-3 text-center text-gray-500 p-8">
            No tours available.
          </div>
        )}
      </div>
    </div>
  );
}
