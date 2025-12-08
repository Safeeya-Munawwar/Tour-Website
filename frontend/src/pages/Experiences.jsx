import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Experiences() {
  const [showText, setShowText] = useState(false);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    setTimeout(() => setShowText(true), 200);
  }, []);

  // Fetch experiences from backend
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/experience"); // update URL if needed
        setExperiences(res.data.experiences); // matches your backend response
      } catch (err) {
        console.error("Error fetching experiences:", err);
      }
    };

    fetchExperiences();
  }, []);

  return (
    <div className="font-poppins bg-white text-[#222]">
      {/* ---------------------------- HERO HEADER ---------------------------- */}
      <div
        className="w-full h-[360px] md:h-[560px] bg-cover bg-center relative flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('/images/experience-header.jpg')",
          backgroundPosition: "center 50%",
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>

        <div
          className={`absolute bottom-6 md:bottom-10 right-4 md:right-10 max-w-[90%] md:w-[480px] bg-black/80 text-white p-4 md:p-6 backdrop-blur-sm shadow-lg border-none flex items-center justify-end transition-all duration-700 ease-out ${
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

      {/* ---------------------------- EXPERIENCES GRID ---------------------------- */}
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

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 mt-12">
          {experiences.length > 0 ? (
            experiences.map((item) => (
              <div
                key={item._id}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                <img
                  src={item.heroImg} // use Cloudinary URL from DB
                  alt={item.title}
                  className="w-full h-56 object-cover rounded-t-xl"
                />

                <div className="p-6">
                  <p className="text-[#8C1F28] text-sm font-semibold tracking-wide mb-1">
                    {item.subtitle}
                  </p>

                  <h3 className="text-2xl font-light text-gray-900 group-hover:text-[#8C1F28] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-sm mt-3 leading-relaxed">
                    {item.mainDesc || item.desc}
                  </p>

                  <Link to={`/experience/${item._id}`}>

                    <button className="mt-4 text-[#8C1F28] font-semibold text-sm hover:underline">
                      Read more
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500 mt-10">
              No experiences available.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
