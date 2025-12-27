import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";

export default function Destination() {
  const [showText, setShowText] = useState(false);
  const [destinations, setDestinations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 12; // ✅ 12 cards per page

  useEffect(() => {
    setTimeout(() => setShowText(true), 200);
  }, []);

  // Fetch destinations from backend
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await axiosInstance.get("/destination");
        setDestinations(res.data.destinations || []);
      } catch (err) {
        console.error("Error fetching destinations:", err);
      }
    };
    fetchDestinations();
  }, []);
   // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [currentPage]);

  const totalPages = Math.ceil(destinations.length / perPage);
  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentDestinations = destinations.slice(
    indexOfFirst,
    indexOfLast
  );

  return (
    <div className="font-poppins bg-white text-[#222]">
      {/* HERO HEADER */}
      <div
        className="w-full h-[360px] md:h-[560px] bg-cover bg-center relative flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/images/light.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/20"></div>

        <div
          className={`absolute bottom-6 md:bottom-10 right-4 md:right-10 max-w-[90%] md:w-[360px] bg-black/80 text-white p-4 md:p-6 backdrop-blur-sm shadow-lg border-none flex items-center justify-end transition-all duration-700 ease-out ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-xl md:text-3xl leading-snug text-right mr-4">
            Explore Destination <br /> With Us…
          </h2>
          <div className="w-[2px] bg-white h-10 md:h-12"></div>
        </div>
      </div>

      {/* DESTINATIONS GRID */}
      <section className="w-full py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm md:text-lg text-gray-600 tracking-widest font-semibold mb-3">
            HIDDEN MAGICAL PLACES
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5">
            Best Destinations in Sri Lanka
          </h2>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            Discover the most breathtaking places across Sri Lanka. From
            sun-kissed beaches to misty highlands, our curated destinations
            promise unforgettable experiences for every traveler.
          </p>

          <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-6"></div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mt-12">
            {currentDestinations.length > 0 ? (
              currentDestinations.map((item) => (
                <div key={item._id} className="flex flex-col w-full">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-56 object-cover rounded-xl shadow-md"
                  />
                  <p className="text-gray-500 text-sm mt-4">
                    {item.subtitle}
                  </p>
                  <h3 className="text-xl font-semibold text-gray-900 mt-1">
                    {item.title}
                  </h3>
                </div>
              ))
            ) : (
              <p className="col-span-4 text-center text-gray-500 mt-10">
                No destinations available.
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
    {[...Array(totalPages)].map((_, index) => {
      const page = index + 1;
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
      </section>
    </div>
  );
}
