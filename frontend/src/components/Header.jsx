import React, { useEffect, useState } from "react";
import axios from "axios";
import { Check, Settings } from "lucide-react";

export default function Header() {
  const [homeData, setHomeData] = useState({
    name: "",
    info: { title: "", subtitle: "", description: "", video: "" },
  });

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/home");
        if (res.data) {
          setHomeData({
            name: res.data.name || "",
            info: res.data.info || {
              title: "",
              subtitle: "",
              description: "",
              video: "",
            },
          });
        }
      } catch (err) {
        console.error("Home fetch failed", err);
      }
    };

    fetchHome();
  }, []);

  return (
    <header
      className="w-full h-[600px] sm:h-[650px] md:h-[750px] flex flex-col items-center justify-center relative top-0"
      style={{
        backgroundImage: `url('/images/12.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Main Text */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-snug sm:leading-relaxed font-serif-custom">
          {homeData.name || "Net Lanka Tours"}
        </h1>

        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg lg:text-xl font-light">
          {homeData.info.subtitle || "spirit of sri lanka travel ..."}
        </p>

        {/* Buttons */}
        <div className="mt-6 sm:mt-8 md:mt-12 flex justify-center gap-3 sm:gap-4 md:gap-6 flex-wrap">
          <button
            onClick={() => (window.location.href = "/destinations")}
            className="
      bg-[#487898] hover:bg-[#0c3956]
      text-white uppercase px-4 sm:px-6 md:px-7 py-2 sm:py-2.5 md:py-3
      rounded-full font-light flex items-center gap-2 sm:gap-3
      text-xs sm:text-sm md:text-base lg:text-lg
      transition
    "
          >
            Curated Itineraries <Check className="w-4 sm:w-5" />
          </button>

          <button
            onClick={() => (window.location.href = "/tailor-made-tours")}
            className="
      bg-[#ce2a40] hover:bg-[#ef0530]
      text-white uppercase px-4 sm:px-6 md:px-7 py-2 sm:py-2.5 md:py-3
      rounded-full font-light flex items-center gap-2 sm:gap-3
      text-xs sm:text-sm md:text-base lg:text-lg
      transition
    "
          >
            Tailormade Experiences <Settings className="w-4 sm:w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
