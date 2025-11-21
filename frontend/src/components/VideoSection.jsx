import React from "react";

export default function VideoSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center gap-10">
      {/* Text Content */}
      <div className="md:w-1/2">
        <p className="text-xl text-gray-500 uppercase tracking-widest mb-2">
          ABOUT TRAVELERS CHOICE TO CEYLON
        </p>
        <h2 className="text-5xl font-bold mb-4 font-serif-custom">Explore Sri Lanka</h2>
        <p className="text-gray-600 text-base leading-relaxed">
          Experience the true beauty of Sri Lanka with our friendly and professional
          vehicle and driver guide services. From smooth airport transfers to personalized
          day tours and custom itineraries, we’re here to make your journey unforgettable.
          Let us take care of the details while you enjoy the best of Sri Lanka, creating
          memories that will last a lifetime.
        </p>
      </div>

      {/* Video Content */}
      <div className="md:w-[700px] h-[350px] w-full overflow-hidden mt-10 ">
        <video
          src="/tr.mp4"
          autoPlay
          loop
          muted
     
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </section>
  );
}
