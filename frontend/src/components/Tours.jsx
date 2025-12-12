import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function PopularTours() {
  const [dayTours, setDayTours] = useState([]);
  const [roundTours, setRoundTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        // Last 2 day tours
        const dayRes = await axios.get("http://localhost:5000/api/day-tours");
        const lastTwoDayTours = dayRes.data.tours
          .sort((a, b) => (b._id > a._id ? 1 : -1))
          .slice(0, 2);
        setDayTours(lastTwoDayTours);

        // Last 2 round tours
        const roundRes = await axios.get("http://localhost:5000/api/round-tours");
        if (roundRes.data.success) {
          const lastTwoRoundTours = roundRes.data.tours
            .sort((a, b) => (b._id > a._id ? 1 : -1))
            .slice(0, 2);
          setRoundTours(lastTwoRoundTours);
        }
      } catch (err) {
        console.error("Failed to fetch tours:", err);
      }
    };

    fetchTours();
  }, []);

  // Interleave tours: round, day, round, day
  const allTours = [];
  for (let i = 0; i < 2; i++) {
    if (roundTours[i]) allTours.push({ ...roundTours[i], type: "round" });
    if (dayTours[i]) allTours.push({ ...dayTours[i], type: "day" });
  }

  return (
    <section className="w-full bg-[#F5F7FA] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-center text-gray-500 text-lg font-semibold tracking-wide">
          ITINERARIES
        </p>
        <h2 className="text-center text-4xl md:text-5xl font-extrabold text-gray-900 mt-3">
          Popular Tours
        </h2>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-2 py-2">
          {allTours.length > 0 ? (
            allTours.map((tour) => (
              <div
                key={tour._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition p-0 overflow-hidden border border-gray-100"
              >
                <img
                  src={tour.img}
                  alt={tour.title}
                  className="w-full h-52 object-cover"
                />
                <div className="py-6 text-center flex flex-col items-center">
                  <h3 className="text-xl font-semibold text-gray-900">{tour.title}</h3>
                  {tour.location && (
                    <p className="text-gray-500 mt-2 flex items-center gap-1">
                      <FaMapMarkerAlt className="text-red-500" size={16} />
                      {tour.location}
                    </p>
                  )}

                  {/* Show small type tag */}
                  <span
                    className={`mt-2 px-3 py-1 text-xs font-semibold rounded-full ${
                      tour.type === "round" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                    }`}
                  >
                    {tour.type === "round" ? "Round Tour" : "Day Tour"}
                  </span>

                  <Link
                    to={
                      tour.type === "round"
                        ? `/round-tours/${tour._id}`
                        : `/day-tour-detail/${tour._id}`
                    }
                    className="mt-5 w-full"
                  >
                    <button className="bg-gradient-to-r from-[#73A5C6] to-[#2E5B84] hover:from-[#82B3D2] hover:to-[#254A6A] text-white font-semibold rounded-full px-6 py-2 flex items-center gap-2 mx-auto transition">
                      READ MORE →
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-4 text-gray-500">No tours available</p>
          )}
        </div>
      </div>
    </section>
  );
}
