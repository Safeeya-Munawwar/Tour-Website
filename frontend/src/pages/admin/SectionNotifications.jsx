import React, { useState, useEffect, useCallback } from "react";
import SuperAdminSidebar from "../../components/admin/SuperAdminSidebar";
import { axiosInstance } from "../../lib/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Trash } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function SectionNotifications() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [statusFilter, setStatusFilter] = useState("done"); //done, read
  const [searchTerm, setSearchTerm] = useState("");

  // ================= FETCH =================
  const fetchNotifications = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/super-admin/notifications");
      let filtered = res.data.notifications;

      // Filter by status
      if (statusFilter)
        filtered = filtered.filter((n) => n.status === statusFilter);

      // Filter by search term
      if (searchTerm)
        filtered = filtered.filter((n) =>
          n.message.toLowerCase().includes(searchTerm.toLowerCase())
        );

      setNotifications(filtered || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch notifications");
    }
  }, [statusFilter, searchTerm]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  // ================= MARK READ =================
  const markAsRead = async (id) => {
    try {
      await axiosInstance.patch(`/super-admin/notifications/${id}`, {
        status: "read",
      });
      toast.success("Marked as read");
      fetchNotifications();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update notification");
    }
  };

  // ================= DELETE =================
  const deleteNotification = async (id) => {
    try {
      await axiosInstance.delete(`/super-admin/notifications/${id}`);
      toast.success("Notification deleted");
      fetchNotifications();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete notification");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 fixed h-screen">
        <SuperAdminSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </div>

      {/* Main */}
      <div className="flex-1 ml-64 p-8">
        <h1 className="text-4xl font-bold text-[#0d203a] mb-2">
          Admin Task Completion Notifications
        </h1>
        <p className="text-gray-600 mb-8">
          View and manage notifications for tasks completed by Admins after
          Super Admin assignment.
        </p>

        {/* Status Filter */}
        <div className="flex gap-2 mb-4">
          {["done", "read"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1 rounded font-medium ${
                statusFilter === status
                  ? "bg-[#2E5B84] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-[#2E5B84] rounded p-2 text-[#0d203a] w-full sm:w-64"
            />
            <button
              onClick={fetchNotifications}
              className="bg-[#2E5B84] hover:bg-[#1E3A60] text-white font-semibold px-4 py-2 rounded-xl transition"
            >
              Search
            </button>
          </div>
        </div>

        {/* Notification List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notifications.length === 0 && (
            <p className="text-gray-500 col-span-full">
              No notifications found
            </p>
          )}

          {notifications.map((note) => (
            <div
              key={note._id}
              className={`p-4 rounded-xl shadow-sm border transition ${
                note.status === "pending"
                  ? "border-yellow-400 bg-yellow-50"
                  : note.status === "done"
                  ? "border-blue-400 bg-blue-50"
                  : "border-green-400 bg-green-50"
              }`}
            >
              <p className="font-semibold text-[#0d203a] mb-2">
                Sections: {note.sections?.join(", ")}
              </p>

              <p className="text-gray-700 mb-2">{note.message}</p>

              {note.admin && (
                <p className="text-sm text-gray-600 mb-1">
                  Admin:{" "}
                  <span className="font-medium">({note.admin.email})</span>
                </p>
              )}

              <p className="text-sm text-gray-500 mb-2">
                {dayjs(note.createdAt).fromNow()}
              </p>

              <p className="text-sm text-gray-500 mb-4">
                Action: <span className="font-medium">{note.action}</span> |{" "}
                Priority: <span className="font-medium">{note.priority}</span>
              </p>

              {/* Buttons / Checkboxes */}
              <div className="flex gap-2 items-center">
                {note.status === "done" && (
                  <label className="flex items-center gap-2 cursor-pointer text-sm">
                    <input
                      type="checkbox"
                      onChange={() => markAsRead(note._id)}
                      className="w-4 h-4"
                    />
                    Mark as Read
                  </label>
                )}

                {note.status === "read" && (
                  <button
                    onClick={() => deleteNotification(note._id)}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg transition text-sm"
                  >
                    <Trash size={16} />
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}
