import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Footer = () => {
  const [contact, setContact] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    rating: 0,
    message: "",
  });

  // Fetch contact data from backend
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/contact");
        setContact(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchContact();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleStarClick = (star) => {
    setForm((prev) => ({ ...prev, rating: star }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/review", form);
      if (res.data.success) {
        toast.success("Review submitted successfully!");
        setForm({ name: "", email: "", rating: 0, message: "" });
      } else {
        toast.error("Failed to submit review.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again!");
    }
  };

  if (!contact) return null; // or a loader

  return (
    <footer className="bg-black text-gray-200 pt-16 pb-10 font-poppins">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Logo & Description */}
        <div className="flex flex-col items-center md:items-start space-y-3 md:col-span-1">
          <img src="/images/Logo.png" alt="NetLanka Tours" className="w-36" />
          <p className="text-gray-400 text-sm text-center md:text-left leading-relaxed">
            Discover Sri Lanka like never before with NetLanka Tours. Exclusive journeys, expert guides, and unforgettable memories.
          </p>
        </div>

  
        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start md:col-span-1">
          <h4 className="text-white font-semibold mb-4 text-lg tracking-wide">
            Quick Links
          </h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            {["Home","Tailor-Made Tours","Destinations","Tours","Our Story","Blogs","Experiences","Contact Us"].map((link, idx) => (
              <li key={idx} className="hover:text-red-500 cursor-pointer transition-colors duration-300">
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center md:items-start md:col-span-1">
          <h4 className="text-white font-semibold mb-4 text-lg tracking-wide">
            Follow Us
          </h4>
          <div className="flex space-x-3">
            {contact.socialMedia?.map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white hover:bg-red-600 transition-colors duration-300"
              >
                <img src={social.icon} alt={social.platform} className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-start md:col-span-1">
          <h4 className="text-white font-semibold mb-4 text-lg tracking-wide">
            Contact Us
          </h4>
          <p className="text-gray-400 text-sm leading-relaxed text-center md:text-left">
            {contact.offices?.map((office, idx) => (
              <span key={idx} className="block mb-2">
                {office.name}: {office.address}
              </span>
            ))}
            {contact.phones?.map((phone, idx) => (
              <span key={idx} className="block mt-1">{phone}</span>
            ))}
            {contact.emails?.map((email, idx) => (
              <a key={idx} href={`mailto:${email}`} className="hover:underline block mt-1">
                {email}
              </a>
            ))}
          </p>
        </div>

        {/* Tripadvisor-style Form */}
        <div className="flex flex-col items-center md:items-start md:col-span-1">
          <h4 className="text-white font-semibold mb-4 text-lg tracking-wide">
            Leave a Review
          </h4>
          <form className="flex flex-col space-y-2 w-full" onSubmit={handleSubmit}>
            <div className="flex gap-1">
              {[1,2,3,4,5].map((star) => (
                <FaStar
                  key={star}
                  size={20}
                  className={`cursor-pointer transition-colors ${star <= form.rating ? "text-yellow-400" : "text-gray-500"}`}
                  onClick={() => handleStarClick(star)}
                />
              ))}
            </div>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-red-500 transition-all"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-red-500 transition-all"
              required
            />
            <textarea
              name="message"
              placeholder="Write your review..."
              value={form.message}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none focus:border-red-500 transition-all"
              rows="3"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition-colors"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>

      <hr className="border-gray-700 my-8" />

      <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs md:text-sm space-y-2 md:space-y-0">
        <p>© 2025 NetLanka Tours. All rights reserved.</p>
        <p>Website Design & Development by NetIT Technology</p>
      </div>
    </footer>
  );
};

export default Footer;
