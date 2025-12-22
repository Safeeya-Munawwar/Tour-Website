import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";

export default function Experiences() {
  const [showText, setShowText] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6; // ✅ 6 cards per page

  useEffect(() => {
    setTimeout(() => setShowText(true), 200);

    const fetchExperiences = async () => {
      try {
        const res = await axiosInstance.get("/experience");
        setExperiences(res.data || []);
      } catch (err) {
        console.error("Failed to fetch experiences:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  // Pagination logic
  const totalPages = Math.ceil(experiences.length / perPage);
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentExperiences = experiences.slice(indexOfFirst, indexOfLast);

  return (
    <div className="font-poppins bg-white text-[#222]">
      {/* HERO HEADER */}
      <div
        className="w-full h-[360px] md:h-[560px] bg-cover bg-center relative flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('/images/experience-header.jpg')",
          backgroundPosition: "center 50%",
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div
          className={`absolute bottom-6 md:bottom-10 right-4 md:right-10 max-w-[90%] md:w-[460px] bg-black/80 text-white p-4 md:p-6 backdrop-blur-sm shadow-lg border-none flex items-center justify-end transition-all duration-700 ease-out ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-xl md:text-3xl leading-snug text-right mr-4">
            Discover Unique Experiences <br />
            Across Sri Lanka
          </h2>
          <div className="w-[2px] bg-white h-10 md:h-12"></div>
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
            Sri Lanka offers one of the most exotic getaways in the world.
            Explore yoga retreats, luxurious wellness escapes, cultural wonders,
            culinary delights, and thrilling adventures.
          </p>

          <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-6"></div>
        </div>

        {/* ---------------------------- CARD GRID ---------------------------- */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 mt-12">
          {currentExperiences.length > 0 ? (
            currentExperiences.map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                <img
                  src={item.mainImg || "/images/placeholder.jpg"}
                  alt={item.title || "Experience"}
                  className="w-full h-56 object-cover rounded-t-xl"
                />
                <div className="p-6">
                  <p className="text-[#8C1F28] text-sm font-semibold tracking-wide mb-1">
                    {item.subtitle || "Subtitle"}
                  </p>
                  <h3 className="text-2xl font-light text-gray-900 group-hover:text-[#8C1F28] transition-colors">
                    {item.title || "Title"}
                  </h3>
                  <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                    {item.description || "Description goes here."}
                  </p>
                  <Link to={`/experience/${item.slug || "#"}`}>
                    <button className="mt-4 text-[#8C1F28] font-semibold text-sm hover:underline">
                      Read more
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">No experiences available yet.</p>
          )}
        </div>

        {/* ---------------------------- PAGINATION ---------------------------- */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-16 flex-wrap">
            {/* Prev */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg border text-sm font-medium
                        disabled:opacity-40 disabled:cursor-not-allowed
                        hover:bg-gray-100"
            >
              Prev
            </button>

            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg border text-sm font-semibold
                    ${
                      currentPage === page
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {page}
                </button>
              );
            })}

            {/* Next */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg border text-sm font-medium
                        disabled:opacity-40 disabled:cursor-not-allowed
                        hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
