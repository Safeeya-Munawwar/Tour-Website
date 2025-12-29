import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";

export default function DayTour() {
  const [tours, setTours] = useState([]);
  const [showText, setShowText] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 8; // ✅ 8 cards per page

  // Fetch tours from backend
  useEffect(() => {
    async function fetchTours() {
      try {
        const res = await axiosInstance.get("/day-tours");
        if (res.data.success) setTours(res.data.tours || []);
      } catch (err) {
        console.error("Error fetching tours:", err);
      }
    }
    fetchTours();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setShowText(true), 200);
    return () => clearTimeout(t);
  }, []);
 // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [currentPage]);
  // Pagination logic
  const totalPages = Math.ceil(tours.length / perPage);
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentTours = tours.slice(indexOfFirst, indexOfLast);

  return (
    <div className="font-poppins bg-white text-[#222] pb-16">
      {/* HERO HEADER */}
      <div
        className="w-full h-[360px] md:h-[560px] bg-cover bg-center relative flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/images/daytours.webp')" }}
      >
        <div className="absolute inset-0 bg-black/20"></div>

        <div
          className={`absolute bottom-6 md:bottom-10 right-4 md:right-10 max-w-[90%] md:w-[300px] bg-black/80 text-white p-4 md:p-6 backdrop-blur-sm shadow-lg border-none flex items-center justify-end transition-all duration-700 ease-out ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-xl md:text-3xl leading-snug text-right mr-4">
            Travel Day Tour <br /> With Us…
          </h2>
          <div className="w-[2px] bg-white h-10 md:h-12"></div>
        </div>
      </div>

      {/* INTRO */}
      <div className="max-w-[1100px] mx-auto text-center px-6 mt-10">
        <div className="text-sm md:text-lg text-gray-600 tracking-widest font-semibold mb-3">
          Day Tours
        </div>

        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5">
          Enjoy A Day Tour In Sri Lanka
        </h2>

        <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          Welcome to the beautiful emerald isle known as Sri Lanka! Let us greet
          you with “Ayubowan” and offer you an exciting array of tours to enjoy!
        </p>

        <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-6"></div>
      </div>

      {/* CARD GRID */}
      <div className="space-y-10 px-6 sm:px-10 md:px-32 mt-16">
        {currentTours.length > 0 ? (
          currentTours.map((t) => (
            <div
              key={t._id}
              className="flex flex-col lg:flex-row bg-gray-100 shadow-lg rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl"
            >
              {/* IMAGE */}
              <div
                className="relative shrink-0 shadow-lg rounded-2xl overflow-hidden mx-auto mt-4 lg:mt-0"
                style={{
                  width: "100%",
                  maxWidth: "380px",
                  borderRadius: "0 0 50% 0 / 0 0 50% 0",
                  boxShadow: "12px 0 25px rgba(0,0,0,0.18)",
                }}
              >
                <div className="w-full aspect-[19/20]">
                  <img
                    src={t.img}
                    alt={t.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>

              {/* CONTENT */}
              <div className="flex flex-col justify-center px-4 py-6 sm:px-6 md:px-14 flex-1 text-center lg:text-left">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
                  {t.title}
                </h2>

                <div className="text-sm font-semibold tracking-widest text-[#2E5B84] uppercase mb-3">
                  {t.location}
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {t.desc}
                </p>

                <Link
                  to={`/day-tour-detail/${t._id}`}
                  className="mx-auto lg:mx-0"
                >
                  <button className="inline-flex items-center gap-2 bg-gradient-to-r from-[#73A5C6] to-[#2E5B84] hover:from-[#82B3D2] hover:to-[#254A6A] text-white font-semibold rounded-full px-6 py-2 transition">
                    View Tour →
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No tours available.
          </p>
        )}
      </div>

      {/* PAGINATION */}
      {totalPages >= 1 && (
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
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-lg border text-sm font-medium
                       disabled:opacity-40 disabled:cursor-not-allowed
                       hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
