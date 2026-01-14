import { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import BookTour from "./BookTour";

export default function WhyChooseUs() {
  const [showForm, setShowForm] = useState(false);
  const [items, setItems] = useState([]);

  // Fetch "Why Choose Us" content
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axiosInstance.get("/home");
        if (Array.isArray(res.data?.whyChooseUs)) {
          setItems(res.data.whyChooseUs);
        }
      } catch (err) {
        console.error("Failed to fetch Why Choose Us items:", err);
      }
    };
    fetchItems();
  }, []);

  return (
    <section
      className="w-full bg-white py-16"
      aria-labelledby="why-choose-us-title"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Subtitle */}
        <p className="text-sm md:text-lg font-semibold tracking-widest text-gray-500 uppercase">
          Why Choose Us
        </p>

        {/* Main SEO Heading */}
        <h2
          id="why-choose-us-title"
          className="text-center text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mt-3 mb-14"
        >
          Why Travelers Choose Our Tour Packages
        </h2>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <article
              key={index}
              className="bg-white rounded-xl shadow-md p-10 flex flex-col items-center text-center"
              aria-label={item.title}
            >
              {/* Icon */}
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                {item.icon ? (
                  <img
                    src={item.icon}
                    alt={`${item.title} - Sri Lanka tour service`}
                    className="w-20 h-20 object-contain"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-2xl" aria-hidden="true">
                    🎯
                  </span>
                )}
              </div>

              {/* Feature title */}
              <h3 className="mt-6 text-xl font-semibold text-gray-800">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => setShowForm(true)}
          className="mt-16 bg-[#1A1A1A] hover:bg-black text-white font-semibold px-10 py-4 rounded-full text-lg transition"
          aria-label="Book a tour in Sri Lanka"
        >
          Book Your Tour
        </button>

        {/* Booking Modal */}
        {showForm && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[20000] flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label="Tour booking form"
            onClick={() => setShowForm(false)}
          >
            <div
              className="w-[95vw] max-w-[700px] h-[90vh] bg-white shadow-2xl rounded-2xl relative flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative px-6 py-6 border-b">
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-3xl font-bold text-gray-600 hover:text-black"
                  aria-label="Close booking form"
                >
                  &times;
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto p-6">
                <BookTour />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
