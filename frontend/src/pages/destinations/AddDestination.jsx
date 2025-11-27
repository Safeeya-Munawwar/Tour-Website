import React, { useState } from "react";
import axios from "axios";
import DestinationForm from "../../components/admin/DestinationForm";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useNavigate } from "react-router-dom";

export default function AddDestination() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    subtitle: "",
    title: "",
    imgPreview: "",
    imgFile: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("subtitle", formData.subtitle);
    fd.append("title", formData.title);
    if (formData.imgFile) fd.append("imgFile", formData.imgFile); // must match backend field name


    await axios.post("http://localhost:5000/api/destination", fd);

    navigate("/admin/destinations");
  };

  return (
    <div className="flex">
      <div className="w-64 fixed h-screen">
        <AdminSidebar />
      </div>

      <div className="flex-1 ml-64 p-6 bg-blue-50 min-h-screen">
        <DestinationForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          submitLabel="Create Destination"
        />
      </div>
    </div>
  );
}
