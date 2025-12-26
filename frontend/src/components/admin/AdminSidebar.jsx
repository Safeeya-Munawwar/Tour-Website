import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  ChevronDown,
  ChevronRight,
  Users,
  Compass,
  Star,
  Plane,
  Map,
  PenTool,
  MessageSquare,
  Home,
  Mail,
  MessageCircle,
  NotebookPen,
  CalendarCheck,
  LogOut,
  Car,
} from "lucide-react";
import { FaTripadvisor, FaStarHalfAlt, FaCarSide } from "react-icons/fa";

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  // Dropdown states
  const [openStoryMenu, setOpenStoryMenu] = useState(false);
  const [openToursMenu, setOpenToursMenu] = useState(false);
  const [openInsightMenu, setOpenInsightMenu] = useState(false);
  const [openBookingMenu, setOpenBookingMenu] = useState(false);
  const [openCommentsMenu, setOpenCommentsMenu] = useState(false);
  const [openTaxiMenu, setOpenTaxiMenu] = useState(false);

  const activeClass = "bg-[#487898] text-white";
  const defaultClass = "text-gray-200 hover:bg-[#487898]/20 hover:text-white";

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
        {/* Logo */}
        <div className="h-auto flex items-center justify-center border-b border-gray-800 p-4">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-32 object-contain"
          />
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {/* Dashboard */}
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg ${
                isActive ? activeClass : defaultClass
              }`
            }
          >
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>

          {/* Home */}
          <NavLink
            to="/admin/manage-home"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg ${
                isActive ? activeClass : defaultClass
              }`
            }
          >
            <Home size={18} /> Home Content
          </NavLink>

          {/* Our Story */}
          <SidebarDropdown
            title="Our Story"
            icon={<BookOpen size={18} />}
            open={openStoryMenu}
            setOpen={setOpenStoryMenu}
          >
            <SidebarItem
              to="/admin/manage-about"
              icon={<Users size={16} />}
              label="About Page"
            />
            <SidebarItem
              to="/admin/manage-team"
              icon={<Users size={16} />}
              label="Our Team"
            />
            <SidebarItem
              to="/admin/manage-journey"
              icon={<Compass size={16} />}
              label="Our Journey"
            />
            <SidebarItem
              to="/admin/manage-community"
              icon={<Star size={16} />}
              label="Community Impact"
            />
          </SidebarDropdown>

          {/* Tours */}
          <SidebarDropdown
            title="Tours"
            icon={<Plane size={18} />}
            open={openToursMenu}
            setOpen={setOpenToursMenu}
          >
            <SidebarItem
              to="/admin/day-tours"
              icon={<Map size={16} />}
              label="Day Tours"
            />
            <SidebarItem
              to="/admin/round-tours"
              icon={<Compass size={16} />}
              label="Round Tours"
            />
            <SidebarItem
              to="/admin/tailor-made-tours"
              icon={<Star size={16} />}
              label="Custom Tours"
            />
          </SidebarDropdown>

          {/* Destinations */}
          <NavLink
            to="/admin/destinations"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg ${
                isActive ? activeClass : defaultClass
              }`
            }
          >
            <Map size={18} /> Destinations
          </NavLink>

          {/* Insight */}
          <SidebarDropdown
            title="Insight"
            icon={<NotebookPen size={18} />}
            open={openInsightMenu}
            setOpen={setOpenInsightMenu}
          >
            <SidebarItem
              to="/admin/blogs"
              icon={<MessageSquare size={16} />}
              label="Blogs"
            />
            <SidebarItem
              to="/admin/events"
              icon={<CalendarCheck size={16} />}
              label="Events"
            />
          </SidebarDropdown>

          {/* Experiences */}
          <NavLink
            to="/admin/experiences"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg ${
                isActive ? activeClass : defaultClass
              }`
            }
          >
            <PenTool size={18} /> Experiences
          </NavLink>

          {/* QUICK TAXI */}
          <SidebarDropdown
            title="Quick Taxi"
            icon={<Car size={18} />}
            open={openTaxiMenu}
            setOpen={setOpenTaxiMenu}
          >
            <SidebarItem
              to="/admin/taxis"
              icon={<FaCarSide size={16} />}
              label="Manage Vehicles"
            />
            <SidebarItem
              to="/admin/quick-taxi-booking"
              icon={<CalendarCheck size={16} />}
              label="Taxi Bookings"
            />
          </SidebarDropdown>

          {/* Booking */}
          <SidebarDropdown
            title="Bookings"
            icon={<CalendarCheck size={18} />}
            open={openBookingMenu}
            setOpen={setOpenBookingMenu}
          >
            <SidebarItem
              to="/admin/day-tour-booking"
              icon={<Map size={16} />}
              label="Day Tour"
            />
            <SidebarItem
              to="/admin/round-tour-booking"
              icon={<Compass size={16} />}
              label="Round Tour"
            />
            <SidebarItem
              to="/admin/customize-tour"
              icon={<PenTool size={16} />}
              label="Customize Tour"
            />
          </SidebarDropdown>

          {/* Comments */}
          <SidebarDropdown
            title="Comments"
            icon={<MessageCircle size={18} />}
            open={openCommentsMenu}
            setOpen={setOpenCommentsMenu}
          >
            <SidebarItem
              to="/admin/blog-comments"
              icon={<NotebookPen size={16} />}
              label="Blog Comments"
            />
            <SidebarItem
              to="/admin/tour-reviews"
              icon={<FaStarHalfAlt size={16} />}
              label="Tour Reviews"
            />
            <SidebarItem
              to="/admin/tailor-comments"
              icon={<Star size={16} />}
              label="Tailor Reviews"
            />
            <SidebarItem
              to="/admin/tripadvisor-reviews"
              icon={<FaTripadvisor size={16} />}
              label="TripAdvisor"
            />
          </SidebarDropdown>

          {/* Contact */}
          <NavLink
            to="/admin/contacts"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg ${
                isActive ? activeClass : defaultClass
              }`
            }
          >
            <Mail size={18} /> Contact
          </NavLink>
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="m-4 flex items-center justify-center gap-3 px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>
    </>
  );
};

/* ---------------- REUSABLE COMPONENTS ---------------- */

const SidebarDropdown = ({ title, icon, open, setOpen, children }) => (
  <>
    <button
      onClick={() => setOpen(!open)}
      className="flex items-center justify-between w-full px-4 py-2 rounded-lg hover:bg-[#487898]/20 transition"
    >
      <span className="flex items-center gap-3">
        {icon} {title}
      </span>
      {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
    </button>
    {open && <div className="ml-10 mt-1 space-y-1">{children}</div>}
  </>
);

const SidebarItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-2 px-2 py-2 rounded ${
        isActive
          ? "bg-[#487898] text-white"
          : "text-gray-300 hover:bg-[#487898]/20"
      }`
    }
  >
    {icon} {label}
  </NavLink>
);

export default AdminSidebar;
