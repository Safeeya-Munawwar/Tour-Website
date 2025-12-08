import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";

export default function Blog() {
  const [stories, setStories] = useState([]);
  const [showText, setShowText] = useState(false);

  // Animation for hero text
  useEffect(() => {
    setTimeout(() => setShowText(true), 200);
  }, []);

  // Fetch experiences from backend
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/experience"); // adjust route
        setStories(res.data.experiences);
      } catch (err) {
        console.error("Error fetching experiences:", err);
      }
    };

    fetchStories();
  }, []);

  return (
    <div className="font-poppins bg-white text-[#222]">
      {/* ---------------------------- HERO HEADER ---------------------------- */}
      <div
        className="w-full h-[360px] md:h-[560px] bg-cover bg-center relative flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/images/43.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/20"></div>

        <div
          className={`absolute bottom-6 md:bottom-10 right-4 md:right-10 max-w-[90%] md:w-[320px] bg-black/80 text-white p-4 md:p-6 backdrop-blur-sm shadow-lg border-none flex items-center justify-end transition-all duration-700 ease-out ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-xl md:text-3xl leading-snug text-right mr-4">
            Enjoy <br />
            Your Vacation…
          </h2>
          <div className="w-[2px] bg-white h-10 md:h-12"></div>
        </div>
      </div>

      {/* ---------------------------- BLOG PAGE ---------------------------- */}
      <section className="w-full py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm md:text-lg text-gray-600 tracking-widest font-semibold mb-3">
            BLOG & NEWS
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5">
            A Little Story From Us
          </h2>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            Explore stories, tips, and behind-the-scenes experiences from our
            team at NetLanka Tours. Stay inspired and discover how we craft
            unforgettable journeys across Sri Lanka.
          </p>

          <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-6"></div>

          {/* ---------------------------- STORIES GRID ---------------------------- */}
          <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-5 mt-12">
            {stories.length > 0 ? (
              stories.map((story) => (
                <div key={story._id} className="flex flex-col w-full">
                  <img
                    src={story.heroImg} // Cloudinary URL
                    alt={story.title}
                    className="w-full h-[330px] object-cover rounded-xl"
                  />
                  <h3 className="mt-5 text-[22px] font-semibold leading-snug">
                    {story.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-2">
                    {new Date(story.date).toLocaleDateString()}
                  </p>
                  <button className="mt-6 flex items-center gap-2 font-medium text-black hover:opacity-70">
                    Read More <IoIosArrowForward size={20} />
                  </button>
                </div>
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-500 mt-10">
                No stories available yet.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
