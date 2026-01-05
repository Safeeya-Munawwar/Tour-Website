import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileEdit, Clock, LogOut } from "lucide-react";

const SuperAdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const activeClass = "bg-[#487898] text-white";
  const defaultClass = "text-gray-200 hover:bg-[#487898]/20 hover:text-white";

  const navigate = useNavigate();
  const handleLogout = () => navigate("/admin/login");

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 lg:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className="fixed lg:static top-0 left-0 h-full w-64 bg-gray-900 text-gray-200 flex flex-col">
        <div className="h-auto flex items-center justify-center shadow-md border-b border-gray-800">
          <img
            src="/images/logo.webp"
            alt="Logo"
            className="w-32 h-auto object-contain"
          />
        </div>

        <nav className="p-4 space-y-2 mt-4 flex-1 overflow-y-auto">
          {/* Dashboard */}
          <NavLink
            to="/super-admin/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive ? activeClass : defaultClass
              }`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/super-admin/section-request"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive ? activeClass : defaultClass
              }`
            }
          >
            <FileEdit size={16} /> Section Requests
          </NavLink>

          <NavLink
            to="/super-admin/section-notifications"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive ? activeClass : defaultClass
              }`
            }
          >
            <Clock size={16} /> Notifications
          </NavLink>
        </nav>

        <button
          onClick={() => navigate("/admin/dashboard")}
          className="mt-2 flex items-center gap-3 px-6 py-3 m-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition justify-center"
        >
          <LayoutDashboard size={18} /> Go to Admin
        </button>

        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 px-6 py-3 m-4 rounded-lg bg-red-600 hover:bg-red-700 text-white transition justify-center"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>
    </>
  );
};

export default SuperAdminSidebar;
