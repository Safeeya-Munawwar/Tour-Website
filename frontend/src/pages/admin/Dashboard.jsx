import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LayoutDashboard,
  Plane,
  Map,
  Users,
  MessageSquare,
  Star,
  MapPin,
  FileText,
  User,
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

  const loadStats = async () => {
    try {
      const [
        ,
        ,
        experiencesRes,
        destinationsRes,
        blogRes,
        tailorMadeRes,
        teamRes,
        inquiriesRes,
        dayTourBookingsRes,
        roundTourBookingsRes,
        commonBookingsRes,
      ]= await Promise.all([
        axios.get("http://localhost:5000/api/round-tours"),
        axios.get("http://localhost:5000/api/day-tours"),
        axios.get("http://localhost:5000/api/experience"),
        axios.get("http://localhost:5000/api/destination"),
        axios.get("http://localhost:5000/api/blog"),
        axios.get("http://localhost:5000/api/tailor-made-tours/inquiries"),
        axios.get("http://localhost:5000/api/team"),
        axios.get("http://localhost:5000/api/contact-form"),
        axios.get("http://localhost:5000/api/day-tour-booking"),
        axios.get("http://localhost:5000/api/round-tour-booking"),
        axios.get("http://localhost:5000/api/book-tour"),
      ]);

      // ---------------- STATS ----------------
      const allRoundBookings = [
        ...(roundTourBookingsRes.data.bookings || []).map((b) => ({
          ...b,
          type: "Round Tour",
        })),
        ...(commonBookingsRes.data.bookings?.filter((b) => b.tourType === "round") ||
          []).map((b) => ({ ...b, type: "Round Tour" })),
      ];

      const allDayBookings = [
        ...(dayTourBookingsRes.data.bookings || []).map((b) => ({
          ...b,
          type: "Day Tour",
        })),
        ...(commonBookingsRes.data.bookings?.filter((b) => b.tourType === "day") ||
          []).map((b) => ({ ...b, type: "Day Tour" })),
      ];

      setStats({
        roundTours: allRoundBookings.length,
        dayTours: allDayBookings.length,
        experiences: experiencesRes.data.length || 0,
        destinations: destinationsRes.data.destinations?.length || 0,
        blog: blogRes.data.blogs?.length || 0,
        tailorMade: tailorMadeRes.data?.length || 0,
        team: teamRes.data?.members?.length || 0,
        inquiries: inquiriesRes.data?.length || 0,
      });

      // ---------------- RECENT BOOKINGS ----------------
      const recentBookings = [...allRoundBookings, ...allDayBookings]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6); // latest 6 bookings

      setBookings(recentBookings);

      // ---------------- MONTHLY BOOKINGS ----------------
      const months = [
        "Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","Sep","Oct","Nov","Dec"
      ];
      const dayCounts = Array(12).fill(0);
      const roundCounts = Array(12).fill(0);

      allDayBookings.forEach((b) => dayCounts[new Date(b.startDate).getMonth()]++);
      allRoundBookings.forEach((b) => roundCounts[new Date(b.startDate).getMonth()]++);

      const chartData = months.map((m, i) => ({
        month: m,
        day: dayCounts[i],
        round: roundCounts[i],
      }));

      setMonthlyBookings(chartData);

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
    { name: "Tailor Made", value: stats.tailorMade },
  ];

  const COLORS = ["#2563eb", "#10b981", "#f59e0b"];

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
              <div key={name} className="bg-white shadow rounded-lg p-5 flex justify-between">
                <div>
                  <h2 className="text-gray-500 text-sm capitalize">
                    {name.replace(/([A-Z])/g, " $1")}
                  </h2>
                  <p className="text-3xl font-bold">{count}</p>
                </div>
                {name === "dayTours" && <Plane size={36} className="text-blue-500" />}
                {name === "roundTours" && <Map size={36} className="text-green-500" />}
                {name === "tailorMade" && <Users size={36} className="text-yellow-500" />}
                {name === "inquiries" && <MessageSquare size={36} className="text-red-500" />}
                {name === "experiences" && <Star size={36} className="text-purple-500" />}
                {name === "destinations" && <MapPin size={36} className="text-pink-500" />}
                {name === "blog" && <FileText size={36} className="text-indigo-500" />}
                {name === "team" && <User size={36} className="text-teal-500" />}
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
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-5 rounded shadow">
              <h2 className="text-lg font-semibold mb-4">Tours Breakdown</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" outerRadius={100} label>
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ---------------- RECENT BOOKINGS ---------------- */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
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
                {bookings.map((b) => (
                  <tr key={b._id} className="hover:bg-blue-50">
                    <td className="px-4 py-2">{b.type}</td>
                    <td className="px-4 py-2">{b.tourId?.title || "—"}</td>
                    <td className="px-4 py-2">{b.name}</td>
                    <td className="px-4 py-2">{new Date(b.startDate).toLocaleDateString("en-GB")}</td>
                    <td className="px-4 py-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClass(b.status)}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
