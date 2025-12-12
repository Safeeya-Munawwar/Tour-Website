// frontend/src/pages/admin/RoundTourBooking.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminSidebar from "../../components/admin/AdminSidebar";

const RoundTourBookingAdmin = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // FETCH BOOKINGS
  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/round-tour-booking");
      if (res.data.success) setBookings(res.data.bookings);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      toast.error("Failed to fetch bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // UPDATE STATUS
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await axios.patch(`http://localhost:5000/api/round-tour-booking/${id}`, { status: newStatus });
      if (res.data.success) {
        toast.success("Status updated");
        fetchBookings();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  // DELETE BOOKING
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      const res = await axios.delete(`http://localhost:5000/api/round-tour-booking/${id}`);
      if (res.data.success) {
        toast.success("Booking deleted");
        fetchBookings();
      }
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  // PAGINATION
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = bookings.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(bookings.length / rowsPerPage);

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
          Manage Round Tour Bookings
        </h2>

        <table className="w-full border border-[#1a354e] rounded mb-6">
        <thead className="bg-[#0d203a] text-white">
  <tr>
    <th className="p-3 border border-[#1a354e]">Tour Title</th>
    <th className="p-3 border border-[#1a354e]">Location</th>
    <th className="p-3 border border-[#1a354e]">Name</th>
    <th className="p-3 border border-[#1a354e]">Email</th>
    <th className="p-3 border border-[#1a354e]">Phone</th>
    <th className="p-3 border border-[#1a354e]">Members</th>
    <th className="p-3 border border-[#1a354e]">Date</th>
    <th className="p-3 border border-[#1a354e]">Time</th>
    <th className="p-3 border border-[#1a354e]">Message</th>
    <th className="p-3 border border-[#1a354e]">Status</th>
    <th className="p-3 border border-[#1a354e]">Action</th>
  </tr>
</thead>

<tbody>
  {currentRows.length === 0 ? (
    <tr>
      <td colSpan={11} className="text-center p-4">No bookings found</td>
    </tr>
  ) : (
    currentRows.map((b) => (
      <tr key={b._id} className="border-b border-[#2E5B84] hover:bg-blue-50">
        <td className="p-3 border border-[#2E5B84]">{b.tourId?.title || "—"}</td>
        <td className="p-3 border border-[#2E5B84]">{b.tourId?.location || "—"}</td>
        <td className="p-3 border border-[#2E5B84]">{b.name}</td>
        <td className="p-3 border border-[#2E5B84]">{b.email}</td>
        <td className="p-3 border border-[#2E5B84]">{b.phone}</td>
        <td className="p-3 border border-[#2E5B84]">{b.members}</td>
        <td className="p-3 border border-[#2E5B84]">{b.startDate || "—"}</td>
        <td className="p-3 border border-[#2E5B84]">{b.startTime || "—"}</td>
        <td className="p-3 border border-[#2E5B84]">{b.message || "—"}</td>
        <td className="p-3 border border-[#2E5B84]">
          <select
            value={b.status || "Pending"}
            onChange={(e) => handleStatusChange(b._id, e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Completed">Completed</option>
          </select>
        </td>
        <td className="p-3 border border-[#2E5B84]">
          <button
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            onClick={() => handleDelete(b._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>

        </table>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-4 py-1">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
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

export default RoundTourBookingAdmin;
