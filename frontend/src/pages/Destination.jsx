import React, { useEffect, useState } from 'react'

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
        className="w-full h-[400px] md:h-[560px] bg-cover bg-center relative flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/40.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/30"></div>

        <div
          className={`absolute bottom-10 right-10 w-[440px] bg-black/80 text-white p-6 backdrop-blur-sm shadow-lg border-none flex items-center justify-end transition-all duration-700 ease-out ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-2xl md:text-3xl leading-snug text-right mr-4">
            Explore Destination <br />
            With Us…
          </h2>
          <div className="w-[2px] bg-white h-12"></div>
        </div>
      </div>

    <section className="w-full  bg-slate-100 py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Subtitle */}
        <p className="text-center text-sm md:text-lg font-semibold tracking-widest text-gray-500 mb-3">
          HIDDEN MAGICAL PLACES
        </p>

        {/* Heading */}
        <h2 className="text-center text-4xl md:text-5xl font-extrabold text-gray-900 mb-20">
          Best Destinations in Sri Lanka
        </h2>

        {/* GRID WITH BUTTON COMPLETING ROW 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

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

          {/* BUTTON AS 4th ITEM IN ROW 2
          <div className="flex items-center lg:justify-start">
            <button className="bg-[#1A1A1A] hover:bg-black text-white font-semibold px-10 py-4 rounded-full text-lg">
              All Destinations
            </button>
          </div> */}
        </div>

      </div>
    </section>
    </div>
  )
}
