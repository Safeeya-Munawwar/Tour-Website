import React, { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopbar from "../../components/admin/AdminTopbar";
import { LayoutDashboard } from "lucide-react";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Topbar */}
        <AdminTopbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gray-100 transition-all duration-300">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <LayoutDashboard size={28} />
            Dashboard
          </h1>

          {/* Example Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-gray-500 text-sm">Total Tours</h2>
              <p className="text-2xl font-bold mt-2">24</p>
            </div>

            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-gray-500 text-sm">Total Destinations</h2>
              <p className="text-2xl font-bold mt-2">12</p>
            </div>

            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-gray-500 text-sm">Total Experiences</h2>
              <p className="text-2xl font-bold mt-2">18</p>
            </div>

            <div className="bg-white shadow rounded-lg p-4">
              <h2 className="text-gray-500 text-sm">Total Inquiries</h2>
              <p className="text-2xl font-bold mt-2">42</p>
            </div>
          </div>

          {/* Example Table */}
          <div className="mt-8 bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Tour Name
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Customer
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2">City Tour Colombo</td>
                    <td className="px-4 py-2">John Doe</td>
                    <td className="px-4 py-2">25 Nov 2025</td>
                    <td className="px-4 py-2">
                      <span className="text-green-600 font-semibold">Confirmed</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Round Tour Kandy</td>
                    <td className="px-4 py-2">Jane Smith</td>
                    <td className="px-4 py-2">26 Nov 2025</td>
                    <td className="px-4 py-2">
                      <span className="text-yellow-600 font-semibold">Pending</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Tailor-Made Tour</td>
                    <td className="px-4 py-2">Alice Brown</td>
                    <td className="px-4 py-2">27 Nov 2025</td>
                    <td className="px-4 py-2">
                      <span className="text-red-600 font-semibold">Cancelled</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Dashboard;
