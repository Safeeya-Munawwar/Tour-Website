import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminSidebar from "../../components/admin/AdminSidebar";
import RoundTourForm from "../../components/admin/RoundTourForm";

export default function EditRoundTour() {
  const navigate = useNavigate();
  const { id } = useParams();

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

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/round-tours/${id}`);
        const { tour, details } = res.data;

        setFormData({
          title: tour.title,
          days: tour.days,
          location: tour.location,
          desc: tour.desc,
          imgFile: null,
          imgPreview: tour.img || "",
          heroTitle: details.heroTitle || "",
          heroSubtitle: details.heroSubtitle || "",
          heroImageFile: null,
          heroImagePreview: details.heroImage || "",
          highlights: (details.highlights || []).map(h => ({ ...h, imageFile: null, imagePreview: h.image })),
          aboutParagraphs: details.aboutParagraphs || ["", ""],
          historyTitle: details.historyTitle || "",
          historyLeftList: details.historyLeftList || [],
          historyRightList: details.historyRightList || [],
          itinerary: details.itinerary || [],
          tourFacts: details.tourFacts || {},
          gallerySlides: (details.gallerySlides || []).map(g => ({ ...g, imageFile: null, imagePreview: g.image })),
        });
      } catch (err) {
        console.error(err);
        toast.error("Error loading tour data");
      }
    };
    fetchTour();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // ----- Update Tour Card -----
      const tourData = new FormData();
      tourData.append("title", formData.title);
      tourData.append("days", formData.days || "");
      tourData.append("location", formData.location || "");
      tourData.append("desc", formData.desc);
      if (formData.imgFile) tourData.append("img", formData.imgFile);

      await axios.put(`http://localhost:5000/api/round-tours/${id}`, tourData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // ----- Update Tour Detail -----
      const detailData = new FormData();
      detailData.append("heroTitle", formData.heroTitle);
      detailData.append("heroSubtitle", formData.heroSubtitle);
      if (formData.heroImageFile) detailData.append("heroImage", formData.heroImageFile);

      // Highlights
      detailData.append(
        "highlights",
        JSON.stringify(formData.highlights.map(h => ({ title: h.title, desc: h.desc, image: h.imagePreview })))
      );
      formData.highlights.forEach((h, idx) => {
        if (h.imageFile) detailData.append(`highlightImage_${idx}`, h.imageFile);
      });

      // Gallery
      detailData.append(
        "gallerySlides",
        JSON.stringify(formData.gallerySlides.map(g => ({ title: g.title, desc: g.desc, image: g.imagePreview })))
      );
      formData.gallerySlides.forEach((g, idx) => {
        if (g.imageFile) detailData.append(`galleryImage_${idx}`, g.imageFile);
      });

      // Other info
      detailData.append("aboutParagraphs", JSON.stringify(formData.aboutParagraphs));
      detailData.append("historyTitle", formData.historyTitle);
      detailData.append("historyLeftList", JSON.stringify(formData.historyLeftList));
      detailData.append("historyRightList", JSON.stringify(formData.historyRightList));
      detailData.append("itinerary", JSON.stringify(formData.itinerary));
      detailData.append("tourFacts", JSON.stringify(formData.tourFacts));

      await axios.put(`http://localhost:5000/api/round-tours/detail/${id}`, detailData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Round Tour updated successfully!", {
        onClose: () => navigate("/admin/round-tours"),
        autoClose: 3000,
      });
    } catch (err) {
      console.error(err);
      toast.error("Error updating round tour: " + (err.response?.data?.error || err.message));
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
          submitLabel={isSaving ? "Saving..." : "Update Round Tour"}
        />
      </div>
    </div>
  );
}
