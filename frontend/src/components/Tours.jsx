import React, { useState } from "react";
import BookForm from "../pages/BookForm";


const packages = [
  {
    title: "Sri Lanka at a Glance",
    days: "08 Days | 07 Nights",
    img: "/images/hiriketiya.PNG",
  },
  {
    title: "Sri Lanka Highlights",
    days: "17 Days | 16 Nights",
    img: "/images/history.PNG",
  },
  {
    title: "Ceylon Hill Country Tour",
    days: "07 Days | 06 Nights",
    img: "/images/ella.PNG",
  },
  {
    title: "Golden Beach Holiday",
    days: "10 Days | 09 Nights",
    img: "/images/beach.PNG",
  },
  {
    title: "Cultural Heritage Tour",
    days: "12 Days | 11 Nights",
    img: "/images/10.jpeg",
  },
  {
    title: "Adventure & Nature Tour",
    days: "09 Days | 08 Nights",
    img: "/images/home6.PNG",
  },
  {
    title: "Wildlife Expedition",
    days: "06 Days | 05 Nights",
    img: "/images/info3.jpg",
  },
  {
    title: "Luxury Honeymoon Tour",
    days: "14 Days | 13 Nights",
    img: "/images/galle.PNG",
  },
];

export default function Tours() {
  const [showForm, setShowForm] = useState(false);

  return (
    <section className="w-full bg-[#F5F7FA] py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Subtitle */}
        <p className="text-center text-gray-500 text-lg font-semibold tracking-wide">
          ITINERARIES
        </p>

          <h2 className="text-center text-4xl md:text-5xl font-extrabold text-gray-900 mt-3">
            Popular Tours
          </h2>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-2 py-2">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition p-0 overflow-hidden border border-gray-100"
              >
                <img
                  src={pkg.img}
                  alt={pkg.title}
                  className="w-full h-52 object-cover"
                />

                <div className="py-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {pkg.title}
                  </h3>

                <p className="text-gray-500 mt-2">{pkg.days}</p>
                <button
                  className="
    mt-5 
    bg-gradient-to-r from-[#73A5C6] to-[#2E5B84]
    hover:from-[#82B3D2] hover:to-[#254A6A]
    text-white font-semibold 
    rounded-full 
    px-6 py-2 
    flex items-center gap-2 mx-auto 
    transition
  "
                >
                  Book Now
                  <span className="text-lg">▸</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
