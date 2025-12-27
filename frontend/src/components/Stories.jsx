import React, { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { axiosInstance } from "../lib/axios";
import { Link } from "react-router-dom";

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const res = await axiosInstance.get("/blog");
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

  if (loading)
    return (
      <p
        className="text-center mt-10 text-gray-500"
        aria-live="polite"
      >
        Loading travel stories...
      </p>
    );

  if (!stories.length)
    return (
      <p className="text-center mt-10 text-gray-500">
        No travel stories available at the moment.
      </p>
    );

  return (
    <section
      className="w-full py-16 md:py-20 bg-gray-100"
      aria-labelledby="blog-section-title"
    >
      {/* Section Header */}
      <header className="text-center mb-12 md:mb-14 px-4">
        <p className="text-sm md:text-lg tracking-wide text-gray-500 font-semibold uppercase">
          Blog & Travel News
        </p>

        <h2
          id="blog-section-title"
          className="text-3xl md:text-5xl font-extrabold mt-2 md:mt-3 text-gray-900"
        >
          Stories & Travel Experiences
        </h2>
      </header>

      {/* Blog Cards */}
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 px-4 md:px-6">
        {stories.map((story) => (
          <article
            key={story._id}
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 flex flex-col"
          >
            <img
              src={story.heroImg}
              alt={`${story.title} - Sri Lanka travel blog`}
              className="w-full h-64 sm:h-72 md:h-[330px] object-cover rounded-t-xl"
              loading="lazy"
            />

            <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-1">
              <h3 className="mt-2 text-xl sm:text-2xl font-semibold text-gray-900 group-hover:text-[#8C1F28] transition-colors">
                {story.title}
              </h3>

              <time
                dateTime={story.date}
                className="text-gray-500 text-xs sm:text-sm mt-1"
              >
                {new Date(story.date).toLocaleDateString()}
              </time>

              <p className="text-gray-600 text-sm sm:text-base mt-3 leading-relaxed flex-1">
                {story.description ||
                  "Explore this travel story and discover unique experiences across Sri Lanka."}
              </p>

              <Link
                to={`/blog/${story.slug}`}
                aria-label={`Read more about ${story.title}`}
                className="mt-4 flex items-center gap-2 font-medium text-[#8C1F28] hover:underline text-sm sm:text-base"
              >
                Read More <IoIosArrowForward size={18} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
