import { useEffect, useState } from "react";
import axios from "axios";

export default function Stats() {
  const [statsData, setStatsData] = useState([]);
  const [counts, setCounts] = useState([]);

  // Fetch stats from backend
  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/home");
      if (res.data && Array.isArray(res.data.stats)) {
        setStatsData(res.data.stats);
        setCounts(res.data.stats.map(() => 0));
      }
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Animate counts
  useEffect(() => {
    if (!statsData.length) return;

    const durations = statsData.map((s) => s.count / 30 || 1);
    const intervals = statsData.map((stat, index) =>
      setInterval(() => {
        setCounts((prev) => {
          const updated = [...prev];
          if (updated[index] < stat.count) {
            updated[index] += Math.ceil(durations[index]);
            if (updated[index] > stat.count) updated[index] = stat.count;
          }
          return updated;
        });
      }, 30)
    );
    return () => intervals.forEach(clearInterval);
  }, [statsData]);

  return (
    <div
      className="w-full bg-cover bg-center bg-fixed relative flex items-center py-16 md:py-20"
      style={{
        backgroundImage: "url('/images/12.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 text-center px-6 gap-8 md:gap-12">
        {statsData.map((stat, i) => (
          <div
            key={i}
            className="text-white flex flex-col items-center px-4 sm:px-6"
          >
            {/* Stat Icon/Image */}
            <div className="mb-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-white flex items-center justify-center mx-auto shadow-lg">
                {stat.icon ? (
                  <img
                    src={stat.icon}
                    alt={stat.title}
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
                  />
                ) : (
                  <span className="text-2xl sm:text-3xl md:text-4xl">🎯</span>
                )}
              </div>
            </div>

            {/* Count */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold flex items-center gap-1">
              {counts[i].toLocaleString()}
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold">
                +
              </span>
            </h2>

            {/* Label */}
            <p className="text-base sm:text-lg md:text-lg lg:text-xl font-medium mt-2">
              {stat.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
