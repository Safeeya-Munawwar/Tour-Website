import React, { useEffect, useState } from "react";
import { Users } from "lucide-react";

const journeyMilestones = [
  {
    year: "2015",
    title: "Our Inception",
    description:
      "NetLanka Tours was founded with a vision to showcase the authentic beauty and culture of Sri Lanka to travelers worldwide.",
    image: "/images/inspection.PNG",
  },
  {
    year: "2017",
    title: "Expanding Horizons",
    description:
      "We partnered with local experts and guides, creating bespoke itineraries and immersive experiences for every traveler.",
    image: "/images/gallery12.PNG",
  },
  {
    year: "2019",
    title: "Innovation & Technology",
    description:
      "We embraced digital solutions to provide seamless bookings, personalized tours, and real-time support for our clients.",
    image: "/images/booking.PNG",
  },
  {
    year: "2022",
    title: "Award-Winning Excellence",
    description:
      "Our commitment to service quality and customer satisfaction earned us multiple travel and tourism awards in Sri Lanka.",
    image: "/images/ceremony.PNG",
  },
];

const OurJourney = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-poppins bg-white text-[#222]">
      {/* ---------------------------- HERO HEADER ---------------------------- */}
      <div
        className="w-full h-[360px] md:h-[560px] bg-cover bg-center relative flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('/images/journey-header.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>

        <div
          className={`absolute bottom-6 md:bottom-10 right-4 md:right-10 max-w-[90%] md:w-[320px] bg-black/80 text-white p-4 md:p-6 backdrop-blur-sm shadow-lg border-none flex items-center justify-end transition-all duration-700 ease-out ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-xl md:text-3xl leading-snug text-right mr-4">
            Our Journey <br />
            Through Sri Lanka
          </h2>
          <div className="w-[2px] bg-white h-10 md:h-12"></div>
        </div>
      </div>

      {/* ---------------------------- MISSION & VISION ---------------------------- */}
      <section className="max-w-7xl mx-auto px-6 lg:px-0 py-20 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <img
            src="/images/mission.PNG"
            alt="Mission"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a]">
            Our Mission & Vision
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            At NetLanka Tours, our mission is to provide authentic and immersive
            travel experiences that showcase the natural beauty, culture, and
            heritage of Sri Lanka. We envision a world where travelers leave
            with unforgettable memories and a deep appreciation of our island.
          </p>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Guided by expertise, dedication, and passion, we strive to deliver
            exceptional service, personalized itineraries, and seamless
            adventures from start to finish.
          </p>
        </div>
      </section>

      {/* ---------------------------- JOURNEY TIMELINE ---------------------------- */}
      <section className="max-w-7xl mx-auto px-6 lg:px-0 py-20 space-y-20">
        {journeyMilestones.map((milestone, idx) => (
          <div
            key={idx}
            className={`flex flex-col lg:flex-row items-center gap-12 ${
              idx % 2 !== 0 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div className="lg:w-1/2 flex justify-center">
              <img
                src={milestone.image}
                alt={milestone.title}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Text */}
            <div className="lg:w-1/2 space-y-4">
              <span className="text-sm uppercase text-[#1a73e8] font-semibold">
                {milestone.year}
              </span>
              <h3 className="text-3xl font-bold text-[#1a1a1a]">
                {milestone.title}
              </h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {milestone.description}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* ---------------------------- CTA TO OUR TEAM ---------------------------- */}
      <section className="max-w-7xl mx-auto px-6 lg:px-0 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-6">
          Meet the Experts Behind Our Journey
        </h2>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
          Our passionate team of travel specialists, guides, and coordinators
          bring Sri Lanka to life. From planning your perfect itinerary to
          offering insider tips, our experts ensure unforgettable adventures.
        </p>
        <div className="flex justify-center mt-8">
          <a
            href="/our-team"
            className="
      bg-[#1a73e8] hover:bg-[#155ab6]
      text-white uppercase px-6 py-3 rounded-full font-semibold
      flex items-center gap-2 text-sm shadow-lg transition-colors duration-300
      justify-center
    "
          >
            View Our Team
            <Users className="w-4" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default OurJourney;
