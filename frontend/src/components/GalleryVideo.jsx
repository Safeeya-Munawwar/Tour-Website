import React, { useState, useEffect, useRef } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

export default function GalleryVideoSplit() {
  const videoSrc = "/netlanka.mp4";
  const audioSrc = "/background-audio.mp3";

  const leftImages = [
    "/images/about-desc.webp",
    "/images/about-header.webp",
    "/images/blog.webp",
    "/images/blogSrilanka.webp",
    "/images/light.webp",
    "/images/round.webp",
    "/images/community-header.webp",
    "/images/contact-header.webp",
    "/images/sigiriya.webp",
    "/images/stats.webp",
    "/images/team-header.webp",
    "/images/transport-header.webp",
    "/images/wildlife.webp",
    "/images/d2.webp",
    "/images/daytours.webp",
    "/images/destination.webp",
  ];

  const rightImages = [
    "/images/sigiriya-art.webp",
    "/images/customtour-header.webp",
    "/images/d2.webp",
    "/images/daytours.webp",
    "/images/destination.webp",
    "/images/event.webp",
    "/images/experience-header.webp",
    "/images/journey-header.webp",
  ];

  const [leftOrder, setLeftOrder] = useState(leftImages);
  const [rightOrder, setRightOrder] = useState(rightImages);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const audioRef = useRef(null);
  const videoRef = useRef(null);

  // Shuffle images continuously
  useEffect(() => {
    const interval = setInterval(() => {
      setLeftOrder((prev) => [...prev].sort(() => Math.random() - 0.5));
      setRightOrder((prev) => [...prev].sort(() => Math.random() - 0.5));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (audioPlaying) {
      audioRef.current.pause();
      videoRef.current.muted = true;
    } else {
      audioRef.current.play();
      videoRef.current.muted = false;
    }
    setAudioPlaying(!audioPlaying);
  };

  return (
    <section className="relative w-full h-[80vh] flex overflow-hidden bg-gray-900">
      {/* Left Grid */}
      <div className="hidden lg:grid grid-rows-4 grid-cols-2 w-1/6 h-full gap-0">
        {leftOrder.map((img, idx) => (
          <div key={idx} className="w-full h-full overflow-hidden">
            <img
              src={img}
              alt={`left-${idx}`}
              className="w-full h-full object-cover transition-all duration-1000 hover:scale-105"
            />
          </div>
        ))}
      </div>

      {/* Center Video */}
      <div className="flex-1 flex justify-center items-center relative">
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          playsInline
          muted={!audioPlaying}
          className="max-h-full max-w-full object-contain rounded-xl shadow-xl"
        />
        <audio ref={audioRef} src={audioSrc} loop />

        {/* Audio Toggle Icon */}
        <button
          onClick={toggleAudio}
          className="absolute top-4 right-4 z-50 bg-black/70 p-3 rounded-full hover:bg-black/90 transition"
        >
          {audioPlaying ? (
            <FaVolumeUp className="text-white text-xl" />
          ) : (
            <FaVolumeMute className="text-white text-xl" />
          )}
        </button>
      </div>

      {/* Right Grid */}
      <div className="hidden lg:grid grid-rows-4 grid-cols-2 w-1/6 h-full gap-0">
        {rightOrder.map((img, idx) => (
          <div key={idx} className="w-full h-full overflow-hidden">
            <img
              src={img}
              alt={`right-${idx}`}
              className="w-full h-full object-cover transition-all duration-1000 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
