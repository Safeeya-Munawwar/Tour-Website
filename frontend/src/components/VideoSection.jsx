import React, { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../lib/axios";

export default function VideoSection() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [homeInfo, setHomeInfo] = useState({
    title: "",
    subtitle: "",
    description: "",
    video: "",
  });

  // Fetch home info from backend
  const fetchHomeData = async () => {
    try {
      const res = await axiosInstance.get("/home");
      if (res.data && res.data.info && res.data.info.video) {
        setHomeInfo({
          title: res.data.info.title,
          subtitle: res.data.info.subtitle,
          description: res.data.info.description,
          video: res.data.info.video,
        });
      }
    } catch (err) {
      console.error("Failed to fetch home info:", err);
    }
  };

  useEffect(() => {
    fetchHomeData();
  }, []);

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

    if (containerRef.current) io.observe(containerRef.current);
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
              {homeInfo.subtitle}
            </div>

            <h1
              className="font-extrabold leading-tight mb-6 text-4xl sm:text-5xl md:text-6xl"
              style={{
                lineHeight: 1.1,
                color: "#111827",
                letterSpacing: "-1px",
              }}
            >
              {homeInfo.title}
            </h1>

            <p className="text-base sm:text-lg text-gray-500 leading-relaxed text-justify">
  {homeInfo.description}
</p>

          </div>
        </div>

        {/* RIGHT VIDEO */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div
            ref={containerRef}
            className="relative rounded-xl shadow-[0_10px_28px_rgba(0,0,0,0.12)] w-full max-w-[720px] aspect-[720/460] overflow-hidden border border-[rgba(0,0,0,0.06)]"
          >
            {homeInfo.video && (
              <video
                ref={videoRef}
                src={homeInfo.video}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-cover block"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
