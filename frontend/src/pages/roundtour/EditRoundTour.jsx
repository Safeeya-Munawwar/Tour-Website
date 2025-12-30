import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";
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

  const sanitizeArray = (arr) =>
    arr.map(item => typeof item === "string" ? item : item.text || "");
  
  const cleanFormData = {
    ...formData,
    highlights: sanitizeArray(formData.highlights),
    inclusions: sanitizeArray(formData.inclusions),
    exclusions: sanitizeArray(formData.exclusions),
    offers: sanitizeArray(formData.offers),
  };
  

  // ---------- Fetch Tour & Detail ----------
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axiosInstance.get(`/round-tours/${id}`);
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
    // ----------------- Tour Card -----------------
    const tourData = new FormData();
    tourData.append("title", formData.title);
    tourData.append("days", formData.days);
    tourData.append("location", formData.location);
    tourData.append("desc", formData.desc);
    tourData.append("img", formData.imgFile || ""); // always append

    await axiosInstance.put(`/round-tours/${id}`, tourData);

    // ----------------- Tour Detail -----------------
    const detailData = new FormData();
    detailData.append("heroTitle", formData.heroTitle);
    detailData.append("heroSubtitle", formData.heroSubtitle);
    detailData.append("heroImage", formData.heroImageFile || ""); // always append

    detailData.append("itinerary", JSON.stringify(formData.itinerary));
    detailData.append("tourFacts", JSON.stringify(formData.tourFacts));
    detailData.append("highlights", JSON.stringify(cleanFormData.highlights));
    detailData.append("inclusions", JSON.stringify(cleanFormData.inclusions));
    detailData.append("exclusions", JSON.stringify(cleanFormData.exclusions));
    detailData.append("offers", JSON.stringify(cleanFormData.offers));

    // Gallery images
    formData.gallerySlides.forEach((slide) => {
      detailData.append("galleryImages", slide.imageFile || ""); // preserve order
    });
    detailData.append(
      "gallerySlides",
      JSON.stringify(formData.gallerySlides.map((s) => ({ title: s.title, desc: s.desc })))
    );

    await axiosInstance.put(`/round-tours/detail/${id}`, detailData);

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
