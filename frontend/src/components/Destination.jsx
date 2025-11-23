import React from "react";

export default function Destination() {
  const destinations = [
    {
      img: "/mnt/data/e88161c6-1edc-4ea9-a7eb-03b77ae6d175.png",
      subtitle: "Evening City View",
      title: "Colombo",
    },
    {
      img: "/mnt/data/e88161c6-1edc-4ea9-a7eb-03b77ae6d175.png",
      subtitle: "Sigiriya Lion Rock View",
      title: "Sigiriya",
    },
    {
      img: "/mnt/data/e88161c6-1edc-4ea9-a7eb-03b77ae6d175.png",
      subtitle: "Temple of the Tooth",
      title: "Kandy",
    },
    {
      img: "/mnt/data/e88161c6-1edc-4ea9-a7eb-03b77ae6d175.png",
      subtitle: "Galle Fort",
      title: "Galle",
    },
    {
      img: "/mnt/data/e88161c6-1edc-4ea9-a7eb-03b77ae6d175.png",
      subtitle: "Nine Arch Bridge",
      title: "Ella",
    },
    {
      img: "/mnt/data/e88161c6-1edc-4ea9-a7eb-03b77ae6d175.png",
      subtitle: "Sunset View",
      title: "Trincomalee",
    },
    {
      img: "/mnt/data/e88161c6-1edc-4ea9-a7eb-03b77ae6d175.png",
      subtitle: "Shiva Statue",
      title: "Jaffna",
    },
  ];

  return (
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

          {/* BUTTON AS 4th ITEM IN ROW 2 */}
          <div className="flex items-center lg:justify-start">
            <button className="bg-[#1A1A1A] hover:bg-black text-white font-semibold px-10 py-4 rounded-full text-lg">
              All Destinations
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
