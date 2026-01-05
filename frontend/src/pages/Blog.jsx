import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { axiosInstance } from ".././lib/axios";
import { Link } from "react-router-dom";

export default function Blog() {
  const [showText, setShowText] = useState(false);
  const [stories, setStories] = useState([]); // fetched blogs
  const [loading, setLoading] = useState(true);
const [currentPage] = useState(1);
// Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [currentPage]);
  useEffect(() => {
    setTimeout(() => setShowText(true), 200);
  }, []);

  // Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosInstance.get("/blog");
        setStories(res.data.blogs || []);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="font-poppins bg-white text-[#222]">
      {/* HERO HEADER */}
      <div
        className="w-full h-[360px] md:h-[560px] bg-cover bg-center relative flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/images/BlogSrilanka.webp')" }}
      >
        <div className="absolute inset-0 bg-black/20"></div>

        <div
          className={`absolute bottom-6 md:bottom-10 right-4 md:right-10 max-w-[90%] md:w-[300px] bg-black/80 text-white p-4 md:p-6 backdrop-blur-sm shadow-lg border-none flex items-center justify-end transition-all duration-700 ease-out ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-xl md:text-3xl leading-snug text-right mr-4">
            Enjoy <br />
            Your Vacation…
          </h2>
          <div className="w-[2px] bg-white h-10 md:h-12"></div>
        </div>
      </div>

      {/* BLOG PAGE */}
      <section className="w-full py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm md:text-lg text-gray-600 tracking-widest font-semibold mb-3">
            BLOG & NEWS
          </p>

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5">
            A Little Story From Us
          </h2>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          Explore stories, tips, and behind-the-scenes experiences from our travel team. 
          Stay inspired and discover how we craft unforgettable journeys across Sri Lanka.
          </p>

          <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-6"></div>

          {/* ---------------------------- STORIES GRID ---------------------------- */}
          {loading ? (
            <p className="mt-10 text-center text-gray-500">Loading blogs...</p>
          ) : (
            <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-5 mt-12">
              {stories.length > 0 ? (
                stories.map((story) => (
                  <div
                    key={story._id}
                    className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col"
                  >
                    {/* Blog Image */}
                    <img
                      src={story.heroImg || "/images/BlogSrilanka.webp"}
                      alt={story.title || "Blog"}
                      className="w-full h-[330px] object-cover rounded-t-xl"
                    />

                    {/* Blog Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="mt-2 text-2xl font-semibold text-gray-900 group-hover:text-[#8C1F28] transition-colors">
                        {story.title || "Blog Title"}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1">
                        {story.date
                          ? new Date(story.date).toLocaleDateString()
                          : "Date"}
                      </p>
                      <p className="text-gray-600 text-sm mt-3 leading-relaxed flex-1">
                        {story.description ||
                          "Short description of the blog goes here."}
                      </p>
                      <Link
                        to={`/blog/${story.slug || "#"}`}
                        className="mt-4 flex items-center gap-2 font-medium text-[#8C1F28] hover:underline"
                      >
                        Read More <IoIosArrowForward size={20} />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p className="col-span-3 text-center text-gray-500 mt-10">
                  No stories available yet.
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
