// frontend/src/pages/admin/AdminSectionRequest.jsx
import React, { useState } from "react";
import SuperAdminSidebar from "../../components/admin/SuperAdminSidebar";
import { axiosInstance } from "../../lib/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Sections for selection (can be grouped as needed)
const SIDEBAR_SECTIONS = [
  { section: "Dashboard" },
  { section: "Home Content" },
  { section: "About" },
  { section: "Community Impact" },
  { section: "Day Tours" },
  { section: "Round Tours" },
  { section: "Tailor-Made Tours" },
  { section: "Destinations" },
  { section: "Blogs" },
  { section: "Events" },
  { section: "Experiences" },
  { section: "Manage Vehicles" },
  { section: "Taxi Bookings" },
  { section: "Day Tour Bookings" },
  { section: "Round Tour Bookings" },
  { section: "Customize Tour Bookings" },
  { section: "Event Tour Bookings" },
  { section: "Blog Comments" },
  { section: "Tour Reviews" },
  { section: "Tailor Reviews" },
  { section: "TripAdvisor Reviews" },
  { section: "Contact" },
];

export default function AdminSectionRequest() {
  const [selectedSections, setSelectedSections] = useState([]);
  const [actionType, setActionType] = useState("edit");
  const [message, setMessage] = useState("");

  const handleCheckbox = (section) => {
    setSelectedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const sendNotification = async () => {
    if (selectedSections.length === 0) {
      toast.error("Select at least one section");
      return;
    }

    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    try {
      for (let section of selectedSections) {
        await axiosInstance.post("/admin/notifications", {
          section,
          action: actionType,
          message,
        });
      }
      toast.success("Notifications sent to admins!");
      setSelectedSections([]);
      setMessage("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send notifications");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 fixed h-screen">
        <SuperAdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        <h1 className="text-4xl font-bold text-[#0d203a] mb-6">
          Super Admin: Section Requests
        </h1>

        {/* Action Type */}
        <div className="mb-6 flex items-center gap-4">
          <label className="font-semibold text-[#0d203a]">Action Type:</label>
          <select
            value={actionType}
            onChange={(e) => setActionType(e.target.value)}
            className="border border-[#2E5B84] p-2 rounded text-[#0d203a]"
          >
            <option value="add">Add</option>
            <option value="edit">Edit</option>
            <option value="delete">Delete</option>
          </select>
        </div>

        {/* Message Box */}
        <div className="mb-6">
          <label className="block font-semibold text-[#0d203a] mb-2">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message to the admin..."
            className="w-full border border-[#2E5B84] rounded p-3 min-h-[120px] text-[#0d203a]"
          />
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-2 gap-6 max-h-[60vh] overflow-y-auto">
          {SIDEBAR_SECTIONS.map((sec) => (
            <div
              key={sec.section}
              className="border border-[#2E5B84] rounded-2xl p-4 shadow-md hover:shadow-xl transition bg-white"
            >
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSections.includes(sec.section)}
                  onChange={() => handleCheckbox(sec.section)}
                  className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-[#0d203a] font-medium">{sec.section}</span>
              </label>
            </div>
          ))}
        </div>

        {/* Send Button */}
        <button
          onClick={sendNotification}
          className="mt-6 bg-[#2E5B84] hover:bg-[#1E3A60] text-white font-semibold px-6 py-3 rounded-xl transition"
        >
          Send Notification
        </button>
      </div>

      <ToastContainer />
    </div>
  );
}
