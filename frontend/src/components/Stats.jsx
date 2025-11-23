import { useEffect, useState } from "react";
import { FaUsers, FaUserAlt, FaMountain, FaAward } from "react-icons/fa";

export default function Stats() {
  const stats = [
    { id: 1, icon: <FaUsers size={70} />, value: 7000, label: "Satisfied Client" },
    { id: 2, icon: <FaUserAlt size={70} />, value: 6300, label: "Active Members" },
    { id: 3, icon: <FaMountain size={70} />, value: 30, label: "Destinations" },
    { id: 4, icon: <FaAward size={70} />, value: 21, label: "Award Winning" },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const durations = stats.map(s => s.value / 30); // speed
    const intervals = stats.map((stat, index) =>
      setInterval(() => {
        setCounts(prev => {
          const updated = [...prev];
          if (updated[index] < stat.value) {
            updated[index] += Math.ceil(durations[index]);
          }
          return updated;
        });
      }, 30)
    );

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div
      className="w-full h-[350px] bg-cover bg-center bg-fixed relative flex items-center"
      style={{
        backgroundImage:
          "url('/12.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 text-center px-6 gap-10">
        
        {stats.map((stat, i) => (
          <div key={stat.id} className="text-white flex flex-col items-center px-12">
            <div className="mb-4">{stat.icon}</div>

            <h2 className="text-5xl font-extrabold flex items-center gap-1">
              {counts[i] >= stat.value ? stat.value.toLocaleString() : counts[i].toLocaleString()}
              <span className="text-4xl font-bold">+</span>
            </h2>

            <p className="text-lg font-medium mt-2">{stat.label}</p>
          </div>
        ))}

      </div>
    </div>
  );
}
