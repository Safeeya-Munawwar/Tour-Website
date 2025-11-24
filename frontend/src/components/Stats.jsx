import { useEffect, useState } from "react";
import { FaUsers, FaUserAlt, FaMountain, FaAward } from "react-icons/fa";

export default function Stats() {
  const stats = [
    { id: 1, icon: <FaUsers />, value: 7000, label: "Satisfied Client" },
    { id: 2, icon: <FaUserAlt />, value: 6300, label: "Active Members" },
    { id: 3, icon: <FaMountain />, value: 30, label: "Destinations" },
    { id: 4, icon: <FaAward />, value: 21, label: "Award Winning" },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const durations = stats.map((s) => s.value / 30); // speed
    const intervals = stats.map((stat, index) =>
      setInterval(() => {
        setCounts((prev) => {
          const updated = [...prev];
          if (updated[index] < stat.value) {
            updated[index] += Math.ceil(durations[index]);
          }
          return updated;
        });
      }, 30)
    );

    return () => intervals.forEach(clearInterval);
  },);

  return (
    <div
      className="w-full bg-cover bg-center bg-fixed relative flex items-center py-16 md:py-20"
      style={{
        backgroundImage: "url('/12.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-center px-6 gap-8 md:gap-12">
        {stats.map((stat, i) => (
          <div key={stat.id} className="text-white flex flex-col items-center px-4 sm:px-6">
            {/* Responsive icon */}
            <div className="mb-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              {stat.icon}
            </div>

            {/* Responsive number */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold flex items-center gap-1">
              {counts[i] >= stat.value
                ? stat.value.toLocaleString()
                : counts[i].toLocaleString()}
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold">+</span>
            </h2>

            {/* Responsive label */}
            <p className="text-base sm:text-lg md:text-lg lg:text-xl font-medium mt-2">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
