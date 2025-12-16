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

  // Fetch existing tour data
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const tourRes = await axios.get(`http://localhost:5000/api/round-tours/${id}`);
        const detailRes = await axios.get(`http://localhost:5000/api/round-tours/detail/${id}`);

        const tour = tourRes.data.tour;
        const detail = detailRes.data.detail;

        setFormData({
          title: tour.title || "",
          days: tour.days || "",
          location: tour.location || "",
          desc: tour.desc || "",
          imgFile: null,
          imgPreview: tour.img || "",
          heroTitle: detail.heroTitle || "",
          heroSubtitle: detail.heroSubtitle || "",
          heroImageFile: null,
          heroImagePreview: detail.heroImage || "",
          highlights: detail.highlights || [],
          itinerary: detail.itinerary || [],
          inclusions: detail.inclusions || [],
          exclusions: detail.exclusions || [],
          offers: detail.offers || [],
          tourFacts: detail.tourFacts || { duration: "", groupSize: "", difficulty: "" },
          gallerySlides: (detail.gallerySlides || []).map(slide => ({
            title: slide.title,
            desc: slide.desc,
            imageFile: null,
            imagePreview: slide.image,
          })),
        });
      } catch (err) {
        console.error(err);
        toast.error("Error fetching tour data!");
      }
    };

    fetchTour();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Update RoundTour
      const tourData = new FormData();
      tourData.append("title", formData.title);
      tourData.append("days", formData.days);
      tourData.append("location", formData.location);
      tourData.append("desc", formData.desc);
      if (formData.imgFile) tourData.append("img", formData.imgFile);

      await axios.put(`http://localhost:5000/api/round-tours/${id}`, tourData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update RoundTourDetail
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

      const gallerySlidesPayload = formData.gallerySlides.map((slide) => ({
        title: slide.title,
        desc: slide.desc,
      }));
      detailData.append("gallerySlides", JSON.stringify(gallerySlidesPayload));

      formData.gallerySlides.forEach((slide, idx) => {
        if (slide.imageFile) {
          detailData.append(`galleryImage_${idx}`, slide.imageFile);
        }
      });

      await axios.put(`http://localhost:5000/api/round-tours/detail/${id}`, detailData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Round Tour updated successfully!", {
        onClose: () => navigate("/admin/round-tours"),
        autoClose: 3000,
      });
    } catch (err) {
      console.error(err);
      toast.error("Error updating round tour!");
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
          submitLabel={isSaving ? "Saving..." : "Update Round Tour"}
        />
      </div>
    </div>
  );
}
