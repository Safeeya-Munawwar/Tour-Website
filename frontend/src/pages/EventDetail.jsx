import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import BookEventTour from "../components/BookEventTour";

export default function EventDetail() {
  const { id } = useParams(); // fetch by event ID
  const [event, setEvent] = useState(null);
  const [showText, setShowText] = useState(false);
  const [activeImg, setActiveImg] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
const [currentPage] = useState(1);
// Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [currentPage]);
  // Fetch event + detail from backend
  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await axiosInstance.get(`/events/${id}`);
        if (res.data.success) {
          const { event: e, detail } = res.data;

          setEvent({
            _id: e._id,
            title: e.title,
            subtitle: detail?.heroSubtitle || "",
            heroImage: detail?.heroImage || e.img,
            description: detail?.aboutParagraphs?.join("\n\n") || e.desc,
            whyShouldAttend: detail?.whyShouldAttend || "",
            whoShouldAttend: detail?.whoShouldAttend || "",
            tipsForAttendees: detail?.tipsForAttendees || "",
            planYourVisit: detail?.planYourVisit || "",
            highlights: detail?.highlights || [],
            galleryImgs: (detail?.galleryImgs || []).slice(0, 9), // max 9 images
            duration: detail?.duration || "Full day",
            startLocation: detail?.startLocation || e.location || "Colombo",
            includes: detail?.includes?.filter(Boolean) || [
              "Event transportation",
              "Local guide assistance",
              "All government taxes",
            ],
          });
        }
      } catch (err) {
        console.error("Error fetching event:", err);
      }
    }
    fetchEvent();
    setTimeout(() => setShowText(true), 400);
  }, [id]);

  if (!event) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold">Event Not Found</h2>
      </div>
    );
  }

  const paragraphs = event.description.split(/\n\s*\n/).filter(Boolean);

  return (
    <div className="font-poppins bg-white text-gray-900 relative">
      {/* HERO HEADER */}
      <div
        className="w-full h-[360px] md:h-[560px] bg-cover bg-center relative flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${event.heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div
          className={`absolute bottom-6 md:bottom-10 right-4 md:right-10 max-w-[90%] md:w-[360px] bg-black/80 text-white p-4 md:p-6 backdrop-blur-sm shadow-lg flex items-center justify-end gap-4 transition-all duration-700 ease-out ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-xl md:text-3xl leading-snug text-right">
            {event.title}
            <span className="block text-sm md:text-base font-light text-white/80 mt-1">
              {event.subtitle}
            </span>
          </h2>
          <div className="w-[2px] bg-white h-10 md:h-14"></div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-10">{event.title}</h1>
        <div className="space-y-6">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-gray-600 text-base md:text-lg leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </section>

      {/* ADDITIONAL DETAILS */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 items-start">
          <div className="lg:col-span-2 space-y-10">
            {event.whyShouldAttend && (
              <>
                <h2 className="text-4xl font-extrabold leading-tight">Why You Should Attend This Event</h2>
                <p className="text-gray-600 text-lg leading-relaxed">{event.whyShouldAttend}</p>
              </>
            )}

            {event.highlights.length > 0 && (
              <>
                <h3 className="text-2xl font-bold mt-6">Event Highlights</h3>
                <ul className="list-disc list-inside text-gray-600 text-lg space-y-2">
                  {event.highlights.map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
              </>
            )}

            {event.whoShouldAttend && (
              <>
                <h3 className="text-2xl font-bold mt-6">Who Should Attend</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{event.whoShouldAttend}</p>
              </>
            )}

            {event.tipsForAttendees && (
              <>
                <h3 className="text-2xl font-bold mt-6">Tips for Attendees</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{event.tipsForAttendees}</p>
              </>
            )}

            {event.planYourVisit && (
              <>
                <h3 className="text-2xl font-bold mt-6">Plan Your Visit</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{event.planYourVisit}</p>
              </>
            )}
          </div>

          {/* RIGHT: BOOKING CARD */}
          <div className="lg:sticky lg:top-28">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100 p-8 space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-semibold text-gray-900">{event.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Start Location</span>
                  <span className="font-semibold text-gray-900">{event.startLocation}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-3">Includes</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  {event.includes.map((item, idx) => (
                    <li key={idx}>✔ {item}</li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setShowBookingModal(true)}
                className="w-full py-4 rounded-full text-white font-semibold text-lg bg-gradient-to-r from-green-500 via-emerald-500 to-blue-600 hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-10">Event Moments</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {event.galleryImgs.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImg(img)}
                className="group relative cursor-pointer overflow-hidden rounded-xl shadow-md"
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGE MODAL */}
      {activeImg && (
        <div
          onClick={() => setActiveImg(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full rounded-2xl overflow-hidden bg-black/60 text-white shadow-2xl"
          >
            <div className="w-full h-[300px] md:h-[380px]">
              <img src={activeImg} alt="" className="w-full h-full object-cover" />
            </div>
           
          </div>
        </div>
      )}

      {/* BOOKING FORM MODAL */}
      {showBookingModal && (
        <div
          className="fixed inset-0 z-10 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setShowBookingModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg mx-auto bg-white rounded-sm shadow-2xl p-6 overflow-y-scroll scroll-smooth max-h-[88vh] mt-[76px]"
          >
            <button
              onClick={() => setShowBookingModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 font-bold text-xl"
            >
              &times;
            </button>
            <BookEventTour
              eventId={id}
              eventTitle={event.title}
              eventLocation={event.startLocation}
            />
          </div>
        </div>
      )}
    </div>
  );
}
