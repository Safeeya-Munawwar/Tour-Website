import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Calendar, ArrowRight } from "lucide-react";

export default function ExperienceDetail() {
  const { id } = useParams(); // get MongoDB _id from URL
  const navigate = useNavigate();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/experience/${id}`);
        setExperience(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Experience not found");
        setLoading(false);
      }
    };

    fetchExperience();
  }, [id]);

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (error) return <p className="text-center py-20">{error}</p>;

  return (
    <div className="font-poppins bg-white text-[#222]">
      {/* HERO SECTION */}
      <div
        className="w-full h-[360px] md:h-[560px] bg-cover bg-center relative flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${experience.heroImg})` }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <h2 className="text-3xl md:text-5xl z-10">{experience.title}</h2>
      </div>

      {/* MAIN SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <img src={experience.mainImg} alt={experience.title} className="w-full h-96 object-cover rounded-lg mb-6" />
        <h2 className="text-4xl font-bold mb-4">{experience.title}</h2>
        <p className="text-gray-700 mb-4">{experience.mainDesc}</p>
        <p className="text-gray-700 mb-4">{experience.subDesc}</p>

        {/* SUB EXPERIENCES */}
        <h3 className="text-2xl font-semibold mb-4">Sub Experiences</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experience.subExperiences.map((sub, idx) => (
            <div key={idx} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={sub.img} alt={sub.place} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h4 className="font-semibold text-lg">{sub.location}</h4>
                <p className="text-gray-600">{sub.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* TIPS */}
        <h3 className="text-2xl font-semibold mt-10 mb-4">Tips</h3>
        <ul className="list-disc list-inside space-y-2">
          {experience.tips.map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>

        <div className="mt-8">
          <button
            onClick={() => navigate("/experience")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Back to Experiences
          </button>
        </div>
      </section>
    </div>
  );
}
