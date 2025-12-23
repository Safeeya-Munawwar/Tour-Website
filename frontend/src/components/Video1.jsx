import React, { useState, useEffect } from "react";
import BookTour from "./BookTour";
import { axiosInstance } from "../lib/axios";

export default function Video1() {
  const [showForm, setShowForm] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  // Fetch video from backend
  const fetchVideo = async () => {
    try {
      const res = await axiosInstance.get("/home");
      if (res.data && res.data.info && res.data.info.video) {
        setVideoUrl(res.data.info.video);
      }
    } catch (err) {
      console.error("Failed to fetch video:", err);
    }
  };

  useEffect(() => {
    fetchVideo();
  }, []);

  return (
    <>
      <section className="relative w-full h-screen overflow-hidden">
        {/* Background Video */}
        {videoUrl && (
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        )}

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
            Your dream Sri Lankan adventure is just a step away! Discover
            breathtaking landscapes, vibrant culture, and unforgettable memories
            with Travelers Choice to Ceylon. Start now!
          </p>

          {/* Button */}
          <button
            onClick={() => setShowForm(true)}
            className="bg-white text-black px-10 py-4 rounded-full font-medium text-lg shadow-lg transition hover:bg-gray-200"
          >
            Book Now
          </button>
        </div>
      </section>

      {/* Modal Overlay */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[20000] flex items-center justify-center">
          <div className="w-[95vw] max-w-[700px] h-[90vh] bg-white shadow-2xl rounded-2xl relative flex flex-col overflow-hidden">
            {/* Close Button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-3xl font-bold text-gray-600 hover:text-black z-10"
            >
              &times;
            </button>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-auto p-6 relative rounded-2xl">
              <BookTour />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
