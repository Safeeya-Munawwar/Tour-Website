import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";

export default function ExperienceSection() {
  const [activities, setActivities] = useState([]);

  // Fetch top activities from backend
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

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <section className="w-full bg-slate-100 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Subtitle */}
        <p className="text-center text-gray-500 text-lg font-semibold tracking-wide">
          EXPERIENCES
        </p>

        {/* Title */}
        <h2 className="text-center text-4xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-14">
          Top Activities
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {activities.map((act, index) => (
            <div
              key={index}
              className="flex items-center bg-white shadow-md rounded-lg px-6 py-3 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer"
              style={{
                width: "300px",
                height: "120px",
              }}
            >
              {/* Icon inside a white circle */}
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mr-4">
                {act.icon ? (
                  <img
                    src={act.icon}
                    alt={act.title}
                    className="w-24 h-24 object-contain"
                  />
                ) : (
                  <span className="text-2xl">🎯</span>
                )}
              </div>

              {/* Title */}
              <p className="text-lg font-serif text-black">{act.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
