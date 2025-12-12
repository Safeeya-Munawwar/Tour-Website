import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminSidebar from "../../components/admin/AdminSidebar";
import RoundTourForm from "../../components/admin/RoundTourForm";

export default function AddRoundTour() {
  const navigate = useNavigate();

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
    aboutParagraphs: ["", ""],
    historyTitle: "",
    historyLeftList: [],
    historyRightList: [],
    itinerary: [],
    tourFacts: {},
    gallerySlides: [],
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // ----- Tour Card Data -----
      const tourData = new FormData();
      tourData.append("title", formData.title);
      tourData.append("days", formData.days || "");
      tourData.append("location", formData.location || "");
      tourData.append("desc", formData.desc);
      if (formData.imgFile) tourData.append("img", formData.imgFile);

      const tourRes = await axios.post("http://localhost:5000/api/round-tours", tourData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const tourId = tourRes.data.tour._id;

      // ----- Tour Detail Data -----
      const detailData = new FormData();
      detailData.append("tourId", tourId);
      detailData.append("heroTitle", formData.heroTitle || "");
      detailData.append("heroSubtitle", formData.heroSubtitle || "");
      if (formData.heroImageFile) detailData.append("heroImage", formData.heroImageFile);

      // Highlights
      detailData.append(
        "highlights",
        JSON.stringify((formData.highlights || []).map(h => ({ title: h.title, desc: h.desc, image: h.imagePreview || "" })))
      );
      (formData.highlights || []).forEach((h, idx) => {
        if (h.imageFile) detailData.append(`highlightImage_${idx}`, h.imageFile);
      });

      // Gallery
      detailData.append(
        "gallerySlides",
        JSON.stringify((formData.gallerySlides || []).map(g => ({ title: g.title, desc: g.desc, image: g.imagePreview || "" })))
      );
      (formData.gallerySlides || []).forEach((g, idx) => {
        if (g.imageFile) detailData.append(`galleryImage_${idx}`, g.imageFile);
      });

      // Other info
      detailData.append("aboutParagraphs", JSON.stringify(formData.aboutParagraphs || []));
      detailData.append("historyTitle", formData.historyTitle || "");
      detailData.append("historyLeftList", JSON.stringify(formData.historyLeftList || []));
      detailData.append("historyRightList", JSON.stringify(formData.historyRightList || []));
      detailData.append("itinerary", JSON.stringify(formData.itinerary || []));
      detailData.append("tourFacts", JSON.stringify(formData.tourFacts || {}));

      await axios.post("http://localhost:5000/api/round-tours/detail", detailData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Round Tour added successfully!", {
        onClose: () => navigate("/admin/round-tours"),
        autoClose: 3000,
      });
    } catch (err) {
      console.error(err);
      toast.error("Error adding round tour: " + (err.response?.data?.error || err.message));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-64 fixed h-full"><AdminSidebar /></div>
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
