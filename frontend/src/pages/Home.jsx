import React, { useState, useEffect } from "react";

const Home = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-poppins bg-white text-[#222]">
      {/* ---------------------------- HERO HEADER ---------------------------- */}
      <div
        className="w-full h-[400px] md:h-[560px] bg-cover bg-center relative flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/train.PNG')" }}
      >
        {/* Slight overlay */}
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Animated Text Box */}
        <div
          className={`absolute bottom-10 right-10 w-[700px] bg-black/80 text-white p-6 backdrop-blur-sm shadow-lg border-none flex items-center justify-end transition-all duration-700 ease-out ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg text-right mr-4">
            Explore <span className="text-yellow-400">Sri Lanka</span> <br />
            Make Memories Forever
          </h2>

          <div className="w-[2px] bg-white h-12"></div>
        </div>
      </div>

      {/* ---------------------------- ABOUT / INTRO SECTION ---------------------------- */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <h3 className="text-xl font-semibold text-[#555] mb-4">
          Welcome to NetLanka Tours
        </h3>
        <p className="text-gray-700 leading-relaxed">
          Explore the beauty of Sri Lanka with our expert guides and curated
          tours. From pristine beaches to ancient cultural sites, we make every
          journey unforgettable. Our dedicated team ensures comfort, safety, and
          immersive experiences for travelers of all kinds.
        </p>
      </section>
    </div>
  );
};

export default Home;
