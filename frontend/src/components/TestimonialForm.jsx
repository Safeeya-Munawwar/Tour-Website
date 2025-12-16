import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const TestimonialForm = () => {
  const [testimonialForm, setTestimonialForm] = useState({
    title: "",
    text: "",
    name: "",
    email: "",
    rating: 0,
  });

  const [hover, setHover] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !testimonialForm.title ||
      !testimonialForm.text ||
      !testimonialForm.name
    ) {
      setMessage({
        text: "Please fill in all required fields!",
        type: "warning",
      });
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/testimonials",
        testimonialForm
      );
      if (res.data.success || res.status === 200) {
        setMessage({ text: "Thank you for your feedback!", type: "success" });
        setTestimonialForm({
          title: "",
          text: "",
          name: "",
          email: "",
          rating: 0,
        });
      } else {
        setMessage({
          text: "Failed to submit testimonial. Please try again.",
          type: "error",
        });
      }
    } catch (err) {
      console.error(err);
      setMessage({
        text: "Server error: could not submit testimonial",
        type: "error",
      });
    }
  };

  return (
    <section className="w-full max-w-3xl mx-auto space-y-5 flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-2">
        Share Your Experience With Us
      </h2>

      <form
        onSubmit={handleSubmit}
        className="w-full space-y-5 flex flex-col items-center bg-white border border-[#2E5B84] p-6 rounded-2xl"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={testimonialForm.title}
          onChange={(e) =>
            setTestimonialForm({ ...testimonialForm, title: e.target.value })
          }
          className="w-full border p-3 rounded-md"
          required
        />
        <textarea
          name="text"
          placeholder="Message"
          value={testimonialForm.text}
          onChange={(e) =>
            setTestimonialForm({ ...testimonialForm, text: e.target.value })
          }
          className="w-full border p-3 rounded-md"
          rows={5}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={testimonialForm.name}
          onChange={(e) =>
            setTestimonialForm({ ...testimonialForm, name: e.target.value })
          }
          className="w-full border p-3 rounded-md"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={testimonialForm.email}
          onChange={(e) =>
            setTestimonialForm({ ...testimonialForm, email: e.target.value })
          }
          className="w-full border p-3 rounded-md"
          required
        />

        {/* Rating */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() =>
                setTestimonialForm({ ...testimonialForm, rating: star })
              }
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(null)}
            >
              <FaStar
                size={24}
                color={
                  (hover || testimonialForm.rating) >= star
                    ? "#FFD700"
                    : "#e4e5e9"
                }
              />
            </button>
          ))}
          <span>{testimonialForm.rating} / 5</span>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md"
        >
          Submit Testimonial
        </button>

        {/* Message below button */}
        {message.text && (
          <p
            className={`mt-2 text-center font-medium ${
              message.type === "success"
                ? "text-green-600"
                : message.type === "error"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {message.text}
          </p>
        )}
      </form>
    </section>
  );
};

export default TestimonialForm;
