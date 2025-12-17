import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom"; // added useNavigate import
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Controller } from "swiper/modules";
import "swiper/css";
import BookDayTour from "../components/BookDayTour";

export default function TourDetail() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [details, setDetails] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const mainSwiperRef = useRef(null);ri
  const thumbSwiperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTour() {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/day-tours/${id}`
        );
        if (res.data.success) {
          setTour(res.data.tour);
          setDetails(res.data.details);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchTour();
  }, [id]);

  if (!tour || !details)
    return <div className="text-center mt-20">Loading...</div>;

  const slides = details.gallerySlides || [];

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative flex flex-col md:flex-row min-h-screen w-full overflow-hidden bg-white">
        <div className="w-full md:w-1/2 h-[280px] sm:h-[350px] md:h-auto overflow-hidden md:rounded-r-[45%] relative">
          <img
            src={details.heroImage || "/images/d1.jpg"}
            alt={tour.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-10 md:px-20 mt-10 md:mt-0 text-center md:text-left">
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-6xl font-bold leading-tight tracking-tight max-w-xl mx-auto md:mx-0">
            {tour.title}
            <span className="block">{tour.location} Day Tour</span>
          </h1>

          <p className="font-playfair text-lg sm:text-xl md:text-3xl text-gray-700 mt-4 md:mt-6 max-w-xl mx-auto md:mx-0">
            {details.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 md:mt-10 justify-center md:justify-start">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full text-sm font-semibold">
              EXPLORE DESTINATIONS
            </button>

            <button
              onClick={() => setShowForm(true)}
              className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-full text-sm font-semibold"
            >
              BOOK THIS TOUR
            </button>
          </div>
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
      <section className="w-full px-4 sm:px-6 md:px-24 lg:px-32 py-10 md:py-16">
        <div className="mx-auto max-w-4xl">
          {details.aboutParagraphs.map((para, idx) => (
            <p
              key={idx}
              className="
                font-inter
                text-sm sm:text-base md:text-lg
                leading-relaxed md:leading-loose
                text-gray-800
                mb-6
                text-left md:text-center
                break-words overflow-hidden
              "
            >
              {para}
            </p>
          ))}
        </div>
      </section>

      {/* ================= HISTORY SECTION ================= */}
      <section className="w-full px-6 md:px-32 py-10 mt-6">
        <h2 className="font-playfair text-3xl md:text-4xl mb-10 text-center">
          {details.historyTitle || "Historical prominence"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-base leading-relaxed">
          <ul className="list-disc pl-5 space-y-1">
            {details.historyLeftList.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>

          <ul className="list-disc pl-5 space-y-1">
            {details.historyRightList.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <h2 className="font-playfair text-3xl md:text-4xl mb-10 text-center mt-10">
        Gallery
      </h2>

      <section className="relative w-full px-4 md:px-10 py-10">
        {/* Main Swiper */}
        <Swiper
          modules={[Autoplay, Controller]}
          loop
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
          controller={{ control: thumbSwiperRef.current }}
          className="w-full h-[320px] sm:h-[450px] md:h-[600px]"
        >
          {slides.map(({ image, title, desc }, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative h-full w-full">
                <img
                  src={image}
                  alt={title}
                  className="h-full w-full object-cover brightness-[0.6]"
                />

                <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 text-white max-w-full md:max-w-[40%] md:ml-auto">
                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-playfair font-bold">
                    {title}
                  </h2>
                  <p className="text-sm sm:text-base mt-2">{desc}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thumbnail Swiper (Desktop only) */}
        <div className="hidden md:block absolute bottom-6 left-6 w-[420px]">
          <Swiper
            modules={[Controller]}
            loop
            slidesPerView={3}
            spaceBetween={10}
            onSwiper={(swiper) => (thumbSwiperRef.current = swiper)}
            controller={{ control: mainSwiperRef.current }}
            className="h-40"
          >
            {slides.map(({ image, title }, idx) => (
              <SwiperSlide key={idx}>
                <div className="h-full w-full relative rounded overflow-hidden cursor-pointer">
                  <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-0 w-full bg-black/60 text-white text-xs text-center py-1">
                    {title}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ================= BOOKING MODAL ================= */}
      {showForm && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[20000]"
            onClick={() => setShowForm(false)}
          />

          <div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[95vw] sm:w-[90vw] max-w-[700px] h-[90vh]
            bg-white shadow-2xl p-4 sm:p-6 z-[20001] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-black text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <BookDayTour
              tourId={tour._id}
              tourTitle={tour.title}
              tourLocation={tour.location}
            />
          </div>
        </>
      )}
    </>
  );
}
