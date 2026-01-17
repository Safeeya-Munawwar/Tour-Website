import React, { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";

export default function BookTour() {
  const [tourType, setTourType] = useState("");
  const [dayTours, setDayTours] = useState([]);
  const [roundTours, setRoundTours] = useState([]);
  const [taxis, setTaxis] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [selectedTaxi, setSelectedTaxi] = useState("");

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

  const [, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [isError, setIsError] = useState(false);

  const [whatsappNumber, setWhatsappNumber] = useState("94771234567");

  // ---------------- FETCH TOURS ----------------
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

  // ---------------- FETCH TAXIS ----------------
  useEffect(() => {
    const fetchTaxis = async () => {
      try {
        const res = await axiosInstance.get("/quick-taxi/taxis"); // correct endpoint
        if (res.data.success) setTaxis(res.data.taxis); // check response
      } catch (err) {
        console.error("Error fetching taxis:", err);
      }
    };
    fetchTaxis();
  }, []);

  // ---------------- FETCH WHATSAPP NUMBER ----------------
  useEffect(() => {
    axiosInstance
      .get("/contact")
      .then((res) => {
        const p = res.data?.whatsapp || res.data?.phone;
        if (p) setWhatsappNumber(p.replace(/\D/g, ""));
      })
      .catch(() => {});
  }, []);

  const handleTourSelect = (id) => {
    const list = tourType === "day" ? dayTours : roundTours;
    setSelectedTour(list.find((t) => t._id === id) || null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ---------------- VALIDATION ----------------
  const validate = () => {
    const err = {};
    if (!tourType) err.tourType = "Select tour type";
    if (!selectedTour) err.selectedTour = "Select a tour";
    if (!selectedTaxi) err.selectedTaxi = "Select a vehicle";
    if (!formData.name.trim()) err.name = "Name required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      err.email = "Valid email required";
    if (!formData.phone.trim()) err.phone = "Phone required";
    if (!formData.pickupLocation.trim())
      err.pickupLocation = "Pickup location required";
    if (!formData.startDate) err.startDate = "Date required";
    if (!formData.startTime) err.startTime = "Time required";
    if (formData.adults < 1) err.adults = "Min 1 adult";
    if (formData.children < 0) err.children = "Invalid number";
    return err;
  };

  // ---------------- SUBMIT TO BACKEND ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setResponseMsg("");

    const err = validate();
    if (Object.keys(err).length) {
      setErrors(err);
      setIsError(true);
      setResponseMsg("Please correct the errors.");
      return;
    }

    try {
      setLoading(true);

      await axiosInstance.post("/book-tour", {
        ...formData,
        tourType,
        tourId: selectedTour._id,
        tourRef: tourType === "day" ? "DayTour" : "RoundTour",
        taxiId: selectedTaxi,
        taxi: taxis.find((t) => t._id === selectedTaxi)?.name || "", // ✅ save taxi name too
        startDate: new Date(formData.startDate),
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
      setSelectedTaxi("");
    } catch (err) {
      console.error("BOOK TOUR ERROR:", err.response?.data || err);
      setIsError(true);
      setResponseMsg(err.response?.data?.error || "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- WHATSAPP BOOKING ----------------
  const sendBookingViaWhatsApp = () => {
    const err = validate();
    if (Object.keys(err).length) {
      setErrors(err);
      setIsError(true);
      setResponseMsg("Fix errors before WhatsApp booking");
      return;
    }

    const taxi = taxis.find((t) => t._id === selectedTaxi);

    const message = `
* Net Lanka Travels - Tour Booking *

*Tour Type:* ${tourType === "day" ? "Day Tour" : "Round Tour"}
*Tour:* ${selectedTour.title}
*Location:* ${selectedTour.location}
*Vehicle:* ${taxi?.name || "-"}

*Customer Details*
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}

*Participants*
- Adults: ${formData.adults}
- Children: ${formData.children}

*Pickup Details*
- Location: ${formData.pickupLocation}
- Date: ${formData.startDate}
- Time: ${formData.startTime}

*Message*
${formData.message || "-"}

Please confirm availability.

Thank you,
Net Lanka Travel
    `;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <section className="bg-white border border-[#2E5B84] rounded-2xl shadow-xl p-8 max-w-[650px] mx-auto">
      <h2 className="text-center text-2xl md:text-3xl font-extrabold text-[#0B2545]">
        Book Your Sri Lanka Tour
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-6">
        {/* TOUR TYPE */}
        <div className="flex flex-col gap-1">
          <label className="font-medium text-[#0B2545] text-left">
            Tour Type <span className="text-red-500">*</span>
          </label>
          <select
            value={tourType}
            onChange={(e) => {
              setTourType(e.target.value);
              setSelectedTour(null);
            }}
            className="px-4 py-3 border rounded"
          >
            <option value="">Select Tour Type</option>
            <option value="day">Day Tour</option>
            <option value="round">Round Tour</option>
          </select>
        </div>

        {/* TOUR LIST */}
        {tourType && (
          <div className="flex flex-col gap-1">
            <label className="font-medium text-[#0B2545] text-left">
              Select Tour <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedTour?._id || ""}
              onChange={(e) => handleTourSelect(e.target.value)}
              className="px-4 py-3 border rounded"
            >
              <option value="">Select Tour</option>
              {(tourType === "day" ? dayTours : roundTours).map((t) => (
                <option key={t._id} value={t._id}>
                  {t.title} – {t.location}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* TAXI LIST */}
        {taxis.length > 0 && (
          <div className="flex flex-col gap-1">
            <label className="font-medium text-[#0B2545] text-left">
              Select Vehicle <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedTaxi}
              onChange={(e) => setSelectedTaxi(e.target.value)}
              className="px-4 py-3 border rounded"
            >
              <option value="">Select Vehicle</option>
              {taxis.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.name} – Seats: {t.seats} - {t.ac ? "AC" : "Non-AC"}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* TEXT INPUTS */}
        {[
          { key: "name", label: "Full Name", required: true },
          { key: "email", label: "Email Address", required: true },
          { key: "phone", label: "Phone Number", required: true },
          { key: "pickupLocation", label: "Pickup Location", required: true },
        ].map(({ key, label, required }) => (
          <div key={key} className="flex flex-col gap-1">
            <label className="font-medium text-[#0B2545] text-left">
              {label} {required && <span className="text-red-500">*</span>}
            </label>
            <input
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="px-4 py-3 border rounded"
            />
          </div>
        ))}

        {/* PARTICIPANTS */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-1 w-full">
            <label className="font-medium text-[#0B2545] text-left">
              Adults <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="1"
              name="adults"
              value={formData.adults}
              onChange={handleChange}
              className="px-4 py-3 border rounded w-full"
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="font-medium text-[#0B2545] text-left">
              Children
            </label>
            <input
              type="number"
              min="0"
              name="children"
              value={formData.children}
              onChange={handleChange}
              className="px-4 py-3 border rounded w-full"
            />
          </div>
        </div>

        {/* DATE & TIME */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col gap-1 w-full">
            <label className="font-medium text-[#0B2545] text-left">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="px-4 py-3 border rounded w-full"
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <label className="font-medium text-[#0B2545] text-left">
              Start Time <span className="text-red-500">*</span>
            </label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="px-4 py-3 border rounded w-full"
            />
          </div>
        </div>

        {/* MESSAGE */}
        <div className="flex flex-col gap-1">
          <label className="font-medium text-[#0B2545] text-left">
            Additional Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="3"
            className="px-4 py-3 border rounded"
          />
        </div>

        {/* BUTTONS */}
        <button
          type="submit"
          disabled={loading}
          className="bg-[#0B2545] text-white py-3 rounded font-semibold"
        >
          {loading ? "Submitting..." : "Book Tour Now"}
        </button>

        <button
          type="button"
          onClick={sendBookingViaWhatsApp}
          className="bg-green-500 hover:bg-green-600 text-white py-3 rounded font-semibold"
        >
          Book via WhatsApp
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
