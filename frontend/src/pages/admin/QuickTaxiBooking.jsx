import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminSidebar from "../../components/admin/AdminSidebar";

const QuickTaxiBookingAdmin = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const rowsPerPage = 5;

  // ---------------- FETCH BOOKINGS ----------------
  const fetchBookings = async () => {
    try {
      const res = await axiosInstance.get("/quick-taxi/bookings", {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      if (res.data.success) setBookings(res.data.bookings);
      else toast.error("Failed to fetch bookings");
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch bookings");
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  // ---------------- UPDATE STATUS ----------------
  const handleStatusChange = async (id, newStatus) => {
    const toastId = toast.info("Updating status...", { autoClose: false });
    try {
      const res = await axiosInstance.patch(`/quick-taxi/bookings/${id}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      if (res.data.success) {
        toast.update(toastId, { render: "Status updated!", type: "success", autoClose: 3000, isLoading: false });
        fetchBookings();
        if (selectedBooking && selectedBooking._id === id)
          setSelectedBooking({ ...selectedBooking, status: newStatus });
      } else {
        toast.update(toastId, { render: "Failed to update status", type: "error", autoClose: 3000, isLoading: false });
      }
    } catch (err) {
      console.error(err);
      toast.update(toastId, { render: "Error updating status", type: "error", autoClose: 3000, isLoading: false });
    }
  };

  // ---------------- DELETE BOOKING ----------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      const res = await axiosInstance.delete(`/quick-taxi/bookings/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      if (res.data.success) {
        toast.success("Booking deleted");
        fetchBookings();
        setSelectedBooking(null);
      } else toast.error("Delete failed");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed. Check console.");
    }
  };

  // ---------------- MESSAGE GENERATOR ----------------
  const getStatusMessage = (status, firstName) => {
    switch (status) {
      case "Confirmed":
        return `Hello ${firstName}, your taxi booking has been confirmed! 🎉`;
      case "Cancelled":
        return `Hello ${firstName}, we are sorry to inform you that your taxi booking has been cancelled. 😔`;
      case "Completed":
        return `Hello ${firstName}, your taxi booking has been completed. Thank you! 😊`;
      case "Pending":
      default:
        return `Hello ${firstName}, your taxi booking is pending. We'll update you soon.`;
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
      <div className="w-64 fixed h-screen"><AdminSidebar /></div>

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-64 p-6 bg-white min-h-screen">
        <h2 className="text-4xl font-bold text-[#0d203a] mb-6 px-5 mt-4">
          Manage Quick Taxi Bookings
        </h2>

        {/* ---------------- TABLE ---------------- */}
        <div className="overflow-x-auto max-w-full">
          <table className="w-full table-fixed border border-[#1a354e] rounded mb-6 text-center">
            <thead className="bg-[#0d203a] text-white">
              <tr>
                <th className="p-3 border border-[#1a354e] text-sm">Name</th>
                <th className="p-3 border border-[#1a354e] text-sm">Phone</th>
                <th className="p-3 border border-[#1a354e] text-sm">Vehicle</th>
                <th className="p-3 border border-[#1a354e] text-sm">Pickup</th>
                <th className="p-3 border border-[#1a354e] text-sm">Drop</th>
                <th className="p-3 border border-[#1a354e] text-sm">Status</th>
                <th className="p-3 border border-[#1a354e] text-sm">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentRows.length === 0 ? (
                <tr><td colSpan={7} className="text-center p-4">No bookings found</td></tr>
              ) : (
                currentRows.map((b) => {
                  const message = getStatusMessage(b.status, b.firstName);
                  return (
                    <tr key={b._id} className="border-b border-[#2E5B84] hover:bg-blue-50">
                      <td className="p-3 border border-[#2E5B84] text-sm">{b.firstName} {b.lastName}</td>
                      <td className="p-3 border border-[#2E5B84] text-sm">{b.phone}</td>
                      <td className="p-3 border border-[#2E5B84] text-sm">{b.taxiId ? b.taxiId.name : "—"}</td>
                      <td className="p-3 border border-[#2E5B84] text-sm">{b.pickupLocation}</td>
                      <td className="p-3 border border-[#2E5B84] text-sm">{b.dropLocation}</td>
                      <td className="p-3 border border-[#2E5B84] text-sm">
                        <select
                          value={b.status || "Pending"}
                          onChange={(e) => handleStatusChange(b._id, e.target.value)}
                          className={`px-2 py-1 rounded w-full max-w-[140px] ${
                            b.status === "Confirmed" ? "bg-green-100 text-green-700" :
                            b.status === "Cancelled" ? "bg-red-100 text-red-700" :
                            b.status === "Completed" ? "bg-blue-100 text-blue-700" :
                            "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Completed">Completed</option>
                        </select>

                        {/* WhatsApp & Email buttons */}
                        <div className="flex gap-1 mt-1 justify-center">
                          <a
                            href={`https://wa.me/${b.phone}?text=${encodeURIComponent(message)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-700 text-white px-2 py-1 rounded text-xs"
                          >
                            WhatsApp
                          </a>
                          {b.email && (
                            <a
                              href={`mailto:${b.email}?subject=Taxi Booking Update&body=${encodeURIComponent(message)}`}
                              className="bg-gray-700 text-white px-2 py-1 rounded text-xs"
                            >
                              Email
                            </a>
                          )}
                        </div>
                      </td>

                      {/* Delete & View Details */}
                      <td className=" py-4 flex justify-center items-center gap-2">
                        <button
                          className="bg-[#2E5B84] text-white px-3 py-1 rounded hover:bg-[#1E3A60] transition text-sm"
                          
                          onClick={() => setSelectedBooking(b)}
                        >
                          View
                        </button>
                        <button
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm"
                  
                          onClick={() => handleDelete(b._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ---------------- PAGINATION ---------------- */}
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

        {/* ---------------- MODAL ---------------- */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6 relative">
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                onClick={() => setSelectedBooking(null)}
              >
                ✕
              </button>

              <h3 className="text-2xl font-bold mb-4">Booking Details</h3>

              <div className="space-y-2 text-sm">
                <p><strong>Name:</strong> {selectedBooking.firstName} {selectedBooking.lastName}</p>
                <p><strong>Phone:</strong> {selectedBooking.phone}</p>
                <p><strong>Vehicle:</strong> {selectedBooking.taxiId ? selectedBooking.taxiId.name : "—"}</p>
                <p><strong>Service Type:</strong> {selectedBooking.serviceType}</p>
                <p><strong>Pickup:</strong> {selectedBooking.pickupLocation} at {selectedBooking.pickupTime} on {selectedBooking.pickupDate}</p>
                {selectedBooking.dropLocation && <p><strong>Drop:</strong> {selectedBooking.dropLocation} {selectedBooking.dropDate && `on ${selectedBooking.dropDate}`}</p>}
                <p><strong>Adults:</strong> {selectedBooking.adults}</p>
                <p><strong>Children:</strong> {selectedBooking.children}</p>
                {selectedBooking.message && <p><strong>Message:</strong> {selectedBooking.message}</p>}
                <p><strong>Members:</strong> {selectedBooking.members}</p>

                {/* Status selector */}
                <div className="mt-2">
                  <label className="block font-semibold mb-1">Status:</label>
                  <select
                    value={selectedBooking.status || "Pending"}
                    onChange={(e) => handleStatusChange(selectedBooking._id, e.target.value)}
                    className="px-2 py-1 rounded border w-full"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <a
                  href={`tel:${selectedBooking.phone}`}
                  className="flex-1 bg-gray-700 text-white px-3 py-2 rounded text-center hover:bg-gray-800"
                >
                  Call
                </a>
                <a
                  href={`https://wa.me/${selectedBooking.phone}?text=${encodeURIComponent(getStatusMessage(selectedBooking.status, selectedBooking.firstName))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-700 text-white px-3 py-2 rounded text-center hover:bg-green-800"
                >
                  WhatsApp
                </a>
                {selectedBooking.email && (
                  <a
                    href={`mailto:${selectedBooking.email}?subject=Taxi Booking Update&body=${encodeURIComponent(getStatusMessage(selectedBooking.status, selectedBooking.firstName))}`}
                    className="flex-1 bg-gray-500 text-white px-3 py-2 rounded text-center hover:bg-gray-600"
                  >
                    Email
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickTaxiBookingAdmin;
