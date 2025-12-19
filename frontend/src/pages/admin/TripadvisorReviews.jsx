import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminSidebar from "../../components/admin/AdminSidebar";

const TripadvisorReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // reviews per page

  // ---------------- FETCH ALL REVIEWS ----------------
  const fetchReviews = async () => {
    try {
      const res = await axiosInstance.get("/reviews");
      if (res.data.success) setReviews(res.data.reviews);
    } catch (err) {
      console.error("Error fetching TripAdvisor reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // ---------------- DELETE REVIEW ----------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      const res = await axiosInstance.delete(`/reviews/${id}`);
      if (res.data.success) {
        toast.success("Review deleted");
        fetchReviews();
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  // ---------------- PAGINATION LOGIC ----------------
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = reviews.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(reviews.length / rowsPerPage);

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
          Manage TripAdvisor Reviews
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
                  No reviews found
                </td>
              </tr>
            ) : (
              currentRows.map((r) => (
                <tr key={r._id} className="border-b border-[#2E5B84] hover:bg-blue-50">
                  <td className="p-3 border border-[#2E5B84]">{r.name}</td>
                  <td className="p-3 border border-[#2E5B84]">{r.email}</td>
                  <td className="p-3 border border-[#2E5B84]">{r.rating}</td>
                  <td className="p-3 border border-[#2E5B84]">{r.message}</td>
                  <td className="p-3 border border-[#2E5B84]">{new Date(r.createdAt).toLocaleString()}</td>
                  <td className="p-3 border border-[#2E5B84]">
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      onClick={() => handleDelete(r._id)}
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

export default TripadvisorReviews;
