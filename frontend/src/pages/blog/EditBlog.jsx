import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import BlogForm from "../../components/admin/BlogForm";
import axios from "axios";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", slug: "", content: "", heroImgFile: null, heroImgPreview: "" });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blog/${id}`);
        const blog = res.data;
        setFormData({ title: blog.title, slug: blog.slug, content: blog.content, heroImgPreview: blog.heroImg });
      } catch (err) {
        console.error(err);
        alert("Error fetching blog");
      }
    };
    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("slug", formData.slug);
    data.append("content", formData.content);
    if (formData.heroImgFile) data.append("heroImg", formData.heroImgFile);

    try {
      await axios.put(`http://localhost:5000/api/blog/${id}`, data, { headers: { "Content-Type": "multipart/form-data" } });
      alert("Blog updated successfully!");
      navigate("/admin/blogs");
    } catch (err) {
      console.error(err);
      alert("Error updating blog");
    }
  };

  return (
    <div className="flex">
      <div className="w-64 fixed h-screen"><AdminSidebar /></div>
      <div className="flex-1 ml-64"><BlogForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} submitLabel="Edit Blog" /></div>
    </div>
  );
}
