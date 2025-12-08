import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Controller } from "swiper/modules";
import "swiper/css";
import BookForm from "./BookForm";

export default function TourDetail() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [details, setDetails] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const mainSwiperRef = useRef(null);
  const thumbSwiperRef = useRef(null);

  useEffect(() => {
    async function fetchTour() {
      try {
        const res = await axios.get(`http://localhost:5000/api/day-tours/${id}`);
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

  if (!tour || !details) return <div className="text-center mt-20">Loading...</div>;

  const slides = details.gallerySlides || [];

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative flex flex-col md:flex-row h-screen w-full overflow-hidden bg-white">
        <div className="w-full md:w-1/2 h-80 md:h-full overflow-hidden rounded-r-[45%] relative">
          <img
            src={details.heroImage || "/images/d1.jpg"}
            alt={tour.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center px-10 md:px-20 mt-20">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold leading-[1.05] tracking-[-1px] max-w-xl">
            {tour.title}
            <span className="block">{tour.location} Day Tour</span>
          </h1>

          <p className="font-playfair text-2xl md:text-3xl text-gray-700 mt-6 leading-snug tracking-[-0.5px] max-w-xl">
            {details.heroSubtitle}
          </p>

          <div className="flex gap-4 mt-10">
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

      {/* ABOUT SECTION */}
      <section className="w-full px-6 md:px-32 py-10 mt-14 text-center">
        {details.aboutParagraphs.map((para, idx) => (
          <p
            key={idx}
            className="font-inter text-base leading-relaxed text-gray-800 max-w-5xl mx-auto tracking-tight my-4"
          >
            {para}
          </p>
        ))}
      </section>

      {/* HISTORICAL SECTION */}
      <section className="w-full px-6 md:px-32 py-10 mt-6">
        <h2 className="font-playfair text-4xl leading-tight tracking-[-1px] mb-10 text-center">
          {details.historyTitle || "Historical prominence of Anuradhapura"}
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

      {/* GALLERY SECTION */}
      <h2 className="font-playfair text-4xl leading-tight tracking-[-1px] mb-10 text-center mt-10">
        Gallery
      </h2>

      <section className="relative w-full h-[600px] px-10 py-10 flex items-center">
        {/* Main Swiper */}
        <Swiper
          modules={[Autoplay, Controller]}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
          controller={{ control: thumbSwiperRef.current }}
          className="h-full w-full"
        >
          {slides.map(({ image, title, desc }, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative h-full w-full">
                <img
                  src={image}
                  alt={title}
                  className="h-full w-full object-cover brightness-[0.6]"
                />
                <div className="absolute top-1/2 right-10 transform -translate-y-1/2 w-1/3 text-white flex flex-col gap-4">
                  <h2 className="text-4xl md:text-5xl font-playfair font-bold">{title}</h2>
                  <p className="text-sm md:text-base">{desc}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Thumbnail Swiper */}
        <div className="absolute bottom-10 left-10 w-[500px] px-4 py-4">
          <Swiper
            modules={[Autoplay, Controller]}
            loop={true}
            slidesPerView={3}
            spaceBetween={10}
            onSwiper={(swiper) => (thumbSwiperRef.current = swiper)}
            controller={{ control: mainSwiperRef.current }}
            className="h-52"
          >
            {slides.map(({ image, title }, idx) => (
              <SwiperSlide key={idx}>
                <div className="h-full w-full relative rounded overflow-hidden cursor-pointer">
                  <img src={image} alt={title} className="h-full w-full object-cover" />
                  <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-xs text-center py-1">
                    {title}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* BOOKING FORM MODAL */}
      {showForm && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[20000]"
            onClick={() => setShowForm(false)}
          ></div>
          <div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[400px] h-[90vh] bg-white shadow-2xl p-4 z-[20001] flex flex-col overflow-auto"
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
            <BookForm />
          </div>
        </>
      )}
    </>
  );
}
