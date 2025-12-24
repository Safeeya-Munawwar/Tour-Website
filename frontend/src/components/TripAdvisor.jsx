import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { axiosInstance } from "../lib/axios";
import "swiper/css";
import "swiper/css/navigation";

export default function Testimonials() {
    const [messages, setMessages] = useState([]);

      // Fetch contact form messages
  const fetchMessages = async () => {
    try {
      const res = await axiosInstance.get("/contact-form"); // fetch from backend
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <section className="w-full py-24 bg-slate-100 font-sans">
        <div className="max-w-7xl mx-auto px-6 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
          {/* LEFT STATIC TRIPADVISOR SUMMARY */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="text-xl font-bold text-black uppercase tracking-wide">
              Excellent
            </h3>

            <div className="flex gap-2 mt-2">
              {[...Array(5)].map((_, i) => (
                <img key={i} src="/f.svg" alt="f" className="w-8 h-8" />
              ))}
            </div>

            <p className="mt-2 text-gray-700">
              Based on{" "}
              <span className="font-bold">{messages.length} reviews</span>
            </p>

            <div className="flex items-center gap-2 mt-3">
              <img src="/logo4.svg" alt="logo" className="w-32 h-20" />
            </div>
          </div>

          {/* RIGHT SIDE SWIPER */}
          <div className="relative lg:col-span-3">
            <Swiper
              modules={[Navigation, Autoplay]}
              navigation={{ prevEl: ".trip-prev", nextEl: ".trip-next" }}
              loop={true}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              spaceBetween={28}
              slidesPerView={1.1}
              breakpoints={{
                640: { slidesPerView: 1.5 },
                1024: { slidesPerView: 2.5 },
                1280: { slidesPerView: 3 },
              }}
            >
              {messages.map((item, i) => (
                <SwiperSlide key={i}>
                  <div className="bg-white p-6 rounded-3xl shadow-md border border-gray-200 min-h-[260px] h-full flex flex-col">
                    {/* TOP ROW */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                        {item.firstName[0]} {/* first letter */}
                      </div>

                      <div>
                        <h4 className="font-semibold text-lg text-gray-900">
                          {item.firstName} {item.lastName}
                        </h4>
                        <p className="text-gray-400 text-sm">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      <img src="/f.svg" alt="img" className="w-6 h-6 ml-auto" />
                    </div>

                    {/* GREEN RATING */}
                    <div className="flex gap-1 text-green-600 text-lg mb-3">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <FaStar
                          key={n}
                          className={
                            n <= (item.rating || 5)
                              ? "text-green-600"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>

                    {/* REVIEW TEXT */}
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-4 flex-1">
                      {item.message}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* ARROWS */}
            <button className="trip-prev absolute left-[-20px] top-1/2 -translate-y-1/2 bg-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center">
              <FaChevronLeft />
            </button>

            <button className="trip-next absolute right-[-20px] top-1/2 -translate-y-1/2 bg-white shadow-lg w-10 h-10 rounded-full flex items-center justify-center">
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}