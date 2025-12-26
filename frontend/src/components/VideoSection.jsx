import React, { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../lib/axios";

export default function VideoSection() {
  const videoRef = useRef(null);

  const [homeInfo, setHomeInfo] = useState({
    title: "",
    subtitle: "",
    description: "",
    video: "",
  });

  // Fetch home info
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await axiosInstance.get("/home");
        if (res?.data?.info) {
          setHomeInfo({
            title: res.data.info.title || "",
            subtitle: res.data.info.subtitle || "",
            description: res.data.info.description || "",
            video: res.data.info.video || "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch home info:", err);
      }
    };

    fetchHomeData();
  }, []);

  // Guaranteed autoplay (muted)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => console.warn("Autoplay blocked"));
    }
  }, []);

  return (
    <section className="w-full bg-white py-16 md:py-28">
      <div className="max-w-[1350px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 items-center gap-10">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-6">
          <div className="max-w-[680px]">
            <div className="text-xs tracking-widest uppercase mb-5 text-gray-400">
              {homeInfo.subtitle}
            </div>

            <h1 className="font-extrabold mb-6 text-4xl sm:text-5xl md:text-6xl leading-tight text-gray-900">
              {homeInfo.title}
            </h1>

            <p className="text-base sm:text-lg text-gray-500 leading-relaxed text-justify">
              {homeInfo.description}
            </p>
          </div>
        </div>

        {/* RIGHT VIDEO */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[720px] aspect-video rounded-2xl overflow-hidden shadow-xl border border-black/5">
            {homeInfo.video && (
              <>
                {/* Video */}
                <video
                  key={homeInfo.video} // forces reload
                  ref={videoRef}
                  src={homeInfo.video || ""}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                />

                {/* Soft overlay for premium look */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/10 pointer-events-none" />

                {/* Watermark */}
                <div className="absolute bottom-4 right-5 text-white text-xs sm:text-sm font-semibold opacity-70 pointer-events-none select-none">
                  Net Lanka Travels
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
