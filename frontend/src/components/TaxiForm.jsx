import React, { useState } from "react";

export default function TaxiForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    country: "",
    serviceType: "pickup",
    pickupLocation: "",
    dropLocation: "",
    pickupDate: "",
    dropDate: "",
    pickupTime: "",
    adults: 1,
    children: 0,
    message: "",
  });

  const [errors, setErrors] = useState({});

  /* ---------------- HANDLE CHANGE ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "serviceType" && value === "pickup"
        ? { dropDate: "" }
        : {}),
    }));
  };

  /* ---------------- VALIDATION ---------------- */
  const validate = () => {
    const e = {};

    if (!formData.firstName.trim()) e.firstName = "First name is required";
    if (!formData.lastName.trim()) e.lastName = "Last name is required";
    if (!formData.phone.trim()) e.phone = "Phone number is required";
    if (!formData.country.trim()) e.country = "Country is required";

    if (!formData.pickupLocation.trim())
      e.pickupLocation = "Pickup location is required";

    if (!formData.dropLocation.trim())
      e.dropLocation = "Drop location is required";

    if (!formData.pickupDate) e.pickupDate = "Pickup date is required";
    if (!formData.pickupTime) e.pickupTime = "Pickup time is required";

    if (formData.serviceType === "drop" && !formData.dropDate)
      e.dropDate = "Drop date is required";

    if (Number(formData.adults) < 1)
      e.adults = "At least 1 adult is required";

    return e;
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);

    if (Object.keys(v).length === 0) {
      alert("Taxi booking submitted successfully!");
    }
  };

  /* ---------------- WHATSAPP ---------------- */
  const sendBookingViaWhatsApp = () => {
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    const message = `
🚕 *NET LANKA TRAVEL – TAXI BOOKING*

👤 Name: ${formData.firstName} ${formData.lastName}
📞 Phone: ${formData.phone}
🌍 Country: ${formData.country}

🚏 Service: ${formData.serviceType.toUpperCase()}
📍 Pickup: ${formData.pickupLocation}
📍 Drop: ${formData.dropLocation}

📅 Pickup Date: ${formData.pickupDate}
📅 Drop Date: ${formData.dropDate || "N/A"}
⏰ Time: ${formData.pickupTime}

👥 Adults: ${formData.adults}
👶 Children: ${formData.children}

📝 Message:
${formData.message || "—"}
`;

    window.open(
      `https://wa.me/94729171089?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="flex flex-col gap-6 bg-white border border-[#2E5B84] rounded-2xl shadow-xl p-8 w-full max-w-[650px] mx-auto text-left">
      <h2 className="text-2xl font-bold text-center text-[#0B2545] mb-2">
        Quick Taxi Booking
        <span className="block text-base font-medium text-gray-600">
          Safe & Reliable Transfers Across Sri Lanka
        </span>
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded border ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-[#0B2545] outline-none`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="font-medium">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded border ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-[#0B2545] outline-none`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="font-medium">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded border ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-[#0B2545] outline-none`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </div>

        {/* Country */}
        <div>
          <label className="font-medium">
            Country <span className="text-red-500">*</span>
          </label>
          <input
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded border ${
              errors.country ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-[#0B2545] outline-none`}
          />
          {errors.country && (
            <p className="text-red-500 text-sm">{errors.country}</p>
          )}
        </div>

        {/* Service Type */}
        <div>
          <label className="font-medium">Service Type</label>
          <div className="flex gap-6 mt-2">
            {["pickup", "drop"].map((t) => (
              <label key={t} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="serviceType"
                  value={t}
                  checked={formData.serviceType === t}
                  onChange={handleChange}
                  className="accent-[#0B2545]"
                />
                {t.toUpperCase()}
              </label>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div>
          <label className="font-medium">
            Pickup Location <span className="text-red-500">*</span>
          </label>
          <input
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded border ${
              errors.pickupLocation ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-[#0B2545] outline-none`}
          />
        </div>

        <div>
          <label className="font-medium">
            Drop Location <span className="text-red-500">*</span>
          </label>
          <input
            name="dropLocation"
            value={formData.dropLocation}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded border ${
              errors.dropLocation ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-[#0B2545] outline-none`}
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-medium">
              Pickup Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded border ${
                errors.pickupDate ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>

          <div>
            <label className="font-medium">Drop Date</label>
            <input
              type="date"
              name="dropDate"
              disabled={formData.serviceType === "pickup"}
              value={formData.dropDate}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded border ${
                formData.serviceType === "pickup"
                  ? "opacity-50"
                  : "border-gray-300"
              }`}
            />
          </div>
        </div>

        {/* Time */}
        <div>
          <label className="font-medium">
            Pickup Time <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            name="pickupTime"
            value={formData.pickupTime}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded border ${
              errors.pickupTime ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>

        {/* Message */}
        <div>
          <label className="font-medium">Additional Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded border border-gray-300 resize-none h-28"
          />
        </div>

        {/* Buttons */}
        <button
          type="submit"
          className="w-full bg-[#0B2545] hover:bg-[#142D57] text-white font-semibold px-6 py-3 rounded transition-colors duration-200"
        >
          Book Taxi
        </button>

        <button
          type="button"
          onClick={sendBookingViaWhatsApp}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded transition-colors duration-200"
        >
          Book via WhatsApp
        </button>
      </form>
    </div>
  );
}
