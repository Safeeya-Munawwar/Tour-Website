import React, { useState } from "react";
import { axiosInstance } from "../lib/axios";

export default function BookDayTour({ tourId, tourTitle, tourLocation }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    members: 1,
    startDate: "",
    startTime: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg("");
    setIsError(false);

    try {
      const res = await axiosInstance.post("/day-tour-booking", {
        ...formData,
        tourId,
      }
      );

      if (res.data.success) {
        setResponseMsg("Booking submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          members: 1,
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
    <div className="flex flex-col gap-6 bg-white rounded-xl shadow-xl p-8 w-full max-w-[650px] mx-auto">
      {/* Title */}
      <h2 className="text-2xl font-bold text-center text-[#0B2545] mb-4">
        {tourTitle}
        <span className="block">{tourLocation} - Day Tour</span>
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="number"
            name="members"
            min="1"
            value={formData.members}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Tour Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Additional Message */}
        <textarea
          name="message"
          placeholder="Additional Message / Requests"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none h-28"
        ></textarea>

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

        {/* Response message below button */}
        {responseMsg && (
          <p
            className={`mt-2 text-center font-medium ${
              isError ? "text-red-600" : "text-green-600"
            }`}
          >
            {responseMsg}
          </p>
        )}
      </form>
    </div>
  );
}
