import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminSidebar from "../../components/admin/AdminSidebar";
import BlogForm from "../../components/admin/BlogForm";
import axios from "axios";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", slug: "", content: "", heroImgFile: null, heroImgPreview: "" });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blog/${id}`);
        const blog = res.data;
        setFormData({ title: blog.title, slug: blog.slug, content: blog.content, heroImgPreview: blog.heroImg });
      } catch (err) {
        console.error(err);
        toast.error("Error fetching blog!");
      }
    };
    fetchBlog();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("slug", formData.slug);
    data.append("content", formData.content);
    if (formData.heroImgFile) data.append("heroImg", formData.heroImgFile);

    try {
      await axios.put(`http://localhost:5000/api/blog/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Blog updated successfully!", {
        onClose: () => navigate("/admin/blogs"),
        autoClose: 3000,
      });
    } catch (err) {
      console.error(err);
      toast.error("Error updating blog!");
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
          submitLabel={isSaving ? "Saving..." : "Update Blog"}
        />
      </div>
    </div>
  );
}
