import React from "react";
import { IoIosArrowForward } from "react-icons/io";

export default function Stories() {
  const stories = [
    {
      img: "/img1.jpg",
      title: "Sri Lanka’s Hidden Gems: A Journey Off the Beaten Path",
      date: "November 10, 2025",
    },
    {
      img: "/img2.jpg",
      title:
        "Exploring Sri Lanka’s Cultural Triangle: Ancient Cities and Timeless Heritage",
      date: "November 10, 2025",
    },
    {
      img: "/img3.jpg",
      title:
        "Sri Lanka Hill Country Adventure: Tea, Trekking, and Scenic Wonders",
      date: "November 10, 2025",
    },
  ];

  return (
    <section className="w-full py-20 bg-gray-100">
      
      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-sm md:text-lg tracking-wide text-gray-500 font-semibold">
          BLOG & NEWS
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold mt-3">
          A Little Story From Us
        </h2>
      </div>

      {/* Cards */}
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-5">

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
            <p className="text-gray-500 text-sm mt-2">
              {story.date}
            </p>

            {/* Read More */}
            <button className="mt-6 flex items-center gap-2 font-medium text-black hover:opacity-70">
              Read More <IoIosArrowForward size={20} />
            </button>

          </div>
        ))}

      </div>

    </section>
  );
}
