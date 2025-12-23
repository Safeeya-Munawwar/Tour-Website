import React, { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";

const TailorMadeForm = () => {
  const [step, setStep] = useState(1);
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [destinations, setDestinations] = useState([]);
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

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await axiosInstance.get("/destination");
        setDestinations(res.data.destinations || []);
      } catch (err) {
        console.error("Error fetching destinations:", err);
      }
    };
    fetchDestinations();
  }, []);  

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

  const handleDestinationChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      selectedDestinations: checked
        ? [...prev.selectedDestinations, value]
        : prev.selectedDestinations.filter((d) => d !== value),
    }));
  };  

  const validateForm = () => {
    // required fields for submission
    const requiredFields = [
      "title",
      "fullName",
      "country",
      "email",
      "phone",
      "pickupLocation",
      "dropLocation",
      "startDate",
      "endDate",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        return false;
      }
    }

    if (!captchaChecked) return false;

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill all required fields and verify captcha!");
      return;
    }

    try {
      await axiosInstance.post("/tailor-made-tours/inquiry", formData);
      toast.success("Your trip plan has been submitted!");

      setTimeout(() => {
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
        setStep(1);
        setCaptchaChecked(false);
      }, 500);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit your plan. Try again.");
    }
  };

  return (
    <div className="lg:col-span-1 w-full">
      <div className="bg-blue-600 text-white rounded-t-xl px-6 py-5 mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-center">
          Plan Your Trip
        </h3>
        <p className="text-xs text-gray-400 mb-2 text-center">
          Fields marked with * are required
        </p>
      </div>

      <p className="text-gray-500 mb-6 px-3 text-center text-sm md:text-base">
        Please note that your information is saved on our server as you enter
        it.
      </p>

      <div className="max-w-xl mx-auto px-3 md:px-5">
        {/* Step 1 */}
        {step === 1 && (
          <form className="space-y-4">
            <h2 className="text-xl font-bold mb-4">
              Step 1: Personal Information
            </h2>

            <div className="flex justify-center space-x-3 mb-4 items-center">
              {[1, 2, 3].map((n) => (
                <span
                  key={n}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    step >= n
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {n}
                </span>
              ))}
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Title*
              </label>
              <select
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                <option value="">Select</option>
                <option>Mr.</option>
                <option>Mrs.</option>
                <option>Miss</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Full Name*
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Country*
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Your country name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Email*
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Phone*
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="+94 777 000 000"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={captchaChecked}
                onChange={(e) => setCaptchaChecked(e.target.checked)}
                className="w-5 h-5"
              />
              <label className="text-gray-700 font-semibold">
                I am not a robot
              </label>
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-blue-500 text-white font-bold py-3 rounded-md hover:bg-[#283d9e] transition"
            >
              Next Step →
            </button>
          </form>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <form className="space-y-4">
            <h2 className="text-xl font-bold mb-4">
              Step 2: Your Trip Details
            </h2>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Pickup Location*
              </label>
              <input
                type="text"
                name="pickupLocation"
                value={formData.pickupLocation}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Where should we pick you up?"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Drop Location*
              </label>
              <input
                type="text"
                name="dropLocation"
                value={formData.dropLocation}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
                placeholder="Where should we drop you off?"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Start Date*
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  End Date*
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Adults*
                </label>
                <input
                  type="number"
                  name="adults"
                  value={formData.adults}
                  min={1}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Children
                </label>
                <input
                  type="number"
                  name="children"
                  value={formData.children}
                  min={0}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>

            {/* Destinations */}
            <div>
  <label className="block text-gray-700 font-semibold mb-2">
    Select Destinations / Travel Interests
  </label>
  <div className="grid grid-cols-2 gap-2 text-sm">
    {destinations.map((d) => (
      <label key={d._id} className="flex items-center space-x-2">
        <input
          type="checkbox"
          value={d.title || d.name} // Use title if name is undefined
          checked={formData.selectedDestinations.includes(d.title || d.name)}
          onChange={handleDestinationChange}
          className="accent-blue-600"
        />
        <span>{d.title || d.name}</span>
      </label>
    ))}
  </div>
</div>

            {/* Estimated Budget */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Estimated Budget
              </label>
              <div className="flex gap-2">
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2 bg-white"
                >
                  <option value="USD">USD ($)</option>
                  <option value="LKR">LKR (Rs)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="AUD">AUD (A$)</option>
                  <option value="No Idea">No Idea</option>
                </select>

                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="Enter amount or leave blank"
                  className="w-full border border-gray-300 rounded-md p-2"
                  disabled={formData.currency === "No Idea"}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Special Requests / Notes
              </label>
              <textarea
                name="notes"
                rows="3"
                value={formData.notes}
                placeholder="Hotels, honeymoon, kids, food preferences, etc."
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <button
                type="button"
                onClick={handlePrev}
                className="w-full bg-gray-300 text-gray-800 font-bold py-3 rounded-md hover:bg-gray-400 transition"
              >
                ← Previous
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="w-full bg-blue-500 text-white font-bold py-3 rounded-md hover:bg-[#283d9e] transition"
              >
                Next Step →
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Review & Submit */}
        {step === 3 && (
          <form className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Step 3: Review & Submit</h2>

            <div className="bg-gray-50 p-4 rounded-md space-y-2">
              <p>
                <strong>Title:</strong> {formData.title}
              </p>
              <p>
                <strong>Full Name:</strong> {formData.fullName}
              </p>
              <p>
                <strong>Country:</strong> {formData.country}
              </p>
              <p>
                <strong>Email:</strong> {formData.email}
              </p>
              <p>
                <strong>Phone:</strong> {formData.phone}
              </p>
              <p>
                <strong>Pickup Location:</strong> {formData.pickupLocation}
              </p>
              <p>
                <strong>Drop Location:</strong> {formData.dropLocation}
              </p>
              <p>
                <strong>Travel Dates:</strong> {formData.startDate} to{" "}
                {formData.endDate}
              </p>
              <p>
                <strong>Adults:</strong> {formData.adults}
              </p>
              <p>
                <strong>Children:</strong> {formData.children}
              </p>
              <p>
  <strong>Destinations / Interests:</strong>{" "}
  {formData.selectedDestinations.length > 0
    ? formData.selectedDestinations.join(", ")
    : "Not specified"}
</p>
              <p>
                <strong>Estimated Budget:</strong>{" "}
                {formData.budget
                  ? `${formData.currency || "USD"} ${Number(
                      formData.budget
                    ).toLocaleString()}`
                  : formData.currency === "No Idea"
                  ? "No Idea"
                  : "Not specified"}
              </p>
              <p>
                <strong>Special Requests:</strong> {formData.notes || "None"}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <button
                type="button"
                onClick={handlePrev}
                className="w-full bg-gray-300 text-gray-800 font-bold py-3 rounded-md hover:bg-gray-400 transition"
              >
                ← Previous
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-blue-500 text-white font-bold py-3 rounded-md hover:bg-[#283d9e] transition"
              >
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
