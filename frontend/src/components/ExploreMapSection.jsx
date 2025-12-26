import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";

export default function ExploreSriLankaSection() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await axiosInstance.get("/experience");
        setExperiences(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  const mapImages = [
    { title: "ADVENTURE TRAILS", image: "/images/adventure.jpeg" },
    { title: "BEACH ESCAPES", image: "/images/beach.jpeg" },
    { title: "CULTURAL WONDERS", image: "/images/culture.jpeg" },
    { title: "WILDLIFE SAFARIS", image: "/images/wildlife.jpeg" },
  ];

  return (
    <section className="w-full py-24 bg-white">
      <div className="relative max-w-[1440px] mx-auto px-8 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
        {/* ---------------- LEFT INTRO ---------------- */}
        <div className="lg:col-span-3 space-y-6 p-6 lg:p-8 lg:-mr-16 xl:-mr-24 z-20">
          <p className="text-sm md:text-lg tracking-wide text-gray-500 font-semibold">
            EXPLORE SRI LANKA
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-2 md:mt-3">
            Experiences Across the Island
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-justify">
            From tranquil temples to thrilling landscapes, each journey is rich
            with culture, spirit, and adventure, unfolding stories that stay
            with you long after the journey ends.
          </p>

          <div className="w-12 h-[2px] bg-[#D4AF37]" />
        </div>

        {/* ---------------- CENTER MAP ---------------- */}
        <div className="lg:col-span-5 relative z-10 lg:scale-[0.97]">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop
            slidesPerView={1}
          >
            {mapImages.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white">
                  {/* IMAGE */}
                  <div className="relative h-[450px]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* TITLE BELOW IMAGE */}
                  <div className="py-4 text-center">
                    <h3 className="text-xl font-semibold tracking-wide">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ---------------- RIGHT EXPERIENCE CARD ---------------- */}
        <div className="lg:col-span-4 relative p-4 lg:p-6 lg:-ml-8 xl:-ml-8 z-20">
          {loading ? (
            <p className="text-center">Loading experiences...</p>
          ) : (
            <>
              {/* Navigation */}
              <button className="exp-prev absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg w-11 h-11 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition">
                <FaChevronLeft />
              </button>

              <button className="exp-next absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg w-11 h-11 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition">
                <FaChevronRight />
              </button>

              <Swiper
                modules={[Autoplay, Navigation]}
                autoplay={{ delay: 4500, disableOnInteraction: false }}
                loop
                slidesPerView={1}
                navigation={{
                  nextEl: ".exp-next",
                  prevEl: ".exp-prev",
                }}
              >
                {experiences.map((exp, index) => (
                  <SwiperSlide key={index}>
                    <div className="rounded-3xl overflow-hidden shadow-xl bg-white">
                      {/* IMAGE WITH CONTENT INSIDE */}
                      <div className="relative h-[420px] group">
                        <img
                          src={exp.mainImg || "/images/placeholder.jpg"}
                          alt={exp.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                        />

                        {/* Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/80 to-transparent" />

                        {/* TEXT */}
                        <div className="absolute bottom-0 p-6 text-white">
                          <p className="uppercase text-xs tracking-widest mb-1 opacity-80">
                            {exp.subtitle || "Signature Experience"}
                          </p>

                          <h3 className="text-2xl font-semibold mb-2">
                            {exp.title}
                          </h3>

                          <p className="text-sm leading-relaxed line-clamp-3 opacity-90">
                            {exp.description}
                          </p>

                          <Link to={`/experience/${exp.slug}`}>
                            <button className="mt-4 inline-block px-5 py-2 text-sm font-semibold bg-white text-black rounded-full hover:bg-[#D4AF37] transition">
                              Read More
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
