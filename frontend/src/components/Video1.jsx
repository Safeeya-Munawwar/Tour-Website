import React from "react";

export default function Video1() {
  return (
    <section className="relative w-full h-screen overflow-hidden">

      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/tr.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">

        <p className="text-white tracking-[3px] text-sm md:text-base mb-4">
          START YOUR ADVENTURE
        </p>

        <h1 className="text-white text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          What Are You Waiting For
        </h1>

        <p className="text-gray-200 max-w-3xl text-sm md:text-lg mb-10">
          Your dream Sri Lankan adventure is just a step away! Discover breathtaking landscapes,
          vibrant culture, and unforgettable memories with Travelers Choice to Ceylon. Start now!
        </p>

        {/* Button */}
        <button className="bg-white text-black px-10 py-4 rounded-full font-medium text-lg shadow-lg transition hover:bg-gray-200">
          Book Now
        </button>
      </div>

    </section>
  );
}
