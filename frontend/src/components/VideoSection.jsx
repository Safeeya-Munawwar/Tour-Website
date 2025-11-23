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
    <section className="w-full bg-white py-20">
      <div className="max-w-[1350px] mx-auto px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 items-center gap-8">

        {/* LEFT TEXT */}
        <div className="lg:col-span-6">
          <div className="max-w-[680px]">

            <div
              className="text-lg tracking-widest uppercase mb-6"
              style={{ color: "#9aa0a6", letterSpacing: "2px" }}
            >
              About Travelers Choice To Ceylon
            </div>

            <h1
              className="font-extrabold leading-tight mb-6 text-4xl md:text-5xl"
              style={{
               
                lineHeight: 0.95,
                color: "#111827",
                letterSpacing: "-1px",
                fontStyle: "inherit"
              }}
            >
              Explore Sri Lanka
            </h1>

            <p
              className="text-lg"
              style={{
                color: "#6b7280",
                maxWidth: "640px",
                fontSize: "16px",
                lineHeight: 1.9,
              }}
            >
              Experience the true beauty of Sri Lanka with our friendly and
              professional vehicle and driver guide services. From smooth airport
              transfers to personalized day tours and custom itineraries, we’re
              here to make your journey unforgettable. Let us take care of the
              details while you enjoy the best of Sri Lanka.
            </p>

          </div>
        </div>

        {/* RIGHT: WIDER VIDEO CARD */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div
            ref={containerRef}
            className="relative rounded-xl shadow-[0_10px_28px_rgba(0,0,0,0.12)]"
            style={{
              width: "720px",     // ⬅ increased width
              height: "460px",    // ⬅ adjusted height to keep proportion
              borderRadius: "14px",
              overflow: "hidden",
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <video
              ref={videoRef}
              src={videoSrc}
              muted
              loop
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
