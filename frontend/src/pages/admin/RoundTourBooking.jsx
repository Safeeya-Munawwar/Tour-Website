import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

const RoundTourBookingAdmin = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const rowsPerPage = 5;

  // ---------------- FETCH BOOKINGS ----------------
  const fetchRoundTourBookings = async () => {
    try {
      const resRound = await axiosInstance.get("/round-tour-booking");
      const roundBookings = resRound.data.success
        ? resRound.data.bookings.map((b) => ({ ...b, source: "round" }))
        : [];

      const resCommon = await axiosInstance.get("/book-tour");
      const commonRoundBookings = resCommon.data.success
        ? resCommon.data.bookings
            .filter((b) => b.tourType === "round")
            .map((b) => ({ ...b, source: "common" }))
        : [];

      const allBookings = [...roundBookings, ...commonRoundBookings].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setBookings(allBookings);
    } catch (err) {
      console.error("Error fetching round tour bookings:", err);
      toast.error("Failed to fetch bookings");
    }
  };

  useEffect(() => {
    fetchRoundTourBookings();
  }, []);

  // ---------------- UPDATE STATUS ----------------
  const handleStatusChange = async (id, newStatus, source) => {
    const apiPath =
      source === "round" ? `/round-tour-booking/${id}` : `/book-tour/${id}`;
    const toastId = toast.info("Updating status...", { autoClose: false });

    try {
      const res = await axiosInstance.patch(apiPath, { status: newStatus });

      if (res.data.success) {
        toast.update(toastId, {
          render: "Status updated!",
          type: "success",
          autoClose: 3000,
          isLoading: false,
        });
        fetchRoundTourBookings();
        if (selectedBooking && selectedBooking._id === id)
          setSelectedBooking({ ...selectedBooking, status: newStatus });
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
  const handleDelete = async (id, source) => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;

    try {
      const apiPath =
        source === "round" ? `/round-tour-booking/${id}` : `/book-tour/${id}`;
      const res = await axiosInstance.delete(apiPath);

      if (res.data.success) {
        toast.success("Booking deleted");
        fetchRoundTourBookings();
        if (selectedBooking && selectedBooking._id === id)
          setSelectedBooking(null);
      } else toast.error("Delete failed");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  // ---------------- MESSAGE GENERATOR ----------------
  const getStatusMessage = (status, name) => {
    switch (status) {
      case "Approved":
        return `Hello ${name}, your round tour booking has been approved! 🎉`;
      case "Cancelled":
        return `Hello ${name}, we are sorry to inform you that your round tour booking has been cancelled. 😔`;
      case "Completed":
        return `Hello ${name}, your round tour booking has been completed. Thank you! 😊`;
      case "Pending":
      default:
        return `Hello ${name}, your round tour booking is pending. We'll update you soon.`;
    }
  };

  const getSanitizedPhone = (phone) => (phone ? phone.replace(/\D/g, "") : "");

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
          Manage Round Tour Bookings
        </h2>

        {/* ---------------- TABLE ---------------- */}
        <div className="overflow-x-auto max-w-full">
          <table className="w-full table-fixed border border-[#1a354e] rounded mb-6 text-center">
            <thead className="bg-[#0d203a] text-white">
              <tr>
                <th className="p-3 border border-[#1a354e] text-sm">Tour</th>
                <th className="p-3 border border-[#1a354e] text-sm">Name</th>
                <th className="p-3 border border-[#1a354e] text-sm">Phone</th>
                <th className="p-3 border border-[#1a354e] text-sm">Members</th>
                <th className="p-3 border border-[#1a354e] text-sm">
                  Pickup Location
                </th>
                <th className="p-3 border border-[#1a354e] text-sm">Date</th>
                <th className="p-3 border border-[#1a354e] text-sm">Status</th>
                <th className="p-3 border border-[#1a354e] text-sm">Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentRows.length === 0 ? (
                <tr>
                  <td colSpan={12} className="text-center p-4">
                    No bookings found
                  </td>
                </tr>
              ) : (
                currentRows.map((b) => {
                  const message = getStatusMessage(b.status, b.name);
                  return (
                    <tr
                      key={b._id}
                      className="border-b border-[#2E5B84] hover:bg-blue-50"
                    >
                      <td className="p-3 border border-[#2E5B84] text-sm">
                        {b.tourId?.title || "—"}
                      </td>
                      <td className="p-3 border border-[#2E5B84] text-sm">
                        {b.name}
                      </td>
                      <td className="p-3 border border-[#2E5B84] text-sm">
                        {b.phone}
                      </td>
                      <td className="p-3 border border-[#2E5B84] text-sm">
                        {Number(b.adults || 0) + Number(b.children || 0)}
                      </td>
                      <td className="p-3 border border-[#2E5B84] text-sm">
                        {b.pickupLocation || "—"}
                      </td>
                      <td className="p-3 border border-[#2E5B84] text-sm">
                        {b.startDate || "—"}
                      </td>
                      <td className="p-3 border border-[#2E5B84] text-sm">
                        {/* Status selector */}
                        <div className="flex justify-center">
                          <select
                            value={b.status || "Pending"}
                            onChange={(e) =>
                              handleStatusChange(
                                b._id,
                                e.target.value,
                                b.source
                              )
                            }
                            className={`px-2 py-1 rounded w-full max-w-[140px] ${
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
                        </div>

                        {/* WhatsApp & Email buttons below */}
                        <div className="flex gap-1 justify-center mt-2">
                          <a
                            href={`https://wa.me/${getSanitizedPhone(
                              b.phone
                            )}?text=${encodeURIComponent(message)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-700 text-white px-2 py-2 rounded text-xs flex items-center justify-center"
                          >
                            <FaWhatsapp />
                          </a>
                          {b.email && (
                            <a
                              href={`mailto:${
                                b.email
                              }?subject=Round Tour Booking Update&body=${encodeURIComponent(
                                message
                              )}`}
                              className="bg-gray-700 text-white px-2 py-2 rounded text-xs flex items-center justify-center"
                            >
                              <FaEnvelope />
                            </a>
                          )}
                        </div>
                      </td>

                      <td className="flex justify-center items-center gap-2 mt-3 py-4">
                        <button
                          className="bg-[#2E5B84] text-white px-3 py-1 rounded hover:bg-[#1E3A60] transition text-sm"
                          onClick={() => setSelectedBooking(b)}
                        >
                          View
                        </button>
                        <button
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm"
                          onClick={() => handleDelete(b._id, b.source)}
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
            <span className="px-4 py-1">
              Page {currentPage} of {totalPages}
            </span>
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
                <p>
                  <strong>Tour:</strong> {selectedBooking.tourId?.title || "—"}
                </p>
                <p>
                  <strong>Name:</strong> {selectedBooking.name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedBooking.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedBooking.phone}
                </p>
                <p>
                  <strong>Adults:</strong> {selectedBooking.adults || 0}
                </p>
                <p>
                  <strong>Children:</strong> {selectedBooking.children || 0}
                </p>
                <p>
                  <strong>Pickup:</strong>{" "}
                  {selectedBooking.pickupLocation || "—"} on{" "}
                  {selectedBooking.startDate || "—"} at{" "}
                  {selectedBooking.startTime || "—"}
                </p>
                {selectedBooking.message && (
                  <p>
                    <strong>Message:</strong> {selectedBooking.message}
                  </p>
                )}

                {/* Status selector */}
                <div className="mt-2">
                  <label className="block font-semibold mb-1">Status:</label>
                  <select
                    value={selectedBooking.status || "Pending"}
                    onChange={(e) =>
                      handleStatusChange(
                        selectedBooking._id,
                        e.target.value,
                        selectedBooking.source
                      )
                    }
                    className="px-2 py-1 rounded border w-full"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
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
                  href={`https://wa.me/${getSanitizedPhone(
                    selectedBooking.phone
                  )}?text=${encodeURIComponent(
                    getStatusMessage(
                      selectedBooking.status,
                      selectedBooking.fullName
                    )
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-700 text-white px-3 py-2 rounded text-center hover:bg-green-800"
                >
                  WhatsApp
                </a>
                {selectedBooking.email && (
                  <a
                    href={`mailto:${
                      selectedBooking.email
                    }?subject=Round Tour Booking Update&body=${encodeURIComponent(
                      getStatusMessage(
                        selectedBooking.status,
                        selectedBooking.name
                      )
                    )}`}
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

export default RoundTourBookingAdmin;
