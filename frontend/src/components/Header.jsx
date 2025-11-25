import React from "react";
import { Check, Settings } from "lucide-react";

export default function Header() {
  return (
    <header
      className="w-full h-[600px] sm:h-[650px] md:h-[750px] relative flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url('/images/12.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Center text content */}
      <div className="relative z-10 text-center px-4 sm:px-6 mt-8 max-w-4xl text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-snug sm:leading-relaxed font-serif-custom">
          Net Lanka Tours
        </h1>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg lg:text-xl font-light">
          spirit of sri lanka travel ...
        </p>

        {/* Buttons */}
        <div className="mt-6 sm:mt-8 md:mt-12 flex justify-center gap-3 sm:gap-4 md:gap-6 flex-wrap">
          {/* Blue Gradient Button */}
          <button
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

          {/* Red Custom Gradient Button */}
          <button
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
