import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminSidebar from "../../components/admin/AdminSidebar";
import RoundTourForm from "../../components/admin/RoundTourForm";

export default function AddRoundTour() {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    days: "",
    location: "",
    desc: "",
    imgFile: null,
    imgPreview: "",
    heroTitle: "",
    heroSubtitle: "",
    heroImageFile: null,
    heroImagePreview: "",
    highlights: [],
    itinerary: [],
    inclusions: [],
    exclusions: [],
    offers: [],
    tourFacts: { duration: "", groupSize: "", difficulty: "" },
    gallerySlides: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // ---------- Upload Tour Card ----------
      const tourData = new FormData();
      tourData.append("title", formData.title);
      tourData.append("days", formData.days);
      tourData.append("location", formData.location);
      tourData.append("desc", formData.desc);
      if (formData.imgFile) tourData.append("img", formData.imgFile);

      const tourRes = await axiosInstance.post(
        "/round-tours",
        tourData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const tourId = tourRes.data.tour._id;

      // ---------- Upload Tour Detail ----------
      const detailData = new FormData();
      detailData.append("tourId", tourId);
      detailData.append("heroTitle", formData.heroTitle);
      detailData.append("heroSubtitle", formData.heroSubtitle);
      if (formData.heroImageFile) detailData.append("heroImage", formData.heroImageFile);

      detailData.append("highlights", JSON.stringify(formData.highlights));
      detailData.append("itinerary", JSON.stringify(formData.itinerary));
      detailData.append("inclusions", JSON.stringify(formData.inclusions));
      detailData.append("exclusions", JSON.stringify(formData.exclusions));
      detailData.append("offers", JSON.stringify(formData.offers));
      detailData.append("tourFacts", JSON.stringify(formData.tourFacts));

      // Attach gallery images
      formData.gallerySlides.forEach(slide => {
        if (slide.imageFile) detailData.append("galleryImages", slide.imageFile);
      });
      detailData.append(
        "gallerySlides",
        JSON.stringify(formData.gallerySlides.map(s => ({ title: s.title, desc: s.desc })))
      );

      await axiosInstance.post(
        "/round-tours/detail",
        detailData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Round Tour added successfully!", {
        onClose: () => navigate("/admin/round-tours"),
        autoClose: 3000,
      });
    } catch (err) {
      console.error(err);
      toast.error("Error adding round tour!");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-64 fixed h-full">
        <AdminSidebar />
      </div>
      <div className="flex-1 ml-64 p-6 bg-gray-50">
        <RoundTourForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          submitLabel={isSaving ? "Saving..." : "Add Round Tour"}
        />
      </div>
    </div>
  );
}
