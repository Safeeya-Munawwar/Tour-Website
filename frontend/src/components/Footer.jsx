import React, { useEffect, useState } from "react";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTripadvisor,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Footer() {
  const [contact, setContact] = useState(null);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axiosInstance.get("/contact");
        setContact(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchContact();
  }, []);

  const subscribeNewsletter = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.warning("Please enter your email!", { theme: "colored" });
      return;
    }
    try {
      const res = await axiosInstance.post("/newsletter", { email });
      if (res.data.success) {
        toast.success("Subscribed successfully!", { theme: "colored" });
        setEmail("");
      } else {
        toast.error("Subscription failed", { theme: "colored" });
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error", { theme: "colored" });
    }
  };

  const socialIcons = {
    facebook: FaFacebookF,
    instagram: FaInstagram,
    youtube: FaYoutube,
    tripadvisor: FaTripadvisor,
    email: FaEnvelope,
    whatsapp: FaWhatsapp,
    twitter: FaTwitter,
    linkedin: FaLinkedinIn,
  };

  const menuItems = [
    { name: "HOME", path: "/" },
    { name: "TAILOR-MADE TOURS", path: "/tailor-made-tours" },
    { name: "DESTINATIONS", path: "/destinations" },
    { name: "DAY TOURS", path: "/day-tours" },
    { name: "ROUND TOURS", path: "/round-tours" },
    { name: "ABOUT US", path: "/about" },
    { name: "BLOG", path: "/blog" },
    { name: "EXPERIENCE", path: "/experience" },
    { name: "CONTACT US", path: "/contact" },
  ];

  return (
    <footer className="bg-header-gradient text-white pt-20 pb-10 font-[Poppins]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-14">

        {/* LOGO & SOCIAL */}
        <div className="flex flex-col items-center text-center">
          <img
            src="/images/logo_compressed.webp"
            alt="Logo"
            className="w-40 mb-5 opacity-95"
          />
          <p className="text-gray-200 text-[15px] leading-relaxed mb-4 max-w-sm">
            NetLanka Travels is your trusted travel partner in Sri Lanka,
            offering tailor-made tours, adventures, and premium travel
            experiences.
          </p>
          <div className="flex gap-4 mt-2">
            {contact?.socialMedia?.map((sm, i) => {
              const Icon = socialIcons[sm.platform?.toLowerCase()];
              if (!Icon) return null;
              return (
                <a
                  key={i}
                  href={sm.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </div>
        </div>

        {/* CONTACT INFO */}
        <div>
          <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
          <address className="not-italic space-y-5">
            {contact?.phone && (
              <div className="flex gap-3 items-center">
                <FaPhoneAlt />
                <a href={`tel:${contact.phone}`} className="hover:text-blue-300">
                  {contact.phone}
                </a>
              </div>
            )}

            {contact?.whatsapp && (
              <div className="flex gap-3 items-center">
                <FaWhatsapp />
                <a
                  href={`https://wa.me/${contact.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-400"
                >
                  {contact.whatsapp}
                </a>
              </div>
            )}

            {contact?.emails?.[0] && (
              <div className="flex gap-3 items-center">
                <FaEnvelope />
                <a
                  href={`mailto:${contact.emails[0]}`}
                  className="hover:text-blue-400"
                >
                  {contact.emails[0]}
                </a>
              </div>
            )}

            {contact?.offices?.map((o, i) => (
              <div key={i} className="flex gap-3 items-start">
                <FaMapMarkerAlt />
                <div>
                  <p className="font-medium">{o.name}</p>
                  <p className="text-gray-300">{o.address}</p>
                </div>
              </div>
            ))}

            {contact?.workingHours && (
              <div className="flex gap-3 items-center">
                <FaClock />
                <span>
                  {contact.workingHours.start} -{" "}
                  {contact.workingHours.end}
                </span>
              </div>
            )}
          </address>
        </div>

        {/* QUICK LINKS */}
        <nav>
          <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
          <ul className="space-y-3 text-gray-200">
            {menuItems.map((item, i) => (
              <li key={i}>
                <a href={item.path} className="hover:text-white">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* NEWSLETTER */}
        <div>
          <h3 className="text-xl font-semibold mb-6">
            Subscribe to our Newsletter
          </h3>
          <p className="text-gray-300 text-sm mb-4">
            Get updates, offers, and travel tips directly in your inbox.
          </p>
          <form
            className="flex flex-col gap-3"
            onSubmit={subscribeNewsletter}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="w-full py-3 bg-white text-black rounded-full font-semibold">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <hr className="border-gray-900 my-8" />

      <div className="max-w-[1400px] mx-auto px-6 text-black font-semibold text-xs md:text-sm flex flex-col sm:flex-row justify-between gap-2">
        <p>© {new Date().getFullYear()} NetLanka Tours. All rights reserved.</p>
        <p>Website Design & Development by NetIT Technology</p>
      </div>
    </footer>
  );
}
