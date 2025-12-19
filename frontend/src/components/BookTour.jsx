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
    members: 1,
    startDate: "",
    startTime: "",
    message: "",
  });

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
        setRoundTours(
          Array.isArray(roundRes.data?.tours) ? roundRes.data.tours : []
        );
      } catch (err) {
        console.error("Fetch error:", err);
        setDayTours([]);
        setRoundTours([]);
      }
    };

    fetchTours();
  }, []);

  // ---------------- HANDLERS ----------------
  const handleTourSelect = (id) => {
    const list = tourType === "day" ? dayTours : roundTours;
    const tour = list.find((t) => t._id === id);
    setSelectedTour(tour || null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTour) {
      setIsError(true);
      setResponseMsg("Please select a tour.");
      return;
    }

    setLoading(true);
    setResponseMsg("");
    setIsError(false);

    try {
      await axiosInstance.post("/book-tour", {
        ...formData,
        tourId: selectedTour._id,
        tourType,
      });

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
    <div className="flex flex-col gap-6 bg-white rounded-xl shadow-xl p-8 w-full max-w-[650px] mx-auto">
      <h2 className="text-2xl font-bold text-center text-[#0B2545]">
        Book a Tour
      </h2>

      {/* TOUR TYPE */}
      <select
        value={tourType}
        onChange={(e) => {
          setTourType(e.target.value);
          setSelectedTour(null);
        }}
        className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
      >
        <option value="">Select Tour Type</option>
        <option value="day">Day Tour</option>
        <option value="round">Round Tour</option>
      </select>

      {/* TOUR LIST */}
      {tourType && (
        <select
          value={selectedTour?._id || ""}
          onChange={(e) => handleTourSelect(e.target.value)}
          className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">Select Tour</option>
          {(tourType === "day" ? dayTours : roundTours).map((tour) => (
            <option key={tour._id} value={tour._id}>
              {tour.title} – {tour.location}
            </option>
          ))}
        </select>
      )}

      {/* TOUR DETAILS */}
      {selectedTour && (
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-bold text-lg">{selectedTour.title}</h3>
          <p className="text-sm text-gray-700">
            <strong>Location:</strong> {selectedTour.location}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Days:</strong> {selectedTour.days || 1}
          </p>

          {tourType === "round" &&
            Array.isArray(selectedTour.itinerary) &&
            selectedTour.itinerary.length > 0 && (
              <div className="mt-2">
                <h4 className="font-semibold text-gray-800">Itinerary:</h4>
                <ul className="list-decimal list-inside text-sm">
                  {selectedTour.itinerary.map((item, i) => (
                    <li key={i} className="mb-1">
                      <strong>Day {selectedTour.day}:</strong>{" "}
                      {selectedTour.title} — {selectedTour.desc}
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {["name", "email", "phone"].map((field) => (
          <input
            key={field}
            type={field === "email" ? "email" : "text"}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        ))}

        <input
          type="number"
          name="members"
          min="1"
          value={formData.members}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
        />

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

        <textarea
          name="message"
          placeholder="Additional Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none h-28"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-[#0B2545] hover:bg-[#142D57] text-white font-semibold px-6 py-3 rounded transition"
        >
          {loading ? "Submitting..." : "Book Tour"}
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
    </div>
  );
}
