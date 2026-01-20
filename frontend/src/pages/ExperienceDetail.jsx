import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import Footer from "../components/Footer";

export default function ExperienceDetail() {
  const navigate = useNavigate();
  const [experience, setExperience] = useState(null);
  const [otherExperiences, setOtherExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showText, setShowText] = useState(false);

  const { slug } = useParams();

  // Scroll to top on page change
  useEffect(() => {
    if (!loading) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [loading]);

  useEffect(() => {
    setTimeout(() => setShowText(true), 200);
    const fetchExperience = async () => {
      try {
        const res = await axiosInstance.get(`/experience/slug/${slug}`);
        setExperience(res.data);

        const allRes = await axiosInstance.get(`/experience`);
        setOtherExperiences(allRes.data.filter((exp) => exp.slug !== slug));

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchExperience();
  }, [slug]);

  if (loading) {
    return <div className="text-center py-20"></div>;
  }

  if (!experience) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">Experience Not Found</h2>
      </div>
    );
  }
  return (
    <>
      <div className=" flex flex-col min-h-screen font-poppins bg-white text-[#222]">
        {/* ---------------------------- HERO HEADER ---------------------------- */}
        <div
          className="w-full h-[360px] md:h-[560px] bg-cover bg-center relative flex items-center justify-center text-white"
          style={{
            backgroundImage: `url('${experience.heroImg || ""}')`,
            backgroundPosition: "center 25%",
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div
            className={`absolute bottom-6 md:bottom-10 right-4 md:right-10 max-w-[90%] md:w-[480px] bg-black/80 text-white p-4 md:p-6 backdrop-blur-sm shadow-lg border-none flex items-center justify-end transition-all duration-700 ease-out ${
              showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <h2 className="text-xl md:text-3xl leading-snug text-right mr-4">
              {experience.subtitle}
            </h2>
            <div className="w-[2px] bg-white h-10 md:h-12"></div>
          </div>
        </div>

        {/* ---------------------------- MAIN SECTION ---------------------------- */}
        <section className="relative flex flex-col md:flex-row w-full overflow-hidden bg-white pt-10 md:pt-0">
          {/* LEFT IMAGE WRAPPER */}
          <div
            className="
    w-full md:w-1/2 
    h-auto            /* Let it grow with content */
    overflow-hidden 
    rounded-br-[40%] md:rounded-r-[45%] 
    relative
  "
          >
            <img
              src={experience.mainImg}
              alt={experience.title}
              className="
      w-full h-full 
      object-cover object-center
    "
            />
          </div>

          {/* RIGHT TEXT SECTION */}
          <div
            className="
      w-full md:w-1/2 
      flex flex-col 
      text-center 
      space-y-4 sm:space-y-6 
      justify-center 
      px-6 sm:px-10 md:px-20 
      mt-6 sm:mt-10 md:mt-20 
      pb-10
    "
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900">
              {experience.title}
            </h2>

            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              {experience.mainDesc}
            </p>

            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              {experience.subDesc}
            </p>

            {/* BUTTONS */}
            <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate(`/experience`)}
                className="
          bg-blue-600 hover:bg-blue-700 
          text-white font-semibold 
          px-6 py-3 rounded-lg 
          transition flex items-center gap-2
        "
              >
                Explore More
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate("/tailor-made-tours")}
                className="
          bg-[#ce2a40] hover:bg-[#ef0530] 
          text-white uppercase px-6 py-3 
          rounded-lg font-semibold 
          flex items-center gap-2 
          shadow-lg transition-colors duration-300 
          justify-center
        "
              >
                Tailor-make a Tour
                <Calendar className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* ---------------------------- SUB EXPERIENCES ---------------------------- */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Where you can experience
            </h3>
            <p className="text-gray-700 text-base md:text-lg max-w-3xl mx-auto">
              Explore the destinations where this unique experience comes to
              life, from hidden gems to iconic locales.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {experience.subExperiences.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 w-[350px]"
              >
                <img
                  src={item.image}
                  alt={item.place}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.place}
                  </h4>
                  <h4 className="text-l font-semibold text-gray-700 mb-2">
                    {item.location}
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------- LOCATION GALLERY ---------------------------- */}
        <section className="w-full py-12 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 text-center">
              Location Gallery
            </h2>
            <div className="flex flex-wrap justify-center">
              {experience.gallery.map((img, idx) => (
                <div
                  key={idx}
                  className="w-1/2 sm:w-1/3 lg:w-1/6 overflow-hidden"
                >
                  <img
                    src={img}
                    alt={`Gallery ${idx + 1}`}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------- TIPS & RELATED TOURS ---------------------------- */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-32 mt-10 lg:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 pb-20">
          {/* Left - Tips + Button */}
          <div className="flex flex-col justify-between bg-[#b4c5df] p-6 sm:p-8 rounded-xl shadow-md">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
                Tips to Remember
              </h3>
              <ul className="list-disc list-inside space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
                {experience.tips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6 sm:mt-8 flex justify-center">
              <button
                onClick={() => navigate("/tailor-made-tours")}
                className="
          bg-[#ce2a40] hover:bg-[#ef0530]
          text-white uppercase px-4 sm:px-6 py-2 sm:py-3 
          rounded-full font-semibold flex items-center gap-2 text-sm sm:text-base
          shadow-lg transition-colors duration-300
          justify-center
        "
              >
                Start Planning Your Trip
                <Calendar className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Right - Related Tours */}
          <div className="">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
              Related Tours & Itineraries
            </h3>
            <p className="text-gray-700 text-sm sm:text-base text-center mb-6">
              Discover similar journeys and curated itineraries that include
              this unforgettable experience.
            </p>

            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={16}
              slidesPerView={1}
              loop
              autoplay={{ delay: 3000 }}
              breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 16 },
                768: { slidesPerView: 2, spaceBetween: 20 },
              }}
            >
              {otherExperiences.map((exp, idx) => (
                <SwiperSlide key={idx}>
                  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={exp.heroImg}
                      alt={exp.title}
                      className="w-full h-40 sm:h-48 object-cover"
                    />
                    <div className="p-4 sm:p-5">
                      <h4 className="text-lg sm:text-xl font-semibold text-gray-900">
                        {exp.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">
                        {exp.subtitle}
                      </p>
                      <a
                        href={`/experience/${exp.slug}`}
                        className="mt-2 sm:mt-3 inline-block text-[#8C1F28] font-semibold text-xs sm:text-sm hover:underline"
                      >
                        Read more
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
