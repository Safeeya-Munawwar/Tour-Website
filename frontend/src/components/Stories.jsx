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
        // Sort by date descending and take last 3 added blogs
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
    <section className="w-full py-20 bg-gray-100">
      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-sm md:text-lg tracking-wide text-gray-500 font-semibold">
          BLOG & NEWS
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold mt-3">
          A Little Story From Us
        </h2>
      </div>

      {/* Cards */}
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-5 mt-12">
        {stories.map((story) => (
          <div
            key={story._id}
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col"
          >
            <img
              src={story.heroImg}
              alt={story.title}
              className="w-full h-[330px] object-cover rounded-t-xl"
            />
            <div className="p-6 flex flex-col flex-1">
              <h3 className="mt-2 text-2xl font-semibold text-gray-900 group-hover:text-[#8C1F28] transition-colors">
                {story.title}
              </h3>
              <p className="text-gray-500 text-sm mt-1">
                {new Date(story.date).toLocaleDateString()}
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
        ))}
      </div>
    </section>
  );
}
