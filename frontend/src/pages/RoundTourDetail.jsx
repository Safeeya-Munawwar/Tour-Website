import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { FiCheckCircle, FiXCircle, FiClock, FiUsers, FiMapPin, FiStar } from "react-icons/fi";

const slides = [
  { image: "/40.jpg", title: "Kuttam Pokuna", desc: "Ancient royal bathing ponds in Anuradhapura." },
  { image: "/41.jpg", title: "Ruwanweliseya", desc: "A magnificent stupa with historical significance." },
  { image: "/43.jpg", title: "Jethawanaramaya", desc: "Tallest stupa in Sri Lanka, a Buddhist landmark." },
  { image: "/45.jpg", title: "Mirisavetiya", desc: "Historic temple with royal connections." },
  { image: "/d1.jpg", title: "Brazen Temple", desc: "Ancient temple ruins with cultural heritage." },
];
const itinerary = [
  { day: 1, title: "Arrival in Colombo", desc: "Transfer to hotel and relax." },
  { day: 2, title: "Sigiriya & Minneriya Safari", desc: "Climb Sigiriya Rock and enjoy safari." },
  { day: 3, title: "Kandy", desc: "Temple of the Tooth & cultural show." },
  { day: 4, title: "Nuwara Eliya", desc: "Tea plantations and scenic train ride." },
  { day: 5, title: "Yala Safari", desc: "Wildlife adventure in Yala National Park." },
  { day: 6, title: "Galle Fort", desc: "Explore colonial heritage and beaches." },
  { day: 7, title: "Departure", desc: "Return to Colombo and departure." },
];

export default function RoundTourDetail() {
  const [activeIndex, setActiveIndex] = useState(0);
  const innerSwiperRef = useRef();

  return (
    <div className="font-poppins">
      {/* ---------------- HERO SECTION ---------------- */}
      <section className="relative flex flex-col md:flex-row h-screen w-full overflow-hidden bg-white">
        <div className="w-full md:w-1/2 h-80 md:h-full overflow-hidden rounded-r-[45%] relative">
          <img
            src={slides[0].image}
            alt={slides[0].title}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center px-10 md:px-20 mt-20">
          <h1 className="font-playfair 
              text-5xl md:text-6xl 
              font-bold 
              leading-[1.05] 
              tracking-[-1px]
              max-w-xl">
            Classic Sri Lanka Round Tour
            <br />
            <span className="block text-2xl text-[#D4AF37] mt-1">07 Days | 06 Nights</span>
          </h1>

          <p className=" font-playfair 
              text-2xl md:text-3xl 
              text-gray-700 
              mt-6 
              leading-snug 
              tracking-[-0.5px]
              max-w-xl">
            Explore the cultural wonders, scenic mountains, wildlife encounters, and golden beaches.
          </p>
        

          <div className="flex gap-4 mt-10">
            <button className="bg-gradient-to-r from-[#73A5C6] to-[#2E5B84] hover:from-[#82B3D2] hover:to-[#254A6A] text-white px-8 py-4 rounded-full font-semibold">
              EXPLORE DESTINATIONS
            </button>
            <button className="bg-[#D4AF37] hover:bg-yellow-500 text-gray-900 px-8 py-4 rounded-full font-semibold">
              BOOK THIS TOUR
            </button>
          </div>
        </div>
      </section>

      {/* ---------------- HIGHLIGHTS SECTION ---------------- */}
      <section className="w-full px-6 md:px-32 py-10 mt-10">
        <h2 className="font-playfair text-4xl mb-10 text-center">Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-gray-700">
          <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col gap-3">
            <h3 className="font-semibold text-xl mb-1 flex items-center gap-2">
              <FiStar className="text-yellow-400"/> Sigiriya Rock Fortress
            </h3>
            <p>Climb the iconic ancient rock fortress, a UNESCO World Heritage site.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col gap-3">
            <h3 className="font-semibold text-xl mb-1 flex items-center gap-2">
              <FiStar className="text-yellow-400"/> Kandy Temple of Tooth
            </h3>
            <p>Experience the spiritual heart of Sri Lanka at this sacred Buddhist temple.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col gap-3">
            <h3 className="font-semibold text-xl mb-1 flex items-center gap-2">
              <FiStar className="text-yellow-400"/> Yala Safari
            </h3>
            <p>Embark on an adventurous safari in Yala National Park to see wildlife up close.</p>
          </div>
        </div>
      </section>
<section className="w-full px-6 md:px-32 py-10 mt-10">
  <h2 className="font-playfair text-4xl mb-10 text-center">Day-wise Itinerary</h2>

  <div className="space-y-16">
    {[...Array(Math.ceil(itinerary.length / 7))].map((_, weekIndex) => {
      const weekDays = itinerary.slice(weekIndex * 7, weekIndex * 7 + 7);
      return (
        <div key={weekIndex} className="flex justify-between items-center">
          {weekDays.map((day, idx) => (
            <div key={day.day} className="flex items-center">
              {/* Day Circle */}
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



      {/* ---------------- TOUR FACTS ---------------- */}
      <section className="w-full px-6 md:px-32 py-10 mt-10">
        <h2 className="font-playfair text-4xl mb-10 text-center">Tour Facts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-700 text-center">
          <div className="bg-gray-100 p-6 rounded-lg shadow flex flex-col items-center gap-2">
            <FiClock className="text-[#D4AF37] text-2xl"/>
            <h3 className="font-semibold text-xl mb-1">Duration</h3>
            <p>07 Days | 06 Nights</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow flex flex-col items-center gap-2">
            <FiStar className="text-[#D4AF37] text-2xl"/>
            <h3 className="font-semibold text-xl mb-1">Difficulty</h3>
            <p>Moderate</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow flex flex-col items-center gap-2">
            <FiUsers className="text-[#D4AF37] text-2xl"/>
            <h3 className="font-semibold text-xl mb-1">Group Size</h3>
            <p>Max 15 People</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow flex flex-col items-center gap-2">
            <FiMapPin className="text-[#D4AF37] text-2xl"/>
            <h3 className="font-semibold text-xl mb-1">Best Season</h3>
            <p>December – April</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow flex flex-col items-center gap-2">
            <FiStar className="text-[#D4AF37] text-2xl"/>
            <h3 className="font-semibold text-xl mb-1">Tour Type</h3>
            <p>Family / Adventure</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow flex flex-col items-center gap-2">
            <FiMapPin className="text-[#D4AF37] text-2xl"/>
            <h3 className="font-semibold text-xl mb-1">Languages</h3>
            <p>English, Sinhala, Tamil</p>
          </div>
        </div>
      </section>
  <h2 className="font-playfair text-4xl mb-5 mt-8 text-center">Gallery</h2>
       <section className="relative w-full h-[600px] px-10 py-10 flex items-center">
        
        {/* Main Background Slider */}
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="h-full w-full"
        >
          {slides.map(({ image, title, desc }, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full">
                <img
                  src={image}
                  alt={title}
                  className="h-full w-full object-cover brightness-[0.6] rounded-lg"
                />

                {/* Title & Subtitle on right side */}
                <div className="absolute top-1/2 right-10 transform -translate-y-1/2 w-1/3 text-white flex flex-col gap-4">
                  <h2 className="text-4xl md:text-5xl font-playfair font-bold">{title}</h2>
                  <p className="text-sm md:text-base">{desc}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Inner Bottom Left Thumbnail Slider */}
        <div className="absolute bottom-10 left-10 w-[500px] px-4 py-4">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            slidesPerView={3}
            spaceBetween={10}
            ref={innerSwiperRef}
            initialSlide={activeIndex}
            className="h-52"
          >
            {slides.map(({ image, title }, index) => (
              <SwiperSlide key={index}>
                <div className="h-full w-full relative rounded overflow-hidden cursor-pointer border-2 border-white">
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
      
    </div>
  );
}
