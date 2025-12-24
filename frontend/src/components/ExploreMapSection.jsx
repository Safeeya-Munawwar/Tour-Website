import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { axiosInstance } from "../lib/axios";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ExploreSriLankaSection() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  const mapImage = [
    { title: "ADVENTURE TRAILS", image: "/images/adventure.jpeg" },
    { title: "BEACH ESCAPES", image: "/images/beach.jpeg" },
    { title: "CULTURAL WONDERS", image: "/images/culture.jpeg" },
    { title: "HIDDEN GEMS", image: "/images/hidden-gems.jpeg" },
    { title: "WILDLIFE SAFARIS", image: "/images/wildlife.jpeg" },
  ];

  return (
    <section className="w-full py-12 sm:py-16 bg-white">
      <div className="max-w-[1350px] mx-auto px-4 lg:px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* LEFT DESCRIPTION */}
        <div className="lg:col-span-3 text-left pb-6">
          <p className="text-sm sm:text-base md:text-lg tracking-wide text-gray-500 font-semibold mb-2">
            Explore Sri Lanka
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 sm:mb-6">
            Things to do In Sri Lanka
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
            Sri Lanka brings together beaches, mountains, culture, and wildlife
            in one vibrant island. Every traveler can find something to enjoy -
            adventure, history, nature, or simply the joy of slowing down beside
            the ocean.
          </p>
        </div>

        {/* CENTER MAP */}
        <div className="lg:col-span-6 flex justify-center pb-6">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            loop={true}
            slidesPerView={1}
            spaceBetween={10}
          >
            {mapImage.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="text-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full sm:h-full md:h-full lg:h-full object-cover mx-auto rounded-lg"
                  />
                  <p className="mt-2 text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                    {item.title}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* RIGHT EXPERIENCES SWIPER */}
        <div className="lg:col-span-3 relative">
          {loading ? (
            <p className="text-center text-sm sm:text-base">Loading...</p>
          ) : experiences.length === 0 ? (
            <p className="text-center text-sm sm:text-base">No experiences found.</p>
          ) : (
            <Swiper
              modules={[Autoplay, Navigation]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              navigation={{
                nextEl: ".trip-next",
                prevEl: ".trip-prev",
              }}
              spaceBetween={20}
              slidesPerView={1}
            >
              {experiences.map((exp, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white rounded-xl border border-gray-900 shadow-lg overflow-hidden mx-auto max-w-full sm:max-w-[300px] transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
                    <img
                      src={exp.mainImg || "/images/placeholder.jpg"}
                      alt={exp.title}
                      className="w-full h-48 sm:h-64 object-cover"
                    />
                    <div className="p-3 sm:p-4 flex flex-col justify-between h-full">
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                          {exp.title}
                        </h3>
                        <p className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm">
                          {exp.description}
                        </p>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <button className="trip-prev bg-black text-white shadow-lg w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                          <FaChevronLeft />
                        </button>
                        <div className="flex-1"></div>
                        <button className="trip-next bg-black text-white shadow-lg w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                          <FaChevronRight />
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
}
