// frontend/src/pages/admin/SectionNotifications.jsx
import React, { useEffect, useState } from "react";
import SuperAdminSidebar from "../../components/admin/SuperAdminSidebar";
import { axiosInstance } from "../../lib/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SectionNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admin/notifications");
      setNotifications(res.data.notifications || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  const markAsDone = async (id) => {
    try {
      await axiosInstance.patch(`/admin/notifications/${id}`);
      toast.success("Marked as done");
      fetchNotifications(); // refresh list
    } catch (err) {
      console.error(err);
      toast.error("Failed to mark as done");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 fixed h-screen">
        <SuperAdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        <h1 className="text-4xl font-bold text-[#0d203a] mb-6">
          Section Notifications from Admins
        </h1>

        {loading ? (
          <p className="text-[#0d203a]">Loading notifications...</p>
        ) : notifications.length === 0 ? (
          <p className="text-[#0d203a]">No notifications received.</p>
        ) : (
          <div className="space-y-4 max-h-[70vh] overflow-y-auto">
            {notifications.map((n) => (
              <div
                key={n._id}
                className={`border rounded-2xl shadow-xl p-4 transition ${
                  n.status === "pending"
                    ? "bg-yellow-50 border-yellow-400"
                    : "bg-green-50 border-green-400"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[#0d203a] font-semibold text-lg">
                      Section: {n.section}
                    </p>
                    <p className="text-[#0d203a] mt-1">Action: {n.action}</p>
                    <p className="text-[#0d203a] mt-2">{n.message}</p>
                    <p className="text-gray-500 text-sm mt-2">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {n.status === "pending" && (
                    <button
                      onClick={() => markAsDone(n._id)}
                      className="bg-[#2E5B84] hover:bg-[#1E3A60] text-white px-4 py-2 rounded-2xl shadow-md transition"
                    >
                      Mark Done
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}
