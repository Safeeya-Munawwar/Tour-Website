import React, { useEffect, useState } from "react";
import { Users } from "lucide-react";

const teamMembers = [
  { image: "/images/user1.PNG", name: "John Doe", role: "Travel Consultant" },
  { image: "/images/user2.PNG", name: "Jane Smith", role: "Tour Specialist" },
  { image: "/images/user3.PNG", name: "Alice Lee", role: "Holiday Planner" },
  {
    image: "/images/user4.PNG",
    name: "Mark Brown",
    role: "Customer Experience",
  },
  { image: "/images/user5.PNG", name: "Sara Wilson", role: "Booking Manager" },
  { image: "/images/user6.PNG", name: "David Kim", role: "Travel Advisor" },
  { image: "/images/user7.PNG", name: "Emily Clark", role: "Tour Coordinator" },
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

const OurTeam = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowText(true), 200);
  }, []);

  return (
    <div className="font-poppins bg-white text-[#222]">
      {/* ---------------------------- HERO HEADER ---------------------------- */}
      <div
        className="w-full h-[360px] md:h-[560px] bg-cover bg-center relative flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('/images/team-header.jpg')",
          backgroundPosition: "center 50%",
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div
          className={`absolute bottom-6 md:bottom-10 right-4 md:right-10 max-w-[90%] md:w-[520px] bg-black/80 text-white p-4 md:p-6 backdrop-blur-sm shadow-lg border-none flex items-center justify-end transition-all duration-700 ease-out ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-xl md:text-3xl leading-snug text-right mr-4">
            Meet the Experts <br />
            Behind Your Sri Lankan Adventure
          </h2>
          <div className="w-[2px] bg-white h-10 md:h-12"></div>
        </div>
      </div>

      {/* ------------------- OUR TEAM INTRO ------------------- */}
      <section className="relative flex flex-col md:flex-row h-auto md:h-screen w-full overflow-hidden bg-white">
        {/* LEFT IMAGE WRAPPER */}
        <div className="w-full md:w-1/2 h-64 sm:h-80 md:h-full overflow-hidden rounded-r-[45%] relative">
          <img
            src="/images/team.PNG"
            alt="Our Team"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>

        {/* Right Text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-10 md:px-20 mt-10 md:mt-0 text-center md:text-left">
          <p className="font-playfair text-xl sm:text-2xl md:text-3xl text-gray-700 mt-4 leading-snug tracking-[-0.5px] max-w-xl mx-auto md:mx-0">
            MEET THE EXPERTS
          </p>
          <h2 className="font-playfair text-3xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-[-1px] max-w-xl mx-auto md:mx-0 mt-2">
            Our Team
          </h2>

          <div className="w-12 sm:w-16 h-[2px] bg-[#D4AF37] mt-2 mb-4 mx-auto md:mx-0"></div>

          <p className="font-inter text-sm sm:text-base leading-relaxed text-gray-800 max-w-5xl mx-auto tracking-tight mb-4">
            At NetLanka Tours, our shared passion is the beauty and mystery of
            Sri Lanka. Our team, based in our office on the island, has
            firsthand knowledge of its wonders. We’re more than just a digital
            presence; we’re real individuals offering profound insights into Sri
            Lanka’s allure. Instead of wrestling with travel intricacies
            yourself, trust our experts to craft a tailor-made Sri Lankan
            experience for you.
          </p>
          <p className="font-inter text-sm sm:text-base leading-relaxed text-gray-800 max-w-5xl mx-auto tracking-tight mb-6">
            Get to know the voices behind your journey, from our travel
            specialists with their favorite local recommendations to our
            committed board of directors and managers. Whether you're
            reconnecting with us or seeking specific guidance, NetLanka Tours
            ensures your Sri Lankan adventure is unparalleled.
          </p>

          {/* Scroll Button */}
          <div className="flex justify-center md:justify-start mt-4">
            <button
              onClick={() => {
                const element = document.getElementById("team-members");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="bg-[#1a73e8] hover:bg-[#155ab6] text-white uppercase px-6 py-3 rounded-full font-semibold flex items-center gap-2 text-sm shadow-lg transition-colors duration-300 justify-center"
            >
              Meet Our Team
              <Users className="w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ------------------- TEAM MEMBERS SECTION ------------------- */}
      <section
        id="team-members"
        className="mt-16 mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-200 rounded-lg flex flex-col"
            >
              <div className="w-full h-56 sm:h-64 md:h-64 lg:h-72 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="bg-white p-4 text-center border-t border-gray-200">
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-gray-500 text-sm">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default OurTeam;
