import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const journeyStories = [
  {
    images: [
      "/images/journey-1a.PNG",
      "/images/journey-1b.PNG",
      "/images/journey-1c.PNG",
    ],
    title: "Our Humble Beginnings",
    description:
      "NetLanka Tours started with a small team of passionate travelers dedicated to sharing Sri Lanka's beauty with the world.",
  },
  {
    images: [
      "/images/journey-2a.PNG",
      "/images/journey-2b.PNG",
      "/images/journey-2c.PNG",
    ],
    title: "First International Tours",
    description:
      "We expanded our services and organized our first tours for international travelers, showcasing the island’s rich culture and nature.",
  },
  {
    images: [
      "/images/journey-3a.PNG",
      "/images/journey-3b.PNG",
      "/images/journey-3c.PNG",
    ],
    title: "Sustainable Tourism Initiatives",
    description:
      "Committed to responsible tourism, we partnered with local communities to ensure our tours uplifted both people and nature.",
  },
  {
    images: [
      "/images/journey-4a.PNG",
      "/images/journey-4b.PNG",
      "/images/journey-4c.PNG",
    ],
    title: "Award-Winning Experiences",
    description:
      "Our dedication to quality travel experiences earned recognition and awards in the tourism industry.",
  },
];

const OurCommunity = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowText(true), 200);
  }, []);

  return (
    <div className="font-poppins bg-white text-[#222]">
      {/* ---------------------------- HERO SECTION ---------------------------- */}
      <div
        className="w-full h-[400px] md:h-[560px] bg-cover bg-center relative flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/images/community-header.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div
          className={`absolute bottom-10 right-10 w-[500px] bg-black/80 text-white p-6 backdrop-blur-sm shadow-lg border-none flex items-center justify-end transition-all duration-700 ease-out ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-2xl md:text-3xl leading-snug text-right mr-4">
            Our Journey <br />
            From Passion to Excellence
          </h2>
          <div className="w-[2px] bg-white h-12"></div>
        </div>
      </div>

      {/* ---------------------------- COMMUNITY INTRO ---------------------------- */}
      <section className="max-w-7xl mx-auto px-6 lg:px-0 py-10 text-center space-y-4">
        <p className="text-sm md:text-lg font-semibold tracking-widest text-gray-500 mb-3">
          OUR JOURNEY
        </p>

        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
          From Passion to Excellence
        </h2>

        <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          NetLanka Tours has grown from a small, passionate team into a trusted
          travel partner for travelers worldwide. Explore the milestones that
          shaped our journey and inspired us to create unforgettable experiences
          across Sri Lanka.
        </p>

        <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-6"></div>
      </section>

      {/* -------------------- JOURNEY STORIES WITH AUTO-SLIDING CARDS ---------------------- */}
      <section className="max-w-7xl mx-auto px-6 lg:px-0 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {journeyStories.map((story, idx) => (
          <div
            key={idx}
            className="bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-200 rounded-lg"
          >
            <Swiper
              modules={[Autoplay]}
              loop={true}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              slidesPerView={1}
              className="h-64"
            >
              {story.images.map((img, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={img}
                    alt={`${story.title} ${i + 1}`}
                    className="w-full h-64 object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="bg-white p-4 text-center border-t border-gray-200">
              <h3 className="font-semibold text-lg">{story.title}</h3>
              <p className="text-gray-500 text-sm mt-2">{story.description}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ---------------------------- CONTACT BUTTON ---------------------------- */}
      <section className="max-w-7xl mx-auto px-6 lg:px-0 py-8 flex flex-col items-center text-center">
        <h3 className="text-2xl font-bold text-[#1a1a1a] mb-1">
          Ready to Explore Sri Lanka?
        </h3>
        <p className="text-gray-600 mb-4 text-sm md:text-base max-w-md">
          Let our dedicated travel experts help you craft a personalized and
          unforgettable journey.
        </p>

        <a
          href="/contact"
          className="
      bg-[#ce2a40] hover:bg-[#ef0530]
      text-white uppercase px-6 py-3 rounded-full font-semibold flex items-center gap-2 text-sm
      shadow-lg transition-colors duration-300
      justify-center
    "
        >
          Explore with Us
          <ArrowRight className="w-4" />
        </a>
      </section>
    </div>
  );
};

export default OurCommunity;
