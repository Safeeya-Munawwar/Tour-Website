import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";

export default function Testimonials() {
  const [bigReviews, setBigReviews] = useState([]);
  const [smallReviews, setSmallReviews] = useState([]);

  // Fetch backend messages
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/contact-form");
        const mapped = res.data.map((msg) => ({
          name: `${msg.firstName} ${msg.lastName}`,
          time: new Date(msg.createdAt).toLocaleDateString(),
          review: msg.message,
          avatar: msg.firstName.charAt(0).toUpperCase(),
          rating: msg.rating || 0,
        }));
        setBigReviews(mapped.reverse()); // latest first
      } catch (err) {
        console.error("Failed to fetch reviews", err);
      }
    };
    fetchReviews();
  }, []);

  useEffect(() => {
    const fetchSmallReviews = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/reviews");

        // Map backend review → small review card
        const mappedSmall = res.data.reviews.map((r) => ({
          name: r.name,
          time: new Date(r.createdAt).toLocaleDateString(),
          review: r.message,
          rating: r.rating,
          img: "/images/profile-user.PNG",
        }));

        setSmallReviews(mappedSmall.reverse()); // latest first
      } catch (error) {
        console.error("Failed to load small reviews", error);
      }
    };

    fetchSmallReviews();
  }, []);

  return (
    <section className="w-full py-24 bg-white font-sans">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* LEFT CONTENT */}
        <div>
          <p className="text-sm font-semibold tracking-widest text-gray-500">
            TESTIMONIALS
          </p>

          <h2 className="text-5xl font-extrabold text-gray-900 mt-4 leading-tight">
            Message From <br /> Adventurers
          </h2>

          <p className="text-gray-600 mt-6 text-lg leading-relaxed max-w-md">
            Every journey leaves a story behind. From misty mountains to golden
            shores, our adventures in Sri Lanka reminded us how travel connects
            hearts, cultures, and unforgettable moments.
          </p>
        </div>

        {/* GOOGLE REVIEW BIG CARD */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{ prevEl: ".g-prev", nextEl: ".g-next" }}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop={true}
            slidesPerView={1}
            className="bg-[#f7f7f7] rounded-2xl shadow-lg"
          >
            {bigReviews.map((item, i) => (
              <SwiperSlide key={i}>
                <div className="bg-[#f7f7f7] p-10 rounded-2xl">
                  {/* user */}
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="w-20 h-20 bg-indigo-600 text-white rounded-full flex items-center justify-center text-3xl font-bold relative">
                      {item.avatar}
                      <span className="absolute -bottom-1 right-2 text-white bg-[#4285F4] px-1 py-[1px] text-xs rounded-full">
                        G
                      </span>
                    </div>

                    <h3 className="font-semibold mt-3">{item.name}</h3>
                    <p className="text-gray-500 text-sm">{item.time}</p>
                  </div>

                  {/* stars */}
                  <div className="flex justify-center gap-1 text-yellow-400 mb-4">
                    {[...Array(5)].map((_, i) => {
                      // check if rating exists and fill stars accordingly
                      const filled = item.rating && i < Number(item.rating);
                      return (
                        <FaStar
                          key={i}
                          className={
                            filled ? "text-yellow-400" : "text-gray-300"
                          }
                        />
                      );
                    })}
                  </div>

                  {/* review */}
                  <p className="text-gray-700 text-center leading-relaxed">
                    {item.review}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* arrows */}
          <button className="g-prev absolute left-[-22px] top-1/2 -translate-y-1/2 bg-white shadow-md w-10 h-10 rounded-full flex items-center justify-center">
            <FaChevronLeft />
          </button>
          <button className="g-next absolute right-[-22px] top-1/2 -translate-y-1/2 bg-white shadow-md w-10 h-10 rounded-full flex items-center justify-center">
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* GOOGLE score */}
      <p className="text-center mt-14 text-gray-700 text-lg">
        Google rating score: <span className="font-bold text-black">5.0</span>{" "}
        of 5, based on <span className="font-bold">124 reviews</span>
      </p>

      {/* BOTTOM TRIPADVISOR SECTION */}
      <div className="max-w-7xl mx-auto px-6 mt-20">
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
              Based on <span className="font-bold">271 reviews</span>
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
              {smallReviews.map((item, i) => (
                <SwiperSlide key={i}>
                  <div className="bg-white p-6 rounded-3xl shadow-md border border-gray-200 min-h-[260px] h-full flex flex-col">
                    {/* TOP ROW */}
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={item.img}
                        alt="img"
                        className="w-12 h-12 rounded-full object-cover"
                      />

                      <div>
                        <h4 className="font-semibold text-lg text-gray-900">
                          {item.name}
                        </h4>
                        <p className="text-gray-400 text-sm">{item.time}</p>
                      </div>

                      <img src="/f.svg" alt="img" className="w-6 h-6 ml-auto" />
                    </div>

                    {/* GREEN RATING */}
                    <div className="flex gap-1 text-green-600 text-lg mb-3">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <FaStar
                          key={n}
                          className={
                            n <= item.rating
                              ? "text-green-600"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>

                    {/* REVIEW TEXT — flex-1 makes all cards equal height */}
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-4 flex-1">
                      {item.review}
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
