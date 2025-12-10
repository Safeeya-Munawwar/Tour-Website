import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../../components/admin/AdminSidebar";

export default function RoundTourList() {
  const [tours, setTours] = useState([]);

  const fetchTours = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/round-tours");
      setTours(res.data.tours || []);
    } catch (err) {
      console.error(err);
      alert("Error fetching round tours");
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this round tour?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/round-tours/${id}`);
      fetchTours();
    } catch (err) {
      console.error(err);
      alert("Error deleting round tour");
    }
  };

  return (
    <div className="flex">
      <div className="w-64 fixed h-screen"><AdminSidebar /></div>

      <div className="flex-1 ml-64 p-6 bg-white min-h-screen">
        <h2 className="text-4xl font-bold text-[#0d203a] mb-4 px-5 mt-4">Round Tours</h2>

        <div className="flex justify-end mb-8">
          <Link to="/admin/round-tours/new" className="bg-[#2E5B84] text-white px-4 py-2 rounded hover:bg-[#1E3A60]">+ Add Round Tour</Link>
        </div>

        <table className="w-full bg-white border border-[#1a354e] rounded shadow">
          <thead className="bg-[#0d203a] text-white">
            <tr>
              <th className="p-3 border border-[#1a354e]">Image</th>
              <th className="p-3 border border-[#1a354e]">Title</th>
              <th className="p-3 border border-[#1a354e]">Days</th>
              <th className="p-3 border border-[#1a354e] text-center w-36">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour) => (
              <tr key={tour._id} className="border-b border-[#2E5B84] hover:bg-blue-50">
                <td className="p-2 border border-[#2E5B84] text-center">
                  <img src={tour.img} alt={tour.title} className="h-12 w-12 object-cover rounded mx-auto" />
                </td>
                <td className="p-3 border border-[#2E5B84]">{tour.title}</td>
                <td className="p-3 border border-[#2E5B84]">{tour.days}</td>
                <td className="py-4 flex justify-center items-center gap-2">
                  <Link to={`/admin/round-tours/edit/${tour._id}`} className="bg-[#2E5B84] text-white px-3 py-1 rounded hover:bg-[#1E3A60] text-sm">Edit</Link>
                  <button onClick={() => handleDelete(tour._id)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm">Delete</button>
                </td>
              </tr>
            ))}

            {tours.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">No round tours found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}