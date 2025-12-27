import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import TaxiForm from "../../components/admin/TaxiForm";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export default function EditTaxi() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    axiosInstance.get("/quick-taxi/taxis").then((res) => {
      const taxi = res.data.taxis.find((t) => t._id === id);
      setFormData({
        name: taxi.name,
        transmission: taxi.transmission,
        seats: taxi.seats,
        luggage: taxi.luggage,
        capacity: taxi.capacity,
        ac: taxi.ac,
        imageFile: null,
        imagePreview: taxi.image,
      });
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) fd.append(key, value);
    });

    await axiosInstance.put(`/quick-taxi/taxis/${id}`, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    toast.success("Vehicle updated!", {
      onClose: () => navigate("/admin/taxis"),
    });
  };

  if (!formData) return null;

  return (
    <div className="flex">
      <ToastContainer />
      <div className="w-64 fixed h-screen">
        <AdminSidebar />
      </div>
      <div className="flex-1 ml-64 p-6 bg-white min-h-screen">
        <TaxiForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          submitLabel="Update Vehicle"
        />
      </div>
    </div>
  );
}
