import React, { useState } from "react";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import DestinationSelector from "./DestinationSelector";

const TailorMadeForm = () => {
  const [step, setStep] = useState(1);
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [selectedDestinations, setSelectedDestinations] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    fullName: "",
    country: "",
    email: "",
    phone: "",
    pickupLocation: "",
    dropLocation: "",
    startDate: "",
    endDate: "",
    adults: 1,
    children: 0,
    budget: "",
    currency: "USD",
    notes: "",
    selectedDestinations: [],
  });

  // Update formData whenever destinations change
  React.useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      selectedDestinations,
    }));
  }, [selectedDestinations]);

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1 && !captchaChecked) {
      toast.warning("Please confirm you are not a robot!");
      return;
    }
    setStep(step + 1);
  };

  const handlePrev = () => setStep(step - 1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!formData.title) errors.push("Title is required");
    if (!formData.fullName.trim()) errors.push("Full name is required");
    if (!formData.country.trim()) errors.push("Country is required");

    if (!formData.email.trim()) errors.push("Email is required");
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) errors.push("Invalid email format");
    }

    if (!formData.phone.trim()) errors.push("Phone number is required");
    if (!captchaChecked) errors.push("Please confirm you are not a robot");

    if (!formData.pickupLocation.trim()) errors.push("Pickup location is required");
    if (!formData.dropLocation.trim()) errors.push("Drop location is required");
    if (!formData.startDate) errors.push("Start date is required");
    if (!formData.endDate) errors.push("End date is required");

    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      if (start > end) errors.push("Start date cannot be after end date");
      if (start < today) errors.push("Start date cannot be in the past");
      if (end < today) errors.push("End date cannot be in the past");
    }

    if (!formData.adults || Number(formData.adults) < 1)
      errors.push("At least 1 adult is required");
    if (formData.children < 0) errors.push("Children cannot be negative");

    if (
      formData.currency !== "No Idea" &&
      formData.budget &&
      Number(formData.budget) < 0
    ) {
      errors.push("Budget cannot be negative");
    }
    

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (errors.length > 0) {
      errors.forEach((err) => toast.error(err));
      return;
    }

    try {
      await axiosInstance.post("/tailor-made-tours/inquiry", formData);
      toast.success("Your trip plan has been submitted!");

      // Reset
      setFormData({
        title: "",
        fullName: "",
        country: "",
        email: "",
        phone: "",
        pickupLocation: "",
        dropLocation: "",
        startDate: "",
        endDate: "",
        adults: 1,
        children: 0,
        budget: "",
        currency: "USD",
        notes: "",
        selectedDestinations: [],
      });
      setSelectedDestinations([]);
      setStep(1);
      setCaptchaChecked(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit your plan. Try again.");
    }
  };

  return (
    <div className="lg:col-span-1 w-full">
      <div className="bg-blue-600 text-white rounded-t-xl px-6 py-5 mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-center">Plan Your Trip</h3>
        <p className="text-xs text-gray-400 mb-2 text-center">Fields marked with * are required</p>
      </div>

      <div className="max-w-xl mx-auto px-3 md:px-5">
        {/* Step 1 */}
        {step === 1 && (
          <form className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Step 1: Personal Information</h2>
            <div className="flex justify-center space-x-3 mb-4 items-center">
              {[1, 2, 3].map((n) => (
                <span
                  key={n}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    step >= n ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {n}
                </span>
              ))}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Title *</label>
              <select name="title" value={formData.title} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2">
                <option value="">Select</option>
                <option>Mr.</option>
                <option>Mrs.</option>
                <option>Miss</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Full Name *</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" placeholder="Your full name" />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Country *</label>
              <input type="text" name="country" value={formData.country} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" placeholder="Your country name" />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Email *</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" placeholder="you@example.com" />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Phone *</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" placeholder="+94 777 000 000" />
            </div>

            <div className="flex items-center space-x-2">
              <input type="checkbox" checked={captchaChecked} onChange={(e) => setCaptchaChecked(e.target.checked)} className="w-5 h-5" />
              <label className="text-gray-700 font-semibold">I am not a robot</label>
            </div>

            <button onClick={handleNext} className="w-full bg-blue-500 text-white font-bold py-3 rounded-md hover:bg-[#283d9e] transition">
              Next Step →
            </button>
          </form>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <form className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Step 2: Your Trip Details</h2>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Pickup Location *</label>
              <input type="text" name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" placeholder="Where should we pick you up?" />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Drop Location *</label>
              <input type="text" name="dropLocation" value={formData.dropLocation} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" placeholder="Where should we drop you off?" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Start Date *</label>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">End Date *</label>
                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Adults *</label>
                <input type="number" name="adults" value={formData.adults} min={1} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Children</label>
                <input type="number" name="children" value={formData.children} min={0} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2" />
              </div>
            </div>

            {/* Budget & Currency */}
<div>
  <label className="block text-gray-700 font-semibold mb-1">
    Estimated Budget
  </label>

  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
    {/* Currency */}
    <select
      name="currency"
      value={formData.currency}
      onChange={handleChange}
      className="border border-gray-300 rounded-md p-2"
    >
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="GBP">GBP</option>
      <option value="LKR">LKR</option>
      <option value="No Idea">No Idea</option>
    </select>

    {/* Budget Amount */}
    <input
      type="number"
      name="budget"
      value={formData.budget}
      onChange={handleChange}
      placeholder="Amount"
      disabled={formData.currency === "No Idea"}
      className={`border border-gray-300 rounded-md p-2 col-span-2 ${
        formData.currency === "No Idea"
          ? "bg-gray-100 cursor-not-allowed"
          : ""
      }`}
    />
  </div>

  {formData.currency === "No Idea" && (
    <p className="text-xs text-gray-500 mt-1">
      Don’t worry - we’ll suggest the best options for your trip.
    </p>
  )}
</div>

            {/* Destination Selection */}
            <div>
            <button
  type="button"
  onClick={() => setShowDestinationModal(true)}
  className="w-full flex justify-between items-center bg-white border border-gray-400 text-gray-800 px-4 py-3 rounded-lg hover:bg-gray-100 transition font-semibold"
>
  Select Destinations
  <svg
    className="w-5 h-5 ml-2 text-gray-600"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
  </svg>
</button>


              <div className="flex flex-wrap gap-2 mt-2">
                {selectedDestinations.length > 0
                  ? selectedDestinations.map((d, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                        {d}
                      </span>
                    ))
                  : <span className="text-gray-400">No destination selected</span>}
              </div>
            </div>

{showDestinationModal && (
  <div
    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[20000] flex items-center justify-center"
    onClick={(e) => e.target === e.currentTarget && setShowDestinationModal(false)}
  >
    <div
      className="w-[95vw] max-w-[700px] h-[90vh] bg-white shadow-2xl 
                 flex flex-col overflow-hidden rounded-2xl relative"
    >
      <DestinationSelector
        initialSelected={selectedDestinations}
        onConfirm={(newSelection) => {
          setSelectedDestinations(newSelection);
          setShowDestinationModal(false);
        }}
      />
    </div>
  </div>
)}

{/* Special Requests / Notes */}
<div>
  <label className="block text-gray-700 font-semibold mb-1">
    Special Requests / Notes
  </label>

  <textarea
    name="notes"
    value={formData.notes}
    onChange={handleChange}
    rows={4}
    placeholder="Any special requests? (hotel type, food preferences, wheelchair access, honeymoon trip, etc.)"
    className="w-full border border-gray-300 rounded-md p-2 resize-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
  />
</div>



            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
              <button type="button" onClick={handlePrev} className="w-full bg-gray-300 text-gray-800 font-bold py-3 rounded-md hover:bg-gray-400 transition">
                ← Previous
              </button>

              <button type="button" onClick={handleNext} className="w-full bg-blue-500 text-white font-bold py-3 rounded-md hover:bg-[#283d9e] transition">
                Next Step →
              </button>
            </div>
          </form>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <form className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Step 3: Review & Submit</h2>

            <div className="bg-gray-50 p-4 rounded-md space-y-2">
              {Object.entries(formData).map(([key, value]) => {
                if (key === "selectedDestinations") {
                  return (
                    <p key={key}>
                      <strong>Destinations:</strong>{" "}
                      {value.length > 0 ? value.join(", ") : "Not specified"}
                    </p>
                  );
                }
                if (key === "notes") {
                  return (
                    <p key={key}>
                      <strong>Special Requests:</strong> {value || "None"}
                    </p>
                  );
                }
                if (key === "budget") {
                  return (
                    <p key={key}>
                      <strong>Estimated Budget:</strong>{" "}
                      {value
                        ? `${formData.currency || "USD"} ${Number(value).toLocaleString()}`
                        : formData.currency === "No Idea"
                        ? "No Idea"
                        : "Not specified"}
                    </p>
                  );
                }
                if (["currency"].includes(key)) return null;
                return (
                  <p key={key}>
                    <strong>{key.replace(/([A-Z])/g, " $1")}:</strong> {value || "Not specified"}
                  </p>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <button type="button" onClick={handlePrev} className="w-full bg-gray-300 text-gray-800 font-bold py-3 rounded-md hover:bg-gray-400 transition">
                ← Previous
              </button>

              <button type="button" onClick={handleSubmit} className="w-full bg-blue-500 text-white font-bold py-3 rounded-md hover:bg-[#283d9e] transition">
                Plan My Trip
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TailorMadeForm;
