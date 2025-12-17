import React, { useEffect, useState } from "react";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaStar,
} from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Footer() {
  const [contact, setContact] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/contact")
      .then((res) => res.json())
      .then((data) => setContact(data))
      .catch((err) => console.log(err));
  }, []);

  const submitReview = async (e) => {
    e.preventDefault();

    if (!name || !email || !message || rating === 0) {
      toast.warning("Please fill all fields including rating!", {
        theme: "colored",
      });
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/reviews", {
        name,
        email,
        rating,
        message,
      });

      if (res.data.success) {
        toast.success("Review submitted!", { theme: "colored" });

        // Reset form
        setName("");
        setEmail("");
        setMessage("");
        setRating(0);
      } else {
        toast.error("Submission failed", { theme: "colored" });
      }
    } catch (err) {
      console.log(err);
      toast.error("Server error", { theme: "colored" });
    }
  };

  return (
    <footer className="bg-header-gradient text-white pt-20 pb-10 font-[Poppins] relative z-0">
      {/* MAIN GRID */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-14">
        {/* 1) LOGO + DESCRIPTION */}
        <div>
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-40 mb-5 opacity-95"
          />
          <p className="text-gray-200 text-[15px] leading-relaxed pr-6">
            NetLanka Tours is your trusted travel partner in Sri Lanka, offering
            tailor-made tours, day tours, adventures and premium travel
            experiences.
          </p>
          <div className="flex gap-4 mt-7">
            {contact?.socialMedia?.map((sm, i) => (
              <a key={i} href={sm.url}>
                <img
                  src={sm.icon}
                  alt="social"
                  className="w-8 h-8 hover:scale-110"
                />
              </a>
            ))}
          </div>
        </div>

        {/* 2) CONTACT INFO */}
<div>
  <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
  <div className="space-y-5">
    {/* Phone */}
    {contact?.phone && (
      <div className="flex gap-3">
        <FaPhoneAlt className="mt-1" />
        <a href={`tel:${contact.phone}`} className="hover:text-blue-300">
          {contact.phone}
        </a>
      </div>
    )}

    {/* WhatsApp */}
    {contact?.whatsapp && (
      <div className="flex gap-3">
        <FaWhatsapp className="mt-1" />
        <a
          href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-400"
        >
          {contact.whatsapp}
        </a>
      </div>
    )}

    {/* Emails */}
    {contact?.emails?.[0] && (
  <div className="flex gap-3">
    <FaEnvelope className="mt-1" />
    <a
      href={`mailto:${contact.emails[0]}`}
      className="hover:text-blue-400"
    >
      {contact.emails[0]}
    </a>
  </div>
)}

    {/* Offices */}
    {contact?.offices?.map((o, i) => (
      <div key={i} className="flex gap-3">
        <FaMapMarkerAlt className="mt-1" />
        <div>
          <p className="font-medium">{o.name}</p>
          <p className="text-gray-300">{o.address}</p>
        </div>
      </div>
    ))}

    {/* Working Hours */}
    <div className="flex gap-3">
      <FaClock className="mt-1" />
      <span>
        {contact?.workingHours?.start} - {contact?.workingHours?.end}
      </span>
    </div>
  </div>
</div>


        {/* 3) QUICK LINKS */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
          <ul className="space-y-3 text-gray-200">
            {[
              "Home",
              "Tailor-Made Tours",
              "Destinations",
              "Tours",
              "Our Story",
              "Blogs",
              "Experiences",
              "Contact Us",
            ].map((item, i) => (
              <li key={i} className="hover:text-white cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* 4) REVIEW FORM */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Leave a Review</h3>
          <form className="space-y-4" onSubmit={submitReview}>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* Rating */}
            <div className="flex gap-2 text-2xl">
              {[1, 2, 3, 4, 5].map((n) => (
                <FaStar
                  key={n}
                  onClick={() => setRating(n)}
                  className={`cursor-pointer ${
                    n <= rating ? "text-yellow-400" : "text-gray-500"
                  }`}
                />
              ))}
            </div>
            <textarea
              rows="4"
              placeholder="Write your review..."
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button className="w-full py-3 bg-white text-black rounded-full font-semibold">
              Submit Review
            </button>
          </form>
        </div>
      </div>

      <hr className="border-gray-900 my-8" />

      <div className="max-w-[1400px] mx-auto px-6 text-black font-semibold text-xs md:text-sm flex flex-col sm:flex-row justify-between gap-2">
        <p>© {new Date().getFullYear()} NetLanka Tours. All rights reserved.</p>
        <p>Website Design & Development by NetIT Technology</p>
      </div>
    </footer>
  );
}
