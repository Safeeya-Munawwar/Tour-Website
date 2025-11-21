import React, { useEffect, useState, useRef } from "react";
import {
  FaUserCheck,
  FaUsers,
  FaMapMarkedAlt,
  FaAward,
  FaEye,
  FaPaperPlane,
  FaQuoteLeft,
  FaBullseye,
} from "react-icons/fa";

const CountUp = ({ end, duration = 2000, startAnimation }) => {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!startAnimation || started.current) return;

    started.current = true;
    let start = 0;
    const totalMilliseconds = duration;
    const incrementTime = 20;
    const increment = end / (totalMilliseconds / incrementTime);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, incrementTime);

    return () => clearInterval(timer);
  }, [end, duration, startAnimation]);

  return <span>{count}</span>;
};

const About = () => {
  const [showText, setShowText] = useState(false);
  const [visible, setVisible] = useState(false);
  const statsRef = useRef();

  // Hero text animation
  useEffect(() => {
    setTimeout(() => setShowText(true), 300);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    const currentStatsRef = statsRef.current;
    if (currentStatsRef) observer.observe(currentStatsRef);

    return () => {
      if (currentStatsRef) observer.unobserve(currentStatsRef);
    };
  }, []);

  return (
    <div className="font-poppins bg-white text-[#222]">
      {/* ---------------------------- HERO HEADER ---------------------------- */}
      <div
        className="w-full h-[400px] md:h-[560px] bg-cover bg-center relative flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/about-header.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/10"></div>

        <div
          className={`absolute bottom-10 right-10 w-[440px] bg-black/80 text-white p-6 backdrop-blur-sm shadow-lg border-none flex items-center justify-end transition-all duration-700 ease-out ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-2xl leading-snug text-right mr-4">
            Discover Sri Lanka <br />
            With Us...
          </h2>
          <div className="w-[2px] bg-white h-12"></div>
        </div>
      </div>

      {/* ---------------------------- ABOUT INTRO SECTION ---------------------------- */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-20 px-6">
        <div className="text-left">
          <h3 className="text-2xl font-bold text-[#0b1f33] mb-6">
            ABOUT TRAVELERS CHOICE TO CEYLON
          </h3>
          <h1 className="text-4xl font-semibold text-black mb-4">
            Explore Sri Lanka
          </h1>
          <p className="text-[#0b1f33] leading-relaxed text-lg">
            Experience the true beauty of Sri Lanka with our friendly and
            professional vehicle and driver guide services. From smooth airport
            transfers to personalized day tours and custom itineraries, we’re
            here to make your journey unforgettable. Let us take care of the
            details while you enjoy the best of Sri Lanka, creating memories
            that will last a lifetime.
          </p>
        </div>

        <div className="flex justify-center">
          <video
            src="/about-travellers.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="rounded-xl shadow-lg w-full max-w-md md:max-w-full object-cover"
          ></video>
        </div>
      </section>

      {/* ---------------------------- STATS SECTION ---------------------------- */}
      <section
        ref={statsRef}
        className="w-full bg-cover bg-center py-20 px-6"
        style={{ backgroundImage: "url('/train.PNG')" }}
      >
        <div className="bg-black/70 backdrop-blur-sm py-16 rounded-2xl max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center text-white">
            <div className="flex flex-col items-center">
              <FaUserCheck className="text-5xl text-[#91BAD6] mb-3" />
              <h2 className="text-4xl font-bold">
                <CountUp end={7000} startAnimation={visible} />+
              </h2>
              <p className="text-gray-300 mt-2">Satisfied Clients</p>
            </div>

            <div className="flex flex-col items-center">
              <FaUsers className="text-5xl text-[#91BAD6] mb-3" />
              <h2 className="text-4xl font-bold">
                <CountUp end={6300} startAnimation={visible} />+
              </h2>
              <p className="text-gray-300 mt-2">Active Members</p>
            </div>

            <div className="flex flex-col items-center">
              <FaMapMarkedAlt className="text-5xl text-[#91BAD6] mb-3" />
              <h2 className="text-4xl font-bold">
                <CountUp end={30} startAnimation={visible} />+
              </h2>
              <p className="text-gray-300 mt-2">Destinations</p>
            </div>

            <div className="flex flex-col items-center">
              <FaAward className="text-5xl text-[#91BAD6] mb-3" />
              <h2 className="text-4xl font-bold">
                <CountUp end={21} startAnimation={visible} />+
              </h2>
              <p className="text-gray-300 mt-2">Award Winning</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------- VISION / MISSION / MOTTO / GOAL ---------------------------- */}
      <section className="max-w-7xl mx-auto py-20 px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Boxes */}
        <div className="grid grid-cols-2 gap-6">
          {/* Vision */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition">
            <div className="w-12 h-12 flex items-center justify-center mx-auto mb-3 rounded-full bg-yellow-100">
              <FaEye className="w-6 h-6 text-yellow-500" />
            </div>
            <h4 className="font-semibold text-lg mb-2">Vision</h4>
            <p className="text-gray-500 text-sm">
              The most trusted guide to the wonders of Sri Lanka.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition">
            <div className="w-12 h-12 flex items-center justify-center mx-auto mb-3 rounded-full bg-blue-100">
              <FaPaperPlane className="w-6 h-6 text-blue-500" />
            </div>
            <h4 className="font-semibold text-lg mb-2">Mission</h4>
            <p className="text-gray-500 text-sm">
              Crafting authentic, personal tours of Sri Lanka.
            </p>
          </div>

          {/* Motto */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition">
            <div className="w-12 h-12 flex items-center justify-center mx-auto mb-3 rounded-full bg-green-100">
              <FaQuoteLeft className="w-6 h-6 text-green-500" />
            </div>
            <h4 className="font-semibold text-lg mb-2">Motto</h4>
            <p className="text-gray-500 text-sm">
              Experience the heart of Sri Lanka.
            </p>
          </div>

          {/* Goal */}
          <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition">
            <div className="w-12 h-12 flex items-center justify-center mx-auto mb-3 rounded-full bg-red-100">
              <FaBullseye className="w-6 h-6 text-red-500" />
            </div>
            <h4 className="font-semibold text-lg mb-2">Goal</h4>
            <p className="text-gray-500 text-sm">
              To achieve 100% guest satisfaction on every tour.
            </p>
          </div>
        </div>

        {/* Right Side - Image + Text */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            We'll Give You Unforgettable Memories
          </h2>
          <p className="text-gray-500 mb-6">
            Let us guide you to the heart of Ceylon. We create tailor-made
            adventures that become cherished memories. Discover the island’s
            magic, one unique moment at a time.
          </p>
          <img
            src="/about - how we work.jpg"
            alt="Tourists enjoying a guided adventure in Sri Lanka"
            className="rounded-xl shadow-lg w-3/4 md:w-full max-w-sm mx-auto object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </section>

      {/* ---------------------------- GALLERY ---------------------------- */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        {/* Gallery Header */}
        <div className="text-center mb-12">
          <p className="text-sm text-gray-400 tracking-widest">GALLERY</p>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">
            Unforgettable Moment
          </h2>
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-4 gap-4 space-y-4">
          <img
            src="/about-header.JPG"
            alt="Gallery 1"
            className="w-full mb-3 rounded-lg shadow-md object-cover break-inside h-64"
          />
          <img
            src="/about - how we work.jpg"
            alt="Gallery 2"
            className="w-full mb-4 rounded-lg shadow-md object-cover break-inside h-72"
          />
          <img
            src="/sigiriya.jpg"
            alt="Gallery 3"
            className="w-full mb-4 rounded-lg shadow-md object-cover break-inside h-60"
          />
          <img
            src="/tour.jpg"
            alt="Gallery 4"
            className="w-full mb-4 rounded-lg shadow-md object-cover break-inside h-80"
          />
          <img
            src="/train.png"
            alt="Gallery 5"
            className="w-full mb-4 rounded-lg shadow-md object-cover break-inside h-52"
          />
          <video
            src="/about-travellers.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full mb-4 rounded-lg shadow-md object-cover break-inside h-80"
          ></video>
          <img
            src="/ella.jpg"
            alt="Gallery 7"
            className="w-full mb-4 rounded-lg shadow-md object-cover break-inside h-80"
          />
          <img
            src="/elephant.jpg"
            alt="Gallery 8"
            className="w-full mb-4 rounded-lg shadow-md object-cover break-inside h-60"
          />

          <img
            src="/tourist.jpg"
            alt="Gallery 9"
            className="w-full mb-4 rounded-lg shadow-md object-cover break-inside h-72"
          />
          <video
            src="/travellers1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full mb-4 rounded-lg shadow-md object-cover break-inside h-64"
          ></video>
          <img
            src="/tower.jpg"
            alt="Gallery 10"
            className="w-full mb-4 rounded-lg shadow-md object-cover break-inside h-56"
          />
          <img
            src="/daladha.png"
            alt="Gallery 6"
            className="w-full mb-4 rounded-lg shadow-md object-cover break-inside h-72"
          />
        </div>
      </section>

      {/* ---------------------------- OUR TEAM ---------------------------- */}
      <section className="max-w-7xl mx-auto py-20 px-6 space-y-16">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Side - Header & Description */}
          <div className="lg:w-1/3">
            <p className="text-sm text-gray-400 tracking-widest mb-2">
              OUR TEAM
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Experienced People Behind Us
            </h2>
            <p className="text-gray-600">
              Guided by passionate travel experts with years of experience, our
              team ensures every Sri Lankan journey is crafted with care, local
              insight, and unforgettable authenticity.
            </p>
          </div>

          {/* Right Side - Top 3 Team Members */}
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                name: "Damith Dilshan",
                role: "Founder of Travelers Choice to Ceylon | Tour Guide",
                img: "/user1.png",
              },
              { name: "Gayan", role: "Tourist Chauffeur", img: "/user2.png" },
              { name: "Sam", role: "Tourist Chauffeur", img: "/user3.png" },
            ].map((member, index) => (
              <div
                key={index}
                className="relative rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                {/* Bottom Overlay */}
                <div className="absolute bottom-0 w-full bg-white bg-opacity-70 p-4">
                  <h3 className="text-gray-800 font-semibold">{member.name}</h3>
                  <p className="text-gray-700 text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Grid - Other Team Members */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Lakshitha", role: "Tourist Chauffeur", img: "/user4.png" },
            { name: "Ashen", role: "Tourist Chauffeur", img: "/user5.png" },
            { name: "Sithum", role: "Tour Guide", img: "/user6.png" },
            { name: "Heshan", role: "Tourist Chauffeur", img: "/user7.png" },
            { name: "Udaya", role: "Tourist Chauffeur", img: "/user8.png" },
            { name: "Nuwan", role: "Tourist Chauffeur", img: "/user9.png" },
            { name: "Yasitha", role: "Tourist Chauffeur", img: "/user10.png" },
            { name: "Dilan", role: "Tourist Chauffeur", img: "/user11.png" },
          ].map((member, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-full h-48 object-cover"
              />
              {/* Bottom Overlay */}
              <div className="absolute bottom-0 w-full bg-white bg-opacity-70 p-2">
                <h3 className="text-gray-800 font-semibold text-sm">
                  {member.name}
                </h3>
                <p className="text-gray-700 text-xs">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
