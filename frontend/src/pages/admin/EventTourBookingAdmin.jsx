import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminSidebar from "../../components/admin/AdminSidebar";

const EventTourBookingAdmin = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // ---------------- FETCH BOOKINGS ----------------
  const fetchBookings = async () => {
    try {
      const res = await axiosInstance.get("/event-tour-booking");

      if (res.data.success) {
        setBookings(
          res.data.bookings.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch event bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ---------------- UPDATE STATUS ----------------
  const handleStatusChange = async (id, newStatus) => {
    const toastId = toast.info("Updating status...", { autoClose: false });

    try {
      const res = await axiosInstance.put(
        `/event-tour-booking/${id}/status`,
        { status: newStatus }
      );

      if (res.data.success) {
        toast.update(toastId, {
          render: "Status updated successfully!",
          type: "success",
          autoClose: 3000,
          isLoading: false,
        });
        fetchBookings();
      } else {
        toast.update(toastId, {
          render: "Failed to update status",
          type: "error",
          autoClose: 3000,
          isLoading: false,
        });
      }
    } catch (err) {
      console.error(err);
      toast.update(toastId, {
        render: "Error updating status",
        type: "error",
        autoClose: 3000,
        isLoading: false,
      });
    }
  };

  // ---------------- DELETE BOOKING ----------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;

    try {
      const res = await axiosInstance.delete(`/event-tour-booking/${id}`);

      if (res.data.success) {
        toast.success("Booking deleted");
        fetchBookings();
      }
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  // ---------------- PAGINATION ----------------
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
          Manage Event Bookings
        </h2>
<div className="overflow-x-auto">
  <table className="w-full table-fixed border border-[#1a354e] text-center">
    <thead className="bg-[#0d203a] text-white">
      <tr>
        {[
          "Event Title",
          "Location",
          "Name",
          "Email",
          "Phone",
          "Adults",
          "Children",
          "Date",
          "Time",
          "Message",
          "Status",
          "Action",
        ].map((heading) => (
          <th
            key={heading}
            className="p-2 border border-[#1a354e] text-sm break-words"
          >
            {heading}
          </th>
        ))}
      </tr>
    </thead>

    <tbody>
  {currentRows.length === 0 ? (
    <tr>
      <td colSpan={12} className="p-4 text-sm">
        No bookings found
      </td>
    </tr>
  ) : (
    currentRows.map((b) => (
      <tr key={b._id} className="border-b border-[#2E5B84] hover:bg-blue-50">
        <td className="p-2 border text-sm">{b.eventId?.title || "—"}</td>
        <td className="p-2 border text-sm">{b.eventId?.location || "—"}</td>
        <td className="p-2 border text-sm">{b.name}</td>
        <td className="p-2 border text-sm break-all">{b.email}</td>
        <td className="p-2 border text-sm">{b.phone}</td>
        <td className="p-2 border text-sm">{b.adults}</td>
        <td className="p-2 border text-sm">{b.children}</td>
        <td className="p-2 border text-sm">{b.startDate}</td>
        <td className="p-2 border text-sm">{b.startTime}</td>
        <td className="p-2 border text-sm break-words max-w-[150px]">{b.message || "—"}</td>
        <td className="p-2 border text-sm">
          <select
            value={b.status}
            onChange={(e) => handleStatusChange(b._id, e.target.value)}
            className={`px-2 py-1 rounded text-sm w-full
              ${
                b.status === "Approved"
                  ? "bg-green-100 text-green-700"
                  : b.status === "Cancelled"
                  ? "bg-red-100 text-red-700"
                  : b.status === "Completed"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Completed">Completed</option>
          </select>
        </td>
        <td className="p-2 border text-sm">
          <button
            onClick={() => handleDelete(b._id)}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>

  </table>
</div>


        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-3">
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
              className="px-4 py-1 bg-gray-300 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
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

export default EventTourBookingAdmin;
