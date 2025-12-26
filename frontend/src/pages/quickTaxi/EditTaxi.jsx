import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import TaxiForm from "../../components/admin/TaxiForm";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditTaxi() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // ---------------- FETCH TAXI ----------------
  useEffect(() => {
    axiosInstance
      .get(`/quick-taxi/taxis`)
      .then((res) => {
        const taxi = res.data.taxis.find((t) => t._id === id);

        if (!taxi) {
          toast.error("Vehicle not found!", {
            onClose: () => navigate("/admin/taxis"),
          });
          return;
        }

        setFormData({
          name: taxi.name || "",
          seats: taxi.seats || 4,
          transmission: taxi.transmission || "",
          luggage: taxi.luggage || "",
          capacity: taxi.capacity || "",
          ac: taxi.ac ?? true,
          imageFile: null,
          imagePreview: taxi.image || "",
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch vehicle!", {
          onClose: () => navigate("/admin/taxis"),
        });
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  // ---------------- UPDATE TAXI ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData) return;
  
    setIsSaving(true);
  
    try {
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("transmission", formData.transmission);
      fd.append("seats", formData.seats);
      fd.append("luggage", formData.luggage);
      fd.append("capacity", formData.capacity);
      fd.append("ac", formData.ac);
  
      if (formData.imageFile) {
        fd.append("imageFile", formData.imageFile); // ✅ FIXED
      }
  
      await axiosInstance.put(
        `/quick-taxi/taxis/${id}`, // ✅ FIXED URL
        fd
      );
  
      toast.success("Vehicle updated successfully!", {
        onClose: () => navigate("/admin/taxis"),
        autoClose: 3000,
      });
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      toast.error("Failed to update vehicle!");
    } finally {
      setIsSaving(false);
    }
  };  

  // ---------------- LOADING ----------------
  if (loading || !formData) {
    return (
      <div className="flex-1 ml-64 p-6 bg-white min-h-screen flex items-center justify-center">
        <p className="text-[#2E5B84] text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="w-64 fixed h-screen">
        <AdminSidebar />
      </div>

      <div className="flex-1 ml-64 p-6 bg-white min-h-screen">
        <TaxiForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          submitLabel={isSaving ? "Saving..." : "Update Vehicle"}
        />
      </div>
    </div>
  );
}
