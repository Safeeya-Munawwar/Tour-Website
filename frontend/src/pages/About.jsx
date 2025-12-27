import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Testimonials from "../components/Testimonials";
import { ArrowRight, Calendar, Users } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { axiosInstance } from ".././lib/axios";
import Footer from "../components/Footer";

const About = () => {
  const [showFull, setShowFull] = useState(false);
  const navigate = useNavigate();
  const [showText, setShowText] = useState(false);
  const [about, setAbout] = useState(null);
 const [currentPage] = useState(1);
// Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [currentPage]);
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axiosInstance.get("/about");
        setAbout(res.data);
      } catch (err) {
        console.error("Failed to load About page", err);
      }
    };

    fetchAbout();
  }, []);

  useEffect(() => {
    setTimeout(() => setShowText(true), 200);
  }, []);

  if (!about) {
    return <p className="text-center py-20">Loading...</p>;
  }

  return (
    <>
    <div className="flex flex-col min-h-screen font-poppins bg-white text-[#222]">
      {/* ---------------------------- HERO HEADER ---------------------------- */}
      <div
        className="w-full h-[360px] md:h-[560px] bg-cover bg-center relative flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('/images/about-header.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>

        <div
          className={`absolute bottom-6 md:bottom-10 right-4 md:right-10 max-w-[90%] md:w-[340px] bg-black/80 text-white p-4 md:p-6 backdrop-blur-sm shadow-lg border-none flex items-center justify-end transition-all duration-700 ease-out ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-xl md:text-3xl leading-snug text-right mr-4">
            Discover Sri Lanka <br />
            With Us...
          </h2>
          <div className="w-[2px] bg-white h-10 md:h-12"></div>
        </div>
      </div>

      {/* ---------------------------- ABOUT CONTENT ---------------------------- */}
      <div className="max-w-6xl mx-auto py-20 px-6 text-center space-y-6">
        {/* Subtitle */}
        <p className="text-sm md:text-lg font-semibold tracking-widest text-gray-500 mb-3">
          {about.subtitle}
        </p>

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
          {about.heading}
        </h2>

        <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          {about.smallDescription}
        </p>

        {/* Gold Accent Line */}
        <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-6"></div>

        <p className="text-base md:text-lg text-gray-600 leading-relaxed">
          {about.description}
        </p>

        {/* ------------------- FULL DESCRIPTION ------------------- */}
        {showFull && (
          <div className="text-base md:text-lg text-gray-600 leading-relaxed mt-6 space-y-4">
            {about.fullDescription?.map((item, idx) => (
              <p key={idx}>{item.description}</p>
            ))}
          </div>
        )}

        {/* ------------------- TOGGLE BUTTON ------------------- */}
        <div className="mt-4">
          <span
            onClick={() => setShowFull(!showFull)}
            className="cursor-pointer text-blue-600 font-semibold flex items-center justify-center hover:underline space-x-2"
          >
            <span>{showFull ? "SHOW LESS" : "READ MORE"}</span>
            {showFull ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </div>
      </div>

      {/* ------------------- FULL WIDTH IMAGE ABOVE ------------------- */}
      <div className="-mt-16 w-full">
        <img
          src="/images/about-desc.jpg"
          alt="About NetLanka Tours"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* ------------------- WHY NETLANKA TOURS ------------------- */}
   <section className="mt-16 mb-20 max-w-7xl mx-auto px-6 text-center relative z-10">

        <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-12">
          Why NetLanka Tours
        </h1>

        {/* Feature Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {about.features?.map((f, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <img src={f.image} alt={f.title} className="w-24 h-24 mb-4" />
              <p className="text-gray-600 text-base md:text-lg max-w-xs text-center">
                {f.description}
              </p>
            </div>
          ))}
        </div>

        {/* Centered Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/tailor-made-tours")}
            className="
        bg-[#ce2a40] hover:bg-[#ef0530]
        text-white uppercase px-6 py-3 rounded-full font-semibold flex items-center gap-2 text-sm
        shadow-lg transition-colors duration-300
        justify-center
      "
          >
            Start Planning Your Trip
            <Calendar className="w-4" />
          </button>
        </div>
      </section>

      {/* ------------------- OUR TEAM ------------------- */}
      <section className="mt-12 mb-20 max-w-7xl mx-auto px-6 relative z-10 text-center">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6">
          Meet the Team
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-base md:text-lg max-w-5xl mx-auto mb-12 leading-relaxed">
          We’re not just a room of telesales people. Each of our specialists
          lives and breathes travel, and has plenty of knowledge to share. Here
          you can put a picture to the voice, and learn a little more about them
          too.
        </p>

        {/* Team Swiper */}
        {/* Swiper Navigation Buttons */}
        <div className="flex justify-end mb-4 gap-4">
          <button className="team-prev bg-gray-800 text-white px-4 py-2 rounded">
            Prev
          </button>
          <button className="team-next bg-gray-800 text-white px-4 py-2 rounded">
            Next
          </button>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{ prevEl: ".team-prev", nextEl: ".team-next" }}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {about.teamMembers?.map((m, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white overflow-hidden shadow-lg hover:shadow-lg transition-shadow border border-gray-600">
                <img
                  src={m.image}
                  className="w-full h-64 object-cover"
                  alt={m.name}
                />
                <div className="bg-white p-4 text-center border-t border-gray-200">
                  <h3 className="font-semibold text-lg">{m.name}</h3>
                  <p className="text-gray-500 text-sm">{m.role}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Centered Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate("/our-team")}
            className="
          bg-[#1a73e8] hover:bg-[#155ab6]
          text-white uppercase px-6 py-3 rounded-full font-semibold
          flex items-center gap-2 text-sm shadow-lg transition-colors duration-300
        "
          >
            View Our Team
            <Users className="w-4" />
          </button>
        </div>
      </section>

      {/* ---------------------------- GALLERY ---------------------------- */}
      <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#1a1a1a] mb-8 sm:mb-12">
          Captured Moments with Our Clients
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {about.gallery?.map((url, idx) => (
            <div key={idx} className="w-full">
              {url.endsWith(".mp4") ? (
                <video
                  src={url}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={url}
                  alt="img"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------- TESTIMONIALS ---------------------------- */}
      <Testimonials />

      {/* ---------------------------- CUSTOM TOUR CTA ---------------------------- */}
      <section className="relative -mt-4 sm:-mt-8 lg:-mt-28">
        <div
          className="flex flex-col lg:flex-row items-center lg:items-stretch relative 
                  h-auto lg:h-[800px]"
        >
          {/* Left Side – Text */}
          <div
            className="w-full lg:w-1/2 flex flex-col justify-center items-center text-center 
                    px-4 sm:px-6 py-10 sm:py-14 lg:py-0 z-10 space-y-2 sm:space-y-4"
          >
            <h2 className="text-base sm:text-lg md:text-3xl font-semibold text-[#1a1a1a]">
              Looking for an
            </h2>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1a1a]">
              Exclusive Customized Tour?
            </h2>

            <h2 className="text-base sm:text-lg md:text-3xl font-semibold text-[#1a1a1a]">
              No Problem
            </h2>

            {/* CTA Button */}
            <div className="mt-4">
              <a
                href="/tailor-made-tours"
                className="
            bg-[#ce2a40] hover:bg-[#ef0530]
            text-white uppercase px-6 py-3 rounded-full font-semibold 
            flex items-center gap-2 text-sm shadow-lg transition-colors duration-300
            justify-center
          "
              >
                Connect with Us
                <ArrowRight className="w-4" />
              </a>
            </div>
          </div>

          {/* Right Side – Image */}
          <div className="w-full lg:w-1/2 lg:absolute lg:top-0 lg:right-0 lg:h-full">
            <img
              src="/images/sigiriya-art.PNG"
              alt="Sigiriya Art"
              className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
    <Footer/></>

  );
};

export default About;
