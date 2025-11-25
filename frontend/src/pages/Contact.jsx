import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaTripadvisor,
  FaGoogle,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Testimonials from "../../src/components/Testimonials.jsx";

const Contact = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowText(true), 200);
  }, []);

  return (
    <div className="font-poppins bg-white text-[#222]">
      {/* ---------------------------- HERO HEADER ---------------------------- */}
      <div
        className="w-full h-[360px] md:h-[560px] bg-cover bg-center relative flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/images/contact-header.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/20"></div>

        <div
          className={`absolute bottom-6 md:bottom-10 right-4 md:right-10 max-w-[90%] md:w-[280px] bg-black/80 text-white p-4 md:p-6 backdrop-blur-sm shadow-lg border-none flex items-center justify-end transition-all duration-700 ease-out ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-xl md:text-3xl leading-snug text-right mr-4">
            Contact Us <br />
            Anytime…
          </h2>
          <div className="w-[2px] bg-white h-10 md:h-12"></div>
        </div>
      </div>

      {/* --------------------- CONTACT HEADER --------------------- */}
      <section className="w-full py-12">
        {" "}
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm md:text-lg text-gray-600 tracking-widest font-semibold mb-3">
            CONTACT
          </p>

          <h2 className="text-center text-4xl md:text-5xl font-extrabold text-gray-900 mb-5">
            Get In Touch
          </h2>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            We’d love to hear from you! Reach out with any questions or travel
            dreams – our team is here to help you plan your perfect Sri Lankan
            adventure with ease and care.
          </p>

          <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-6"></div>
        </div>
      </section>

      {/* ------------------- CONTACT FORM ------------------- */}
      <section className="py-4 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* ---------------- LEFT SIDE ---------------- */}
        <div className="space-y-8">
          <div className="space-y-4 text-gray-700">
            {/* Address */}
            <div className="flex items-start gap-4">
              <FaMapMarkerAlt className="text-yellow-600 text-2xl" />
              <p>26/D/1 Galawila Rd, Homagama 10200</p>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <FaPhoneAlt className="text-yellow-600 text-2xl" />
              <p>+94 72 917 1089</p>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <FaEnvelope className="text-yellow-600 text-2xl" />
              <p>info@travelerschoicetoceylon.com</p>
            </div>

            {/* Time */}
            <div className="flex items-start gap-4">
              <FaClock className="text-yellow-600 text-2xl" />
              <p>06:00 - 20:00 (UTC+5:30)</p>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Social Media</h3>

            <div className="flex items-center gap-4 text-2xl">
              <a className="hover:text-yellow-600 transition" href="fb.com">
                <FaFacebookF />
              </a>
              <a className="hover:text-yellow-600 transition" href="insta.com">
                <FaInstagram />
              </a>
              <a className="hover:text-yellow-600 transition" href="tik.com">
                <FaTiktok />
              </a>
              <a className="hover:text-yellow-600 transition" href="trip.com">
                <FaTripadvisor />
              </a>
              <a className="hover:text-yellow-600 transition" href="google.com">
                <FaGoogle />
              </a>
            </div>
          </div>
        </div>

        {/* ---------------- RIGHT SIDE FORM ---------------- */}
        <div className="bg-white shadow-lg rounded-xl p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="First Name"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-yellow-600"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-yellow-600"
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-yellow-600"
          />

          <textarea
            placeholder="Message"
            rows="5"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:border-yellow-600"
          ></textarea>

          <button className="w-full bg-yellow-600 text-white py-3 rounded-lg font-semibold hover:bg-yellow-700 transition">
            Send Message
          </button>
        </div>
      </section>

      {/* ---------------- PREMIUM MAP SECTION ---------------- */}
      <section className="w-full mt-2 relative">
        <div className="absolute inset-0 z-10 pointer-events-none"></div>

        <iframe
          title="Kandy Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63384.34285333446!2d80.58610369004865!3d7.290573448031537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae316ed2643b631%3A0x5b7f02748d7e5d90!2sKandy%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1709110000000!5m2!1sen!2slk"
          width="100%"
          height="500"
          className="border-0 w-full relative z-0"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full z-20">
          <div className="w-8 h-8 bg-red-600 rounded-full border-2 border-yellow-500 shadow-lg flex items-center justify-center animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
            </svg>
          </div>
        </div>
      </section>


      <section className="max-w-7xl mx-auto mt-2 mb-8 ml-8 mr-8 p-8 lg:mt-4 lg:mb-16 lg:ml-16 lg:mr-16 flex flex-col lg:flex-row gap-12">
      <Testimonials />
      </section>
    </div>
  );
};

export default Contact;
