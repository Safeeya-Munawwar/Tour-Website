import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // <-- use react-router-dom

export default function Experiences() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowText(true), 200);
  }, []);

  const experiences = [
    {
      img: "/images/yoga.jpg",
      heroImg: "/images/yoga-hero.jpg",
      title: "Yoga & Meditation",
      subtitle: "Spiritual Retreats",
      slug: "yoga-meditation",
      desc: "Sri Lanka is all about the best things in life in one tiny place. Yoga, just like Ayurveda, has a special place here, its authenticity and Vedic traditions are preserved in serene retreats.",
    },
    {
      img: "/images/wedding.jpg",
      heroImg: "/images/wedding-hero.jpg",
      title: "Weddings in the Sun",
      subtitle: "Exotic Wedding Destinations",
      slug: "weddings-in-the-sun",
      desc: "As far as exotic wedding destinations go, Sri Lanka trumps all others. Get married on golden beaches, in jungle settings, or colonial-era hotels.",
    },
    {
      img: "/images/ayurveda.jpg",
      heroImg: "/images/ayurveda-hero.jpg",
      title: "Ayurveda & Spa Therapy",
      subtitle: "Wellness & Healing",
      slug: "ayurveda-spa-therapy",
      desc: "Ayurveda Sri Lanka credentials go back thousands of years. Indian Ayurveda and indigenous knowledge shaped the authentic wellness therapies here.",
    },
    {
      img: "/images/shopping.jpg",
      heroImg: "/images/shopping-hero.jpg",
      title: "Shopping Sprees",
      subtitle: "Colombo Pettah & Local Markets",
      slug: "shopping-sprees",
      desc: "Precious gemstones, batiks, saris, sarongs, figurines, Buddha statues, spices, or tea — Sri Lanka does not disappoint.",
    },
    {
      img: "/images/food.jpg",
      heroImg: "/images/food-hero.jpg",
      title: "Delish Culinary",
      subtitle: "Sri Lankan Cuisine",
      slug: "delish-culinary",
      desc: "The exotic aromas of Sri Lankan cuisine are distinctively delectable. Rice and curry is the staple, with influences from Southeast Asia.",
    },
    {
      img: "/images/crafts.jpg",
      heroImg: "/images/crafts-hero.jpg",
      title: "Traditional Arts & Crafts",
      subtitle: "Local Artistry",
      slug: "traditional-arts-crafts",
      desc: "The story of Sri Lanka’s arts and crafts comes from one of the oldest civilizations in the world.",
    },
    {
      img: "/images/surfing.jpg",
      heroImg: "/images/surfing-hero.jpg",
      title: "Sporting Breaks",
      subtitle: "Adventure & Water Sports",
      slug: "sporting-breaks",
      desc: "Sri Lanka’s landscape offering sun, sea, mountains, rivers, waterfalls, jungles, and rough terrains sets the scene for sporting activities of all kinds.",
    },
    {
      img: "/images/culture.jpg",
      heroImg: "/images/culture-hero.jpg",
      title: "Colourful Culture",
      subtitle: "Ancient Heritage",
      slug: "colourful-culture",
      desc: "Sri Lankan culture steeped in Buddhism has religious roots going back to the 3rd Century BC. From Anuradhapura to Kandy, heritage is everywhere.",
    },
    {
      img: "/images/adventure.jpg",
      heroImg: "/images/adventure-hero.jpg",
      title: "Exhilarating Adventures",
      subtitle: "Jungle & Mountain Treks",
      slug: "exhilarating-adventures",
      desc: "Sri Lanka’s landscape with jungles, mountains, giant rocks, rivers, rainforests, and hills is a paradise for adventure seekers.",
    },
  ];

  return (
    <div className="font-poppins bg-white text-[#222]">
           {/* ---------------------------- HERO SECTION ---------------------------- */}
           <div
        className="w-full h-[400px] md:h-[560px] bg-cover bg-center relative flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/images/info5.JPEG')",
        backgroundPosition: "center 20%",
        backgroundRepeat: "no-repeat",
         }}
      >
        <div className="absolute inset-0 bg-black/30"></div>

        <div
          className={`absolute bottom-10 right-10 w-[580px] bg-black/80 text-white p-6 backdrop-blur-sm shadow-lg border-none flex items-center justify-end transition-all duration-700 ease-out ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-2xl md:text-3xl leading-snug text-right mr-4">
            Discover Unique Experiences <br />
            Across Sri Lanka
          </h2>
          <div className="w-[2px] bg-white h-12"></div>
        </div>
      </div>

      {/* ---------------------------- INTRO ---------------------------- */}
      <section className="w-full py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm md:text-lg text-gray-600 tracking-widest font-semibold mb-3">
            SIGNATURE EXPERIENCES
          </p>

          <h2 className="text-center text-4xl md:text-5xl font-extrabold text-gray-900 mb-5">
            Curated Experiences in Sri Lanka
          </h2>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            Sri Lanka offers one of the most exotic getaways in the world. Explore yoga retreats, luxurious wellness escapes, cultural wonders, culinary delights, and thrilling adventures.
          </p>

          {/* Gold Accent */}
          <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-6"></div>
        </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 mt-12">
        {experiences.map((item, index) => (
          <div
            key={index}
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
          >
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-56 object-cover rounded-t-xl"
            />

            <div className="p-6">
              <p className="text-[#8C1F28] text-sm font-semibold tracking-wide mb-1">
                {item.subtitle}
              </p>

              <h3 className="text-2xl font-light text-gray-900 group-hover:text-[#8C1F28] transition-colors">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                {item.desc}
              </p>

              <Link to={`/experience/${item.slug}`}>
                <button className="mt-4 text-[#8C1F28] font-semibold text-sm hover:underline">
                  Read more
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      </section>
    </div>
  );
}
