import React, { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";

export default function BookTour() {
  const [tourType, setTourType] = useState("");
  const [dayTours, setDayTours] = useState([]);
  const [roundTours, setRoundTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    adults: 1,
    children: 0,
    pickupLocation: "",
    startDate: "",
    startTime: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [isError, setIsError] = useState(false);

  // ---------------- FETCH TOURS ----------------
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const dayRes = await axiosInstance.get("/day-tours");
        setDayTours(Array.isArray(dayRes.data?.tours) ? dayRes.data.tours : []);

        const roundRes = await axiosInstance.get("/round-tours");
        setRoundTours(Array.isArray(roundRes.data?.tours) ? roundRes.data.tours : []);
      } catch (err) {
        console.error("Fetch error:", err);
        setDayTours([]);
        setRoundTours([]);
      }
    };
    fetchTours();
  }, []);

  const handleTourSelect = (id) => {
    const list = tourType === "day" ? dayTours : roundTours;
    const tour = list.find((t) => t._id === id);
    setSelectedTour(tour || null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ---------------- VALIDATION ----------------
  const validate = () => {
    const newErrors = {};

    if (!tourType) newErrors.tourType = "Please select a tour type";
    if (!selectedTour) newErrors.selectedTour = "Please select a tour";
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.pickupLocation.trim()) newErrors.pickupLocation = "Pickup location is required";

    if (!formData.startDate) {
      newErrors.startDate = "Pickup date is required";
    } else {
      const today = new Date();
      const selected = new Date(formData.startDate);
      if (selected < today.setHours(0, 0, 0, 0)) {
        newErrors.startDate = "Date cannot be in the past";
      }
    }

    if (!formData.startTime) newErrors.startTime = "Pickup time is required";

    if (Number(formData.adults) < 1) newErrors.adults = "At least 1 adult is required";
    if (Number(formData.children) < 0) newErrors.children = "Children cannot be negative";

    return newErrors;
  };

  // ---------------- SUBMIT ----------------
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
      await axiosInstance.post("/book-tour", {
        ...formData,
        tourId: selectedTour._id,
        tourType,
      });

      setResponseMsg("Booking submitted successfully!");
      setIsError(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        adults: 1,
        children: 0,
        pickupLocation: "",
        startDate: "",
        startTime: "",
        message: "",
      });
      setSelectedTour(null);
      setTourType("");
    } catch (err) {
      console.error(err);
      setIsError(true);
      setResponseMsg("Failed to submit booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="flex flex-col gap-6 bg-white border border-[#2E5B84] rounded-2xl shadow-xl p-8 w-full max-w-[650px] mx-auto text-left">
      <h2 className="text-4xl font-bold text-center text-[#0B2545]">Book a Tour</h2>

      {/* TOUR TYPE */}
      <div className="flex flex-col">
        <label className="mb-1 font-medium">Tour Type <span className="text-red-500">*</span></label> 
        <select
          value={tourType}
          onChange={(e) => {
            setTourType(e.target.value);
            setSelectedTour(null);
          }}
          className={`w-full px-4 py-3 rounded border ${
            errors.tourType ? "border-red-500" : "border-gray-300"
          } focus:ring-2 focus:ring-blue-500 outline-none`}
        >
          <option value="">Select Tour Type </option>
          <option value="day">Day Tour</option>
          <option value="round">Round Tour</option>
        </select>
        {errors.tourType && <span className="text-red-500 text-sm">{errors.tourType}</span>}
      </div>

      {/* TOUR LIST */}
      {tourType && (
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Select Tour <span className="text-red-500">*</span></label>
          <select
            value={selectedTour?._id || ""}
            onChange={(e) => handleTourSelect(e.target.value)}
            className={`w-full px-4 py-3 rounded border ${
              errors.selectedTour ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-blue-500 outline-none`}
          >
            <option value="">Select Tour</option>
            {(tourType === "day" ? dayTours : roundTours).map((tour) => (
              <option key={tour._id} value={tour._id}>
                {tour.title} – {tour.location}
              </option>
            ))}
          </select>
          {errors.selectedTour && <span className="text-red-500 text-sm">{errors.selectedTour}</span>}
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        {["name", "email", "phone"].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="mb-1 font-medium">{field.charAt(0).toUpperCase() + field.slice(1)} <span className="text-red-500">*</span></label>
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded border ${
                errors[field] ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-500 outline-none`}
            />
            {errors[field] && <span className="text-red-500 text-sm">{errors[field]}</span>}
          </div>
        ))}

        {/* Number of Travellers */}
        <div className="flex gap-4">
          <div className="flex-1 flex flex-col">
            <label className="mb-1 font-medium">Adults <span className="text-red-500">*</span></label>
            <input
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
          <div className="flex-1 flex flex-col">
            <label className="mb-1 font-medium">Children</label>
            <input
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
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Pickup Location <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="pickupLocation"
            placeholder="Enter pickup location"
            value={formData.pickupLocation}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded border ${
              errors.pickupLocation ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-blue-500 outline-none`}
          />
          {errors.pickupLocation && <span className="text-red-500 text-sm">{errors.pickupLocation}</span>}
        </div>

        {/* Date & Time */}
        <div className="flex gap-4">
          <div className="flex-1 flex flex-col">
            <label className="mb-1 font-medium">Pickup Date <span className="text-red-500">*</span></label>
            <input
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
          <div className="flex-1 flex flex-col">
            <label className="mb-1 font-medium">Pickup Time <span className="text-red-500">*</span></label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded border ${
                errors.startTime ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-500 outline-none`}
            />
            {errors.startTime && <span className="text-red-500 text-sm">{errors.startTime}</span>}
          </div>
        </div>

        {/* Additional Message */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium">Additional Message</label>
          <textarea
            name="message"
            placeholder="Additional Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none h-28"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-[#0B2545] hover:bg-[#142D57] text-white font-semibold px-6 py-3 rounded transition"
        >
          {loading ? "Submitting..." : "Book Tour"}
        </button>

        {responseMsg && (
          <p className={`text-center font-medium ${isError ? "text-red-600" : "text-green-600"}`}>
            {responseMsg}
          </p>
        )}
      </form>
    </div>
  );
}
