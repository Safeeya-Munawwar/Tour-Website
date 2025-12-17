import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/blog");
        const sortedBlogs = res.data.blogs
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 3);
        setStories(sortedBlogs);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestBlogs();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading stories...</p>;
  if (!stories.length)
    return <p className="text-center mt-10">No stories found.</p>;

  return (
    <section className="w-full py-16 md:py-20 bg-gray-100">
      {/* Header */}
      <div className="text-center mb-12 md:mb-14 px-4">
        <p className="text-sm md:text-lg tracking-wide text-gray-500 font-semibold">
          BLOG & NEWS
        </p>
        <h2 className="text-3xl md:text-5xl font-extrabold mt-2 md:mt-3">
          A Little Story From Us
        </h2>
      </div>

      {/* Cards */}
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 px-4 md:px-6">
        {stories.map((story) => (
          <div
            key={story._id}
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col"
          >
            <img
              src={story.heroImg}
              alt={story.title}
              className="w-full h-64 sm:h-72 md:h-[330px] object-cover rounded-t-xl"
            />
            <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-1">
              <h3 className="mt-2 text-xl sm:text-2xl font-semibold text-gray-900 group-hover:text-[#8C1F28] transition-colors">
                {story.title}
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                {new Date(story.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600 text-sm sm:text-base mt-3 leading-relaxed flex-1">
                {story.description || "Short description of the blog goes here."}
              </p>
              <Link
                to={`/blog/${story.slug || "#"}`}
                className="mt-4 flex items-center gap-2 font-medium text-[#8C1F28] hover:underline text-sm sm:text-base"
              >
                Read More <IoIosArrowForward size={18} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
