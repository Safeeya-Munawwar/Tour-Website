// C:\Users\Administrator\Projects\tour-website\frontend\src\pages\admin\ContactMessages.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminSidebar from "../../components/admin/AdminSidebar";

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // ---------------- FETCH ALL CONTACT MESSAGES ----------------
  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contact-form");
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching contact messages:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // ---------------- DELETE MESSAGE ----------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      const res = await axios.delete(`http://localhost:5000/api/contact-form/${id}`);
      if (res.data.success) {
        toast.success("Message deleted");
        fetchMessages();
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // ---------------- PAGINATION LOGIC ----------------
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = messages.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(messages.length / rowsPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* SIDEBAR */}
      <div className="w-64 fixed h-screen">
        <AdminSidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-64 p-6 bg-white min-h-screen">
        <h2 className="text-4xl font-bold text-[#0d203a] mb-6 px-5 mt-4">
          Manage Contact Messages
        </h2>

        <table className="w-full border border-[#1a354e] rounded mb-6">
          <thead className="bg-[#0d203a] text-white">
            <tr>
              <th className="p-3 border border-[#1a354e]">Name</th>
              <th className="p-3 border border-[#1a354e]">Email</th>
              <th className="p-3 border border-[#1a354e]">Rating</th>
              <th className="p-3 border border-[#1a354e]">Message</th>
              <th className="p-3 border border-[#1a354e]">Date</th>
              <th className="p-3 border border-[#1a354e]">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentRows.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-4">
                  No messages found
                </td>
              </tr>
            ) : (
              currentRows.map((msg) => (
                <tr key={msg._id} className="border-b border-[#2E5B84] hover:bg-blue-50">
                  <td className="p-3 border border-[#2E5B84]">
                    {msg.firstName} {msg.lastName}
                  </td>
                  <td className="p-3 border border-[#2E5B84]">{msg.email}</td>
                  <td className="p-3 border border-[#2E5B84]">{msg.rating || "-"}</td>
                  <td className="p-3 border border-[#2E5B84]">{msg.message}</td>
                  <td className="p-3 border border-[#2E5B84]">
                    {new Date(msg.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3 border border-[#2E5B84]">
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      onClick={() => handleDelete(msg._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* PAGINATION CONTROLS */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-4 py-1">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactMessages;
