import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import BlogForm from "../../components/admin/BlogForm";
import axios from "axios";

export default function AddBlog() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", slug: "", content: "", heroImgFile: null, heroImgPreview: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("slug", formData.slug);
    data.append("content", formData.content);
    if (formData.heroImgFile) data.append("heroImg", formData.heroImgFile);

    try {
      await axios.post("http://localhost:5000/api/blog", data, { headers: { "Content-Type": "multipart/form-data" } });
      alert("Blog added successfully!");
      navigate("/admin/blogs");
    } catch (err) {
      console.error(err);
      alert("Error adding blog");
    }
  };

  return (
    <div className="flex">
      <div className="w-64 fixed h-screen"><AdminSidebar /></div>
      <div className="flex-1 ml-64"><BlogForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} submitLabel="Add Blog" /></div>
    </div>
  );
}
