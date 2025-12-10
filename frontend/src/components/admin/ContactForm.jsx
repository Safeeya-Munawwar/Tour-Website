import React, { useState } from "react";
import {
  FaStar,
} from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactForm = ({ contact }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !email || !message) {
      toast.warning("Please fill in all required fields!");
      return;
    }

    const data = { firstName, lastName, email, rating, message };

    try {
      const res = await axios.post("http://localhost:5000/api/contact-form", data);
      if (res.data.success) {
        toast.success("Form submitted successfully!");

        // Reset fields
        setFirstName("");
        setLastName("");
        setEmail("");
        setRating(0);
        setMessage("");
      } else {
        toast.error("Failed to submit form");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error: could not submit form");
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First Name */}
        <div className="flex flex-col space-y-1">
          <label className="font-medium text-gray-700">First Name</label>
          <input
            type="text"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            required
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col space-y-1">
          <label className="font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col space-y-1">
          <label className="font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            required
          />
        </div>

        {/* Rating */}
        <div className="flex flex-col space-y-1">
          <label className="font-medium text-gray-700">Rate</label>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(null)}
                className="focus:outline-none"
              >
                <FaStar
                  size={24}
                  color={(hover || rating) >= star ? "#FFD700" : "#e4e5e9"}
                />
              </button>
            ))}
            <span className="ml-2 text-gray-600 font-medium">{rating} / 5</span>
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col space-y-1">
          <label className="font-medium text-gray-700">Your Message</label>
          <textarea
            rows="5"
            placeholder="Write your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold transition flex items-center gap-2 shadow-lg duration-300 justify-center"
        >
          Connect with Us
          <ArrowRight className="w-4" />
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
