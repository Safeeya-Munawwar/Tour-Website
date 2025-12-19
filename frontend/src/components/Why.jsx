import { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import BookTour from "./BookTour";

export default function Why() {
  const [showForm, setShowForm] = useState(false);
  const [items, setItems] = useState([]);

  // Fetch "Why Choose Us" items from backend
  const fetchItems = async () => {
    try {
      const res = await axiosInstance.get("/home");
      if (res.data && Array.isArray(res.data.whyChooseUs)) {
        setItems(res.data.whyChooseUs);
      }
    } catch (err) {
      console.error("Failed to fetch Why Choose Us items:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Subtitle */}
        <p className="text-sm md:text-lg font-semibold tracking-widest text-gray-500 mb-4">
          WHY CHOOSE US
        </p>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-16">
          Our Experience is Our Strength
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-10 flex flex-col items-center text-center"
            >
              {/* Icon inside white circle */}
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                {item.icon ? (
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-24 h-24 object-contain"
                  />
                ) : (
                  <span className="text-2xl">🎯</span>
                )}
              </div>

              {/* Title */}
              <h3 className="mt-6 text-xl font-semibold text-gray-800">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
 
        {/* Button */}
        <button
  onClick={() => setShowForm(true)}
  className="mt-16 bg-[#1A1A1A] hover:bg-black text-white font-semibold px-10 py-4 rounded-full text-lg transition"
>
  Book Now
</button>

        {showForm && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[20000]">
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-[700px] h-[90vh] bg-white shadow-2xl p-6 z-[20001] flex flex-col overflow-auto">
      {/* Close button */}
      <div className="flex justify-end">
      <button
        onClick={() => setShowForm(false)}
        className="text-3xl font-bold text-gray-600 hover:text-black"
      >
        &times;
      </button>
</div>
      {/* Booking Form */}
      <BookTour />
    </div>
  </div>
)}
      </div>
    </section>
  );
}
