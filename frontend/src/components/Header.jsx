import React, { useEffect, useState, useMemo } from "react";
import { axiosInstance } from "../lib/axios";
import { Check, Settings } from "lucide-react";

export default function Header() {
  // Memoize images so the array is stable across renders
  const images = useMemo(
    () => [
      { src: "/images/d2.jpg", alt: "Beautiful Sri Lanka landscape" },
      { src: "/images/destination.jpg", alt: "Tropical destination in Sri Lanka" },
      { src: "/images/sigiriya.jpg", alt: "Sigiriya Rock Fortress" },
      { src: "/images/blog.jpg", alt: "Travel blog inspiration" },
    ],
    []
  );

  const [currentImage, setCurrentImage] = useState(0);
  const [homeData, setHomeData] = useState({
    name: "",
    info: { title: "", subtitle: "", description: "", video: "" },
  });
  const [, setLoaded] = useState(false);

  // Preload all images
  useEffect(() => {
    let loadedCount = 0;
    images.forEach((img) => {
      const image = new Image();
      image.src = img.src;
      image.onload = () => {
        loadedCount++;
        if (loadedCount === images.length) setLoaded(true);
      };
    });
  }, [images]); // now safe

  // Fetch home content from backend
  useEffect(() => {
    const fetchHome = async () => {
      try {
        const res = await axiosInstance.get("/home");
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

  // Slideshow interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [images.length]); // safe now

  return (
    <header className="relative w-full h-[650px] sm:h-[700px] md:h-[750px] overflow-hidden flex items-center justify-center">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {images.map((img, index) => (
          <div
            key={img.src}
            role="img"
            aria-label={img.alt}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${img.src})`,
              opacity: index === currentImage ? 1 : 0,
              transform: index === currentImage ? "scale(1.18)" : "scale(1.05)",
              transition: "opacity 2.5s ease-in-out, transform 8s ease-in-out",
              filter: "contrast(1.05) saturate(1.05)",
            }}
          />
        ))}
      </div>

      {/* Dark cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/85" />

      {/* Header content */}
      <div className="relative z-10 text-center px-4 max-w-4xl text-white">
        <h1 className="mt-20 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light font-serif-custom">
          {homeData.name || "Net Lanka Travels"}
        </h1>

        <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl font-light">
          {homeData.info.subtitle || "Unforgettable Journeys Across the Island"}
        </p>

        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          <a
            href="/destinations"
            className="bg-[#487898] hover:bg-[#0c3956] text-white uppercase px-6 py-3 rounded-full flex items-center gap-2 transition"
          >
            Curated Itineraries <Check size={18} />
          </a>

          <a
            href="/tailor-made-tours"
            className="bg-[#ce2a40] hover:bg-[#ef0530] text-white uppercase px-6 py-3 rounded-full flex items-center gap-2 transition"
          >
            Tailormade Experiences <Settings size={18} />
          </a>
        </div>
      </div>
    </header>
  );
}
