import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function DestinationHome() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/destination");
        const allDestinations = res.data.destinations || [];

        // Sort by newest first (_id timestamp) and take last 8 added
        const last7Destinations = allDestinations
          .sort((a, b) => (b._id > a._id ? 1 : -1))
          .slice(0, 8);

        setDestinations(last7Destinations);
      } catch (err) {
        console.error("Error fetching destinations:", err);
      }
    };
    fetchDestinations();
  }, []);

  return (
    <section className="w-full bg-slate-100 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-sm md:text-lg font-semibold tracking-widest text-gray-500 mb-3">
          HIDDEN MAGICAL PLACES
        </p>
        <h2 className="text-center text-4xl md:text-5xl font-extrabold text-gray-900 mb-20">
          Best Destinations in Sri Lanka
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
  {destinations.length > 0 ? (
    destinations.map((item, i) => (
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
    ))
  ) : (
    <p className="col-span-4 text-center text-gray-500 mt-10">
      No destinations available.
    </p>
  )}

  {/* Button centered in grid width */}
  <div className="col-span-full justify-self-center mt-8">
    <Link to="/destinations">
      <button className="bg-[#1A1A1A] hover:bg-black text-white font-semibold px-10 py-4 rounded-full text-lg">
        All Destinations
      </button>
    </Link>
  </div>
</div>
</div>
    </section>
  );
}
