import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function DayTour() {
  const tours = [
    {
      id: 1,
      title: "Anuradhapura Sacred City Tour",
      location: "Anuradhapura",
      desc:
        "Explore Sri Lanka’s first capital and its ancient stupas, monasteries, stone carvings, and sacred Bodhi Tree—one of the world’s oldest recorded trees.",
      img: "/images/history.PNG",
    },
    {
      id: 2,
      title: "Belihuloya Nature Escape",
      location: "Belihuloya",
      desc:
        "A peaceful getaway ideal for nature lovers—featuring waterfalls, river bathing, trekking routes, and lush forest surroundings.",
      img: "/images/belihuloya-santani.jpg",
    },
    {
      id: 3,
      title: "Colombo Heritage City Tour",
      location: "Colombo",
      desc:
        "Experience the blend of colonial-era architecture, vibrant markets, temples, museums, modern malls, and the scenic Galle Face promenade.",
      img: "/images/colombo.PNG",
    },
    {
      id: 4,
      title: "Galle Fort Walking Tour",
      location: "Galle",
      desc:
        "Explore the UNESCO-listed Dutch Fort with its charming streets, lighthouse views, museums, artisan shops, and oceanfront bastions.",
      img: "/images/galle.PNG",
    },
    {
      id: 5,
      title: "Kandy Cultural Experience",
      location: "Kandy",
      desc:
        "Visit the Temple of the Sacred Tooth Relic, royal palace ruins, botanical gardens, and enjoy panoramic hill-country views.",
      img: "/images/kandy.PNG",
    },
    {
      id: 6,
      title: "Sigiriya Rock Fortress Tour",
      location: "Sigiriya",
      desc:
        "Climb the magnificent Lion Rock Fortress, see ancient frescoes, landscaped gardens, and witness breathtaking views from the summit.",
      img: "/images/sigiriya.jpg",
    },
    {
      id: 7,
      title: "Dambulla Cave Temple Tour",
      location: "Dambulla",
      desc:
        "Discover Sri Lanka’s largest cave temple complex, filled with ancient statues, mural paintings, and Buddhist history.",
      img: "/images/culture.jpg",
    },
    {
      id: 8,
      title: "Nuwara Eliya Tea Country Tour",
      location: "Nuwara Eliya",
      desc:
        "Enjoy cool climates, visit tea plantations, explore colonial bungalows, waterfalls, and serene lakes in Sri Lanka’s ‘Little England’.",
      img: "/images/nuwaraeliya.PNG",
    },
    {
      id: 9,
      title: "Mirissa Whale Watching",
      location: "Mirissa",
      desc:
        "Embark on an unforgettable boat excursion to observe blue whales, dolphins, turtles, and other marine life in the Indian Ocean.",
      img: "/images/mirissa.PNG",
    },
    {
      id: 10,
      title: "Yala Wildlife Safari",
      location: "Yala",
      desc:
        "Take a thrilling jeep safari through Yala National Park—home to leopards, elephants, crocodiles, sloth bears, and exotic birdlife.",
      img: "/images/yala.jpg",
    },
    {
      id: 11,
      title: "Ella Scenic Hill Tour",
      location: "Ella",
      desc:
        "Discover the beauty of Ella—Nine Arch Bridge, Little Adam’s Peak, Ravana Falls, and some of Sri Lanka’s best mountain views.",
      img: "/images/ella.jpg",
    },
    {
      id: 12,
      title: "Trincomalee Beach & Culture Tour",
      location: "Trincomalee",
      desc:
        "A perfect mix of history and coastal beauty, featuring Koneswaram Temple, Fort Frederick, hot springs, and stunning crystal-clear beaches.",
      img: "/images/trincomalee.PNG",
    },
  ];

  const [showText, setShowText] = useState(false);
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
          Welcome to the beautiful emerald isle known as Sri Lanka! Let us greet you with a salutation of “Ayubowan” which means “May you live long and healthy” and offer you an exciting array of tours to enjoy and turn your vacation into a delight!
        </p>

        <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-6"></div>
      </div>

      {/* CARD GRID */}
      <div className="max-w-[1350px] mx-auto mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
        {tours.map((t, i) => (
          <div
            key={t.id}
            className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col"
          >
            <img src={t.img} alt={t.title} className="w-full h-[260px] object-cover" />

            <div className="px-8 py-10 flex flex-col flex-grow">
              <h3 className="text-2xl font-serif font-semibold mb-3">{t.title}</h3>

              <div className="font-semibold text-gray-700 mb-4">{t.location}</div>

              <p className="text-gray-600 leading-relaxed mb-8 flex-grow">{t.desc}</p>

              <Link to={`/day-tour-detail`} className="mx-auto">
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
