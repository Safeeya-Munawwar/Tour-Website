import React, { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";

export default function BookEventTour({ eventId, eventTitle, eventLocation, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    adults: 1,
    children: 0,
    members: 1,
    startDate: "",
    startTime: "00:00",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("94729171089");

  // Fetch WhatsApp number
  useEffect(() => {
    axiosInstance
      .get("/contact")
      .then((res) => {
        const p = res.data?.whatsapp || res.data?.phone;
        if (p) setWhatsappNumber(p.replace(/\D/g, ""));
      })
      .catch(() => {});
  }, []);

  // Update total members dynamically
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
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (Number(formData.adults) < 1) newErrors.adults = "At least 1 adult required";
    if (Number(formData.children) < 0) newErrors.children = "Cannot be negative";
    if (!formData.startDate) newErrors.startDate = "Event date is required";
    else if (new Date(formData.startDate) < new Date().setHours(0, 0, 0, 0))
      newErrors.startDate = "Date cannot be in the past";
    if (!formData.startTime) newErrors.startTime = "Event time is required";
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
      const res = await axiosInstance.post("/event-tour-booking", {
        eventId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        adults: Number(formData.adults),
        children: Number(formData.children),
        startDate: formData.startDate,
        startTime: formData.startTime,
        message: formData.message,
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
          startDate: "",
          startTime: "00:00",
          message: "",
        });
      } else {
        setResponseMsg(res.data.message || "Failed to submit booking.");
        setIsError(true);
      }
    } catch (err) {
      console.error("Booking submission error:", err.response || err);
      setResponseMsg(err.response?.data?.message || "Server error. Please try again later.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };
  

  const sendBookingViaWhatsApp = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setResponseMsg("Please fix errors before sending via WhatsApp");
      setIsError(true);
      return;
    }

    const message = `
*Event Tour Booking - Net Lanka Travels*

*Event:* ${eventTitle}
*Location:* ${eventLocation}

*Customer Details:*
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}

*Participants:*
- Adults: ${formData.adults}
- Children: ${formData.children}
- Total Members: ${formData.members}

*Event Schedule:*
- Date: ${formData.startDate}
- Time: ${formData.startTime}

*Additional Message:*
${formData.message || "–"}

*We will contact you soon*
    `;

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  if (!eventId) return null;

  return (
    <div className=" ">
      <div className="bg-white border border-blue-900 rounded-2xl shadow-xl p-8 w-full max-w-[650px] relative">
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold text-xl"
          >
            &times;
          </button>
        )}

        <h2 className="text-2xl font-bold text-center text-blue-900 mb-4">
          {eventTitle}
          <span className="block">{eventLocation} - Event Tour</span>
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name, Email, Phone */}
          {["name", "email", "phone"].map((field) => (
            <div key={field}>
              <label className="font-medium mb-1">
                {field.charAt(0).toUpperCase() + field.slice(1)} <span className="text-red-500">*</span>
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                placeholder={`Enter ${field}`}
                value={formData[field]}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded border ${
                  errors[field] ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 outline-none`}
              />
              {errors[field] && <span className="text-red-500 text-sm">{errors[field]}</span>}
            </div>
          ))}

          {/* Adults & Children */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["adults", "children"].map((field) => (
              <div key={field}>
                <label className="font-medium mb-1">
                  {field.charAt(0).toUpperCase() + field.slice(1)} {field === "adults" && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="number"
                  name={field}
                  min={field === "adults" ? 1 : 0}
                  value={formData[field]}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded border ${
                    errors[field] ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-blue-500 outline-none`}
                />
                {errors[field] && <span className="text-red-500 text-sm">{errors[field]}</span>}
              </div>
            ))}
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-medium mb-1">Event Date <span className="text-red-500">*</span></label>
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
            <div>
              <label className="font-medium mb-1">Event Time <span className="text-red-500">*</span></label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                step="60"
                className={`w-full px-4 py-3 rounded border ${
                  errors.startTime ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 outline-none`}
              />
              {errors.startTime && <span className="text-red-500 text-sm">{errors.startTime}</span>}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="font-medium mb-1">Additional Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Any additional requests"
              className="w-full px-4 py-3 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none h-28"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded transition-colors duration-200"
          >
            {loading ? "Submitting..." : "Book Event"}
          </button>

          <button
            type="button"
            onClick={sendBookingViaWhatsApp}
            className="w-full mt-3 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded transition-colors duration-200"
          >
            Book via WhatsApp
          </button>

          {responseMsg && (
            <p className={`mt-2 text-center font-medium ${isError ? "text-red-600" : "text-green-600"}`}>
              {responseMsg}
            </p>
          )}
        </form>
      </div> 
    </div>
  );
}
