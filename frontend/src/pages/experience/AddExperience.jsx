import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import ExperienceForm from "../../components/admin/ExperienceForm";

export default function AddExperience() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    subtitle: "",
    mainDesc: "",
    subDesc: "",
    heroImgFile: null,
    mainImgFile: null,
    galleryFiles: [],
    subExperiences: [],
    tips: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("slug", formData.slug);
      data.append("title", formData.title);
      data.append("subtitle", formData.subtitle);
      data.append("mainDesc", formData.mainDesc);
      data.append("subDesc", formData.subDesc);

      if (formData.heroImgFile) data.append("heroImgFile", formData.heroImgFile);
      if (formData.mainImgFile) data.append("mainImgFile", formData.mainImgFile);
      formData.galleryFiles.forEach((file) => data.append("galleryFiles", file));

      data.append("subExperiences", JSON.stringify(formData.subExperiences));
      data.append("tips", JSON.stringify(formData.tips));

      await axios.post("http://localhost:5000/api/experience", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Experience added successfully!");
      navigate("/admin/experiences");
    } catch (err) {
      console.error(err);
      alert("Error adding experience.");
    }
  };

  return (
    <div className="flex">
      <div className="w-64 fixed h-screen">
        <AdminSidebar />
      </div>
      <div className="flex-1 ml-64">
        <ExperienceForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          submitLabel="Add Experience"
        />
      </div>
    </div>
  );
}
