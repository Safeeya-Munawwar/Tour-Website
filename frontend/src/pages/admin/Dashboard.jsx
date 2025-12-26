import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import {
  LayoutDashboard,
  Edit3,
  Users,
  MessageSquare,
  Star,
  MapPin,
  FileText,
  Sun,
  Repeat,
  CalendarCheck,
  Car,
  ArrowRightCircle,
} from "lucide-react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    roundTours: 0,
    dayTours: 0,
    experiences: 0,
    destinations: 0,
    blog: 0,
    tailorMade: 0,
    team: 0,
    inquiries: 0,
  });

  const [bookings, setBookings] = useState([]);
  const [monthlyBookings, setMonthlyBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      case "Completed":
        return "bg-blue-100 text-blue-700";
      case "Pending":
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  // Tour type text color
  const getTypeColor = (type) => {
    switch (type) {
      case "Round Tour":
        return "text-green-600";
      case "Day Tour":
        return "text-blue-600";
      case "Event Tour":
        return "text-yellow-600";
      case "Tailor Made":
        return "text-purple-600";
      default:
        return "text-gray-800";
    }
  };

  const loadStats = async () => {
    try {
      const [
        roundToursRes,
        dayToursRes,
        experiencesRes,
        destinationsRes,
        blogRes,
        tailorMadeRes,
        teamRes,
        inquiriesRes,
        dayTourBookingsRes,
        roundTourBookingsRes,
        commonBookingsRes,
        eventBookingsRes,
      ] = await Promise.all([
        axiosInstance.get("/round-tours"),
        axiosInstance.get("/day-tours"),
        axiosInstance.get("/experience"),
        axiosInstance.get("/destination"),
        axiosInstance.get("/blog"),
        axiosInstance.get("/tailor-made-tours/inquiries"),
        axiosInstance.get("/team"),
        axiosInstance.get("/contact-form"),
        axiosInstance.get("/day-tour-booking"),
        axiosInstance.get("/round-tour-booking"),
        axiosInstance.get("/book-tour"),
        axiosInstance.get("/event-tour-booking"),
      ]);

      setStats({
        roundTours: roundToursRes.data.tours?.length || 0,
        dayTours: dayToursRes.data.tours?.length || 0,
        experiences: experiencesRes.data?.length || 0,
        destinations: destinationsRes.data?.destinations?.length || 0,
        blog: blogRes.data?.blogs?.length || 0,
        tailorMade: tailorMadeRes.data?.length || 0,
        team: teamRes.data?.members?.length || 0,
        inquiries: inquiriesRes.data?.length || 0,
        dayTours: allDayBookings.length,
        roundTours: allRoundBookings.length,
        quickTaxi: allTaxiBookings.length,
        tailorMade: tailorMadeRes.data?.length || 0,
      });

      const allRoundBookings = [
        ...(roundTourBookingsRes.data.bookings || []).map((b) => ({ ...b, type: "Round Tour" })),
        ...(commonBookingsRes.data.bookings?.filter((b) => b.tourType === "round") || []).map((b) => ({ ...b, type: "Round Tour" })),
      ];

      const allDayBookings = [
        ...(dayTourBookingsRes.data.bookings || []).map((b) => ({ ...b, type: "Day Tour" })),
        ...(commonBookingsRes.data.bookings?.filter((b) => b.tourType === "day") || []).map((b) => ({ ...b, type: "Day Tour" })),
      ];

      const allEventBookings = (eventBookingsRes.data.bookings || []).map((b) => ({ ...b, type: "Event Tour" }));

      const allTailorMade = (tailorMadeRes.data || []).map((b) => ({
        ...b,
        type: "Tailor Made",
        fullName: b.fullName,
        title: "Tailor Made Tour",
        startDate: b.startDate,
        status: b.status,
      }));

      const allBookings = [...allRoundBookings, ...allDayBookings, ...allEventBookings, ...allTailorMade];

      const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      const dayCounts = Array(12).fill(0);
      const roundCounts = Array(12).fill(0);
      const eventCounts = Array(12).fill(0);
      const tailorCounts = Array(12).fill(0);

      allDayBookings.forEach((b) => dayCounts[new Date(b.startDate).getMonth()]++);
      allRoundBookings.forEach((b) => roundCounts[new Date(b.startDate).getMonth()]++);
      allEventBookings.forEach((b) => eventCounts[new Date(b.startDate).getMonth()]++);
      allTailorMade.forEach((b) => tailorCounts[new Date(b.startDate).getMonth()]++);

      setMonthlyBookings(months.map((m, i) => ({
        month: m,
        day: dayCounts[i],
        round: roundCounts[i],
        event: eventCounts[i],
        tailor: tailorCounts[i],
      })));

      setBookings(allBookings.sort((a, b) => new Date(b.createdAt || b.startDate) - new Date(a.createdAt || a.startDate)));
    } catch (err) {
      console.error("Dashboard loading error:", err);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const pieData = [
    { name: "Round Tours", value: stats.roundTours },
    { name: "Day Tours", value: stats.dayTours },
    { name: "Quick Taxi", value: stats.quickTaxi },
    { name: "Tailor Made", value: stats.tailorMade },
  ];

  const COLORS = ["#16a34a", "#2563eb", "#f59e0b", "#facc15"];

  // Filter bookings by search term
  const filteredBookings = bookings.filter((b) =>
    b.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 overflow-auto bg-gray-100">
        <main className="p-6">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <LayoutDashboard size={28} /> Dashboard
          </h1>

          {/* ---------------- STATS CARDS ---------------- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {Object.entries(stats).map(([name, count]) => (
              <div
                key={name}
                className="bg-white shadow rounded-lg p-5 flex justify-between"
              >
                <div>
                  <h2 className="text-gray-500 text-sm capitalize">{name.replace(/([A-Z])/g, " $1")}</h2>
                  <p className="text-3xl font-bold">{count}</p>
                </div>

                {/* Icons */}
                {name === "day" && (
                  <Sun size={36} className="text-fuchsia-500" />
                )}
                {name === "round" && (
                  <Repeat size={36} className="text-purple-500" />
                )}
                {name === "dayTours" && (
                  <CalendarCheck size={36} className="text-blue-600" />
                )}
                {name === "roundTours" && (
                  <ArrowRightCircle size={36} className="text-green-600" />
                )}
                {name === "quickTaxi" && (
                  <Car size={36} className="text-orange-500" />
                )}
                {name === "tailorMade" && (
                  <Edit3 size={36} className="text-yellow-500" />
                )}
                {name === "inquiries" && (
                  <MessageSquare size={36} className="text-red-500" />
                )}
                {name === "experiences" && (
                  <Star size={36} className="text-pink-500" />
                )}
                {name === "destinations" && (
                  <MapPin size={36} className="text-rose-500" />
                )}
                {name === "blog" && (
                  <FileText size={36} className="text-cyan-500" />
                )}
                {name === "team" && (
                  <Users size={36} className="text-teal-500" />
                )}
              </div>
            ))}
          </div>

          {/* ---------------- CHARTS ---------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-5 rounded shadow">
              <h2 className="text-lg font-semibold mb-4">Monthly Bookings</h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyBookings}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line dataKey="day" stroke="#2563eb" strokeWidth={3} name="Day Tours" />
                  <Line dataKey="round" stroke="#16a34a" strokeWidth={3} name="Round Tours" />
                  <Line dataKey="event" stroke="#f59e0b" strokeWidth={3} name="Event Tours" />
                  <Line dataKey="tailor" stroke="#a855f7" strokeWidth={3} name="Tailor Made" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-5 rounded shadow">
              <h2 className="text-lg font-semibold mb-4">Tours Breakdown</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" outerRadius={100} label>
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ---------------- SEARCH & RECENT BOOKINGS ---------------- */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>

            <div className="mb-3">
              <input
                type="text"
                placeholder="Search by tour type..."
                className="border p-1 rounded w-64 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <table className="min-w-full divide-y">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Type</th>
                  <th className="px-4 py-2 text-left">Tour</th>
                  <th className="px-4 py-2 text-left">Customer</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentBookings.map((b) => (
                  <tr key={b._id}>
                    <td className={`px-4 py-2 font-semibold ${getTypeColor(b.type)}`}>{b.type}</td>
                    <td className="px-4 py-2">{b.type === "Tailor Made" ? b.title : b.tourId?.title || b.eventId?.title || "—"}</td>
                    <td className="px-4 py-2">{b.type === "Tailor Made" ? b.fullName : b.name || "—"}</td>
                    <td className="px-4 py-2">{new Date(b.startDate || b.createdAt).toLocaleDateString("en-GB")}</td>
                    <td className="px-4 py-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(b.status)}`}>
                        {b.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ---------------- PAGINATION ---------------- */}
           {/* ---------------- PAGINATION ---------------- */}
<div className="flex justify-end mt-4 space-x-2">
  {/* Previous Button */}
  <button
    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className={`px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-gray-100 hover:bg-gray-300"}`}
  >
    Prev
  </button>

  {/* Page Numbers */}
  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
    <button
      key={page}
      onClick={() => setCurrentPage(page)}
      className={`px-3 py-1 rounded ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-100 hover:bg-gray-300"}`}
    >
      {page}
    </button>
  ))}

  {/* Next Button */}
  <button
    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
    className={`px-3 py-1 rounded ${currentPage === totalPages ? "bg-gray-200 cursor-not-allowed" : "bg-gray-100 hover:bg-gray-300"}`}
  >
    Next
  </button>
</div>

          </div>
        </main>
      </div>
    </div>
  );
}
