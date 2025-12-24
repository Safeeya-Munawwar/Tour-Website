import React, { useEffect, useState } from "react";
import TaxiForm from "../components/TaxiForm";
import { FaUser, FaSuitcase, FaCarSide, FaSnowflake } from "react-icons/fa";
import { GiGearStick } from "react-icons/gi";
import { FaCheckCircle, FaShieldAlt, FaClock, FaIdCard } from "react-icons/fa";

const QuickTaxi = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const vehicles = [
    {
      _id: "1",
      image: "/images/mini car.PNG",
      vehicles: [
        {
          type: "Mini Car (Wagon R)",
          seats: 4,
          luggage: "2 Bags",
          capacity: "4 Pax",
          ac: true,
        },
      ],
    },
    {
      _id: "2",
      image: "/images/car.PNG",
      vehicles: [
        {
          type: "Sedan (Toyota Corolla)",
          seats: 4,
          luggage: "3 Bags",
          capacity: "4 Pax",
          ac: true,
        },
      ],
    },
    {
      _id: "3",
      image: "/images/kdh.PNG",
      vehicles: [
        {
          type: "Van (KDH)",
          seats: 8,
          luggage: "6 Bags",
          capacity: "8 Pax",
          ac: true,
        },
      ],
    },
    {
      _id: "4",
      image: "/images/mini van.PNG",
      vehicles: [
        {
          type: "Mini Van",
          seats: 6,
          luggage: "4 Bags",
          capacity: "6 Pax",
          ac: true,
        },
      ],
    },
    {
      _id: "5",
      image: "/images/bus.PNG",
      vehicles: [
        {
          type: "Bus",
          seats: 30,
          luggage: "Large Storage",
          capacity: "30 Pax",
          ac: false,
        },
      ],
    },
  ];

  return (
    <div className="font-poppins bg-white text-[#222]">
      {/* HERO HEADER */}
      <div
        className="w-full h-[360px] md:h-[560px] bg-cover bg-center relative flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/images/transport-header.PNG')" }}
      >
        <div className="absolute inset-0 bg-black/20"></div>

        <div
          className={`absolute bottom-6 md:bottom-10 right-4 md:right-10 max-w-[90%] md:w-[420px] bg-black/80 text-white p-4 md:p-6 backdrop-blur-sm shadow-lg flex items-center justify-end transition-all duration-700 ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          <h2 className="text-xl md:text-3xl leading-snug text-right mr-4">
            Fast & Reliable Taxi Service <br />
            Wherever You Need To Go
          </h2>
          <div className="w-[2px] bg-white h-10 md:h-12"></div>
        </div>
      </div>

      {/* QUICK TAXI INTRO */}
      <section className="w-full mt-10 py-8 bg-white text-center">
        <p className="text-sm md:text-lg text-gray-600 tracking-widest font-semibold mb-3">
          QUICK TAXI BOOKING
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-5">
          Get Your Ride Instantly Across Sri Lanka
        </h2>
        <p className="text-gray-700 text-base md:text-lg max-w-3xl mx-auto">
          Choose your preferred vehicle, fill in the details, and confirm your
          taxi ride quickly and safely with professional drivers.
        </p>
        <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-6"></div>
      </section>

      {/* VEHICLES GRID */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {vehicles.map((v) => {
            const vehicle = v.vehicles?.[0];
            if (!vehicle) return null;

            return (
              <div
                key={v._id}
                className="bg-blue-50 rounded-xl overflow-hidden shadow-md border-2 border-blue-950 cursor-pointer transform transition hover:scale-105 hover:shadow-lg"
              >
                <img
                  src={v.image}
                  alt={vehicle.type}
                  className="w-full h-48 object-cover"
                />

                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-blue-950 mb-4">
                    {vehicle.type}
                  </h3>

                  <div className="flex justify-between text-blue-900">
                    <div className="flex flex-col items-center">
                      <FaUser className="text-xl mb-1" />
                      <span>{vehicle.seats}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <GiGearStick className="text-xl mb-1" />
                      <span>Manual / Auto</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <FaSuitcase className="text-xl mb-1" />
                      <span>{vehicle.luggage}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <FaCarSide className="text-xl mb-1" />
                      <span>{vehicle.capacity}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <FaSnowflake className="text-xl mb-1" />
                      <span>{vehicle.ac ? "AC" : "Non-AC"}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FORM SECTION */}
      <section className="bg-slate-100 w-full py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* LEFT CONTENT */}
          <div className="lg:sticky lg:top-28 self-start space-y-8">
            {/* Section Label */}
            <h4 className="text-sm tracking-widest font-semibold text-gray-600 uppercase">
              Book Your Taxi
            </h4>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B2545] leading-tight">
              Ride Safe & Comfortable <br />
              Across Sri Lanka
            </h2>

            {/* Description */}
            <p className="text-gray-700 max-w-md leading-relaxed">
              Plan your journey effortlessly with our reliable taxi service.
              Choose the right vehicle, share your details, and let our
              professional drivers take care of the rest.
            </p>

            {/* ICON FEATURES */}
            <ul className="space-y-4 text-gray-800">
              <li className="flex items-center gap-3">
                <FaCheckCircle className="text-green-600 text-lg" />
                Island-wide Taxi Service
              </li>
              <li className="flex items-center gap-3">
                <FaShieldAlt className="text-green-600 text-lg" />
                Safe & Insured Vehicles
              </li>
              <li className="flex items-center gap-3">
                <FaClock className="text-green-600 text-lg" />
                24/7 Availability
              </li>
              <li className="flex items-center gap-3">
                <FaIdCard className="text-green-600 text-lg" />
                Licensed Professional Drivers
              </li>
            </ul>

            {/* GOOGLE MAP PREVIEW */}
            <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
              <iframe
                title="Sri Lanka Map"
                src="https://www.google.com/maps?q=Sri+Lanka&z=7&output=embed"
                className="w-full h-56"
                loading="lazy"
              />
            </div>

            {/* TRUST BADGES */}
            <div className="flex flex-wrap gap-4 pt-4">
              <span className="px-4 py-2 bg-white shadow rounded-full text-sm font-semibold text-[#0B2545]">
                ✔ Safe Travel
              </span>
              <span className="px-4 py-2 bg-white shadow rounded-full text-sm font-semibold text-[#0B2545]">
                ✔ Licensed
              </span>
              <span className="px-4 py-2 bg-white shadow rounded-full text-sm font-semibold text-[#0B2545]">
                ✔ 24/7 Support
              </span>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="w-full">
            <TaxiForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuickTaxi;
