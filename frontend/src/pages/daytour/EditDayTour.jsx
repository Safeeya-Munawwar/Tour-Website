import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminSidebar from "../../components/admin/AdminSidebar";
import DayTourForm from "../../components/admin/DayTourForm";

export default function EditDayTour() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    desc: "",
    imgFile: null,
    imgPreview: "",
    heroTitle: "",
    heroSubtitle: "",
    heroImageFile: null,
    heroImagePreview: "",
    aboutParagraphs: ["", ""],
    historyTitle: "",
    historyLeftList: [],
    historyRightList: [],
    gallerySlides: [],
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchTour() {
      try {
        const res = await axios.get(`http://localhost:5000/api/day-tours/${id}`);
        if (res.data.success) {
          const { tour, details } = res.data;
          setFormData({
            title: tour.title || "",
            location: tour.location || "",
            desc: tour.desc || "",
            imgFile: null,
            imgPreview: tour.img || "",
            heroTitle: details?.heroTitle || "",
            heroSubtitle: details?.heroSubtitle || "",
            heroImageFile: null,
            heroImagePreview: details?.heroImage || "",
            aboutParagraphs: details?.aboutParagraphs?.length ? details.aboutParagraphs : ["", ""],
            historyTitle: details?.historyTitle || "",
            historyLeftList: details?.historyLeftList || [],
            historyRightList: details?.historyRightList || [],
            gallerySlides: details?.gallerySlides?.map(s => ({
              title: s.title || "",
              desc: s.desc || "",
              imageFile: null,
              imagePreview: s.image || "",
            })) || [],
          });
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching tour data!");
      }
    }
    fetchTour();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Update DayTour
      const tourData = new FormData();
      tourData.append("title", formData.title);
      tourData.append("location", formData.location);
      tourData.append("desc", formData.desc);
      if (formData.imgFile) tourData.append("img", formData.imgFile);

      await axios.put(`http://localhost:5000/api/day-tours/${id}`, tourData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Update DayTourDetail
      const detailData = new FormData();
      detailData.append("heroTitle", formData.heroTitle);
      detailData.append("heroSubtitle", formData.heroSubtitle);
      if (formData.heroImageFile) detailData.append("heroImage", formData.heroImageFile);
      detailData.append("aboutParagraphs", JSON.stringify(formData.aboutParagraphs));
      detailData.append("historyTitle", formData.historyTitle);
      detailData.append("historyLeftList", JSON.stringify(formData.historyLeftList));
      detailData.append("historyRightList", JSON.stringify(formData.historyRightList));

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

      await axios.put(`http://localhost:5000/api/day-tours/detail/${id}`, detailData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Day Tour updated successfully!", {
        onClose: () => navigate("/admin/day-tours"),
        autoClose: 3000,
      });
    } catch (err) {
      console.error(err);
      toast.error("Error updating day tour!");
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
        <DayTourForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          submitLabel={isSaving ? "Saving..." : "Update Day Tour"}
        />
      </div>
    </div>
  );
}
