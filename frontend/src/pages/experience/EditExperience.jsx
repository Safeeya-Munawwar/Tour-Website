import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminSidebar from "../../components/admin/AdminSidebar";
import ExperienceForm from "../../components/admin/ExperienceForm";

export default function EditExperience() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    subtitle: "",
    description: "",
    mainDesc: "",
    subDesc: "",
    heroImgFile: null,
    mainImgFile: null,
    galleryFiles: [],
    gallery: [],
    removeGallery: [],
    subExperienceFiles: [],
    subPreviews: {},
    subExperiences: [],
    tips: [],
    heroImgPreview: "",
    mainImgPreview: "",
    heroImg: "",
    mainImg: "",
  });

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/experience/${id}`
        );
        const exp = res.data;
        setFormData({
          slug: exp.slug || "",
          title: exp.title || "",
          subtitle: exp.subtitle || "",
          description: exp.description || "",
          mainDesc: exp.mainDesc || "",
          subDesc: exp.subDesc || "",
          heroImg: exp.heroImg || "",
          mainImg: exp.mainImg || "",
          gallery: exp.gallery || [],
          subExperiences: exp.subExperiences || [],
          tips: exp.tips || [],
          galleryFiles: [],
          subExperienceFiles: [],
          removeGallery: [],
          heroImgPreview: "",
          mainImgPreview: "",
        });
      } catch (err) {
        console.error(err);
        toast.error("Error fetching experience data!");
      }
    };
    fetchExperience();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const data = new FormData();
      const jsonData = {
        slug: formData.slug,
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.description,
        mainDesc: formData.mainDesc,
        subDesc: formData.subDesc,
        subExperiences: formData.subExperiences,
        tips: formData.tips,
        removeGallery: formData.removeGallery || [],
      };

      data.append("data", JSON.stringify(jsonData));

      if (formData.heroImgFile) data.append("heroImg", formData.heroImgFile);
      if (formData.mainImgFile) data.append("mainImg", formData.mainImgFile);

      (formData.galleryFiles || []).forEach((file) =>
        data.append("galleryFiles", file)
      );
      (formData.subExperienceFiles || []).forEach((file, i) =>
        data.append(`subExperienceImages${i}`, file)
      );

      const res = await axios.put(
        `http://localhost:5000/api/experience/${id}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.status === 200) {
        toast.success("Experience updated successfully!", {
          onClose: () => navigate("/admin/experiences"),
        });
      } else {
        toast.error("Failed to update experience!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating experience!");
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
      <div className="flex-1 ml-64 p-6 bg-white min-h-screen">
        <ExperienceForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          submitLabel={isSaving ? "Saving..." : "Edit Experience"}
          isSaving={isSaving}
        />
      </div>
    </div>
  );
}
