import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminSidebar from "../../components/admin/AdminSidebar";
import RoundTourForm from "../../components/admin/RoundTourForm";

export default function EditRoundTour() {
  const { id } = useParams();
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

  // ---------- Fetch Tour & Detail ----------
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/round-tours/${id}`);
        const { tour, details } = res.data;

        setFormData({
          title: tour.title || "",
          days: tour.days || "",
          location: tour.location || "",
          desc: tour.desc || "",
          imgFile: null,
          imgPreview: tour.img || "",

          heroTitle: details?.heroTitle || "",
          heroSubtitle: details?.heroSubtitle || "",
          heroImageFile: null,
          heroImagePreview: details?.heroImage || "",

          highlights: details?.highlights || [],
          itinerary: details?.itinerary || [],
          inclusions: details?.inclusions || [],
          exclusions: details?.exclusions || [],
          offers: details?.offers || [],
          tourFacts: details?.tourFacts || { duration: "", groupSize: "", difficulty: "" },

          gallerySlides: (details?.gallerySlides || []).map(s => ({
            title: s.title,
            desc: s.desc,
            imageFile: null,
            imagePreview: s.image,
          })),
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load round tour");
      }
    };

    fetchTour();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // ---------- Update Tour Card ----------
      const tourData = new FormData();
      tourData.append("title", formData.title);
      tourData.append("days", formData.days);
      tourData.append("location", formData.location);
      tourData.append("desc", formData.desc);
      if (formData.imgFile) tourData.append("img", formData.imgFile);

      await axios.put(`http://localhost:5000/api/round-tours/${id}`, tourData);

      // ---------- Update Tour Detail ----------
      const detailData = new FormData();
      detailData.append("heroTitle", formData.heroTitle);
      detailData.append("heroSubtitle", formData.heroSubtitle);
      if (formData.heroImageFile) detailData.append("heroImage", formData.heroImageFile);

      detailData.append("highlights", JSON.stringify(formData.highlights));
      detailData.append("itinerary", JSON.stringify(formData.itinerary));
      detailData.append("inclusions", JSON.stringify(formData.inclusions));
      detailData.append("exclusions", JSON.stringify(formData.exclusions));
      detailData.append("offers", JSON.stringify(formData.offers));
      detailData.append("tourFacts", JSON.stringify(formData.tourFacts));

      formData.gallerySlides.forEach(slide => {
        if (slide.imageFile) detailData.append("galleryImages", slide.imageFile);
      });
      detailData.append(
        "gallerySlides",
        JSON.stringify(formData.gallerySlides.map(s => ({ title: s.title, desc: s.desc })))
      );

      await axios.put(`http://localhost:5000/api/round-tours/detail/${id}`, detailData);

      toast.success("Round Tour updated", { onClose: () => navigate("/admin/round-tours") });
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <ToastContainer />
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
