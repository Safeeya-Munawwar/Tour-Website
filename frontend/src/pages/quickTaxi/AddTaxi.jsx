import React, { useState } from "react";
import { axiosInstance } from "../../lib/axios";
import TaxiForm from "../../components/admin/TaxiForm";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function AddTaxi() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    seats: 4,
    capacity: "",
    luggage: "",
    ac: true,
    transmission: "Manual", // default value
    imageFile: null,
    imagePreview: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) fd.append(key, value);
      });

      await axiosInstance.post("/quick-taxi/taxis", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Vehicle added successfully!", {
        onClose: () => navigate("/admin/taxis"),
      });
    } catch {
      toast.error("Failed to add vehicle!");
    }
  };

  return (
    <div className="flex">
      <ToastContainer />
      <div className="w-64 fixed h-screen">
        <AdminSidebar />
      </div>
      <div className="flex-1 ml-64 p-6 bg-blue-50 min-h-screen">
        <TaxiForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          submitLabel="Add Vehicle"
        />
      </div>
    </div>
  );
}
