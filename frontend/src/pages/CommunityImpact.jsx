import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import "swiper/css";

const OurCommunity = () => {
  const [showText, setShowText] = useState(false);
  const [communityData, setCommunityData] = useState({
    description: "",
    impacts: [],
  });
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        const res = await axiosInstance.get(
          "/communityImpact"
        );
        if (res.data) setCommunityData(res.data);
      } catch (err) {
        console.error("Failed to fetch community impact:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunityData();
  }, []);

  useEffect(() => {
    setTimeout(() => setShowText(true), 200);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading Community Impact...
      </div>
    );
  }

  return (
    <div className="font-poppins bg-white text-[#222]">
      {/* ---------------------------- HERO HEADER ---------------------------- */}
      <div
        className="w-full h-[360px] md:h-[560px] bg-cover bg-center relative flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('/images/community-header.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>

        <div
          className={`absolute bottom-6 md:bottom-10 right-4 md:right-10 max-w-[90%] md:w-[420px] bg-black/80 text-white p-4 md:p-6 backdrop-blur-sm shadow-lg border-none flex items-center justify-end transition-all duration-700 ease-out ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-xl md:text-3xl leading-snug text-right mr-4">
            Our Journey <br /> From Passion to Excellence
          </h2>
          <div className="w-[2px] bg-white h-10 md:h-12"></div>
        </div>
      </div>

      {/* ---------------------------- INTRO ---------------------------- */}
      <section className="max-w-7xl mx-auto px-6 py-10 text-center space-y-4">
        <p className="text-sm md:text-lg font-semibold tracking-widest text-gray-500">
          OUR JOURNEY
        </p>

        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          From Passion to Excellence
        </h2>

        <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          {communityData.description}
        </p>

        <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-6"></div>
      </section>

      {/* -------------------- IMPACT CARDS ---------------------- */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {communityData.impacts.map((impact, idx) => (
          <div
            key={idx}
            className="relative group bg-white shadow-lg rounded-xl overflow-hidden"
          >
            {/* IMAGE */}
            <img
              src={impact.images?.[0] || "/images/default.jpg"}
              alt={impact.title}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* LEARN MORE */}
            <button
              onClick={() => setActiveIndex(idx)}
              className="absolute bottom-0 left-0 w-full bg-black/60 text-white 
              font-semibold py-3 text-center backdrop-blur-sm hover:bg-black/70 transition"
            >
              Learn More
            </button>

            {/* SLIDING OVERLAY */}
            <div
              className={`
                absolute top-0 left-0 h-full bg-white/70 backdrop-blur-md shadow-xl 
                transition-all duration-500 overflow-hidden
                ${activeIndex === idx ? "w-full" : "w-0"}
              `}
            >
              <div className="p-6 h-full flex flex-col">
                <button
                  onClick={() => setActiveIndex(null)}
                  className="self-end text-gray-700 hover:text-black text-2xl font-bold"
                >
                  &times;
                </button>

                <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                  {impact.title}
                </h3>

                <p className="text-gray-700 leading-relaxed">
                  {impact.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ---------------------------- CUSTOM TOUR CTA ---------------------------- */}
      <section className="relative bg-white py-8 sm:py-12 lg:py-16 flex justify-center items-center">
        <div className="max-w-3xl text-center px-4 sm:px-6">
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4">
            Ready to Explore Sri Lanka?
          </h2>

          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#1a1a1a] mb-6 leading-relaxed">
            Let our dedicated experts <br /> craft an unforgettable journey.
          </h3>

          {/* CTA Button */}
          <a
            href="/contact"
            className="
        bg-[#ce2a40] hover:bg-[#ef0530]
        text-white uppercase px-8 py-4 rounded-full font-semibold
        flex items-center gap-2 text-sm sm:text-base shadow-lg
        transition-colors duration-300 justify-center mx-auto
      "
          >
            Explore with Us
            <ArrowRight className="w-4 sm:w-5" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default OurCommunity;
