import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function DayTour() {
  const [tours, setTours] = useState([]);
  const [showText, setShowText] = useState(false);

  // Fetch tours from backend
  useEffect(() => {
    async function fetchTours() {
      try {
        const res = await axios.get("http://localhost:5000/api/day-tours");
        if (res.data.success) setTours(res.data.tours);
      } catch (err) {
        console.error("Error fetching tours:", err);
      }
    }
    fetchTours();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowText(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="font-poppins bg-white text-[#222] mb-10">
      {/* HERO */}
      <div
        className="w-full h-[400px] md:h-[560px] bg-cover bg-center relative flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/images/d1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div
          className={`absolute bottom-10 right-10 w-[440px] bg-black/80 text-white p-6 backdrop-blur-sm shadow-lg border-none flex items-center justify-end transition-all duration-700 ease-out ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-2xl md:text-3xl leading-snug text-right mr-4">
            Travel Day Tour <br />
            With Us…
          </h2>
          <div className="w-[2px] bg-white h-12"></div>
        </div>
      </div>

      {/* Intro */}
      <div className="max-w-[1100px] mx-auto text-center px-6 mt-10">
        <div className="text-sm md:text-lg text-gray-600 tracking-widest font-semibold mb-3">
          Day Tours
        </div>

        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5">
          Enjoy A Day Tour In Sri Lanka
        </h2>

        <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          Welcome to the beautiful emerald isle known as Sri Lanka! Let us greet
          you with a salutation of “Ayubowan” which means “May you live long and
          healthy” and offer you an exciting array of tours to enjoy and turn
          your vacation into a delight!
        </p>

        <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-6"></div>
      </div>

      {/* CARD GRID */}
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
              <h3 className="text-2xl font-serif font-semibold mb-3">
                {t.title}
              </h3>

              <div className="font-semibold text-gray-700 mb-4">
                {t.location}
              </div>

              <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
                {t.desc}
              </p>

              <Link to={`/day-tour-detail/${t._id}`} className="mx-auto">
                <button className="mt-5 bg-gradient-to-r from-[#73A5C6] to-[#2E5B84] hover:from-[#82B3D2] hover:to-[#254A6A] text-white font-semibold rounded-full px-6 py-2 flex items-center gap-2 transition">
                  READ MORE →
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
