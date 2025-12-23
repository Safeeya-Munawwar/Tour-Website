import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminSidebar from "../../components/admin/AdminSidebar";

const DayTourBookingAdmin = () => {
  const [bookings, setBookings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // ---------------- FETCH BOOKINGS ----------------
  const fetchBookings = async () => {
    try {
      // Day Tour Booking API
      const resDay = await axiosInstance.get("/day-tour-booking");
      const dayBookings = resDay.data.success
        ? resDay.data.bookings.map((b) => ({ ...b, source: "day" }))
        : [];

      // Common Tour Booking API (filter day tours only)
      const resCommon = await axiosInstance.get("/book-tour");
      const commonDayBookings = resCommon.data.success
        ? resCommon.data.bookings
            .filter((b) => b.tourType === "day")
            .map((b) => ({ ...b, source: "common" }))
        : [];

      // Combine both and sort by createdAt descending (newest first)
      const allBookings = [...dayBookings, ...commonDayBookings].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setBookings(allBookings);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      toast.error("Failed to fetch bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ---------------- UPDATE STATUS ----------------
  const handleStatusChange = async (id, newStatus, source) => {
    const apiPath =
      source === "day" ? `/day-tour-booking/${id}` : `/book-tour/${id}`;

    const toastId = toast.info("Updating status...", { autoClose: false });

    try {
      const res = await axiosInstance.patch(apiPath, { status: newStatus });

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
  const handleDelete = async (id, source) => {
    if (!window.confirm("Are you sure you want to delete this booking?"))
      return;

    try {
      const apiPath =
        source === "day" ? `/day-tour-booking/${id}` : `/book-tour/${id}`;

      const res = await axiosInstance.delete(apiPath);

      if (res.data.success) {
        toast.success("Booking deleted");
        fetchBookings();
      }
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  // ---------------- PAGINATION LOGIC ----------------
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = bookings.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(bookings.length / rowsPerPage);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

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
          Manage Day Tour Bookings
        </h2>

        <div className="overflow-x-auto max-w-full">
          <table className="w-full table-fixed border border-[#1a354e] rounded mb-6 text-center">
            <thead className="bg-[#0d203a] text-white">
              <tr>
                <th className="p-3 border border-[#1a354e] text-sm break-words whitespace-normal">
                  Tour Title
                </th>
                <th className="p-3 border border-[#1a354e] text-sm break-words whitespace-normal">
                  Location
                </th>
                <th className="p-3 border border-[#1a354e] text-sm break-words whitespace-normal">
                  Name
                </th>
                <th className="p-3 border border-[#1a354e] text-sm break-words whitespace-normal">
                  Email
                </th>
                <th className="p-3 border border-[#1a354e] text-sm break-words whitespace-normal">
                  Phone
                </th>
                <th className="p-3 border border-[#1a354e] text-sm break-words whitespace-normal">
                  Adults
                </th>
                <th className="p-3 border border-[#1a354e] text-sm break-words whitespace-normal">
                  Children
                </th>
                <th className="p-3 border border-[#1a354e] text-sm break-words whitespace-normal">
                  Pickup Location
                </th>
                <th className="p-3 border border-[#1a354e] text-sm break-words whitespace-normal">
                  Date
                </th>
                <th className="p-3 border border-[#1a354e] text-sm break-words whitespace-normal">
                  Time
                </th>
                <th className="p-3 border border-[#1a354e] text-sm break-words whitespace-normal">
                  Message
                </th>
                <th className="p-3 border border-[#1a354e] text-sm break-words whitespace-normal">
                  Status
                </th>
                <th className="p-3 border border-[#1a354e] text-sm break-words whitespace-normal">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length === 0 ? (
                <tr>
                  <td colSpan={11} className="text-center p-4">
                    No bookings found
                  </td>
                </tr>
              ) : (
                currentRows.map((b) => (
                  <tr
                    key={b._id}
                    className="border-b border-[#2E5B84] hover:bg-blue-50"
                  >
                    <td className="p-3 border border-[#2E5B84] text-sm break-words whitespace-normal">
                      {b.tourId?.title || "—"}
                    </td>
                    <td className="p-3 border border-[#2E5B84] text-sm break-words whitespace-normal">
                      {b.tourId?.location || "—"}
                    </td>
                    <td className="p-3 border border-[#2E5B84] text-sm break-words whitespace-normal">
                      {b.name}
                    </td>
                    <td className="p-3 border border-[#2E5B84] text-sm break-words whitespace-normal">
                      {b.email}
                    </td>
                    <td className="p-3 border border-[#2E5B84] text-sm break-words whitespace-normal">
                      {b.phone}
                    </td>
                    <td className="p-3 border border-[#2E5B84] text-sm break-words whitespace-normal">
                      {b.adults || 0}
                    </td>
                    <td className="p-3 border border-[#2E5B84] text-sm break-words whitespace-normal">
                      {b.children || 0}
                    </td>
                    <td className="p-3 border border-[#2E5B84] text-sm break-words whitespace-normal">
                      {b.pickupLocation || "—"}
                    </td>
                    <td className="p-3 border border-[#2E5B84] text-sm break-words whitespace-normal">
                      {b.startDate || "—"}
                    </td>
                    <td className="p-3 border border-[#2E5B84] text-sm break-words whitespace-normal">
                      {b.startTime || "—"}
                    </td>
                    <td className="p-3 border border-[#2E5B84] text-sm break-words whitespace-normal">
                      {b.message || "—"}
                    </td>
                    <td className="p-2 border border-[#2E5B84] text-sm">
                      <div className="flex justify-center">
                        <select
                          value={b.status || "Pending"}
                          onChange={(e) =>
                            handleStatusChange(b._id, e.target.value, b.source)
                          }
                          className={`px-2 py-1 rounded text-sm w-full max-w-[140px]
                      ${
                        b.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : b.status === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : b.status === "Completed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                    `}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </td>
                    <td className="p-3 border border-[#2E5B84] text-sm break-words whitespace-normal">
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        onClick={() => handleDelete(b._id, b.source)}
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

export default DayTourBookingAdmin;
