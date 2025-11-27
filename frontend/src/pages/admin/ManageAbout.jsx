import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminManageAbout = () => {
  const [aboutData, setAboutData] = useState({
    subtitle: "ABOUT NETLANKA TOURS",
    heading: "",
    description: "",
    fullDescription: "",
    features: [{ title: "", description: "", image: "" }],
    teamMembers: [{ name: "", role: "", image: "" }],
    gallery: [],
  });

  const [files, setFiles] = useState({
    featureImages: [],
    teamImages: [],
    galleryFiles: [],
  });

  const fetchAbout = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/about");
      if (res.data) {
        setAboutData({
          ...res.data,
          cta: res.data.cta || { text: "", buttonText: "", buttonLink: "", buttonIcon: "" },
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load About page data");
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const handleChange = (e, section, index, field) => {
    if (section) {
      const updated = [...aboutData[section]];
      updated[index][field] = e.target.value;
      setAboutData({ ...aboutData, [section]: updated });
    } else {
      setAboutData({ ...aboutData, [e.target.name]: e.target.value });
    }
  };

  const handleAddItem = (section, template = {}) => {
    setAboutData({ ...aboutData, [section]: [...aboutData[section], template] });
  };

  const handleRemoveItem = (section, idx) => {
    const updated = [...aboutData[section]];
    updated.splice(idx, 1);
    setAboutData({ ...aboutData, [section]: updated });
    if (section === "features") {
      const updatedFiles = [...files.featureImages];
      updatedFiles.splice(idx, 1);
      setFiles({ ...files, featureImages: updatedFiles });
    } else if (section === "teamMembers") {
      const updatedFiles = [...files.teamImages];
      updatedFiles.splice(idx, 1);
      setFiles({ ...files, teamImages: updatedFiles });
    }
  };

  // Delete existing gallery URL
const handleDeleteExistingGalleryItem = (index) => {
    const updatedGallery = [...aboutData.gallery];
    updatedGallery.splice(index, 1);
    setAboutData({ ...aboutData, gallery: updatedGallery });
  };
  
  // Delete new file before upload
  const handleDeleteGalleryFile = (index) => {
    const updatedFiles = [...files.galleryFiles];
    updatedFiles.splice(index, 1);
    setFiles({ ...files, galleryFiles: updatedFiles });
  };
  

  const handleDrop = (acceptedFiles, type, index) => {
    if (type === "featureImages" || type === "teamImages") {
      const arr = [...files[type]];
      arr[index] = acceptedFiles[0];
      setFiles({ ...files, [type]: arr });
      // Immediately update the preview
      const updated = [...aboutData[type === "featureImages" ? "features" : "teamMembers"]];
      updated[index].image = URL.createObjectURL(acceptedFiles[0]);
      setAboutData({ ...aboutData, [type === "featureImages" ? "features" : "teamMembers"]: updated });
    } else if (type === "galleryFiles") {
      const newFiles = [...files[type], ...acceptedFiles];
      setFiles({ ...files, [type]: newFiles });
    }
  };

  const Dropzone = ({ type, index }) => {
    const { getRootProps, getInputProps } = useDropzone({
      onDrop: (acceptedFiles) => handleDrop(acceptedFiles, type, index),
      accept: { "image/*": [], "video/*": [] },
    });

    return (
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-blue-400 rounded-md p-4 text-center cursor-pointer hover:bg-blue-50 transition"
      >
        <input {...getInputProps()} />
        <p className="text-blue-600">
          Drag & drop {type.includes("gallery") ? "images/videos" : "image"} here or click
        </p>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(aboutData));
  
      // Add files
      files.featureImages.forEach((file) => file && formData.append("featureImages", file));
      files.teamImages.forEach((file) => file && formData.append("teamImages", file));
      files.galleryFiles.forEach((file) => file && formData.append("galleryImages", file));
  
      const res = await axios.post("http://localhost:5000/api/about", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      // ✅ Immediate feedback
      if (res.status === 200) {
        toast.success("About page updated successfully!");
        setAboutData(res.data); // update local state immediately
      } else {
        toast.error("Failed to update About page");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update About page");
    }
  };
  

  return (
    <div className="flex">
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Sidebar */}
      <div className="w-64 fixed h-screen">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6 bg-blue-50">
        <h2 className="text-3xl font-bold mb-6 text-blue-800">Manage About Page</h2>

        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded shadow-md">
          {/* General Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              name="subtitle"
              value={aboutData.subtitle}
              onChange={handleChange}
              placeholder="Subtitle"
              className="border p-3 w-full rounded focus:ring-2 focus:ring-blue-300"
            />
            <input
              name="heading"
              value={aboutData.heading}
              onChange={handleChange}
              placeholder="Heading"
              className="border p-3 w-full rounded focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <textarea
            name="description"
            value={aboutData.description}
            onChange={handleChange}
            placeholder="Description"
            className="border p-3 w-full rounded focus:ring-2 focus:ring-blue-300"
            rows={4}
          />
          <textarea
            name="fullDescription"
            value={aboutData.fullDescription}
            onChange={handleChange}
            placeholder="Full Description"
            className="border p-3 w-full rounded focus:ring-2 focus:ring-blue-300"
            rows={6}
          />

          {/* Features */}
          <h3 className="text-xl font-semibold text-blue-800 mt-6 mb-2">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aboutData.features.map((feat, idx) => (
              <div key={idx} className="border p-4 rounded space-y-3 bg-blue-50">
                <input
                  value={feat.title || ""}
                  onChange={(e) => handleChange(e, "features", idx, "title")}
                  placeholder="Title"
                  className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-300"
                />
                <textarea
                  value={feat.description || ""}
                  onChange={(e) => handleChange(e, "features", idx, "description")}
                  placeholder="Description"
                  className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-300"
                />
                <Dropzone type="featureImages" index={idx} />
                {feat.image && (
                  <div className="flex justify-center relative">
                    <img
                      src={feat.image}
                      alt="feature"
                      className="w-40 max-h-40 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveItem("features", idx)}
                      className="absolute top-1 right-1 bg-red-600 text-white px-1 rounded text-xs"
                    >
                      X
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => handleAddItem("features", { title: "", description: "", image: "" })}
            className="text-blue-600 underline"
          >
            Add Feature
          </button>

          {/* Team Section */}
          <h3 className="text-xl font-semibold text-blue-800 mt-6 mb-2">Team Members</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aboutData.teamMembers.map((member, idx) => (
              <div key={idx} className="border p-4 rounded space-y-3 bg-blue-50">
                <input
                  value={member.name || ""}
                  onChange={(e) => handleChange(e, "teamMembers", idx, "name")}
                  placeholder="Name"
                  className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-300"
                />
                <input
                  value={member.role || ""}
                  onChange={(e) => handleChange(e, "teamMembers", idx, "role")}
                  placeholder="Role"
                  className="border p-2 w-full rounded focus:ring-2 focus:ring-blue-300"
                />
                <Dropzone type="teamImages" index={idx} />
                {member.image && (
                  <div className="flex justify-center relative">
                    <img
                      src={member.image}
                      alt="team"
                      className="w-40 max-h-40 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveItem("teamMembers", idx)}
                      className="absolute top-1 right-1 bg-red-600 text-white px-1 rounded text-xs"
                    >
                      X
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() =>
              handleAddItem("teamMembers", { name: "", role: "", image: "" })
            }
            className="text-blue-600 underline"
          >
            Add Team Member
          </button>

         {/* Gallery Section */}
<h3 className="text-xl font-semibold text-blue-800 mt-6 mb-2">
  Gallery (Images & Videos)
</h3>
<Dropzone type="galleryFiles" />

<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">

  {/* Existing gallery from backend */}
  {aboutData.gallery?.map((url, idx) => (
    <div className="relative" key={`existing-${idx}`}>
      {url.endsWith(".mp4") ? (
        <video src={url} controls className="w-40 max-h-40 rounded" />
      ) : (
        <img src={url} alt="gallery" className="w-40 max-h-40 object-cover rounded" />
      )}
      <button
        type="button"
        onClick={() => handleDeleteExistingGalleryItem(idx)}
        className="absolute top-1 right-1 bg-red-600 text-white px-1 rounded text-xs"
      >
        X
      </button>
    </div>
  ))}

  {/* New gallery files before upload */}
  {files.galleryFiles.map((file, i) => {
    const url = URL.createObjectURL(file);
    return file.type.startsWith("video") ? (
      <div className="relative" key={`new-${i}`}>
        <video src={url} controls className="w-40 max-h-40 rounded" />
        <button
          type="button"
          onClick={() => handleDeleteGalleryFile(i)}
          className="absolute top-1 right-1 bg-red-600 text-white px-1 rounded text-xs"
        >
          X
        </button>
      </div>
    ) : (
      <div className="relative" key={`new-${i}`}>
        <img src={url} alt="gallery" className="w-40 max-h-40 object-cover rounded" />
        <button
          type="button"
          onClick={() => handleDeleteGalleryFile(i)}
          className="absolute top-1 right-1 bg-red-600 text-white px-1 rounded text-xs"
        >
          X
        </button>
      </div>
    );
  })}
</div>


          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded mt-4 hover:bg-blue-700 transition"
          >
            Save About Page
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminManageAbout;
