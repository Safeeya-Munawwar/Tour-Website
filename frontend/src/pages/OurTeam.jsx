import React, { useEffect, useState } from 'react';

const teamMembers = [
  { image: "/images/user1.PNG", name: "John Doe", role: "Travel Consultant" },
  { image: "/images/user2.PNG", name: "Jane Smith", role: "Tour Specialist" },
  { image: "/images/user3.PNG", name: "Alice Lee", role: "Holiday Planner" },
  { image: "/images/user4.PNG", name: "Mark Brown", role: "Customer Experience" },
  { image: "/images/user5.PNG", name: "Sara Wilson", role: "Booking Manager" },
  { image: "/images/user6.PNG", name: "David Kim", role: "Travel Advisor" },
  { image: "/images/user7.PNG", name: "Emily Clark", role: "Tour Coordinator" },
  { image: "/images/user8.PNG", name: "Michael Johnson", role: "Destination Expert" },
  { image: "/images/user9.PNG", name: "Olivia Martinez", role: "Holiday Planner" },
  { image: "/images/user10.PNG", name: "Chris Evans", role: "Travel Consultant" },
  { image: "/images/user11.PNG", name: "Sophia Patel", role: "Customer Relations" },
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
        className="w-full h-[400px] md:h-[560px] bg-cover bg-center relative flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/images/team-header.PNG')" }}
      >
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Text Box at Bottom-Right */}
        <div
          className={`absolute bottom-10 right-10 w-[600px] bg-black/80 text-white p-6 backdrop-blur-sm shadow-lg border-none flex items-center justify-end transition-all duration-700 ease-out ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-2xl md:text-3xl leading-snug text-right mr-4">
            Meet the Experts <br />
            Behind Your Sri Lankan Adventure
          </h2>
          <div className="w-[2px] bg-white h-12"></div>
        </div>
      </div>

      {/* ------------------- OUR TEAM INTRO ------------------- */}
      <section className="max-w-7xl mx-auto px-6 lg:px-0 py-20 flex flex-col lg:flex-row items-center gap-12">
        {/* Left Image */}
        <div className="lg:w-1/2 flex justify-start">
          <img
            src="/images/team.PNG"
            alt="Our Team"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Right Text */}
        <div className="lg:w-1/2 space-y-6 text-left">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a]">
            Our Team
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            At NetLanka Tours, our shared passion is the beauty and mystery of Sri Lanka.
            Our team, based in our office on the island, has firsthand knowledge of its wonders.
            We’re more than just a digital presence; we’re real individuals offering profound insights
            into Sri Lanka’s allure. Instead of wrestling with travel intricacies yourself,
            trust our experts to craft a tailor-made Sri Lankan experience for you.
          </p>

          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Get to know the voices behind your journey, from our travel specialists with
            their favorite local recommendations to our committed board of directors and managers.
            Whether you're reconnecting with us or seeking specific guidance, NetLanka Tours ensures
            your Sri Lankan adventure is unparalleled.
          </p>

          {/* Scroll Button */}
          <button
            onClick={() => {
              const element = document.getElementById("team-members");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="
              bg-[#1a73e8] hover:bg-[#155ab6]
              text-white uppercase px-6 py-3 rounded-full font-semibold
              flex items-center gap-2 text-sm shadow-lg transition-colors duration-300
            "
          >
            Meet Our Team
          </button>
        </div>
      </section>

      {/* ------------------- TEAM MEMBERS SECTION ------------------- */}
      <section
        id="team-members"
        className="mt-5 mb-20 max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-gray-200 rounded-lg"
          >
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
        ))}
      </section>

    </div>
  );
};

export default OurTeam;
