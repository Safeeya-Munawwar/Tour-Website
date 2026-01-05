import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { toast, ToastContainer } from "react-toastify";
import AdminSidebar from "../../components/admin/AdminSidebar";

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await axiosInstance.get("/admin/notifications");
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) return <p className="p-4">Loading notifications...</p>;

  return (
    <div className="flex">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-64 fixed h-screen">
        <AdminSidebar />
      </div>
      <h1 className="text-2xl font-bold mb-6">Admin Notifications</h1>

      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((note) => (
            <li
              key={note._id}
              className="border border-gray-300 rounded-lg p-4 shadow hover:shadow-lg transition bg-white"
            >
              <p className="font-semibold">
                Section: {note.section} | Action: {note.action}
              </p>
              <p className="text-gray-700 mt-1">{note.message}</p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(note.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
