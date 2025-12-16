import React, { useEffect, useState, useRef } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";
import BookRoundTour from "../components/BookRoundTour";
import { FiMapPin, FiPhone, FiMail,FiCalendar  } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Controller } from "swiper/modules";
import "swiper/css";


export default function RoundTourDetail() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [details, setDetails] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const mainSwiperRef = useRef(null);
  const thumbSwiperRef = useRef(null);

  useEffect(() => {
    async function fetchTour() {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/round-tours/${id}`
        );
        if (res.data.success) {
          setTour(res.data.tour);
          setDetails(res.data.details || {});
        }
      } catch (err) {
        console.error("Error fetching round tour detail:", err);
      }
    }
    fetchTour();
  }, [id]);

  if (!tour) return <div className="p-8 text-center">Loading...</div>;
const slides =
  details?.gallerySlides?.length
    ? details.gallerySlides
    : [
        {
          image: details?.heroImage || tour.img,
          title: tour.title,
          desc: tour.desc,
        },
      ];

  return (
    <div className="font-poppins">
      {/* HERO SECTION (ONLY SECTION KEPT) */}
      <section className="relative flex flex-col md:flex-row h-screen w-full overflow-hidden bg-white">
        <div className="w-full md:w-1/2 h-80 md:h-full overflow-hidden rounded-r-[45%] relative">
          <img
            src={details?.heroImage || tour.img}
            alt={tour.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center px-10 md:px-20 mt-20">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold leading-[1.05] tracking-[-1px] max-w-xl">
            {details?.heroTitle || tour.title}
            <br />
            <span className="block text-2xl text-[#D4AF37] mt-1">
              {tour.days}
            </span>
          </h1>

          <p className="text-2xl md:text-3xl text-gray-700 mt-6 leading-snug tracking-[-0.5px] max-w-xl">
            {details?.heroSubtitle || tour.desc}
          </p>

          <div className="flex gap-4 mt-10">
            <button className="bg-gradient-to-r from-[#73A5C6] to-[#2E5B84] hover:from-[#82B3D2] hover:to-[#254A6A] text-white px-8 py-4 rounded-full font-semibold">
              EXPLORE DESTINATIONS
            </button>

            <button
              onClick={() => setShowForm(true)}
              className="bg-[#D4AF37] hover:bg-yellow-500 text-gray-900 px-8 py-4 rounded-full font-semibold"
            >
              BOOK THIS TOUR
            </button>
          </div>
        </div>
      </section>

   
{/* MAIN CONTENT + STICKY SIDEBAR */}
<section className="w-full bg-[#F7FAFC] py-16">
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-10">

    {/* LEFT SCROLLABLE CONTENT */}
    <div className="lg:col-span-2 space-y-16">

      {/* TOUR HIGHLIGHTS */}
      <div className="bg-white rounded-3xl p-10 shadow-sm">
        <h2 className="text-3xl font-bold mb-10">Tour Highlights</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            "Relax in Negombo fishing village & Dutch heritage sites",
            "Explore sacred Anuradhapura & Mihintale",
            "Climb Sigiriya Rock Fortress (UNESCO)",
            "Discover ancient ruins of Polonnaruwa",
            "Wildlife safari at Minneriya & Yala National Park",
            "Visit Dambulla Golden Cave Temple (UNESCO)",
            "Spice Garden & Matale Muthumariamman Temple",
            "Kandy City Tour & Temple of the Tooth Relic",
            "Witness Pinnawala Elephant Orphanage",
            "Climb Adam’s Peak pilgrimage trail",
            "Scenic train ride from Nuwara Eliya to Ella",
            "Nine Arch Bridge, Little Adam’s Peak & Ravana Falls",
          ].map((item, i) => (
            <div
              key={i}
              className="flex gap-4 p-5 rounded-xl bg-gradient-to-r from-[#F0F9F5] to-[#F5FBFF]"
            >
              <FiMapPin className="text-green-500 text-xl mt-1" />
              <p className="text-gray-700">{item}</p>
            </div>
          ))}
        </div>
      </div>

{/* DAILY ITINERARY – IMAGE EXACT (NUMBER WITH TITLE) */}
<div className="bg-white rounded-3xl p-12 shadow-sm">
  <h2 className="text-3xl font-bold mb-12">Daily Itinerary</h2>

  <div className="space-y-16">

    {[
      {
        day: 1,
        title: "Arrival in Sri Lanka – Airport → Negombo",
        desc:
          "Meet and greet at Bandaranaike International Airport. Transfer to Negombo seaside hotel for rest and relaxation.",
        activities: [
          "Airport pickup & welcome",
          "Drive to Negombo",
          "Check-in at hotel & relax by the beach",
          "Dinner & overnight stay in Negombo",
        ],
      },
      {
        day: 2,
        title: "Negombo Sightseeing Tour",
        desc:
          "Discover Negombo’s heritage and coastal charm. Visit fishing villages, Dutch-era monuments, and sandy beaches.",
        activities: [
          "Explore local fishing village",
          "Visit Dutch Fort & Dutch Clock Tower",
          "Relax at Negombo Beach Park",
          "Optional water sports activities",
          "Overnight stay in Negombo",
        ],
      },
      {
        day: 3,
        title: "Negombo → Anuradhapura via Mihintale",
        desc:
          "Travel to the sacred city of Anuradhapura, visiting Mihintale – the cradle of Buddhism – along the way.",
        activities: [
          "Breakfast at hotel",
          "Drive to Mihintale",
          "Visit Mihintale sacred site",
          "Proceed to Anuradhapura",
          "Overnight stay in Anuradhapura",
        ],
      },
    ].map((day) => (
      <div key={day.day} className="relative flex gap-8">

        {/* LEFT BLUE LINE (BROKEN PER DAY) */}
        <div className="flex flex-col items-center">
         
          <div className="w-[3px] h-36 bg-blue-600 rounded-full "></div>
        </div>

        {/* CONTENT */}
        <div className="flex-1">

          {/* TITLE ROW WITH DAY NUMBER */}
          <div className="flex items-center gap-4 mb-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
              {day.day}
            </div>

            <h3 className="text-xl font-semibold">
              {day.title}
            </h3>
          </div>

          <p className="text-gray-600 mb-6 max-w-4xl">
            {day.desc}
          </p>

          <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm text-gray-700">
            {day.activities.map((activity, i) => (
              <div key={i} className="flex items-center gap-2">
                <FiCalendar className="text-green-500" />
                <span>{activity}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    ))}
  </div>
</div>



{/* INCLUSIONS & EXCLUSIONS */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">

  {/* INCLUSIONS */}
  <div className="bg-white rounded-3xl p-8 shadow-sm">
    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
      <span className="text-green-600">✓</span> Tour Inclusions
    </h3>

    <ul className="space-y-4 text-gray-700">
      {[
        "Airport pickup and drop-off",
        "Air-conditioned private vehicle with driver",
        "English-speaking cultural tour guide",
        "Scenic train ride (subject to availability)",
        "Wildlife safaris at Minneriya & Yala National Parks",
        "Whale watching cruise in Mirissa",
      ].map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="text-green-600 text-lg">✓</span>
          {item}
        </li>
      ))}
    </ul>
  </div>

  {/* EXCLUSIONS */}
  <div className="bg-white rounded-3xl p-8 shadow-sm">
    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
      <span className="text-red-500">✕</span> Tour Exclusions
    </h3>

    <ul className="space-y-4 text-gray-700">
      {[
        "International flight tickets",
        "Visa fees",
        "Travel insurance",
        "Personal expenses (shopping, laundry, etc.)",
        "Lunch meals (unless specified)",
        "Tips for guide and driver",
        "Optional activities (spa treatments, adventure sports, etc.)",
        "Alcoholic beverages",
      ].map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="text-red-500 text-lg">✕</span>
          {item}
        </li>
      ))}
    </ul>
  </div>

</div>
{/* WHAT WE OFFER */}
<div className="bg-white rounded-3xl p-10 shadow-sm">
  <div className="flex items-center gap-3 mb-10">
    <span className="w-4 h-4 rounded-full bg-blue-600"></span>
    <h2 className="text-3xl font-bold">What We Offer</h2>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {[
      "24/7 customer support during the tour",
      "Friendly and knowledgeable cultural guides",
      "Comfortable & safe accommodation",
      "Private, air-conditioned transportation",
      "Flexible and customizable itinerary options",
      "Authentic Sri Lankan heritage & nature experiences",
      "Emergency medical assistance support",
      "Satisfaction guarantee with professional service",
    ].map((item, index) => (
      <div
        key={index}
        className="flex items-start gap-4 p-4 rounded-2xl
                   bg-gradient-to-r from-[#F0F9F5] to-[#F5FBFF]"
      >
        <span className="w-1 h-2 rounded-full bg-blue-600 mt-2"></span>
        <p className="text-gray-700 text-sm leading-relaxed">
          {item}
        </p>
      </div>
    ))}
  </div>
</div>


    </div>

    {/* RIGHT STICKY BOOKING CARD (ONLY ONE) */}
    <div className="sticky top-24 h-fit">
      <div className="bg-white rounded-3xl p-8 shadow-lg">
        <div className="space-y-6">

          <div className="flex justify-between">
            <span className="text-gray-500">Duration</span>
            <span className="font-semibold">14 Days / 13 Nights</span>
          </div>

          <div className="border-t pt-4 flex justify-between">
            <span className="text-gray-500">Group Size</span>
            <span className="font-semibold">2–20 people</span>
          </div>

          <div className="border-t pt-4 flex justify-between">
            <span className="text-gray-500">Difficulty</span>
            <span className="font-semibold">Easy – Moderate</span>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="w-full py-4 rounded-full text-white font-semibold bg-gradient-to-r from-green-500 to-blue-600"
          >
            Book Now
          </button>

          <div className="border-t pt-6">
            <h4 className="font-semibold mb-4">Need Help?</h4>

            <div className="flex gap-3 items-center text-gray-600 mb-3">
              <FiPhone className="text-blue-600" />
              +94 76 204 4065
            </div>

            <div className="flex gap-3 items-center text-gray-600">
              <FiMail className="text-blue-600" />
              mishellankatours@gmail.com
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</section>
{/* GALLERY SECTION */}
<h2 className="font-playfair text-4xl mb-6 mt-16 text-center">
  Gallery
</h2>

<section className="relative w-full h-[600px] px-6 md:px-10 py-10 flex items-center">

  {/* MAIN SWIPER */}
  <Swiper
    modules={[Autoplay, Controller]}
    loop
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
            className="h-full w-full object-cover brightness-[0.6] rounded-2xl"
          />

          {/* TEXT OVERLAY */}
          <div className="absolute top-1/2 right-10 -translate-y-1/2 w-full md:w-1/3 text-white flex flex-col gap-4">
            <h2 className="text-4xl md:text-5xl font-playfair font-bold">
              {title}
            </h2>
            <p className="text-sm md:text-base">{desc}</p>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>

  {/* THUMBNAIL SWIPER */}
  <div className="absolute bottom-8 left-6 md:left-10 w-[90%] md:w-[500px] px-4 py-4">
    <Swiper
      modules={[Controller]}
      loop
      slidesPerView={3}
      spaceBetween={12}
      onSwiper={(swiper) => (thumbSwiperRef.current = swiper)}
      controller={{ control: mainSwiperRef.current }}
      className="h-44"
    >
      {slides.map(({ image, title }, idx) => (
        <SwiperSlide key={idx}>
          <div className="h-full w-full relative rounded-xl overflow-hidden cursor-pointer">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full bg-black/50 text-white text-xs text-center py-1">
              {title}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</section>



      {/* BOOKING MODAL */}
      {showForm && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[20000]"
            onClick={() => setShowForm(false)}
          />

          <div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-[700px] h-[90vh] bg-white shadow-2xl p-6 z-[20001] flex flex-col overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end">
              <button
                className="text-3xl font-bold text-gray-600 hover:text-black"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>

            <BookRoundTour
              tourId={tour._id}
              tourTitle={tour.title}
              tourLocation={tour.location}
            />
          </div>
        </>
      )}
    </div>
  );
}
