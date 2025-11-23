import React, { useEffect, useRef } from "react";

export default function VideoSection({ videoSrc }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // autoplay only when visible
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoEl.muted = true;
            videoEl.play().catch(() => {});
          } else {
            videoEl.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    io.observe(containerRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section className="w-full bg-white py-16 md:py-32">
      <div className="max-w-[1350px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 items-center gap-8">

        {/* LEFT TEXT */}
        <div className="lg:col-span-6">
          <div className="max-w-[680px] mx-auto lg:mx-0">

            <div
              className="text-lg sm:text-sm tracking-widest uppercase mb-6 text-gray-400"
              style={{ letterSpacing: "2px" }}
            >
              About Travelers Choice To Ceylon
            </div>

            <h1
              className="font-extrabold leading-tight mb-6 text-4xl sm:text-5xl md:text-6xl"
              style={{
                lineHeight: 1.1,
                color: "#111827",
                letterSpacing: "-1px",
              }}
            >
              Explore Sri Lanka
            </h1>

            <p className="text-base sm:text-lg text-gray-500 leading-relaxed">
              Experience the true beauty of Sri Lanka with our friendly and
              professional vehicle and driver guide services. From smooth airport
              transfers to personalized day tours and custom itineraries, we’re
              here to make your journey unforgettable. Let us take care of the
              details while you enjoy the best of Sri Lanka.
            </p>

          </div>
        </div>

        {/* RIGHT VIDEO */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div
            ref={containerRef}
            className="relative rounded-xl shadow-[0_10px_28px_rgba(0,0,0,0.12)] w-full max-w-[720px] aspect-[720/460] overflow-hidden border border-[rgba(0,0,0,0.06)]"
          >
            <video
              ref={videoRef}
              src={videoSrc}
              muted
              loop
              playsInline
              className="w-full h-full object-cover block"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
