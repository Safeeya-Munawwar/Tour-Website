import React, { useEffect, useState } from "react";
import axios from "axios";
import Why from ".././components/Why";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { ArrowRight } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TestimonialForm from "../components/TestimonialForm";
import TestimonialsSection from "../components/TestimonialsSection";

const TailorMadeTours = () => {
  const [tourData, setTourData] = useState(null);
  const [showText, setShowText] = useState(false);
  const [step, setStep] = useState(1);
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    fullName: "",
    nationality: "",
    email: "",
    phone: "",
    pickupLoaction: "",
    dropLoaction: "",
    startDate: "",
    endDate: "",
    travelers: "",
  });

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/tailor-made-tours"
        );
        if (res.data) {
          setTourData(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch Tailor Made Tour data", err);
      }
    };

    fetchTour();
  }, []);

  useEffect(() => {
    setTimeout(() => setShowText(true), 200);
  }, []);

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!captchaChecked) {
        alert("Please confirm you are not a robot!");
        return;
      }
    }
    setStep(step + 1);
  };

  const handlePrev = () => setStep(step - 1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaChecked) {
      toast.error("Please verify captcha!");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/tailor-made-tours/inquiry",
        formData
      );
      toast.success("Your trip plan has been submitted!");
      setFormData({
        title: "",
        fullName: "",
        nationality: "",
        email: "",
        phone: "",
        pickupLoaction: "",
        dropLoaction: "",
        startDate: "",
        endDate: "",
        travelers: "",
      });
      setStep(1);
      setCaptchaChecked(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit your plan. Try again.");
    }
  };

  if (!tourData) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="font-poppins bg-white text-[#222]">
      <ToastContainer />
      {/* ---------------------------- HERO HEADER ---------------------------- */}
      <div
        className="w-full h-[360px] md:h-[560px] bg-cover bg-center relative flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('/images/tailor-made-tour-header.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>

        <div
          className={`absolute bottom-6 md:bottom-10 right-4 md:right-10 max-w-[90%] md:w-[480px] bg-black/80 text-white p-4 md:p-6 backdrop-blur-sm shadow-lg border-none flex items-center justify-end transition-all duration-700 ease-out ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-xl md:text-3xl leading-snug text-right mr-4">
            Experience Sri Lanka,
            <br />
            Exactly The Way You Imagine…
          </h2>
          <div className="w-[2px] bg-white h-10 md:h-12"></div>
        </div>
      </div>

      {/* ------------------------------ HERO SECTION ------------------------------ */}
      <section className="max-w-6xl mx-auto py-20 px-6 text-center space-y-6">
        <p className="text-sm md:text-lg font-semibold tracking-widest text-gray-500 mb-3">
          CUSTOMIZED HOLIDAYS CRAFTED JUST FOR YOU
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
          Tailor-Made Sri Lanka Tours & Holidays
        </h2>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
          {tourData?.description || "No description available."}
        </p>
        {/* Gold Accent Line */}
        <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-6"></div>
      </section>

      {/* ---------------------------- PLAN YOUR TRIP SECTION ---------------------------- */}
      <section className="max-w-7xl mx-auto px-5 md:px-20 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Side - Form */}
        <div className="lg:col-span-1 w-full">
          <div className="bg-blue-600 text-white rounded-t-xl px-6 py-5 mb-6">
            <h3 className="text-xl md:text-2xl font-bold text-center">
              Plan Your Trip
            </h3>
          </div>

          <p className="text-gray-500 mb-6 px-3 text-center text-sm md:text-base">
            Please note that your information is saved on our server as you
            enter it.
          </p>

          <div className="max-w-xl mx-auto px-3 md:px-5">
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <form className="space-y-4">
                <div className="flex justify-center space-x-3 mb-4 items-center">
                  {[1, 2, 3].map((n) => (
                    <span
                      key={n}
                      className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold"
                    >
                      {n}
                    </span>
                  ))}
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Title*
                  </label>
                  <select
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  >
                    <option value="">Select</option>
                    <option>Mr.</option>
                    <option>Mrs.</option>
                    <option>Miss</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Nationality*
                  </label>
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="Your nationality"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Email*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Phone*
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="+94 777 000 000"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={captchaChecked}
                    onChange={(e) => setCaptchaChecked(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <label className="text-gray-700 font-semibold">
                    I am not a robot
                  </label>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full bg-blue-500 text-white font-bold py-3 rounded-md hover:bg-[#283d9e] transition"
                >
                  Next
                </button>
              </form>
            )}

            {/* Step 2: Trip Details */}
            {step === 2 && (
              <form className="space-y-4">
                <h2 className="text-xl font-bold mb-4">
                  Step 2: Your Trip Details
                </h2>

                {/* Pickup Location */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Pickup Location*
                  </label>
                  <input
                    type="text"
                    name="pickupLocation"
                    value={formData.pickupLocation}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="Where should we pick you up?"
                  />
                </div>

                {/* Drop Location */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Drop Location*
                  </label>
                  <input
                    type="text"
                    name="dropLocation"
                    value={formData.dropLocation}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="Where should we drop you off?"
                  />
                </div>

                {/* Start + End Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                      Start Date*
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-1">
                      End Date*
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                </div>

                {/* Travelers */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                    Number of Travelers*
                  </label>
                  <input
                    type="number"
                    name="travelers"
                    value={formData.travelers}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                    placeholder="Number of travelers"
                  />
                </div>

                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="w-full bg-gray-300 text-gray-800 font-bold py-3 rounded-md hover:bg-gray-400 transition"
                  >
                    Previous
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full bg-blue-500 text-white font-bold py-3 rounded-md hover:bg-[#283d9e] transition"
                  >
                    Next
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Review & Submit */}
            {step === 3 && (
              <form className="space-y-4">
                <h2 className="text-xl font-bold mb-4">
                  Step 3: Review & Submit
                </h2>

                <div className="bg-gray-50 p-4 rounded-md space-y-2">
                  <p>
                    <strong>Title:</strong> {formData.title}
                  </p>
                  <p>
                    <strong>Full Name:</strong> {formData.fullName}
                  </p>
                  <p>
                    <strong>Nationality:</strong> {formData.nationality}
                  </p>
                  <p>
                    <strong>Email:</strong> {formData.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {formData.phone}
                  </p>
                  <p>
                    <strong>Pickup Location:</strong> {formData.pickupLocation}
                  </p>
                  <p>
                    <strong>Drop Location:</strong> {formData.dropLocation}
                  </p>

                  <p>
                    <strong>Travel Dates:</strong> {formData.startDate} to{" "}
                    {formData.endDate}
                  </p>

                  <p>
                    <strong>Number of Travelers:</strong> {formData.travelers}
                  </p>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="bg-blue-500 text-gray-800 font-bold py-3 px-6 rounded-md hover:bg-[#283d9e] transition-colors"
                  >
                    Previous
                  </button>

                  <button
                    onClick={handleSubmit}
                    className="bg-[#D4AF37] text-white font-bold py-3 px-6 rounded-md hover:bg-[#b9932b] transition-colors"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Right Side - Contact & Service Info */}
        <div className="lg:col-span-2 px-4 md:px-12 py-10 md:py-20">
          <h3 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            The Best Call You’ll Make Today
          </h3>

          <div className="flex flex-col sm:flex-row justify-center items-center text-center sm:text-left space-y-6 sm:space-y-0 sm:space-x-10 mb-6">
            {/* WhatsApp */}
            <div className="flex items-center space-x-2 text-green-600 text-xl font-semibold">
              <div className="bg-green-600 text-white rounded-full p-3">
                <FaWhatsapp className="w-5 h-5" />
              </div>
              <span>{tourData.whatsapp || "+94 777 000 000"}</span>
            </div>

            {/* Phone */}
            <div className="flex items-center space-x-2 text-blue-600 text-xl font-semibold">
              <div className="bg-blue-600 text-white rounded-full p-3">
                <FaPhoneAlt className="w-5 h-5" />
              </div>
              <span>{tourData.phone || "+94 777 000 000"}</span>
            </div>
          </div>

          <p className="text-gray-500 text-center text-base md:text-lg">
            We are here to support you 24 hours a day. If you’re travelling and
            need emergency assistance.
          </p>

          <div className="mt-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-10 text-center">
              How Our Service Works?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 place-items-center">
              {tourData?.howItWorks?.map((step, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center max-w-xs"
                >
                  <img
                    src={step.image || "/images/browse.PNG"}
                    alt={step.description}
                    className="w-20 h-20 mb-4"
                  />
                  <p className="text-gray-700 text-sm md:text-base">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------ WHY CHOOSE US ------------------------------ */}

      <div>
  <Why />
  <TestimonialForm />
  <TestimonialsSection />
</div>


      {/* ------------------------------ REVIEWS ------------------------------ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
        {/* Review Icons */}
        <div className="flex justify-center gap-4 sm:gap-6 mb-6 sm:mb-8 flex-wrap">
          {tourData?.gallery?.slice(0, 2).map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Review ${idx + 1}`}
              className="w-32 sm:w-56 h-auto"
            />
          ))}
        </div>

        {/* Main Text */}
        <p className="text-sm sm:text-base text-center text-gray-600 leading-relaxed">
          {tourData?.description || "No description available."}
        </p>

        {/* Expandable Content */}
        {showFull && (
          <div className="text-sm sm:text-base text-center text-gray-600 leading-relaxed mt-4 sm:mt-6 space-y-4">
            {tourData?.fullDescription?.map((item, idx) => (
              <p key={idx}>{item.description}</p>
            ))}
          </div>
        )}

        {/* Read More Button */}
        <div className="mt-3 sm:mt-4 flex justify-center pb-4 sm:pb-7">
          <span
            onClick={() => setShowFull(!showFull)}
            className="cursor-pointer text-blue-600 font-semibold flex items-center space-x-2 hover:underline"
          >
            <span>{showFull ? "SHOW LESS" : "READ MORE"}</span>
            {showFull ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        </div>
      </section>

      {/* ---------------------------- CUSTOM TOUR CTA ---------------------------- */}
      <section className="relative -mt-4 sm:-mt-8 lg:-mt-28">
        <div
          className="flex flex-col lg:flex-row items-center lg:items-stretch relative 
                  h-auto lg:h-[800px]"
        >
          {/* Left Side – Text */}
          <div
            className="w-full lg:w-1/2 flex flex-col justify-center items-center text-center 
                    px-4 sm:px-6 py-10 sm:py-14 lg:py-0 z-10 space-y-2 sm:space-y-4"
          >
            <h2 className="text-base sm:text-lg md:text-3xl font-semibold text-[#1a1a1a]">
              Looking for an
            </h2>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1a1a]">
              Exclusive Customized Tour?
            </h2>

            <h2 className="text-base sm:text-lg md:text-3xl font-semibold text-[#1a1a1a]">
              No Problem
            </h2>

            {/* CTA Button */}
            <div className="mt-4">
              <a
                href="/contact"
                className="
            bg-[#ce2a40] hover:bg-[#ef0530]
            text-white uppercase px-6 py-3 rounded-full font-semibold 
            flex items-center gap-2 text-sm shadow-lg transition-colors duration-300
            justify-center
          "
              >
                Connect with Us
                <ArrowRight className="w-4" />
              </a>
            </div>
          </div>

          {/* Right Side – Image */}
          <div className="w-full lg:w-1/2 lg:absolute lg:top-0 lg:right-0 lg:h-full">
            <img
              src="/images/sigiriya-art.PNG"
              alt="Sigiriya Art"
              className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default TailorMadeTours;
