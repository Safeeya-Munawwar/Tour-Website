import React, { useEffect, useState } from "react";

export default function Destination() {
  const [showText, setShowText] = useState(false);
  useEffect(() => {
    setTimeout(() => setShowText(true), 200);
  }, []);
  const destinations = [
    {
      img: "/images/colombo.PNG",
      subtitle: "Evening City View",
      title: "Colombo",
    },
    {
      img: "/images/10.jpeg",
      subtitle: "Sigiriya Lion Rock View",
      title: "Sigiriya",
    },
    {
      img: "/images/kandy1.PNG",
      subtitle: "Temple of the Tooth",
      title: "Kandy",
    },
    {
      img: "/images/galle.PNG",
      subtitle: "Galle Fort",
      title: "Galle",
    },
    {
      img: "/images/ella.PNG",
      subtitle: "Nine Arch Bridge",
      title: "Ella",
    },
    {
      img: "/images/hiriketiya.PNG",
      subtitle: "Sunset View",
      title: "Trincomalee",
    },
    {
      img: "/images/beach.PNG",
      subtitle: "Shiva Statue",
      title: "Jaffna",
    },
    {
      img: "/images/12.jpg",
      subtitle: "Cool Temp",
      title: "Nuwara-Eliya",
    },
  ];
  return (
    <div className="font-poppins bg-white text-[#222]">
      {/* ---------------------------- HERO HEADER ---------------------------- */}
      <div
        className="w-full h-[360px] md:h-[560px] bg-cover bg-center relative flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/images/40.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/20"></div>

        <div
          className={`absolute bottom-6 md:bottom-10 right-4 md:right-10 max-w-[90%] md:w-[360px] bg-black/80 text-white p-4 md:p-6 backdrop-blur-sm shadow-lg border-none flex items-center justify-end transition-all duration-700 ease-out ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-xl md:text-3xl leading-snug text-right mr-4">
            Explore Destination <br />
            With Us…
          </h2>
          <div className="w-[2px] bg-white h-10 md:h-12"></div>
        </div>
      </div>

      {/* ---------------------------- DESTINATIONS INTRO ---------------------------- */}
      <section className="w-full py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Subtitle */}
          <p className="text-sm md:text-lg text-gray-600 tracking-widest font-semibold mb-3">
            HIDDEN MAGICAL PLACES
          </p>

          {/* Heading */}
          <h2 className="text-center text-4xl md:text-5xl font-extrabold text-gray-900 mb-5">
            Best Destinations in Sri Lanka
          </h2>

          {/* Description */}
          <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            Discover the most breathtaking places across Sri Lanka. From
            sun-kissed beaches to misty highlands, our curated destinations
            promise unforgettable experiences for every traveler.
          </p>

          {/* Gold Accent */}
          <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-6"></div>

          {/* GRID WITH BUTTON COMPLETING ROW 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mt-12">
            {/* FIRST 7 CARDS */}
            {destinations.map((item, i) => (
              <div key={i} className="flex flex-col w-full">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-56 object-cover rounded-xl shadow-md"
                />
                <p className="text-gray-500 text-sm mt-4">{item.subtitle}</p>
                <h3 className="text-xl font-semibold text-gray-900 mt-1">
                  {item.title}
                </h3>
              </div>
            ))}

            {/* BUTTON AS 4th ITEM IN ROW 2 */}
            {/* <div className="flex items-center lg:justify-start">
    <button className="bg-[#1A1A1A] hover:bg-black text-white font-semibold px-10 py-4 rounded-full text-lg">
      All Destinations
    </button>
  </div> */}
          </div>
        </div>
      </section>
    </div>
  );
}
