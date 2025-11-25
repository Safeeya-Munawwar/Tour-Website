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
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const tripadvisorReviews = [
  {
    name: "Subramaniam M",
    time: "3 weeks ago",
    rating: 5,
    profile: null,
    message:
      "Wonderful trip with excellent service and great hotels arranged by Mr Damith. The guide was professional and caring and will return and book again! Thanks for Mr Sam as well.",
  },
  {
    name: "nisha M",
    time: "3 weeks ago",
    rating: 5,
    profile: null,
    message:
      "Excellent Service! Our Sri Lanka trip was truly wonderful! The tour guide provided very professional service, friendly, knowledgeable, and always attentive to every detail. He explained everything clearly and made sure we were comfortable throughout the journey. We are glad to meet Mr Damith and Mr Sam. All the hotels arranged were really good, and the overall experience exceeded our expectations. We’ll definitely return and book with this agent again!",
  },
  {
    name: "Pravina S",
    time: "3 weeks ago",
    rating: 5,
    profile: null,
    message:
      "Our Sri Lanka trip was an unforgettable experience, thanks to our amazing tour guide and the excellent service provided by Mr Damith throughout the journey and thank you to our driver Mr Sam. From the very beginning, everything was well organised and handled in a very professional manner. Our guide was extremely knowledgeable and took the time to explain every little detail...",
  },
  {
    name: "Karthiya Y",
    time: "3 weeks ago",
    rating: 5,
    profile: null,
    message:
      "Amazing Sri Lanka trip. Damith and Sam were absolute gems....so kind and caring. Truly memorable experience. Ayubowan 🇱🇰 We had an incredible tour in Sri Lanka, made even more special by our wonderful guide Damith and driver Sam. Both are genuine, kind hearted individuals who ensured we were comfortable and well looked after throughout the journey. Damith went above and beyond, capturing most of our beautiful memories...",
  },
  {
    name: "Gita A",
    time: "1 month ago",
    rating: 5,
    profile: null,
    message:
      "Damith & Sam — The Best You Could Ever Ask For ❤️🇱🇰 I don’t think we could have asked for a better tour guide and driver than Damith and Sam. From day one, they set the bar very high. Always punctual, always prepared, and always smiling, their professionalism and dedication truly amazed us. They didn’t just take us from place to place...",
  },
];

const Contact = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowText(true), 200);
  }, []);

  return (
    <div className="font-poppins bg-white text-[#222]">
      {/* ---------------------------- HERO HEADER ---------------------------- */}
      <div
        className="w-full h-[400px] md:h-[560px] bg-cover bg-center relative flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/images/contact-header.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/30"></div>

        <div
          className={`absolute bottom-10 right-10 w-[280px] bg-black/80 text-white p-6 backdrop-blur-sm shadow-lg border-none flex items-center justify-end transition-all duration-700 ease-out ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-2xl md:text-3xl leading-snug text-right mr-4">
            Contact Us <br />
            Anytime…
          </h2>
          <div className="w-[2px] bg-white h-12"></div>
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
        {/* Left Side */}
        <div className="lg:w-1/3 flex flex-col items-center text-center space-y-6 justify-center">
          <p className="text-sm md:text-base text-gray-500 uppercase tracking-wider font-semibold">
            EXCELLENT
          </p>
          <h2 className="text-3xl font-bold">Tripadvisor</h2>
          <p className="text-gray-700">
            Based on <span className="font-bold">271</span> reviews, travelers
            loved our tours in Sri Lanka. Read what they shared about their
            experiences.
          </p>

          {/* Tripadvisor Image */}
          <div className="mt-4">
            <img
              src="/tripadvisor.PNG"
              alt="Tripadvisor"
              className="w-40 h-auto object-contain -ml-1"
            />
          </div>

          {/* Tripadvisor Green Circle + Text */}
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center gap-2 -ml-6">
              {/* Green Circle Icon */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#2AC18C" }}
              >
                <FaTripadvisor className="text-black w-4 h-4" />
              </div>

              {/* Text */}
              <p className="text-black font-bold text-xl">Tripadvisor</p>
            </div>
          </div>
        </div>

        {/* Right Side - Swiper Carousel */}
        <div className="lg:w-2/3 relative">
          <Swiper
            spaceBetween={20}
            slidesPerView={3}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            modules={[Autoplay, Pagination, Navigation]}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 10 },
              640: { slidesPerView: 2, spaceBetween: 15 },
              1024: { slidesPerView: 3, spaceBetween: 20 },
            }}
          >
            {tripadvisorReviews.map((review, idx) => (
              <SwiperSlide key={idx}>
                <div className="relative bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center text-center space-y-4">
                  {/* Tripadvisor Green Circle Icon Top-Right */}
                  <div
                    className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#2AC18C" }}
                  >
                    <FaTripadvisor className="text-black w-4 h-4" />
                  </div>

                  {/* Profile Circle */}
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold text-xl overflow-hidden">
                    {review.profile ? (
                      <img
                        src={review.profile}
                        alt={review.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      review.name.charAt(0).toUpperCase()
                    )}
                  </div>

                  {/* Name & Time */}
                  <h3 className="font-semibold text-lg">{review.name}</h3>
                  <p className="text-sm text-gray-400">{review.time}</p>

                  {/* Tripadvisor Rating Image */}
                  <div className="flex justify-center mt-2">
                    <img
                      src="/tripadvisor.PNG"
                      alt="Tripadvisor rating"
                      className="w-20 h-auto object-contain"
                    />
                  </div>

                  {/* Message */}
                  <p className="text-gray-700 mt-2">
                    {review.message.length > 150
                      ? review.message.slice(0, 150) + "..."
                      : review.message}
                  </p>
                </div>
              </SwiperSlide>
            ))}

            {/* Custom Navigation Buttons */}
            <div className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-200 rounded-full text-black cursor-pointer">
              <FaArrowLeft />
            </div>
            <div className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-gray-200 rounded-full text-black cursor-pointer">
              <FaArrowRight />
            </div>
          </Swiper>
        </div>
      </section>
    </div>
  );
};

export default Contact;
