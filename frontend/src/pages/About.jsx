import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Testimonials from "../components/Testimonials";
import { ArrowRight, Calendar, Users } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const About = () => {
  const [showFull, setShowFull] = useState(false);
  const navigate = useNavigate();
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowText(true), 200);
  }, []);

  /*const awards = [
    "/images/award1.PNG",
    "/images/award2.PNG",
    "/images/award3.PNG",
    "/images/award4.PNG",
    "/images/award5.PNG",
    "/images/award6.PNG",
  ];*/

  const teamMembers = [
    { image: "/images/user1.PNG", name: "John Doe", role: "Travel Consultant" },
    { image: "/images/user2.PNG", name: "Jane Smith", role: "Tour Specialist" },
    { image: "/images/user3.PNG", name: "Alice Lee", role: "Holiday Planner" },
    {
      image: "/images/user4.PNG",
      name: "Mark Brown",
      role: "Customer Experience",
    },
    {
      image: "/images/user5.PNG",
      name: "Sara Wilson",
      role: "Booking Manager",
    },
    { image: "/images/user6.PNG", name: "David Kim", role: "Travel Advisor" },
    {
      image: "/images/user7.PNG",
      name: "Emily Clark",
      role: "Tour Coordinator",
    },
    {
      image: "/images/user8.PNG",
      name: "Michael Johnson",
      role: "Destination Expert",
    },
    {
      image: "/images/user9.PNG",
      name: "Olivia Martinez",
      role: "Holiday Planner",
    },
    {
      image: "/images/user10.PNG",
      name: "Chris Evans",
      role: "Travel Consultant",
    },
    {
      image: "/images/user11.PNG",
      name: "Sophia Patel",
      role: "Customer Relations",
    },
  ];

  return (
    <div className="font-poppins bg-white text-[#222]">
      {/* ---------------------------- HERO HEADER ---------------------------- */}
      <div
        className="w-full h-[400px] md:h-[560px] bg-cover bg-center relative flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/41.JPG')" }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div
          className={`absolute bottom-10 right-10 w-[440px] bg-black/80 text-white p-6 backdrop-blur-sm shadow-lg border-none flex items-center justify-end transition-all duration-700 ease-out ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-2xl md:text-3xl leading-snug text-right mr-4">
            Discover Sri Lanka <br />
            With Us...
          </h2>
          <div className="w-[2px] bg-white h-12"></div>
        </div>
      </div>

      {/* ---------------------------- ABOUT CONTENT ---------------------------- */}
      <div className="max-w-6xl mx-auto py-20 px-6 text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a]">
          About NetLanka Tours
        </h1>

        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          NetLanka Tours is the present and future of destination management in
          Sri Lanka, where the most exciting tropical holidays happen in South
          Asia.
        </p>

        <p className="text-base md:text-lg text-gray-600 leading-relaxed">
          Founded in 2010, we have built an unwavering reputation for offering
          an impressive travel portfolio even for the most discerning travelers.
          Our insight and in-depth knowledge of Sri Lanka and its most beautiful
          destinations have earned the trust of a wide and growing clientele
          from around the world. We bring you intimate and personalized services
          unmatched by most other travel companies, fostering strong
          relationships between our clients and local suppliers to ensure
          ultimate satisfaction from your Sri Lankan holiday.
        </p>

        {/* ------------------- FULL DESCRIPTION ------------------- */}
        {showFull && (
          <div className="text-base md:text-lg text-gray-600 leading-relaxed mt-4 space-y-4">
            <p>
              We have over 1000 accommodation properties in our portfolio and
              they have been chosen for their excellence of service, special
              significance, artistic and cultural importance and value for your
              money. These include boutique hotels, beach hotels, bungalows and
              mansions, cultural area hotels, camping sites and hill country
              hotels. We make sure every accommodation provider we deal with
              maintain their good standards and are monitored and overseen by us
              for quality assurance. A diverse range of tours focused on
              culture, beaches, adventure and honeymoon give you the opportunity
              of discovering many hidden wonders and pleasures of the island. We
              do not promote anything we have not experienced and enjoyed
              ourselves.
            </p>
            <p>
              Our holidays are tailor-made to your requirements and our travel
              advice is personalized and detailed to make sure you receive what
              you are looking for in the best possible package. Our services
              along with our commitment to provide you a comfortable holiday
              beats the efforts of the independent traveler to do it alone. Blue
              Lanka also fosters ethical and responsible tourism and has a
              strong corporate social responsibility program that gives back to
              local communities.
            </p>
            <p>
              We have a 24/7 customer service dedicated to maintaining customer
              support whenever needed. Our fleet of luxury vehicles is always
              standing by for transport facilities and we as a team of highly
              trained tour professionals, who are a resourceful wealth of
              information. Blue Lanka is a registered holiday company with the
              Sri Lanka Tourism Development Authority and assures trust,
              flexibility, expertise and 100% customer satisfaction.
            </p>
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
          src="/about-desc.jpg"
          alt="About NetLanka Tours"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* ------------------- AWARDS SECTION ------------------- 
      <section className="mt-12 mb-20 max-w-7xl mx-auto px-6 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] text-center mb-12">
          Awards & Accreditations
        </h1>

        <div className="relative z-10">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{ prevEl: ".award-prev", nextEl: ".award-next" }}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            spaceBetween={28}
            slidesPerView={1.2}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              1024: { slidesPerView: 2.5 },
              1280: { slidesPerView: 4 },
            }}
          >
            {awards.map((award, i) => (
              <SwiperSlide key={i}>
                <div className="bg-white flex justify-center items-center h-48">
                  <img
                    src={award}
                    alt={`Award ${i + 1}`}
                    className="h-40 w-auto object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>*/}

      {/* ------------------- WHY NETLANKA TOURS ------------------- */}
      <section className="mt-16 mb-20 max-w-7xl mx-auto px-6 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-12">
          Why NetLanka Tours
        </h1>

        {/* Feature Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Feature 1 */}
          <div className="flex flex-col items-center">
            <img
              src="/images/reputable.PNG"
              alt="Reputable"
              className="w-24 h-24 mb-4"
            />
            <p className="text-gray-600 text-base md:text-lg max-w-xs">
              Reputable and trustworthy holiday solutions providers in Sri Lanka
              with nearly a decade of experience in the industry.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center">
            <img
              src="/images/friendly.PNG"
              alt="Friendly"
              className="w-24 h-24 mb-4"
            />
            <p className="text-gray-600 text-base md:text-lg max-w-xs">
              Friendly team of expert travel consultants who will provide advice
              with the client’s best interest in mind. They ensure a seamless
              holiday.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center">
            <img
              src="/images/tailor.svg"
              alt="Tailor Icon"
              className="w-24 h-24 mb-4"
            />
            <p className="text-gray-600 text-base md:text-lg max-w-xs">
              Committed towards providing customized holiday solutions keeping
              in mind maximum luxury and comfort of the customer.
            </p>
          </div>
        </div>

        {/* Centered Button */}
        <div className="flex justify-center mt-8">
          <button
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
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{ prevEl: ".team-prev", nextEl: ".team-next" }}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            spaceBetween={28}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {teamMembers.map((member, i) => (
              <SwiperSlide key={i}>
                <div className="bg-white overflow-hidden shadow-lg hover:shadow-lg transition-shadow border border-gray-600">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="bg-white p-4 text-center border-t border-gray-200">
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-gray-500 text-sm">{member.role}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

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
      <section className="mt-20 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#1a1a1a] mb-12">
          Captured Moments with Our Clients
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1">
          {[
            "/images/gallery1.PNG",
            "/images/gallery2.PNG",
            "/images/gallery3.PNG",
            "/tr2.MP4",
            "/images/gallery4.PNG",
            "/images/gallery5.PNG",
            "/tr1.MP4",
            "/images/gallery6.PNG",
            "/images/gallery7.PNG",
            "/images/gallery8.PNG",
            "/images/gallery9.PNG",
            "/images/gallery10.PNG",
            "/images/gallery11.PNG",
            "/images/gallery12.PNG",
            "/images/gallery13.PNG",
            "/images/gallery14.PNG",
            "/tr.MP4",
            "/images/gallery15.PNG",
          ].map((item, i) =>
            item.endsWith(".MP4") ? (
              <div
                key={i}
                className="w-full aspect-square overflow-hidden rounded-lg"
              >
                <video
                  src={item}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div
                key={i}
                className="w-full aspect-square overflow-hidden rounded-lg"
              >
                <img
                  src={item}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            )
          )}
        </div>
      </section>

      {/* ---------------------------- TESTIMONIALS ---------------------------- */}
      <Testimonials />

      {/* ---------------------------- CUSTOM TOUR CTA ---------------------------- */}
      <section className="relative -mt-8 lg:-mt-28">
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch relative h-[600px] lg:h-[800px]">
          {/* Left Side - Text Centered */}
          <div className="lg:w-1/2 flex flex-col justify-center items-center text-center px-6 z-10 space-y-4">
            <h2 className="text-lg md:text-3xl font-semibold text-[#1a1a1a]">
              Looking for an
            </h2>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a]">
              Exclusive Customized Tour?
            </h2>
            <h2 className="text-lg md:text-3xl font-semibold text-[#1a1a1a]">
              No Problem
            </h2>

            {/* Connect with Us - Red */}
            <div className="mt-4">
              <a
                href="/contact"
                className="
            bg-[#ce2a40] hover:bg-[#ef0530]
            text-white uppercase px-6 py-3 rounded-full font-semibold flex items-center gap-2 text-sm
            shadow-lg transition-colors duration-300
            justify-center
          "
              >
                Connect with Us
                <ArrowRight className="w-4" />
              </a>
            </div>
          </div>

          {/* Right Side - Full Image */}
          <div className="lg:w-1/2 lg:absolute lg:top-0 lg:right-0 lg:h-full lg:w-[50vw]">
            <img
              src="/images/sigiriya-art.PNG"
              alt="Sigiriya Art"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
