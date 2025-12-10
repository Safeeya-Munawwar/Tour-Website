import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Controller } from "swiper/modules";
import "swiper/css";
import { FiClock, FiUsers, FiMapPin, FiStar } from "react-icons/fi";
import BookForm from "./BookForm"; // adjust path if needed

export default function RoundTourDetail() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [details, setDetails] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
 const mainSwiperRef = useRef(null);
  const thumbSwiperRef = useRef(null);

  useEffect(() => {
    async function fetch() {
      try {
        const res = await axios.get(`http://localhost:5000/api/round-tours/${id}`);
        if (res.data.success) {
          setTour(res.data.tour);
          setDetails(res.data.details || {});
        }
      } catch (err) {
        console.error("Error fetching round tour detail:", err);
      }
    }
    fetch();
  }, [id]);

  if (!tour) return <div className="p-8 text-center">Loading...</div>;

  const slides = (details?.gallerySlides || []).length ? details.gallerySlides : [
    { image: tour.img, title: tour.title, desc: tour.desc },
  ];

  const itinerary = details?.itinerary || [];

  return (
    <div className="font-poppins">
      <section className="relative flex flex-col md:flex-row h-screen w-full overflow-hidden bg-white">
        <div className="w-full md:w-1/2 h-80 md:h-full overflow-hidden rounded-r-[45%] relative">
          <img src={details?.heroImage || tour.img} alt={tour.title} className="absolute inset-0 w-full h-full object-cover object-center" />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center px-10 md:px-20 mt-20">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold leading-[1.05] tracking-[-1px] max-w-xl">
            {details?.heroTitle || tour.title}
            <br />
            <span className="block text-2xl text-[#D4AF37] mt-1">{tour.days || details?.tourFacts?.duration}</span>
          </h1>

          <p className="text-2xl md:text-3xl text-gray-700 mt-6 leading-snug tracking-[-0.5px] max-w-xl">
            {details?.heroSubtitle || tour.desc}
          </p>

          <div className="flex gap-4 mt-10">
            <button className="bg-gradient-to-r from-[#73A5C6] to-[#2E5B84] hover:from-[#82B3D2] hover:to-[#254A6A] text-white px-8 py-4 rounded-full font-semibold">
              EXPLORE DESTINATIONS
            </button>
            <button onClick={() => setShowForm(true)} className="bg-[#D4AF37] hover:bg-yellow-500 text-gray-900 px-8 py-4 rounded-full font-semibold">
              BOOK THIS TOUR
            </button>
          </div>
        </div>
      </section>

      <section className="w-full px-6 md:px-32 py-10 mt-10">
        <h2 className="font-playfair text-4xl mb-10 text-center">Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-gray-700">
          {(details?.highlights || []).map((h, i) => (
            <div key={i} className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col gap-3">
              <h3 className="font-semibold text-xl mb-1 flex items-center gap-2">
                <FiStar className="text-yellow-400" /> {h.title}
              </h3>
              <p>{h.desc}</p>
            </div>
          ))}

          {(details?.highlights || []).length === 0 && (
            <div className="text-center col-span-3">No highlights provided.</div>
          )}
        </div>
      </section>

      <section className="w-full px-6 md:px-32 py-10 mt-10">
        <h2 className="font-playfair text-4xl mb-10 text-center">Day-wise Itinerary</h2>

        <div className="space-y-16">
          {itinerary.length === 0 && <div className="text-center">No itinerary available.</div>}
          {[...Array(Math.ceil(itinerary.length / 7))].map((_, weekIndex) => {
            const weekDays = itinerary.slice(weekIndex * 7, weekIndex * 7 + 7);
            return (
              <div key={weekIndex} className="flex justify-between items-center">
                {weekDays.map((day) => (
                  <div key={day.day} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-white font-bold">
                        {day.day}
                      </div>
                      <span className="text-xs mt-1 text-gray-700 text-center">{day.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </section>

      <section className="w-full px-6 md:px-32 py-10 mt-10">
        <h2 className="font-playfair text-4xl mb-10 text-center">Tour Facts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700 text-center">
          <div className="bg-gray-100 p-6 rounded-lg shadow flex flex-col items-center gap-2">
            <FiClock className="text-[#D4AF37] text-2xl" />
            <h3 className="font-semibold text-xl mb-1">Duration</h3>
            <p>{details?.tourFacts?.duration || tour.days || "—"}</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow flex flex-col items-center gap-2">
            <FiStar className="text-[#D4AF37] text-2xl" />
            <h3 className="font-semibold text-xl mb-1">Difficulty</h3>
            <p>{details?.tourFacts?.difficulty || "—"}</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow flex flex-col items-center gap-2">
            <FiUsers className="text-[#D4AF37] text-2xl" />
            <h3 className="font-semibold text-xl mb-1">Group Size</h3>
            <p>{details?.tourFacts?.groupSize || "—"}</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow flex flex-col items-center gap-2">
            <FiMapPin className="text-[#D4AF37] text-2xl" />
            <h3 className="font-semibold text-xl mb-1">Best Season</h3>
            <p>{details?.tourFacts?.bestSeason || "—"}</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow flex flex-col items-center gap-2">
            <FiStar className="text-[#D4AF37] text-2xl" />
            <h3 className="font-semibold text-xl mb-1">Tour Type</h3>
            <p>{details?.tourFacts?.tourType || "—"}</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow flex flex-col items-center gap-2">
            <FiMapPin className="text-[#D4AF37] text-2xl" />
            <h3 className="font-semibold text-xl mb-1">Languages</h3>
            <p>{details?.tourFacts?.languages || "—"}</p>
          </div>
        </div>
      </section>

      {/* GALLERY WITH MAIN + THUMB SWIPER */}
      <h2 className="font-playfair text-4xl mb-5 mt-8 text-center">Gallery</h2>
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
                  className="h-full w-full object-cover brightness-[0.6] rounded-lg"
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
            modules={[Controller]}
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

      {showForm && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[20000]" onClick={() => setShowForm(false)}></div>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[420px] h-[90vh] bg-white shadow-xl p-4 z-[20001] overflow-auto rounded-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end">
              <button className="text-3xl font-bold text-gray-600 hover:text-black" onClick={() => setShowForm(false)}>×</button>
            </div>
            <BookForm />
          </div>
        </>
      )}
    </div>
  );
}