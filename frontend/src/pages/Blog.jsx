import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

export default function Blog() {
  const [showText, setShowText] = useState(false);
  useEffect(() => {
    setTimeout(() => setShowText(true), 200);
  }, []);
  const stories = [
    {
      img: "/images/experience.PNG",
      title: "Sri Lanka’s Hidden Gems: A Journey Off the Beaten Path",
      date: "November 10, 2025",
    },
    {
      img: "/images/home5.PNG",
      title:
        "Exploring Sri Lanka’s Cultural Triangle: Ancient Cities and Timeless Heritage",
      date: "November 10, 2025",
    },
    {
      img: "/images/home8.PNG",
      title:
        "Sri Lanka Hill Country Adventure: Tea, Trekking, and Scenic Wonders",
      date: "November 10, 2025",
    },
    {
      img: "/images/beach.PNG",
      title: "Coastal Bliss: Discovering Sri Lanka’s Most Stunning Beaches",
      date: "November 12, 2025",
    },
    {
      img: "/images/info4.jpg",
      title: "Wildlife Encounters: A Safari Through Sri Lanka’s National Parks",
      date: "November 12, 2025",
    },
    {
      img: "/images/street food.PNG",
      title: "A Taste of Sri Lanka: Culinary Adventures Across the Island",
      date: "November 12, 2025",
    },
  ];

  return (
    <div className="font-poppins bg-white text-[#222] ">
      {/* ---------------------------- HERO HEADER ---------------------------- */}
      <div
        className="w-full h-[400px] md:h-[560px] bg-cover bg-center relative flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/43.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/30"></div>

        <div
          className={`absolute bottom-10 right-10 w-[440px] bg-black/80 text-white p-6 backdrop-blur-sm shadow-lg border-none flex items-center justify-end transition-all duration-700 ease-out ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-2xl md:text-3xl leading-snug text-right mr-4">
            Enjoy Your <br />
            Vacation…
          </h2>
          <div className="w-[2px] bg-white h-12"></div>
        </div>
      </div>
      {/* ---------------------------- BLOG PAGE INTRO ---------------------------- */}
      <section className="w-full py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Subtitle */}
          <p className="text-sm md:text-lg text-gray-600 tracking-widest font-semibold mb-3">
            BLOG & NEWS
          </p>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5">
            A Little Story From Us
          </h2>

          {/* Description */}
          <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            Explore stories, tips, and behind-the-scenes experiences from our
            team at NetLanka Tours. Stay inspired and discover how we craft
            unforgettable journeys across Sri Lanka.
          </p>

          {/* Gold Accent */}
          <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-6"></div>

          {/* Cards */}
          <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-5 mt-12">
            {stories.map((story, index) => (
              <div key={index} className="flex flex-col w-full">
                {/* Card Image */}
                <img
                  src={story.img}
                  alt={story.title}
                  className="w-full h-[330px] object-cover rounded-xl"
                />

                {/* Title */}
                <h3 className="mt-5 text-[22px] font-semibold leading-snug">
                  {story.title}
                </h3>

                {/* Date */}
                <p className="text-gray-500 text-sm mt-2">{story.date}</p>

                {/* Read More */}
                <button className="mt-6 flex items-center gap-2 font-medium text-black hover:opacity-70">
                  Read More <IoIosArrowForward size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
