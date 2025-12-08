import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminSidebar from "../../components/admin/AdminSidebar";
import DayTourForm from "../../components/admin/DayTourForm";

export default function AddDayTour() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ------------------------
      // Upload DayTour
      // ------------------------
      const tourData = new FormData();
      tourData.append("title", formData.title);
      tourData.append("location", formData.location);
      tourData.append("desc", formData.desc);
      if (formData.imgFile) tourData.append("img", formData.imgFile);

      const tourRes = await axios.post(
        "http://localhost:5000/api/day-tours",
        tourData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const tourId = tourRes.data.tour._id;

      // ------------------------
      // Upload DayTourDetail
      // ------------------------
      const detailData = new FormData();
      detailData.append("tourId", tourId);
      detailData.append("heroTitle", formData.heroTitle);
      detailData.append("heroSubtitle", formData.heroSubtitle);
      if (formData.heroImageFile) detailData.append("heroImage", formData.heroImageFile);
      detailData.append("aboutParagraphs", JSON.stringify(formData.aboutParagraphs));
      detailData.append("historyTitle", formData.historyTitle);
      detailData.append("historyLeftList", JSON.stringify(formData.historyLeftList));
      detailData.append("historyRightList", JSON.stringify(formData.historyRightList));

      // Gallery slides JSON
      const gallerySlidesPayload = formData.gallerySlides.map((slide) => ({
        title: slide.title,
        desc: slide.desc,
      }));
      detailData.append("gallerySlides", JSON.stringify(gallerySlidesPayload));

      // Attach gallery images separately
      formData.gallerySlides.forEach((slide, idx) => {
        if (slide.imageFile) {
          detailData.append(`galleryImage_${idx}`, slide.imageFile);
        }
      });

      await axios.post(
        "http://localhost:5000/api/day-tours/detail",
        detailData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Day Tour added successfully!");
      navigate("/admin/day-tours");
    } catch (err) {
      console.error(err);
      alert("Error adding day tour");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-64 fixed h-full">
        <AdminSidebar />
      </div>
      <div className="flex-1 ml-64 p-6 bg-gray-50">
        <DayTourForm
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          submitLabel="Add Day Tour"
        />
      </div>
    </div>
  );
}
