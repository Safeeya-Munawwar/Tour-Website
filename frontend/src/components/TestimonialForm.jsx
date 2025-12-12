import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const TestimonialForm = () => {
  const [testimonialForm, setTestimonialForm] = useState({
    title: "",
    text: "",
    name: "",
    email: "",
    rating: 0,
  });

  const [hover, setHover] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!testimonialForm.title || !testimonialForm.text || !testimonialForm.name) {
      toast.warning("Please fill in all required fields!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/testimonials",
        testimonialForm
      );
      if (res.data.success || res.status === 200) {
        toast.success("Thank you for your feedback!");
        setTestimonialForm({
          title: "",
          text: "",
          name: "",
          email: "",
          rating: 0,
        });
      } else {
        toast.error("Failed to submit testimonial. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error: could not submit testimonial");
    }
  };

  return (
    <section className="max-w-full mx-auto px-4 py-10 bg-gray-100 rounded-xl mb-6 flex flex-col items-center">
      <ToastContainer position="top-right" autoClose={3000} />

      <p className="text-sm md:text-base font-semibold text-gray-500 uppercase tracking-widest mb-2 text-center">
        Testimonials
      </p>
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-2">
        Share Your Experience With Us
      </h2>
      <p className="text-gray-600 text-center max-w-2xl mb-8">
        Your feedback helps us provide better travel experiences. Tell us about your journey, your favorite moments, and the adventures you loved the most.
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl space-y-5 flex flex-col items-center bg-white border border-[#2E5B84] p-10 rounded-2xl"
      >
        {/* Title */}
        <div className="w-full">
          <label className="block text-gray-700 font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={testimonialForm.title}
            onChange={(e) =>
              setTestimonialForm({ ...testimonialForm, title: e.target.value })
            }
            placeholder="E.g., Amazing tour experience!"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Message */}
        <div className="w-full">
          <label className="block text-gray-700 font-semibold mb-1">Message</label>
          <textarea
            name="text"
            value={testimonialForm.text}
            onChange={(e) =>
              setTestimonialForm({ ...testimonialForm, text: e.target.value })
            }
            placeholder="Share your experience..."
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
            required
          ></textarea>
        </div>

        {/* Name */}
        <div className="w-full">
          <label className="block text-gray-700 font-semibold mb-1">Your Name</label>
          <input
            type="text"
            name="name"
            value={testimonialForm.name}
            onChange={(e) =>
              setTestimonialForm({ ...testimonialForm, name: e.target.value })
            }
            placeholder="Your name"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="w-full">
        <label className="block text-gray-700 font-semibold mb-1">Email</label>
          <input
            type="email"
            placeholder="Your email"
            value={testimonialForm.email}
            onChange={(e) => 
                setTestimonialForm({ ...testimonialForm, email: e.target.value })
            }
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
          />
          </div>

        {/* Rating */}
        <div className="w-full flex flex-col items-start">
          <label className="block text-gray-700 font-semibold mb-1">Rating</label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setTestimonialForm({ ...testimonialForm, rating: star })}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(null)}
                className="focus:outline-none"
              >
                <FaStar
                  size={24}
                  color={(hover || testimonialForm.rating) >= star ? "#FFD700" : "#e4e5e9"}
                />
              </button>
            ))}
            <span className="ml-2 text-gray-600 font-medium">
              {testimonialForm.rating} / 5
            </span>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition"
        >
          Submit Testimonial
        </button>
      </form>
    </section>
  );
};

export default TestimonialForm;
