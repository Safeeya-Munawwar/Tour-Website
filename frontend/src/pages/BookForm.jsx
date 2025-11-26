import { useState } from "react";

export default function BookForm() {
  const [tourType, setTourType] = useState("Day Tour");

  const dayTours = [
    "Kandy Day Tour",
    "Sigiriya Day Tour",
    "Galle Day Tour",
    "Colombo City Tour",
  ];

  const roundTours = [
    "4 Days Round Tour",
    "6 Days Round Tour",
    "8 Days Round Tour",
    "10 Days Round Tour",
    "14 Days Round Tour",
  ];

  const destinations = [
    "Colombo",
    "Kandy",
    "Sigiriya",
    "Ella",
    "Nuwara Eliya",
    "Galle",
    "Mirissa",
    "Jaffna",
  ];

  return (
    <form className="w-full max-w-xl mx-auto bg-transparent shadow-lg rounded-xl p-8 space-y-6 ">


      <h2 className="text-3xl font-semibold text-center mb-4">Book Now</h2>

      {/* Full Name */}
      <div>
        <label className="block mb-1 font-medium">Full Name</label>
        <input type="text" className="w-full border rounded-lg p-3" />
      </div>

      {/* Email */}
      <div>
        <label className="block mb-1 font-medium">Email Address</label>
        <input type="email" className="w-full border rounded-lg p-3" />
      </div>

      {/* Phone */}
      <div>
        <label className="block mb-1 font-medium">Phone Number</label>
        <input type="text" className="w-full border rounded-lg p-3" />
      </div>

      {/* Address */}
      <div>
        <label className="block mb-1 font-medium">Address</label>
        <input type="text" className="w-full border rounded-lg p-3" />
      </div>

      {/* Tour Type */}
      <div>
        <label className="block mb-1 font-medium">Tour Type</label>
        <select
          className="w-full border rounded-lg p-3"
          value={tourType}
          onChange={(e) => setTourType(e.target.value)}
        >
          <option>Day Tour</option>
          <option>Round Tour</option>
        </select>
      </div>

      {/* Tour Name Dropdown */}
      <div>
        <label className="block mb-1 font-medium">Tour Name</label>
        <select className="w-full border rounded-lg p-3">
          <option value="">Select a Tour</option>

          {/* Day Tour List */}
          {tourType === "Day Tour" &&
            dayTours.map((t, i) => <option key={i}>{t}</option>)}

          {/* Round Tour List */}
          {tourType === "Round Tour" &&
            roundTours.map((t, i) => <option key={i}>{t}</option>)}
        </select>
      </div>

      {/* Destination Dropdown */}
      <div>
        <label className="block mb-1 font-medium">Destination</label>
        <select className="w-full border rounded-lg p-3">
          <option>Select Destination</option>
          {destinations.map((d, i) => (
            <option key={i}>{d}</option>
          ))}
        </select>
      </div>

      {/* Adults */}
      <div>
        <label className="block mb-1 font-medium">Number of Adults</label>
        <input type="number" className="w-full border rounded-lg p-3" min="1" />
      </div>

      {/* Children */}
      <div>
        <label className="block mb-1 font-medium">Number of Children</label>
        <input type="number" className="w-full border rounded-lg p-3" min="0" />
      </div>

      {/* Days – only for round tour */}
      {tourType === "Round Tour" && (
        <div>
          <label className="block mb-1 font-medium">Number of Days</label>
          <input type="number" className="w-full border rounded-lg p-3" />
        </div>
      )}

      {/* Travel Dates */}
      <div>
        <label className="block mb-1 font-medium">Preferred Travel Dates</label>

        {tourType === "Day Tour" ? (
          <input type="date" className="w-full border rounded-lg p-3" />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <input type="date" className="w-full border rounded-lg p-3" />
            <input type="date" className="w-full border rounded-lg p-3" />
          </div>
        )}
      </div>

      {/* Pickup */}
      <div>
        <label className="block mb-1 font-medium">Pickup Location</label>
        <select className="w-full border rounded-lg p-3">
          <option>Hotel</option>
          <option>Airport</option>
          <option>City</option>
        </select>
      </div>

      {/* Drop-off */}
      <div>
        <label className="block mb-1 font-medium">Drop-off Location</label>
        <select className="w-full border rounded-lg p-3">
          <option>Hotel</option>
          <option>Airport</option>
          <option>City</option>
        </select>
      </div>

      {/* Notes */}
      <div>
        <label className="block mb-1 font-medium">Special Requests / Notes</label>
        <textarea className="w-full border rounded-lg p-3" rows="3"></textarea>
      </div>

      {/* Submit */}
      <button className="w-full bg-[#D4AF37] text-white p-3 rounded-lg text-lg font-semibold">
        Submit Booking
      </button>
    </form>
  );
}
