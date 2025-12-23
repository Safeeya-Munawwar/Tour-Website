import React, { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";

export default function BookDayTour({ tourId, tourTitle, tourLocation }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    adults: 1,
    children: 0,
    members: 1,
    pickupLocation: "",
    startDate: "",
    startTime: "00:00",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [isError, setIsError] = useState(false);

  // Update members dynamically
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      members: Number(prev.adults) + Number(prev.children),
    }));
  }, [formData.adults, formData.children]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (Number(formData.adults) < 1) newErrors.adults = "At least 1 adult is required";
    if (Number(formData.children) < 0) newErrors.children = "Children cannot be negative";
    if (!formData.pickupLocation.trim()) newErrors.pickupLocation = "Pickup location is required";
    if (!formData.startDate) {
      newErrors.startDate = "Pickup date is required";
    } else {
      const today = new Date();
      const selected = new Date(formData.startDate);
      if (selected < today.setHours(0, 0, 0, 0)) newErrors.startDate = "Date cannot be in the past";
    }
    if (!formData.startTime) newErrors.startTime = "Pickup time is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMsg("");
    setIsError(false);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setResponseMsg("Please fix the errors above");
      setIsError(true);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const res = await axiosInstance.post("/day-tour-booking", {
        ...formData,
        tourId,
      });

      if (res.data.success) {
        setResponseMsg("Booking submitted successfully!");
        setIsError(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          adults: 1,
          children: 0,
          members: 1,
          pickupLocation: "",
          startDate: "",
          startTime: "",
          message: "",
        });
      } else {
        setResponseMsg("Failed to submit booking. Please try again.");
        setIsError(true);
      }
    } catch (err) {
      console.error(err);
      setResponseMsg("Server error. Please try again later.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 bg-white border border-[#2E5B84] rounded-2xl shadow-xl p-8 w-full max-w-[650px] mx-auto text-left">
      <h2 className="text-2xl font-bold text-center text-[#0B2545] mb-4">
        {tourTitle}
        <span className="block">{tourLocation} - Day Tour</span>
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="font-medium text-left mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-blue-500 outline-none`}
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="font-medium text-left mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-blue-500 outline-none`}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="font-medium text-left mb-1">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded border ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-blue-500 outline-none`}
          />
          {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
        </div>

        {/* Adults & Children */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="adults" className="font-medium mb-1">
              Adults <span className="text-red-500">*</span>
            </label>
            <input
              id="adults"
              type="number"
              name="adults"
              min="1"
              value={formData.adults}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded border ${
                errors.adults ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-500 outline-none`}
            />
            {errors.adults && <span className="text-red-500 text-sm">{errors.adults}</span>}
          </div>
          <div>
            <label htmlFor="children" className="font-medium mb-1">
              Children
            </label>
            <input
              id="children"
              type="number"
              name="children"
              min="0"
              value={formData.children}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded border ${
                errors.children ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-500 outline-none`}
            />
            {errors.children && <span className="text-red-500 text-sm">{errors.children}</span>}
          </div>
        </div>

        {/* Pickup Location */}
        <div>
          <label htmlFor="pickupLocation" className="font-medium mb-1">
            Pickup Location <span className="text-red-500">*</span>
          </label>
          <input
            id="pickupLocation"
            type="text"
            name="pickupLocation"
            placeholder="Enter Pickup Location"
            value={formData.pickupLocation}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded border ${
              errors.pickupLocation ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-blue-500 outline-none`}
          />
          {errors.pickupLocation && (
            <span className="text-red-500 text-sm">{errors.pickupLocation}</span>
          )}
        </div>

        {/* Start Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="font-medium mb-1">
              Pickup Date <span className="text-red-500">*</span>
            </label>
            <input
              id="startDate"
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded border ${
                errors.startDate ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-500 outline-none`}
            />
            {errors.startDate && <span className="text-red-500 text-sm">{errors.startDate}</span>}
          </div>
          <div>
            <label htmlFor="startTime" className="font-medium mb-1">
              Pickup Time <span className="text-red-500">*</span>
            </label>
            <input
  id="startTime"
  type="time"
  name="startTime"
  value={formData.startTime}
  onChange={handleChange}
  step="60"        // minutes
  className={`w-full px-4 py-3 rounded border ${
    errors.startTime ? "border-red-500" : "border-gray-300"
  } focus:ring-2 focus:ring-blue-500 outline-none`}
/>
            {errors.startTime && <span className="text-red-500 text-sm">{errors.startTime}</span>}
          </div>
        </div>

        {/* Additional Message */}
        <div>
          <label htmlFor="message" className="font-medium mb-1">
            Additional Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Additional Message / Requests"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none h-28"
          ></textarea>
        </div>

        <p className="text-gray-800 text-sm md:text-base mt-2 text-center font-medium bg-gray-100 p-2 rounded">
          Price is calculated per participant and includes taxes.
          <br />
          Final total is confirmed upon booking.
        </p>

        <button
          type="submit"
          disabled={loading}
          className="bg-[#0B2545] hover:bg-[#142D57] text-white font-semibold px-6 py-3 rounded transition-colors duration-200"
        >
          {loading ? "Submitting..." : "Book Tour"}
        </button>

        {responseMsg && (
          <p className={`mt-2 text-center font-medium ${isError ? "text-red-600" : "text-green-600"}`}>
            {responseMsg}
          </p>
        )}
      </form>
    </div>
  );
}
