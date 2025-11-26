import { FaRegGem } from "react-icons/fa";
import { LuMedal } from "react-icons/lu";
import { FaMoneyBillWave } from "react-icons/fa";
import { FiPhoneCall } from "react-icons/fi";
import { useState } from "react";
import BookForm from "../pages/BookForm";

export default function Why() {
  const [showForm, setShowForm] = useState(false);
  const items = [
    {
      icon: <FaRegGem size={40} className="text-[#2E5B84]" />,
      title: "Experienced",
      desc: "With years of expertise, we craft authentic Sri Lankan journeys filled with culture, comfort, and care.",
    },
    {
      icon: <LuMedal size={40} className="text-[#2E5B84]" />,
      title: "Awarded",
      desc: "Recognized for excellence in Sri Lankan travel, we proudly deliver award-winning experiences.",
    },
    {
      icon: <FaMoneyBillWave size={40} className="text-[#2E5B84]" />,
      title: "Cheap",
      desc: "Enjoy unforgettable Sri Lankan adventures at affordable prices without compromising quality.",
    },
    {
      icon: <FiPhoneCall size={40} className="text-[#2E5B84]" />,
      title: "24/7 Service",
      desc: "Our dedicated team is available 24/7 to ensure your Sri Lankan journey runs smoothly anytime.",
    },
  ];

  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Subtitle */}
        <p className="text-sm md:text-lg font-semibold tracking-widest text-gray-500 mb-4">
          WHY CHOOSE US
        </p>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-16">
          Our Experience is Our Strength
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-10 flex flex-col items-center text-center"
            >
              {item.icon}
              <h3 className="mt-6 text-xl font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600 mt-3 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Button */}
        <button 
         onClick={() => setShowForm(true)}
        className="mt-16 bg-[#1A1A1A] hover:bg-black text-white font-semibold px-10 py-4 rounded-full text-lg transition">
          Book Now
        </button>

      </div>
      {showForm && (
  <>
    {/* Dark Overlay */}
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[20000]"
      onClick={() => setShowForm(false)}
    ></div>

    {/* Popup Modal */}
    <div
      className="
        fixed top-1/2 left-1/2 
        -translate-x-1/2 -translate-y-1/2
        w-[90vw] max-w-[400px] 
        h-[90vh]
        bg-white shadow-2xl 
        p-4 z-[20001]
        flex flex-col overflow-auto
      "
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowForm(false)}
          className="text-gray-500 hover:text-black text-2xl font-bold"
        >
          ×
        </button>
      </div>

      <BookForm />
    </div>
  </>
)}

    </section>

    
  );
}
