import React, { useState } from "react";
import { axiosInstance } from "../../lib/axios";
import DestinationForm from "../../components/admin/DestinationForm";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddDestination() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    subtitle: "",
    title: "",
    imgPreview: "",
    imgFile: null,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const fd = new FormData();
      fd.append("subtitle", formData.subtitle);
      fd.append("title", formData.title);
      if (formData.imgFile) fd.append("imgFile", formData.imgFile);

      await axiosInstance.post("/destination", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Destination created successfully!", {
        onClose: () => navigate("/admin/destinations"),
        autoClose: 3000,
      });
    } catch (err) {
      console.error(err);
      toast.error("Error creating destination!");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-64 fixed h-screen">
        <AdminSidebar />
      </div>
      <div className="flex-1 ml-64 p-6 bg-blue-50 min-h-screen">
        <DestinationForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          submitLabel={isSaving ? "Saving..." : "Create Destination"}
        />
      </div>
    </div>
  );
}
