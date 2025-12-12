import React, { useEffect, useState } from "react";
import axios from "axios";
import DestinationForm from "../../components/admin/DestinationForm";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditDestination() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/destination/${id}`)
      .then((res) => {
        const d = res.data;
        if (!d) {
          toast.error("Destination not found!", {
            onClose: () => navigate("/admin/destinations"),
          });
          return;
        }
        setFormData({
          subtitle: d.subtitle || "",
          title: d.title || "",
          imgPreview: d.img || "",
          imgFile: null,
        });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch destination!", {
          onClose: () => navigate("/admin/destinations"),
        });
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData) return;
    setIsSaving(true);

    try {
      const fd = new FormData();
      fd.append("subtitle", formData.subtitle);
      fd.append("title", formData.title);
      if (formData.imgFile) fd.append("imgFile", formData.imgFile);

      await axios.put(`http://localhost:5000/api/destination/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Destination updated successfully!", {
        onClose: () => navigate("/admin/destinations"),
        autoClose: 3000,
      });
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      toast.error("Failed to update destination!");
    } finally {
      setIsSaving(false);
    }
  };

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
        <DestinationForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          submitLabel={isSaving ? "Saving..." : "Update Destination"}
        />
      </div>
    </div>
  );
}
