import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";

export default function ExperienceSection() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await axiosInstance.get("/home");
        if (res.data && Array.isArray(res.data.topActivities)) {
          setActivities(res.data.topActivities);
        }
      } catch (err) {
        console.error("Failed to fetch top activities:", err);
      }
    };
    fetchActivities();
  }, []);

  return (
    <section
      className="w-full bg-white py-16"
      aria-label="Top travel experiences and activities in Sri Lanka"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Subtitle */}
        <h2 className="text-center text-gray-500 text-sm md:text-lg font-semibold tracking-widest uppercase">
          Experiences
        </h2>

        {/* Main Heading */}
        <h3 className="text-center text-4xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-14">
          Top Activities in Sri Lanka
        </h3>

        {/* Activity Cards */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {activities.map((act, index) => (
            <li
              key={index}
              className="flex items-center bg-white shadow-md rounded-lg px-6 py-4 
           hover:shadow-xl hover:scale-105 
           transition duration-300"
              aria-label={act.title}
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mr-4 flex-shrink-0">
                {act.icon ? (
                  <img
                    src={act.icon}
                    alt={`${act.title} activity icon`}
                    className="w-14 h-14 object-contain"
                    loading="lazy"
                    width={56}
                    height={56}
                  />
                ) : (
                  <span className="text-2xl" aria-hidden="true">
                    🎯
                  </span>
                )}
              </div>

              {/* Activity Title */}
              <h4 className="text-lg font-serif text-black">{act.title}</h4>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
