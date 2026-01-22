import React, { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import {
  FaMoneyBillWave,
  FaStar,
  FaHotel,
  FaUsers,
  FaHeart,
  FaTaxi,
  FaRoute,
  FaCar,
  FaPlane,
} from "react-icons/fa";

export default function BookTour() {
  const [tourType, setTourType] = useState("");
  const [dayTours, setDayTours] = useState([]);
  const [roundTours, setRoundTours] = useState([]);
  const [taxis, setTaxis] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [selectedTaxi, setSelectedTaxi] = useState("");
  const [errors, setErrors] = useState({});

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
    travelStyle: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [isError, setIsError] = useState(false);

  const [whatsappNumber, setWhatsappNumber] = useState("94771234567");
  const [showTravelStyleModal, setShowTravelStyleModal] = useState(false);

  const travelStyles = [
    {
      title: "Budget Tour",
      tooltip:
        "Transportation & private guide (optional - accommodation & chauffeur guide). ",
      icon: <FaMoneyBillWave className="text-blue-500" />,
    },
    {
      title: "Premium Tour",
      tooltip:
        "Transportation with private guide and driver, 4 Star accommodation.",
      icon: <FaStar className="text-yellow-500" />,
    },
    {
      title: "Luxury Tour",
      tooltip:
        "Transportation with private guide and driver, 4 Star or 5 Star accommodation.",
      icon: <FaHotel className="text-purple-500" />,
    },
    {
      title: "Family Tour",
      tooltip:
        "Fun travel experiences suitable for the whole family (optional - chauffeur guide).",
      icon: <FaUsers className="text-green-600" />,
    },
    {
      title: "Honeymoon Tour",
      tooltip:
        "Romantic trips specially designed for couples (optional - chauffeur guide).",
      icon: <FaHeart className="text-pink-600" />,
    },
    {
      title: "Transportation Only",
      tooltip: "Only transportation is provided with English-speaking driver.",
      icon: <FaTaxi className="text-gray-700" />,
    },
    {
      title: "Transport Only with Chauffeur Guide",
      tooltip: "Only transportation is provided with a chauffeur guide.",
      icon: <FaCar className="text-gray-700" />,
    },
    {
      title: "Join a Group Tour",
      tooltip: "Travel with other tourists in a group.",
      icon: <FaUsers className="text-pink-500" />,
    },
    {
      title: "Self-Organized",
      tooltip: "Plan and manage the trip entirely yourself.",
      icon: <FaRoute className="text-orange-500" />,
    },
    {
      title: "Private Tour, Permanent Guide",
      tooltip: "A guide will accompany you throughout your tour.",
      icon: <FaUsers className="text-green-500" />,
    },
    {
      title: "Organized Hotels/Transfer, No Guide",
      tooltip: "Hotels and transfers are arranged, but no guide included.",
      icon: <FaPlane className="text-indigo-500" />,
    },
  ];

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
    if (!formData.travelStyle) err.travelStyle = "Select a travel style";
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
        travelStyle: "",
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
*Travel Style:* ${formData.travelStyle || "-"}
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

        {/* ---------------- Travel Style ---------------- */}
        <div>
          <label className="font-medium mb-1 block">
            Travel Style <span className="text-red-500">*</span>
          </label>

          <button
            type="button"
            onClick={() => setShowTravelStyleModal(true)}
            className={`w-full flex items-center justify-start gap-2 px-4 py-3 border rounded ${
              errors.travelStyle ? "border-red-500" : "border-gray-300"
            } bg-white text-gray-800 hover:bg-gray-100 transition font-semibold focus:ring-2 focus:ring-blue-500 outline-none`}
          >
            {formData.travelStyle || "Select Travel Style"}
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {errors.travelStyle && (
            <span className="text-red-500 text-sm mt-1 block">
              {errors.travelStyle}
            </span>
          )}

          <div className="mt-2 text-gray-500 text-sm">
            {formData.travelStyle
              ? travelStyles.find((s) => s.title === formData.travelStyle)
                  ?.tooltip
              : "No travel style selected"}
          </div>
        </div>

        {/* ---------------- Travel Style Modal ---------------- */}
        {showTravelStyleModal && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[20000] flex items-center justify-center p-4"
            onClick={(e) =>
              e.target === e.currentTarget && setShowTravelStyleModal(false)
            }
          >
            <div className="w-full max-w-[800px] h-[90vh] bg-white shadow-2xl flex flex-col overflow-hidden rounded-2xl relative p-6">
              <h3 className="text-xl font-bold mb-4">Select Travel Style</h3>

              <div className="flex flex-col gap-3 overflow-y-auto">
                {travelStyles.map((style) => (
                  <label
                    key={style.title}
                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{style.icon}</span>
                      <div>
                        <p className="font-semibold">{style.title}</p>
                        <p className="text-gray-500 text-sm">{style.tooltip}</p>
                      </div>
                    </div>

                    <input
                      type="radio"
                      name="travelStyle"
                      checked={formData.travelStyle === style.title}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          travelStyle: style.title,
                        }))
                      }
                      className="w-5 h-5"
                    />
                  </label>
                ))}
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setShowTravelStyleModal(false)}
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-[#283d9e] transition"
                >
                  Confirm
                </button>
              </div>
            </div>
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
