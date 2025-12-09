import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";

export default function ExperienceView() {
  const { id } = useParams();
  const [exp, setExp] = useState(null);
  const [, setFormData] = useState({
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
        const data = res.data;

        setExp(data);

        setFormData({
          slug: data.slug || "",
          title: data.title || "",
          subtitle: data.subtitle || "",
          description: data.description || "",
          mainDesc: data.mainDesc || "",
          subDesc: data.subDesc || "",
          heroImg: data.heroImg || "",
          mainImg: data.mainImg || "",
          gallery: data.gallery || [],
          subExperiences: data.subExperiences || [],
          tips: data.tips || [],
          galleryFiles: [],
          subExperienceFiles: [],
          removeGallery: [],
          heroImgPreview: "",
          mainImgPreview: "",
        });
      } catch (err) {
        console.error("Error fetching experience:", err);
        alert("Error fetching experience data.");
      }
    };
    fetchExperience();
  }, [id]);

  if (!exp) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="flex">
      <div className="w-64 fixed h-screen">
        <AdminSidebar />
      </div>

      <div className="flex-1 ml-64 p-8 bg-white min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{exp.title}</h1>
          <div className="flex gap-2">
            <Link
              to={`/admin/experiences/edit/${exp._id}`}
              className="bg-[#2E5B84] text-white px-3 py-2 rounded"
            >
              Edit
            </Link>
            <Link
              to="/admin/experiences"
              className="bg-gray-200 px-3 py-2 rounded"
            >
              Back
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold">{exp.subtitle}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 mb-8">
          <div className="flex flex-col items-start gap-1">
            <h3 className="font-semibold">Hero Image</h3>
            <img
              src={exp.heroImg}
              alt="hero"
              className="w-48 h-48 object-cover rounded"
            />
          </div>

          <div className="flex flex-col items-start gap-1">
            <h3 className="font-semibold">Main Image</h3>
            <img
              src={exp.mainImg}
              alt="main"
              className="w-48 h-48 object-cover rounded"
            />
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-gray-700">{exp.description}</p>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold mb-2">Main Description</h3>
          <p className="text-gray-700">{exp.mainDesc}</p>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold mb-2">Sub Description</h3>
          <p className="text-gray-700">{exp.subDesc}</p>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold mb-4">Sub Experiences</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {exp.subExperiences.map((s, i) => (
              <div key={i} className="border rounded p-4">
                {s.image && (
                  <img
                    src={s.image}
                    alt={s.place || s.location}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                )}
                <h4 className="font-semibold">
                  {s.location} — {s.place}
                </h4>
                <p className="text-gray-700 mt-2">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-semibold mb-4">Gallery</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {exp.gallery.map((g, i) => (
              <img
                key={i}
                src={g}
                alt={`gallery-${i}`}
                className="w-full h-32 object-cover rounded"
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Tips</h3>
          <ul className="list-disc pl-6">
            {(exp.tips || []).map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
