import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminSidebar from "../../components/admin/AdminSidebar";
import BlogForm from "../../components/admin/BlogForm";
import axios from "axios";

export default function AddBlog() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    subtitle: "",
    description: "",
    contentParagraphs: [],
    heroImgFile: null,
    heroImgPreview: "",
  });
  
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const data = new FormData();
    data.append("slug", formData.slug);
data.append("title", formData.title);
data.append("subtitle", formData.subtitle);
data.append("description", formData.description);
data.append("content", (formData.contentParagraphs || []).join("\n\n"));
if (formData.heroImgFile) data.append("heroImg", formData.heroImgFile);


    try {
      await axios.post("http://localhost:5000/api/blog", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Blog added successfully!", {
        onClose: () => navigate("/admin/blogs"),
        autoClose: 3000,
      });
    } catch (err) {
      console.error(err);
      toast.error("Error adding blog!");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-64 fixed h-full"><AdminSidebar /></div>
      <div className="flex-1 ml-64 p-6 bg-gray-50">
        <BlogForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          submitLabel={isSaving ? "Saving..." : "Add Blog"}
        />
      </div>
    </div>
  );
}
