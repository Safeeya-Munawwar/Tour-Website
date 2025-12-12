import React, { useEffect, useState } from "react";
import axios from "axios";

import AdminSidebar from "../../components/admin/AdminSidebar";

import { LayoutDashboard, Users, Map, Plane, MapPin, FileText, User, MessageSquare, Star} from "lucide-react";
import {  } from "lucide-react";

import {
  
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
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

  const [monthlyBookings, setMonthlyBookings] = useState([]);

  // Load all stats
  const loadStats = async () => {
    try {
      const [
        roundTours,
        dayTours,
        experiences,
        destinations,
        blog,
        tailor,
        team,
        inquiries,
      ] = await Promise.all([
        axios.get("http://localhost:5000/api/round-tours"),
        axios.get("http://localhost:5000/api/day-tours"),
        axios.get("http://localhost:5000/api/experience"),
        axios.get("http://localhost:5000/api/destination"),
        axios.get("http://localhost:5000/api/blog"),
        axios.get("http://localhost:5000/api/tailor-made-tours"),
        axios.get("http://localhost:5000/api/team"),
        axios.get("http://localhost:5000/api/tailor-made-tours/inquiries"),
      ]);

  setStats({
  roundTours: roundTours.data.tours?.length || 0,
  dayTours: dayTours.data.tours?.length || 0,
  experiences: experiences.data.length || 0,
  destinations: destinations.data.destinations?.length || 0,
  blog: blog.data.blogs?.length || 0,          // fixed
  tailorMade: tailor.data && Object.keys(tailor.data).length > 0 ? 1 : 0,  // fixed
  team: team.data?.members?.length || 0,
  inquiries: inquiries.data.length || 0,
});


      // Fake monthly bookings for demo if no API
      const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      const fakeBookings = months.map((m) => ({
        month: m,
        count: Math.floor(Math.random() * 60) + 10,
      }));
      setMonthlyBookings(fakeBookings);

    } catch (err) {
      console.log("Dashboard loading error:", err);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);



  const pieData = [
    { name: "Round Tours", value: stats.roundTours },
    { name: "Day Tours", value: stats.dayTours },
    { name: "Tailor-Made", value: stats.tailorMade },
  ];

  const COLORS = ["#2563eb", "#10b981", "#f59e0b"];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto bg-gray-100">
       

        <main className="p-6">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <LayoutDashboard size={28} />
            Dashboard
          </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
  {Object.entries(stats).map(([name, count]) => (
    <div key={name} className="bg-white shadow rounded-lg p-5 hover:shadow-lg transition flex items-center justify-between">
      <div>
        <h2 className="text-gray-500 text-sm capitalize">{name.replace(/([A-Z])/g, " $1")}</h2>
        <p className="text-3xl font-bold mt-1">{count}</p>
      </div>

      {/* Icons */}
      {name === "dayTours" && <Plane className="text-blue-500" size={36} />}
      {name === "roundTours" && <Map className="text-green-500" size={36} />}
      {name === "tailorMade" && <Users className="text-yellow-500" size={36} />}
      {name === "inquiries" && <MessageSquare className="text-red-500" size={36} />}
      {name === "experiences" && <Star className="text-purple-500" size={36} />}
      {name === "destinations" && <MapPin className="text-pink-500" size={36} />}
      {name === "blog" && <FileText className="text-indigo-500" size={36} />}
      {name === "team" && <User className="text-teal-500" size={36} />}
    </div>
  ))}
</div>



          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

             {/* Line Chart */}
          <div className="bg-white shadow rounded-lg p-5 ">
            <h2 className="text-lg font-semibold mb-4">Monthly Bookings</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyBookings}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>

            {/* Pie Chart */}
            <div className="bg-white shadow rounded-lg p-5">
              <h2 className="text-lg font-semibold mb-4">Tours Breakdown</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

         

          {/* Recent Bookings Table */}
          <div className="mt-8 bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Tour Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2">City Tour Colombo</td>
                    <td className="px-4 py-2">John Doe</td>
                    <td className="px-4 py-2">25 Nov 2025</td>
                    <td className="px-4 py-2 text-green-600 font-semibold">Confirmed</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Round Tour Kandy</td>
                    <td className="px-4 py-2">Jane Smith</td>
                    <td className="px-4 py-2">26 Nov 2025</td>
                    <td className="px-4 py-2 text-yellow-600 font-semibold">Pending</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Tailor-Made Tour</td>
                    <td className="px-4 py-2">Alice Brown</td>
                    <td className="px-4 py-2">27 Nov 2025</td>
                    <td className="px-4 py-2 text-red-600 font-semibold">Cancelled</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
