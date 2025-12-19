import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminSidebar from "../../components/admin/AdminSidebar";

const CustomizeTourBookingAdmin = () => {
  const [inquiries, setInquiries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // -------------------- Fetch Inquiries --------------------
  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await axiosInstance.get(
        "/tailor-made-tours/inquiries"
      );
      setInquiries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- UPDATE STATUS ----------------
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosInstance.put(
        `/tailor-made-tours/inquiries/${id}`,
        { status: newStatus },
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("Status updated successfully");
      fetchInquiries();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  const deleteInquiry = async (id) => {
    try {
      await axiosInstance.delete(
        `/tailor-made-tours/inquiries/${id}`
      );
      toast.success("Inquiry deleted!");
      fetchInquiries();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete inquiry.");
    }
  };

  // ---------------- PAGINATION LOGIC ----------------
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = inquiries.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(inquiries.length / rowsPerPage);

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
          Manage Customize Tour Bookings
        </h2>

        <div className="overflow-x-auto max-w-full">
          <table className="w-full table-fixed border border-[#1a354e] rounded mb-6 text-center">
            <thead className="bg-[#0d203a] text-white">
              <tr>
                <th className="p-3 border border-[#1a354e] text-sm break-words whitespace-normal">
                  Full Name
                </th>
                <th className="p-3 border border-[#1a354e] text-sm break-words whitespace-normal">
                  Email
                </th>
                <th className="p-3 border border-[#1a354e] text-sm break-words whitespace-normal">
                  Phone
                </th>
                <th className="p-3 border border-[#1a354e] text-sm break-words whitespace-normal">
                  Pickup Location
                  <br />
                  <span className="text-m text-gray-300">(Start Date)</span>
                </th>
                <th className="p-3 border border-[#1a354e] text-sm break-words whitespace-normal">
                  Drop Location
                  <br />
                  <span className="text-m text-gray-300">(End Date)</span>
                </th>
                <th className="p-3 border border-[#1a354e] text-sm break-words whitespace-normal">
                  Travelers
                </th>
                <th className="p-3 border border-[#1a354e] text-sm break-words whitespace-normal">
                  Interests
                </th>
                <th className="p-3 border border-[#1a354e] text-sm break-words whitespace-normal">
                  Budget
                </th>
                <th className="p-3 border border-[#1a354e] text-sm break-words whitespace-normal">
                  Note
                </th>
                <th className="p-3 border border-[#1a354e] text-sm break-words whitespace-normal">
                  Status
                </th>
                <th className="p-3 border border-[#1a354e] text-sm break-words whitespace-normal">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((inq) => (
                <tr
                  key={inq._id}
                  className="border-b border-[#2E5B84] hover:bg-blue-50"
                >
                  <td className="p-3 border border-[#2E5B84] text-sm break-words whitespace-normal">
                    {inq.fullName}
                  </td>
                  <td className="p-3 border border-[#2E5B84] text-sm break-words whitespace-normal">
                    {inq.email}
                  </td>
                  <td className="p-3 border border-[#2E5B84] text-sm break-words whitespace-normal">
                    {inq.phone}
                  </td>
                  <td className="p-3 border border-[#2E5B84] text-sm break-words whitespace-normal">
                    {inq.pickupLocation || "—"}
                    <br />
                    <span className="text-sm text-gray-700">
                      {inq.startDate
                        ? new Date(inq.startDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "—"}
                    </span>
                  </td>

                  <td className="p-3 border border-[#2E5B84] text-sm break-words whitespace-normal">
                    {inq.dropLocation || "—"}
                    <br />
                    <span className="text-sm text-gray-700">
                      {inq.endDate
                        ? new Date(inq.endDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "—"}
                    </span>
                  </td>
                  <td className="p-3 border border-[#2E5B84] text-sm break-words whitespace-normal">
                    {inq.travelers}
                  </td>
                  <td className="p-3 border border-[#2E5B84] text-sm break-words whitespace-normal">
                    {inq.interests?.join(", ") || "—"}
                  </td>
                  <td className="p-3 border border-[#2E5B84] text-sm break-words whitespace-normal">
                    {inq.budget != null && inq.budget !== ""
                      ? `${inq.currency || "USD"} ${Number(
                          inq.budget
                        ).toLocaleString()}`
                      : "—"}
                  </td>
                  <td className="p-3 border border-[#2E5B84] text-sm break-words whitespace-normal">
                    {inq.notes}
                  </td>
                  <td className="p-2 border border-[#2E5B84] text-sm">
                    <div className="flex justify-center">
                      <select
                        value={inq.status || "Pending"}
                        onChange={(e) =>
                          handleStatusChange(inq._id, e.target.value)
                        }
                        className={`px-2 py-1 rounded text-sm w-full max-w-[140px]
        ${
          inq.status === "Approved"
            ? "bg-green-100 text-green-700"
            : inq.status === "Cancelled"
            ? "bg-red-100 text-red-700"
            : inq.status === "Completed"
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
                      onClick={() => deleteInquiry(inq._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
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

export default CustomizeTourBookingAdmin;
