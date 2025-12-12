import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";

export default function BlogView() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blog/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
        alert("Error fetching blog data.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!blog)
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">Blog Not Found</h2>
      </div>
    );

  const paragraphs = blog.content ? blog.content.split(/\r?\n\r?\n/) : [];

  return (
    <div className="flex font-poppins bg-gray-50 min-h-screen">
      {/* SIDEBAR */}
      <div className="w-64 fixed h-screen">
        <AdminSidebar />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {blog.title}
          </h1>
          <div className="flex gap-2">
            <Link
              to={`/admin/blogs/edit/${blog._id}`}
              className="bg-[#2E5B84] text-white px-4 py-2 rounded hover:bg-[#1E3A60] transition"
            >
              Edit
            </Link>
            <Link
              to="/admin/blogs"
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
            >
              Back
            </Link>
          </div>
        </div>

        {/* Subtitle & Description */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{blog.subtitle}</h2>
          <p className="text-gray-700">{blog.description}</p>
        </div>

        {/* Metadata */}
        <div className="flex flex-col md:flex-row gap-4 text-gray-500 mb-6">
          <div>
            <strong>Created:</strong>{" "}
            {new Date(blog.createdAt).toLocaleDateString()}
          </div>
          <div>
            <strong>Slug:</strong> {blog.slug}
          </div>
        </div>

        {/* Hero Image */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Hero Image</h3>
          <div className="w-full md:w-96 h-64 md:h-72 overflow-hidden rounded-xl shadow-lg">
            <img
              src={blog.heroImg || "/images/default.jpg"}
              alt={blog.title}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* Blog Content */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Content</h3>
          {paragraphs.length > 0 ? (
            paragraphs.map((p, i) => (
              <p key={i} className="text-gray-700 mb-4 leading-relaxed">
                {p}
              </p>
            ))
          ) : (
            <p className="text-gray-500">No content available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
