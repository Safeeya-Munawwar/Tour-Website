import React, { useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import DestinationSelector from "./DestinationSelector";

const PackageForm = ({ prefill }) => {
  const today = new Date().toISOString().split("T")[0];
const [whatsappNumber, setWhatsappNumber] = useState("94771234567");

  const [formData, setFormData] = useState({
    tourType: prefill?.tourType || "Day Tour",
    fullName: prefill?.fullName || "",
    country: prefill?.country || "",
    email: prefill?.email || "",
    phone: prefill?.phone || "",
    selectedDestinations: prefill?.selectedDestinations || [],
    pickupLocation: prefill?.pickupLocation || "",
    dropLocation: prefill?.dropLocation || "",
    startDate: prefill?.startDate || "",
    endDate: prefill?.endDate || "",
    adults: prefill?.adults || 1,
    children: prefill?.children || 0,
    travelPurpose: prefill?.travelPurpose || "",
    customTravelPurpose: "",
    vehicle: prefill?.vehicle || "",
    notes: prefill?.notes || "",
  });

  const [vehicles, setVehicles] = useState([]);
  const [showDestinationModal, setShowDestinationModal] = useState(false);

  // Fetch vehicles
  useEffect(() => {
    axiosInstance
      .get("/quick-taxi/taxis")
      .then((res) => {
        if (res.data.success) setVehicles(res.data.taxis);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
useEffect(() => {
  axiosInstance
    .get("/contact")
    .then((res) => {
      const p = res.data?.whatsapp || res.data?.phone;
      if (p) setWhatsappNumber(p.replace(/\D/g, ""));
    })
    .catch(() => {
      // fallback number stays
    });
}, []);

  const validateForm = () => {
    const errors = [];
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    if (!formData.tourType) errors.push("Tour type is required");
    if (!formData.fullName.trim()) errors.push("Full name is required");
    if (!formData.country.trim()) errors.push("Country is required");
    if (!formData.email.trim()) errors.push("Email is required");
    if (!formData.phone.trim()) errors.push("Phone is required");
    if (!formData.pickupLocation.trim()) errors.push("Pickup location required");
    if (!formData.dropLocation.trim()) errors.push("Drop location required");
    if (!formData.startDate) errors.push("Start date required");
    if (!formData.endDate) errors.push("End date required");
    if (start < now) errors.push("Start date cannot be in the past");
    if (start > end) errors.push("Start date cannot be after end date");
    if (!formData.vehicle.trim()) errors.push("Please select a vehicle");

    if (!formData.travelPurpose)
      errors.push("Travel Purpose is required");

    if (
      formData.travelPurpose === "Other" &&
      !formData.customTravelPurpose.trim()
    ) {
      errors.push("Please specify your Travel Purpose");
    }

    if (formData.selectedDestinations.length === 0)
      errors.push("Please select at least one destination");

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (errors.length > 0) {
      errors.forEach((err) => toast.error(err));
      return;
    }

    const finalTravelPurpose =
      formData.travelPurpose === "Other"
        ? formData.customTravelPurpose
        : formData.travelPurpose;

    const message = `Hello! 👋

I am interested in your *${prefill?.packageTitle || "tour package"}*. Here are my details:

*Tour Type:* ${formData.tourType}
*Name:* ${formData.fullName}
*Country:* ${formData.country}
*Email:* ${formData.email}
*Phone:* ${formData.phone}
*Pickup Location:* ${formData.pickupLocation}
*Drop Location:* ${formData.dropLocation}
*Start Date:* ${formData.startDate}
*End Date:* ${formData.endDate}
*Adults:* ${formData.adults}
*Children:* ${formData.children}
*Travel Purpose:* ${finalTravelPurpose}
*Vehicle:* ${formData.vehicle}
*Destinations:* ${formData.selectedDestinations.join(", ")}
*Notes:* ${formData.notes || "N/A"}

Could you please provide more information about this tour? Thank you! 😊`;

   const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
window.open(url, "_blank");

    setFormData({
      tourType: prefill?.tourType || "Day Tour",
      fullName: "",
      country: "",
      email: "",
      phone: "",
      selectedDestinations: [],
      pickupLocation: "",
      dropLocation: "",
      startDate: "",
      endDate: "",
      adults: 1,
      children: 0,
      travelPurpose: "",
      customTravelPurpose: "",
      vehicle: "",
      notes: "",
    });
  };

  return (
    <div className="max-w-xl mx-auto px-3 md:px-5">
      {prefill?.packageTitle && (
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">{prefill.packageTitle}</h2>
        </div>
      )}

      {/* Basic Inputs */}
      {[
        { label: "Full Name", name: "fullName", type: "text" },
        { label: "Country", name: "country", type: "text" },
        { label: "Email", name: "email", type: "email" },
        { label: "Phone", name: "phone", type: "tel" },
        { label: "Pickup Location", name: "pickupLocation", type: "text" },
        { label: "Drop Location", name: "dropLocation", type: "text" },
      ].map((input) => (
        <div key={input.name} className="mt-4">
          <label className="block text-gray-700 font-semibold mb-1">
            {input.label} *
          </label>
          <input
            type={input.type}
            name={input.name}
            value={formData[input.name]}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      ))}

      {/* Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Start Date *
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            min={today}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            End Date *
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            min={formData.startDate || today}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      </div>

      {/* Adults & Children */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Adults *
          </label>
          <input
            type="number"
            name="adults"
            min={1}
            value={formData.adults}
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
            min={0}
            value={formData.children}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </div>
      </div>

      {/* Travel Purpose (Customized) */}
      <div className="mt-4">
        <label className="block text-gray-700 font-semibold mb-1">
          Travel Purpose *
        </label>
        <select
          name="travelPurpose"
          value={formData.travelPurpose}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              travelPurpose: e.target.value,
              customTravelPurpose: "",
            }))
          }
          className="w-full p-3 border border-gray-300 rounded-md"
        >
          <option value="">Select purpose</option>
          {[
            "Family Tour",
            "Honeymoon",
            "Group",
            "Solo",
            "With Chauffeur",
            "Photography",
            "Other",
          ].map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>

        {formData.travelPurpose === "Other" && (
          <input
            type="text"
            name="customTravelPurpose"
            value={formData.customTravelPurpose}
            onChange={handleChange}
            placeholder="Specify travel purpose"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          />
        )}
      </div>

      {/* Vehicle */}
      <div className="mt-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Select Vehicle *
        </label>
        <select
          name="vehicle"
          value={formData.vehicle}
          onChange={handleChange}
          className="w-full p-4 rounded-lg border border-gray-300 bg-white"
        >
          <option value="">Select a vehicle</option>
          {vehicles.map((v) => (
            <option key={v._id} value={v.name}>
              {v.name} • {v.seats} Seats
            </option>
          ))}
        </select>
      </div>

      {/* Tour Type */}
      <div className="mt-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Tour Type *
        </label>
        <select
          name="tourType"
          value={formData.tourType}
          onChange={handleChange}
          className="w-full p-4 rounded-lg border border-gray-300 bg-white"
        >
          <option value="Day Tour">Day Tour</option>
          <option value="Round Tour">Round Tour</option>
        </select>
      </div>

      {/* Destinations */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => setShowDestinationModal(true)}
          className="w-full flex justify-between items-center bg-white border border-gray-400 px-4 py-3 rounded-lg font-semibold"
        >
          Select Destinations
          <span>▼</span>
        </button>

        <div className="flex flex-wrap gap-2 mt-2">
          {formData.selectedDestinations.length > 0 ? (
            formData.selectedDestinations.map((d, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
              >
                {d}
              </span>
            ))
          ) : (
            <span className="text-gray-400">No destination selected</span>
          )}
        </div>

        {showDestinationModal && (
          <div
            className="fixed inset-0 bg-black/50 z-[20000] flex items-center justify-center"
            onClick={(e) =>
              e.target === e.currentTarget && setShowDestinationModal(false)
            }
          >
            <div className="w-[95vw] max-w-[700px] h-[90vh] bg-white rounded-2xl">
              <DestinationSelector
                initialSelected={formData.selectedDestinations}
                onConfirm={(newSelection) => {
                  setFormData((prev) => ({
                    ...prev,
                    selectedDestinations: newSelection,
                  }));
                  setShowDestinationModal(false);
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Notes */}
      <div className="mt-4">
        <label className="block text-gray-700 font-semibold mb-2">
          Special Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
          className="w-full border border-gray-300 rounded-md p-3"
        />
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="w-full mt-6 bg-blue-500 text-white font-bold py-3 rounded-md hover:bg-[#283d9e]"
      >
        Submit
      </button>
    </div>
  );
};

export default PackageForm;
