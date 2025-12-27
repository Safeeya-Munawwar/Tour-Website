import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

const CustomizeTourBookingAdmin = () => {
  const [inquiries, setInquiries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const rowsPerPage = 5;

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const res = await axiosInstance.get("/tailor-made-tours/inquiries");
      setInquiries(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch inquiries");
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axiosInstance.put(`/tailor-made-tours/inquiries/${id}`, {
        status: newStatus,
      });

      // Update inquiries array in state
      setInquiries((prev) =>
        prev.map((inq) =>
          inq._id === id ? { ...inq, status: newStatus } : inq
        )
      );

      // Update modal if it's open for the same inquiry
      if (selectedInquiry && selectedInquiry._id === id) {
        setSelectedInquiry({ ...selectedInquiry, status: newStatus });
      }

      toast.success("Status updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  const deleteInquiry = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?"))
      return;
    try {
      await axiosInstance.delete(`/tailor-made-tours/inquiries/${id}`);
      toast.success("Inquiry deleted!");
      fetchInquiries();
      setSelectedInquiry(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete inquiry.");
    }
  };

  const getSanitizedPhone = (phone) => (phone ? phone.replace(/\D/g, "") : "");

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = inquiries.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(inquiries.length / rowsPerPage);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  const getStatusMessage = (status, fullName) => {
    switch (status) {
      case "Confirmed":
        return `Hello ${fullName}, your tour booking has been approved! 🎉`;
      case "Cancelled":
        return `Hello ${fullName}, your tour booking has been cancelled 😔`;
      case "Completed":
        return `Hello ${fullName}, your tour booking is completed. Thank you! 😊`;
      case "Pending":
      default:
        return `Hello ${fullName}, your tour booking is pending. We'll update you soon.`;
    }
  };

  return (
    <div className="flex">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="w-64 fixed h-screen">
        <AdminSidebar />
      </div>

      <div className="flex-1 ml-64 p-6 bg-white min-h-screen">
        <h2 className="text-4xl font-bold text-[#0d203a] mb-6 px-5 mt-4">
          Manage Customize Tour Bookings
        </h2>

        <div className="overflow-x-auto max-w-full">
          <table className="w-full table-fixed border border-[#1a354e] rounded mb-6 text-center">
            <thead className="bg-[#0d203a] text-white">
              <tr>
                <th className="p-3 border border-[#1a354e] text-sm">Name</th>
                <th className="p-3 border border-[#1a354e] text-sm">Phone</th>
                <th className="p-3 border border-[#1a354e] text-sm">
                  Location
                </th>
                <th className="p-3 border border-[#1a354e] text-sm">Members</th>
                <th className="p-3 border border-[#1a354e] text-sm">Budget</th>
                <th className="p-3 border border-[#1a354e] text-sm">Status</th>
                <th className="p-3 border border-[#1a354e] text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-4">
                    No bookings found
                  </td>
                </tr>
              ) : (
                currentRows.map((inq) => {
                  const message = getStatusMessage(inq.status, inq.fullName);
                  return (
                    <tr
                      key={inq._id}
                      className="border-b border-[#2E5B84] hover:bg-blue-50"
                    >
                      <td className="p-3 border border-[#2E5B84] text-sm">
                        {inq.fullName}
                      </td>
                      <td className="p-3 border border-[#2E5B84] text-sm">
                        {inq.phone}
                      </td>
                      <td className="p-3 border border-[#2E5B84] text-sm">
                        {inq.pickupLocation || "—"}{" "}
                        <span className="text-red-600 font-semibold">🡆</span>{" "}
                        {inq.dropLocation || "—"}
                      </td>
                      <td className="p-3 border border-[#2E5B84] text-sm">
                        {Number(inq.adults || 0) + Number(inq.children || 0)}
                      </td>
                      <td className="p-3 border border-[#2E5B84] text-sm">
                        {inq.currency && inq.budget
                          ? `${inq.currency} ${Number(
                              inq.budget
                            ).toLocaleString()}`
                          : "—"}
                      </td>
                      <td className="p-3 border border-[#2E5B84] text-sm">
                        <select
                          value={inq.status || "Pending"}
                          onChange={(e) =>
                            handleStatusChange(inq._id, e.target.value)
                          }
                          className={`px-2 py-1 rounded w-full max-w-[140px] ${
                            inq.status === "Confirmed"
                              ? "bg-green-100 text-green-700"
                              : inq.status === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : inq.status === "Completed"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
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
                            href={`https://wa.me/${getSanitizedPhone(
                              inq.phone
                            )}?text=${encodeURIComponent(message)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-700 text-white px-2 py-2 rounded text-xs"
                          >
                            <FaWhatsapp />
                          </a>

                          {inq.email && (
                            <a
                              href={`mailto:${
                                inq.email
                              }?subject=Taxi Booking Update&body=${encodeURIComponent(
                                message
                              )}`}
                              className="bg-gray-700 text-white px-2 py-2 rounded text-xs"
                            >
                              <FaEnvelope />
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="flex justify-center items-center gap-2 mt-3 py-4">
                        <button
                          className="bg-[#2E5B84] text-white px-3 py-1 rounded hover:bg-[#1E3A60] transition text-sm"
                          onClick={() => setSelectedInquiry(inq)}
                        >
                          View
                        </button>
                        <button
                          onClick={() => deleteInquiry(inq._id)}
                          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 text-sm"
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

        {/* PAGINATION */}
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

        {/* MODAL */}
        {selectedInquiry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-center bg-[#0d203a] px-6 py-3 flex-shrink-0">
                <h3 className="text-xl font-bold text-white">
                  Customize Tour Booking Details
                </h3>
                <button
                  className="text-white text-xl font-bold hover:text-gray-300 transition"
                  onClick={() => setSelectedInquiry(null)}
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4 text-sm text-gray-700 overflow-y-auto flex-1">
                <div className="grid grid-cols-2 gap-0 border border-blue-950 rounded">
                  {/* Name */}
                  <p className="p-2 border-b border-r border-blue-950 font-semibold bg-gray-50">
                    Name:
                  </p>
                  <p className="p-2 border-b border-blue-950">
                    {selectedInquiry.title} {selectedInquiry.fullName}
                  </p>

                  {/* Country*/}
                  <p className="p-2 border-b border-r border-blue-950 font-semibold bg-gray-50">
                    Country:
                  </p>
                  <p className="p-2 border-b border-blue-950">
                    {selectedInquiry.country || "—"}
                  </p>

                  {/* Email */}
                  <p className="p-2 border-b border-r border-blue-950 font-semibold bg-gray-50">
                    Email:
                  </p>
                  <p className="p-2 border-b border-blue-950">
                    {selectedInquiry.email || "—"}
                  </p>

                  {/* Phone */}
                  <p className="p-2 border-b border-r border-blue-950 font-semibold bg-gray-50">
                    Phone:
                  </p>
                  <p className="p-2 border-b border-blue-950">
                    {selectedInquiry.phone}
                  </p>

                  {/* Pickup */}
                  <p className="p-2 border-b border-r border-blue-950 font-semibold bg-gray-50">
                    Pickup Location:
                  </p>
                  <p className="p-2 border-b border-blue-950">
                    {selectedInquiry.pickupLocation || "—"}
                  </p>

                  <p className="p-2 border-b border-r border-blue-950 font-semibold bg-gray-50">
                    Pickup Date:
                  </p>
                  <p className="p-2 border-b border-blue-950">
                    {selectedInquiry.startDate
                      ? new Date(selectedInquiry.startDate).toLocaleDateString()
                      : "—"}
                  </p>

                  {/* Drop */}
                  <p className="p-2 border-b border-r border-blue-950 font-semibold bg-gray-50">
                    Drop Location:
                  </p>
                  <p className="p-2 border-b border-blue-950">
                    {selectedInquiry.dropLocation || "—"}
                  </p>

                  <p className="p-2 border-b border-r border-blue-950 font-semibold bg-gray-50">
                    Drop Date:
                  </p>
                  <p className="p-2 border-b border-blue-950">
                    {selectedInquiry.endDate
                      ? new Date(selectedInquiry.endDate).toLocaleDateString()
                      : "—"}
                  </p>

                  {/* Adults */}
                  <p className="p-2 border-b border-r border-blue-950 font-semibold bg-gray-50">
                    Adults:
                  </p>
                  <p className="p-2 border-b border-blue-950">
                    {selectedInquiry.adults || 0}
                  </p>

                  {/* Children */}
                  <p className="p-2 border-b border-r border-blue-950 font-semibold bg-gray-50">
                    Children:
                  </p>
                  <p className="p-2 border-b border-blue-950">
                    {selectedInquiry.children || 0}
                  </p>

                  {/* Budget */}
                  <p className="p-2 border-b border-r border-blue-950 font-semibold bg-gray-50">
                    Budget:
                  </p>
                  <p className="p-2 border-b border-blue-950">
                    {selectedInquiry.currency && selectedInquiry.budget
                      ? `${selectedInquiry.currency} ${selectedInquiry.budget}`
                      : "—"}
                  </p>

                  <p className="p-2 border-b border-r border-blue-950 font-semibold bg-gray-50">
                    Destinations:
                  </p>
                  <p className="p-2 border-b border-blue-950">
                    {selectedInquiry.selectedDestinations &&
                    selectedInquiry.selectedDestinations.length > 0
                      ? selectedInquiry.selectedDestinations.join(", ")
                      : "—"}
                  </p>

                  {/* Notes */}
                  {selectedInquiry.notes && (
                    <>
                      <p className="p-2 border-r border-blue-950 font-semibold bg-gray-50">
                        Note:
                      </p>
                      <p className="p-2 break-words">{selectedInquiry.notes}</p>
                    </>
                  )}
                </div>

                {/* Status selector */}
                <div className="mt-2">
                  <label className="block font-semibold mb-1">Status:</label>
                  <select
                    value={selectedInquiry.status || "Pending"}
                    onChange={(e) =>
                      handleStatusChange(selectedInquiry._id, e.target.value)
                    }
                    className="px-2 py-1 rounded border w-full"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              {/* Call / WhatsApp / Email buttons */}
              <div className="flex flex-col sm:flex-row gap-3 px-6 py-4 flex-shrink-0">
                <a
                  href={`tel:${selectedInquiry.phone}`}
                  className="flex-1 bg-gray-700 text-white rounded px-4 py-2 text-center hover:bg-gray-800 transition"
                >
                  Call
                </a>
                <a
                  href={`https://wa.me/${getSanitizedPhone(
                    selectedInquiry.phone
                  )}?text=${encodeURIComponent(
                    getStatusMessage(
                      selectedInquiry.status,
                      selectedInquiry.fullName
                    )
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-700 text-white rounded px-4 py-2 text-center hover:bg-green-800 transition"
                >
                  WhatsApp
                </a>
                {selectedInquiry.email && (
                  <a
                    href={`mailto:${
                      selectedInquiry.email
                    }?subject=Customize Tour Booking Update&body=${encodeURIComponent(
                      getStatusMessage(
                        selectedInquiry.status,
                        selectedInquiry.fullName
                      )
                    )}`}
                    className="flex-1 bg-blue-600 text-white rounded px-4 py-2 text-center hover:bg-blue-700 transition"
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

export default CustomizeTourBookingAdmin;
