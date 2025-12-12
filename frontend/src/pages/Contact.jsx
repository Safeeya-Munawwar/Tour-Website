import React, { useEffect, useState, useRef } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaMapMarkerAlt,
  FaShareAlt,
} from "react-icons/fa";
import Testimonials from "../components/Testimonials";
import ContactForm from "../components/admin/ContactForm";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

/* --------------------------- CUSTOM MARKERS --------------------------- */
const createIcon = (color) =>
  new L.Icon({
    iconUrl: `/images/marker-icon-2x-${color}.png`,
    shadowUrl: "/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

const blueIcon = createIcon("blue");
const greenIcon = createIcon("green");
const redIcon = createIcon("red");

/* --------------------------- CURVED ROUTE --------------------------- */
const CurvedBezierRouting = ({ userLocation, offices }) => {
  const map = useMap();
  const animationRefs = useRef([]);

  useEffect(() => {
    if (!userLocation || !map) return;
    map.eachLayer((layer) => {
      if (layer?.customBezierRoute) map.removeLayer(layer);
    });
    animationRefs.current.forEach((id) => cancelAnimationFrame(id));
    animationRefs.current = [];

    const createCurve = (start, end, curveStrength = 0.25) => {
      const [lat1, lng1] = start;
      const [lat2, lng2] = end;
      const controlLat = (lat1 + lat2) / 2 + curveStrength * (lng2 - lng1);
      const controlLng = (lng1 + lng2) / 2 - curveStrength * (lat2 - lat1);

      const curve = [];
      for (let t = 0; t <= 1; t += 0.02) {
        const x =
          (1 - t) ** 2 * lat1 + 2 * (1 - t) * t * controlLat + t ** 2 * lat2;
        const y =
          (1 - t) ** 2 * lng1 + 2 * (1 - t) * t * controlLng + t ** 2 * lng2;

        curve.push([x, y]);
      }
      return curve;
    };

    offices.forEach((office) => {
      if (!office.coords || office.coords.length !== 2) return;
      const curve = createCurve(userLocation, office.coords, 0.28);

      const polyline = L.polyline(curve, {
        color: "#999999",
        weight: 3,
        opacity: 0.9,
      }).addTo(map);
      polyline.customBezierRoute = true;

      const vehicleMarker = L.marker(curve[0], {
        icon: L.divIcon({
          html: "🚌",
          className: "vehicle-icon",
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        }),
      }).addTo(map);
      vehicleMarker.customBezierRoute = true;

      let index = 0;
      const animate = () => {
        index = (index + 1) % curve.length;
        vehicleMarker.setLatLng(curve[index]);
        const animId = requestAnimationFrame(animate);
        animationRefs.current.push(animId);
      };

      animate();
    });

    return () => {
      animationRefs.current.forEach((id) => cancelAnimationFrame(id));
      animationRefs.current = [];
      map.eachLayer((layer) => {
        if (layer.customBezierRoute) map.removeLayer(layer);
      });
    };
  }, [map, userLocation, offices]);

  return null;
};

/* --------------------------- QUICK JUMP --------------------------- */
const QuickJump = ({ offices, userLocation }) => {
  const map = useMap();
  const jump = (coords) => map.setView(coords, 13, { animate: true });

  return (
    <div className="absolute top-3 right-3 bg-white shadow-md rounded-lg p-2 z-[1000] space-y-1 text-xs sm:text-sm">
      {offices.map((o, i) => (
        <p
          key={i}
          onClick={() => jump(o.coords)}
          className="cursor-pointer hover:text-yellow-600 font-medium"
        >
          📍 {o.name}
        </p>
      ))}
      {userLocation && (
        <p
          onClick={() => jump(userLocation)}
          className="cursor-pointer hover:text-red-600 font-medium"
        >
          🧍‍♂️ Your Location
        </p>
      )}
    </div>
  );
};

/* --------------------------- MAIN CONTACT PAGE --------------------------- */
const Contact = () => {
  const [contact, setContact] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowText(true), 300);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/contact")
      .then((res) => setContact(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  }, []);

  if (!contact) return <p>Loading...</p>;

  return (
    <div className="font-poppins bg-white text-[#222]">

      {/* HERO */}
      <div
        className="w-full h-[260px] sm:h-[360px] md:h-[560px] bg-cover bg-center relative flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/images/contact-header.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/30"></div>

        <div
          className={`absolute bottom-4 sm:bottom-6 md:bottom-10 right-3 sm:right-6 md:right-10 max-w-[90%] md:w-[320px] bg-black/70 text-white p-3 sm:p-4 md:p-6 backdrop-blur-sm shadow-lg border-none flex items-center justify-end transition-all duration-700 ease-out ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-lg sm:text-xl md:text-3xl leading-snug text-right mr-3 sm:mr-4">
            Contact Us Anytime
          </h2>
          <div className="w-[2px] bg-white h-8 sm:h-10 md:h-12"></div>
        </div>
      </div>

      {/* SECTION TITLE */}
      <section className="w-full py-8 sm:py-12 text-center max-w-5xl mx-auto px-4">
        <p className="text-xs sm:text-sm font-semibold text-gray-600 tracking-widest mb-1 sm:mb-2">
          CONTACT
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4">
          Get In Touch With Us
        </h2>
        <p className="text-gray-700 text-base sm:text-lg">
          We’re here to help you plan your perfect journey.
        </p>
        <div className="w-12 sm:w-16 h-[3px] bg-[#D4AF37] mx-auto mt-4 sm:mt-6"></div>
      </section>

      {/* CONTACT + FORM */}
      <section className="py-6 px-4 sm:px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-9 gap-10 sm:gap-12 items-center">

        {/* CONTACT INFO */}
        <div className="space-y-8 lg:col-span-4 pl-1 sm:pl-10 max-md:pl-3">

          {/* OFFICES */}
          <div>
            {contact.offices.map((office, i) => (
              <div key={i} className="mb-4">
                <h4 className="font-bold text-lg sm:text-xl text-[#122453] mb-1 flex items-center gap-2">
                  <FaMapMarkerAlt /> {office.name}
                </h4>
                <p className="pl-6 text-gray-700 text-sm sm:text-base">
                  {office.address}
                </p>
              </div>
            ))}
          </div>

          {/* PHONE */}
          <div>
            <h4 className="font-bold text-lg sm:text-xl text-[#122453] mb-2 flex items-center gap-2">
              <FaPhoneAlt /> Phone
            </h4>
            {contact.phones.map((p, i) => (
              <p key={i} className="pl-6 mb-1 text-sm sm:text-base">
                {p}
              </p>
            ))}
          </div>

          {/* EMAIL */}
          <div>
            <h4 className="font-bold text-lg sm:text-xl text-[#122453] mb-2 flex items-center gap-2">
              <FaEnvelope /> Email
            </h4>
            {contact.emails.map((e, i) => (
              <p key={i} className="pl-6 mb-1 text-sm sm:text-base">
                {e}
              </p>
            ))}
          </div>

          {/* HOURS */}
          <div>
            <h4 className="font-bold text-lg sm:text-xl text-[#122453] mb-2 flex items-center gap-2">
              <FaClock /> Working Hours
            </h4>
            <p className="pl-6 mb-1 text-sm sm:text-base">
              {contact.workingHours.start} – {contact.workingHours.end} (UTC+5:30)
            </p>
          </div>

          {/* SOCIAL */}
          <div>
            <h4 className="font-bold text-lg sm:text-xl text-[#122453] mb-4 flex items-center gap-2">
              <FaShareAlt /> Connect With Us Online
            </h4>
            <div className="flex gap-3 sm:gap-4 items-center flex-wrap max-md:pl-1">
              {contact.socialMedia.map((s, i) => (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition"
                >
                  {s.icon ? (
                    <img
                      src={s.icon}
                      alt={s.platform}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                    />
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white shadow-xl p-5 sm:p-8 rounded-xl space-y-6 border border-gray-100 lg:col-span-5">
          <ContactForm />
        </div> 
      </section>

      {/* MAP */}
      <section className="w-full px-4 sm:px-6 mt-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 text-center">
          Our Locations at a Glance
        </h2>
        <div className="w-16 h-[3px] bg-yellow-500 mx-auto mb-6 rounded"></div>

        <div
          className="relative rounded-xl shadow-lg border border-gray-200 overflow-hidden"
          style={{ height: 350 }}
        >
          <MapContainer
            center={contact.offices[0].coords}
            zoom={10}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <QuickJump offices={contact.offices} userLocation={userLocation} />

            {userLocation && (
              <CurvedBezierRouting
                userLocation={userLocation}
                offices={contact.offices}
              />
            )}

            {/* OFFICE MARKERS */}
            {contact.offices.map((office, i) => (
              <Marker
                key={i}
                position={office.coords}
                icon={
                  office.name.toLowerCase().includes("corporate")
                    ? greenIcon
                    : blueIcon
                }
              >
                <Popup>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <strong className="text-gray-800">{office.name}</strong>
                    <p className="text-gray-600">{office.address}</p>
                    {contact.phones[0] && (
                      <p className="text-gray-600">
                        Phone: {contact.phones[0]}
                      </p>
                    )}
                    {contact.emails[0] && (
                      <p className="text-gray-600">
                        Email: {contact.emails[0]}
                      </p>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* USER LOCATION */}
            {userLocation && <Marker position={userLocation} icon={redIcon} />}
          </MapContainer>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />
    </div>
  );
};

export default Contact;
