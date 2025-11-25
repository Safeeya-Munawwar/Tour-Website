import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function RoundTour() {
  const tours = [
    {
      title: "Classic Sri Lanka Round Tour",
      days: "07 Days | 06 Nights",
      desc:
        "A perfect blend of cultural wonders, scenic mountains, wildlife encounters, and golden beaches. Ideal for first-time visitors!",
      img: "/images/history.PNG",
    },
    {
      title: "Cultural Heritage Round Tour",
      days: "05 Days | 04 Nights",
      desc:
        "Travel through Sri Lanka’s Cultural Triangle — Sigiriya, Polonnaruwa, Anuradhapura & Kandy — where ancient civilizations still whisper.",
      img: "/images/culture.jpg",
    },
    {
      title: "Hill Country & Tea Trails Tour",
      days: "06 Days | 05 Nights",
      desc:
        "Mist-covered mountains, waterfalls, scenic train rides, tea plantations, and cool climates — experience the magical highlands.",
      img: "/images/experience-header.jpg",
    },
    {
      title: "South Coast Discovery Tour",
      days: "04 Days | 03 Nights",
      desc:
        "Relax along Sri Lanka’s southern beaches while exploring Galle Fort, whale watching, and lush coastal landscapes.",
      img: "/images/galle.PNG",
    },
    {
      title: "Wildlife & Adventure Round Tour",
      days: "08 Days | 07 Nights",
      desc:
        "For the adrenaline seekers — safari parks, jungle trails, waterfalls, and thrilling outdoor adventures across Sri Lanka.",
      img: "/images/wildlife.jpg",
    },
    {
      title: "Luxury Sri Lanka Round Tour",
      days: "10 Days | 09 Nights",
      desc:
        "Indulge in premium resorts, private experiences, fine dining, and curated luxury escapes throughout the island.",
      img: "/images/journey-3b.PNG",
    },
    {
      title: "Northern Heritage Round Tour",
      days: "07 Days | 06 Nights",
      desc:
        "Explore Jaffna culture, untouched islands, colonial relics, vibrant cuisine, and serene coastal landscapes of the North.",
      img: "/images/arugambay.PNG",
    },
    {
      title: "Nature & Wellness Retreat Tour",
      days: "06 Days | 05 Nights",
      desc:
        "A journey of relaxation — Ayurveda treatments, forest resorts, healing traditions, and breathtaking nature escapes.",
      img: "/images/ayurveda.jpg",
    },
    {
      title: "East Coast Round Tour",
      days: "05 Days | 04 Nights",
      desc:
        "Pristine turquoise beaches of Trincomalee & Pasikudah with water activities, temples, and marine life encounters.",
      img: "/images/trincomalee.PNG",
    },
    {
      title: "Family Fun Round Tour",
      days: "08 Days | 07 Nights",
      desc:
        "Kid-friendly activities, wildlife, beaches, cultural shows, and scenic sightseeing — fun for the entire family.",
      img: "/images/yoga5.jpg",
    },
    {
      title: "Budget-Friendly Explorer Tour",
      days: "06 Days | 05 Nights",
      desc:
        "Affordable yet unforgettable — community stays, local food experiences, and beautiful hidden gems.",
      img: "/images/adventure.jpg",
    },
    {
      title: "Photography Round Tour",
      days: "09 Days | 08 Nights",
      desc:
        "For shutterbugs — landscapes, wildlife, stilt fishermen, temples, tea trails, and sunrise points curated for photography lovers.",
      img: "/images/gallery14.PNG",
    },
  ];

  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowText(true), 200);
  }, []);

  return (
    <section className="font-poppins bg-white text-[#222] mb-20">

      {/* ---------------------------- HERO HEADER ---------------------------- */}
      <div
        className="w-full h-[400px] md:h-[560px] bg-cover bg-center relative flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/images/d2.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div
          className={`absolute bottom-10 right-10 w-[480px] bg-black/80 text-white p-7 backdrop-blur-sm shadow-lg border-none flex items-center justify-end transition-all duration-700 ease-out ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-2xl md:text-3xl leading-snug text-right mr-4">
            Explore Sri Lanka With <br /> Our Round Tours
          </h2>
          <div className="w-[2px] bg-white h-14"></div>
        </div>
      </div>

      {/* ---------------------------- HEADER TEXT ---------------------------- */}
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

      {/* ---------------------------- CARD GRID ---------------------------- */}
      <div className="max-w-[1350px] mx-auto mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
        {tours.map((t, i) => (
          <div
            key={i}
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

              <div className="font-semibold text-gray-700 mb-4">{t.days}</div>

              <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
                {t.desc}
              </p>

               <Link to={`/round-tour-detail`} className="mx-auto">
                              <button
                                className="mt-5 bg-gradient-to-r from-[#73A5C6] to-[#2E5B84] hover:from-[#82B3D2] hover:to-[#254A6A] text-white font-semibold rounded-full px-6 py-2 flex items-center gap-2 transition"
                              >
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
