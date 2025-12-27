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
    startTime: "00:00",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [isError, setIsError] = useState(false);

  /* ---------------- FETCH TOURS ---------------- */
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const [dayRes, roundRes] = await Promise.all([
          axiosInstance.get("/day-tours"),
          axiosInstance.get("/round-tours"),
        ]);

        setDayTours(dayRes.data?.tours || []);
        setRoundTours(roundRes.data?.tours || []);
      } catch (err) {
        console.error("Error fetching tours:", err);
      }
    };
    fetchTours();
  }, []);

  const handleTourSelect = (id) => {
    const list = tourType === "day" ? dayTours : roundTours;
    setSelectedTour(list.find((t) => t._id === id) || null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    const err = {};
    if (!tourType) err.tourType = "Please select a tour type";
    if (!selectedTour) err.selectedTour = "Please select a tour";
    if (!formData.name.trim()) err.name = "Full name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      err.email = "Valid email address required";
    if (!formData.phone.trim()) err.phone = "Contact number is required";
    if (!formData.pickupLocation.trim())
      err.pickupLocation = "Pickup location is required";
    if (!formData.startDate) err.startDate = "Pickup date is required";
    if (!formData.startTime) err.startTime = "Pickup time is required";
    if (formData.adults < 1) err.adults = "Minimum 1 adult required";
    if (formData.children < 0) err.children = "Invalid number";

    return err;
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setResponseMsg("");

    const err = validate();
    if (Object.keys(err).length) {
      setErrors(err);
      setIsError(true);
      setResponseMsg("Please correct the highlighted fields.");
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.post("/book-tour", {
        ...formData,
        tourType,
        tourId: selectedTour._id,
      });

      setIsError(false);
      setResponseMsg("Tour booking request sent successfully!");
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
    } catch {
      setIsError(true);
      setResponseMsg("Submission failed. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <section
      aria-labelledby="book-tour-heading"
      className="bg-white border border-[#2E5B84] rounded-2xl shadow-xl p-8 max-w-[650px] mx-auto"
    >
      <h2
        id="book-tour-heading"
        className="text-3xl md:text-4xl font-extrabold text-center text-[#0B2545]"
      >
        Book Your Sri Lanka Tour
      </h2>

      <p className="text-center text-gray-600 mt-2">
        Plan your perfect Sri Lankan adventure with us
      </p>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-5 mt-6"
      >
        {/* TOUR TYPE */}
        <label className="font-medium">
          Tour Type *
          <select
            value={tourType}
            onChange={(e) => {
              setTourType(e.target.value);
              setSelectedTour(null);
            }}
            aria-required="true"
            className="mt-1 w-full px-4 py-3 border rounded focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Tour Type</option>
            <option value="day">Day Tour</option>
            <option value="round">Round Tour</option>
          </select>
        </label>

        {/* TOUR */}
        {tourType && (
          <label className="font-medium">
            Select Tour *
            <select
              value={selectedTour?._id || ""}
              onChange={(e) => handleTourSelect(e.target.value)}
              className="mt-1 w-full px-4 py-3 border rounded"
            >
              <option value="">Choose a tour</option>
              {(tourType === "day" ? dayTours : roundTours).map((t) => (
                <option key={t._id} value={t._id}>
                  {t.title} – {t.location}
                </option>
              ))}
            </select>
          </label>
        )}

        {/* BASIC INFO */}
        {["name", "email", "phone"].map((field) => (
          <label key={field} className="font-medium">
            {field.charAt(0).toUpperCase() + field.slice(1)} *
            <input
              type={field === "email" ? "email" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-3 border rounded"
              aria-invalid={!!errors[field]}
            />
          </label>
        ))}

        {/* TRAVELERS */}
        <div className="flex gap-4">
          <label className="flex-1 font-medium">
            Adults *
            <input
              type="number"
              min="1"
              name="adults"
              value={formData.adults}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-3 border rounded"
            />
          </label>

          <label className="flex-1 font-medium">
            Children
            <input
              type="number"
              min="0"
              name="children"
              value={formData.children}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-3 border rounded"
            />
          </label>
        </div>

        {/* PICKUP */}
        <label className="font-medium">
          Pickup Location *
          <input
            type="text"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-3 border rounded"
          />
        </label>

        {/* DATE & TIME */}
        <div className="flex gap-4">
          <label className="flex-1 font-medium">
            Pickup Date *
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-3 border rounded"
            />
          </label>

          <label className="flex-1 font-medium">
            Pickup Time *
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="mt-1 w-full px-4 py-3 border rounded"
            />
          </label>
        </div>

        {/* MESSAGE */}
        <label className="font-medium">
          Additional Message
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="mt-1 w-full px-4 py-3 border rounded resize-none"
          />
        </label>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="bg-[#0B2545] hover:bg-[#142D57] text-white font-semibold py-3 rounded transition"
        >
          {loading ? "Submitting..." : "Book Tour Now"}
        </button>

        {responseMsg && (
          <p
            className={`text-center font-medium ${
              isError ? "text-red-600" : "text-green-600"
            }`}
          >
            {responseMsg}
          </p>
        )}
      </form>
    </section>
  );
}
