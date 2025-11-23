import React from "react";
import { Check, Settings } from "lucide-react";

export default function Header() {
  return (
    <header
      className="w-full h-[750px] relative flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url('/12.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Center text content */}
      <div className="relative z-10 text-center px-4 mt-8 max-w-4xl text-white ">
        <h1 className="text-[56px] md:text-7xl font-light leading-relaxed font-serif-custom">
          Net Lanka Tours
        </h1>
        <p className="mt-4 text-[18px] md:text-[20px] font-light">
          spirit of sri lanka travel ...
        </p>

    {/* Buttons */}
<div className="mt-20 flex justify-center gap-6 flex-wrap ">

  {/* Blue Gradient Button */}
 <button
  className="
    bg-[#487898]
    hover:bg-[#0c3956]
    text-white uppercase px-7 py-2 rounded-full
    font-light flex items-center gap-2
    transition
  "
>
  Curated Itineraries <Check className="w-5 h-5" />
</button>

  {/* Red Custom Gradient Button */}
  <button
    className="
      bg-[#ce2a40]
    hover:bg-[#ef0530]
    text-white uppercase px-7 py-2 rounded-full
    font-light flex items-center gap-2
    transition
    "
  >
    Tailormade Experiences <Settings className="w-5 h-5" />
  </button>

</div>

      </div>
    </header>
  );
}
