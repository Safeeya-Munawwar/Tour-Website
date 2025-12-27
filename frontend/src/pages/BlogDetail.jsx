import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { IoIosArrowForward } from "react-icons/io";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [otherBlogs, setOtherBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showText, setShowText] = useState(false);

  const [comment, setComment] = useState({
    name: "",
    email: "",
    rating: 0,
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setShowText(false);
    const fetchBlog = async () => {
      try {
        const res = await axiosInstance.get(`/blog/slug/${slug}`);
        setBlog(res.data);

        const allRes = await axiosInstance.get(`/blog`);
        setOtherBlogs(allRes.data.blogs.filter((b) => b.slug !== slug));

        const commentsRes = await axiosInstance.get(
          `/blog-comments/${res.data._id}`
        );
        if (commentsRes.data.success) setComments(commentsRes.data.comments);

        setLoading(false);

        setTimeout(() => setShowText(true), 500);
      } catch (err) {
        console.error("Error fetching blog or comments:", err);
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!blog)
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">Blog Not Found</h2>
      </div>
    );

  // --- USE BACKEND PARAGRAPHS AS-IS ---
  const paragraphs = blog.content
    ? blog.content.split(/\n\s*\n/).filter((p) => p.trim() !== "")
    : [];

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setComment((prev) => ({ ...prev, [name]: value }));
  };

  const handleRating = (rate) => {
    setComment((prev) => ({ ...prev, rating: rate }));
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.name || !comment.email || !comment.message) {
      toast.warning("Please fill in all required fields!");
      return;
    }
    setSubmitting(true);
    try {
      const res = await axiosInstance.post(
        `/blog-comments/${blog._id}`,
        comment
      );
      if (res.data.success) {
        toast.success("Comment submitted successfully!");
        setComment({ name: "", email: "", rating: 0, message: "" });
        setComments((prev) => [
          { ...comment, createdAt: new Date().toISOString() },
          ...prev,
        ]);
      } else {
        toast.error("Failed to submit comment. Try again!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error: could not submit comment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
    <div className=" flex flex-col min-h-screen font-poppins bg-white text-[#222]">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* HERO */}
      <div
        className="w-full h-[360px] md:h-[560px] bg-cover bg-center relative flex items-center justify-center text-white"
        style={{
          backgroundImage: `url(${blog.heroImg || "/images/blog.jpg"})`,
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div
          className={`absolute bottom-6 md:bottom-10 right-4 md:right-10 max-w-[90%] md:w-[400px] bg-black/80 text-white p-4 md:p-6 backdrop-blur-sm shadow-lg border-none flex items-center justify-end transition-all duration-700 ease-out ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-xl md:text-3xl leading-snug text-right mr-4">
            {blog.subtitle}
          </h2>
          <div className="w-[2px] bg-white h-10 md:h-12"></div>
        </div>
      </div>

      {/* MAIN CONTENT */}
{/* ---------------------------- BLOG MAIN SECTION ---------------------------- */}
<section className="relative flex flex-col md:flex-row w-full bg-white pt-10 md:pt-0">

  {/* LEFT IMAGE */}
  <div
    className="
      w-full md:w-1/2
      overflow-hidden
      rounded-br-[40%] md:rounded-r-[45%]
      relative
    "
  >
    <img
      src={
        blog.galleryImgs && blog.galleryImgs[2]
          ? blog.galleryImgs[2]
          : blog.heroImg
      }
      alt={blog.title}
      className="w-full h-full object-cover object-center"
    />
  </div>

  {/* RIGHT CONTENT */}
  <div
    className="
      w-full md:w-1/2
      flex flex-col
      justify-center
      px-6 sm:px-10 md:px-20
      mt-6 sm:mt-10 md:mt-20
      pb-10
      space-y-6
      text-left
    "
  >
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
      {blog.title}
    </h2>

    {paragraphs.map((para, idx) => (
      <p
        key={idx}
        className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed"
      >
        {para}
      </p>
    ))}
  </div>
</section>


      {/* ---------------------------- BLOG GALLERY ---------------------------- */}
      {blog.galleryImgs && blog.galleryImgs.length > 0 && (
        <section className="w-full py-12 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center">
              Blog Gallery
            </h2>

            <div className="grid place-items-center gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
              {blog.galleryImgs.slice(0, 5).map((img, idx) => (
                <div
                  key={idx}
                  className="w-full max-w-[220px] overflow-hidden rounded-xl shadow-md"
                >
                  <img
                    src={img}
                    alt={`Blog Gallery ${idx + 1}`}
                    className="w-full h-40 object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* COMMENTS SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 lg:px-32 mt-10 lg:mt-16 flex flex-col md:flex-row gap-10 lg:gap-16 pb-20">
        {/* COMMENT FORM */}
        <div className="md:w-1/2 bg-gray-50 rounded-xl shadow-md p-6 sm:p-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
            Leave a Comment
          </h3>
          <form onSubmit={handleCommentSubmit} className="flex flex-col gap-4">
            <label className="font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={comment.name}
              onChange={handleCommentChange}
              placeholder="Your Name"
              required
              className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#2E5B84]"
            />
            <label className="font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={comment.email}
              onChange={handleCommentChange}
              placeholder="Your Email"
              required
              className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#2E5B84]"
            />
            <div className="flex flex-col space-y-1">
              <label className="font-medium text-gray-700">Rate</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={24}
                    className={`cursor-pointer ${
                      comment.rating >= star
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => handleRating(star)}
                  />
                ))}
                <span className="ml-2 text-gray-600 font-medium">
                  {comment.rating} / 5
                </span>
              </div>
            </div>
            <label className="font-medium text-gray-700">Comment</label>
            <textarea
              name="message"
              value={comment.message}
              onChange={handleCommentChange}
              placeholder="Your Comment"
              rows={4}
              required
              className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#2E5B84]"
            />
            <button
              type="submit"
              disabled={submitting}
              className="bg-[#2E5B84] text-white px-6 py-3 rounded hover:bg-[#1E3A60] transition"
            >
              {submitting ? "Submitting..." : "Submit Comment"}
            </button>
          </form>
        </div>

        {/* COMMENTS SWIPER */}
        <div className="md:w-1/2 flex flex-col justify-center">
          {comments.length === 0 ? (
            <p className="text-gray-600 text-center">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            <div className="relative">
              <Swiper
                modules={[Autoplay, Navigation]}
                navigation={{ prevEl: ".c-prev", nextEl: ".c-next" }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop={true}
                slidesPerView={1}
                className="rounded-2xl"
              >
                {comments.map((c, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="bg-[#f7f7f7] p-8 rounded-2xl shadow-lg flex flex-col items-center text-center gap-4">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-20 h-20 bg-indigo-600 text-white rounded-full flex items-center justify-center text-3xl font-bold relative">
                          {c.name[0].toUpperCase()}
                        </div>
                        <h4 className="font-semibold">{c.name}</h4>
                        <p className="text-gray-500 text-sm">
                          {new Date(c.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-1 text-yellow-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className={
                              c.rating >= star
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {c.message}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <button className="c-prev absolute left-[-22px] top-1/2 -translate-y-1/2 bg-white shadow-md w-10 h-10 rounded-full flex items-center justify-center">
                <FaChevronLeft />
              </button>
              <button className="c-next absolute right-[-22px] top-1/2 -translate-y-1/2 bg-white shadow-md w-10 h-10 rounded-full flex items-center justify-center">
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* RELATED BLOGS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-10 text-center">
          Related Blogs
        </h3>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 16 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
          }}
          pagination={{ clickable: true }}
        >
          {otherBlogs.map((b, idx) => (
            <SwiperSlide key={idx}>
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer flex flex-col h-full">
                <img
                  src={b.heroImg}
                  alt={b.title}
                  className="w-full h-48 sm:h-56 md:h-60 object-cover"
                />
                <div className="p-5 flex flex-col flex-1">
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-900">
                    {b.title}
                  </h4>
                  <p className="text-gray-500 text-sm sm:text-base mt-2 flex-1">
                    {b.subtitle}
                  </p>
                  <a
                    href={`/blog/${b.slug}`}
                    className="mt-4 inline-flex items-center text-[#8C1F28] font-semibold hover:underline"
                  >
                    Read More <IoIosArrowForward className="ml-1" />
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
    <Footer/>
    </>
  );
}
