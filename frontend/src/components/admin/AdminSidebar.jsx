import React, { useState } from "react";
import { NavLink } from "react-router-dom";
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
} from "lucide-react";

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [openStoryMenu, setOpenStoryMenu] = useState(false);
  const [openToursMenu, setOpenToursMenu] = useState(false);

  const activeClass = "bg-[#487898] text-white";
  const defaultClass = "text-gray-200 hover:bg-[#487898]/20 hover:text-white";

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 lg:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:static top-0 left-0 h-full w-64 bg-gray-900 text-gray-200
          transform transition-transform duration-300 z-40
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 shadow-md border-b border-gray-800">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-10 h-10 object-contain mr-3"
          />
          <h2 className="text-xl font-bold text-gray-200">Admin Panel</h2>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {/* Dashboard */}
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive ? activeClass : defaultClass
              }`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          {/* Home */}
          <NavLink
            to="/admin/manage-home"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive ? activeClass : defaultClass
              }`
            }
          >
            <Home size={18} />
            Home Content
          </NavLink>

          {/* Our Story Menu */}
          <button
            onClick={() => setOpenStoryMenu(!openStoryMenu)}
            className="flex items-center justify-between w-full px-4 py-2 rounded-lg hover:bg-[#487898]/20 transition"
          >
            <span className="flex items-center gap-3">
              <BookOpen size={18} />
              Our Story
            </span>
            {openStoryMenu ? (
              <ChevronDown size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>
          {openStoryMenu && (
            <div className="ml-10 mt-1 flex flex-col space-y-1">
              <NavLink
                to="/admin/manage-about"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-2 py-2 rounded transition ${
                    isActive ? activeClass : defaultClass
                  }`
                }
              >
                <Users size={16} /> About Page
              </NavLink>

              <NavLink
                to="/admin/manage-team"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-2 py-2 rounded transition ${
                    isActive ? activeClass : defaultClass
                  }`
                }
              >
                <Users size={16} /> Our Team
              </NavLink>

              <NavLink
                to="/admin/manage-journey"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-2 py-2 rounded transition ${
                    isActive ? activeClass : defaultClass
                  }`
                }
              >
                <Compass size={16} /> Our Journey
              </NavLink>

              <NavLink
                to="/admin/manage-community"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-2 py-2 rounded transition ${
                    isActive ? activeClass : defaultClass
                  }`
                }
              >
                <Star size={16} /> Community Impact
              </NavLink>
            </div>
          )}

          {/* Tours Menu */}
          <button
            onClick={() => setOpenToursMenu(!openToursMenu)}
            className="flex items-center justify-between w-full px-4 py-2 rounded-lg hover:bg-[#487898]/20 transition"
          >
            <span className="flex items-center gap-3">
              <Plane size={18} />
              Tours
            </span>
            {openToursMenu ? (
              <ChevronDown size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>
          {openToursMenu && (
            <div className="ml-10 mt-1 flex flex-col space-y-1">
              <NavLink
                to="/admin/day-tours"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-2 py-2 rounded transition ${
                    isActive ? activeClass : defaultClass
                  }`
                }
              >
                <Map size={16} /> Day Tours
              </NavLink>

              <NavLink
                to="/admin/round-tours"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-2 py-2 rounded transition ${
                    isActive ? activeClass : defaultClass
                  }`
                }
              >
                <Compass size={16} /> Round Tours
              </NavLink>

              <NavLink
                to="/admin/tailor-made-tours"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-2 py-2 rounded transition ${
                    isActive ? activeClass : defaultClass
                  }`
                }
              >
                <Star size={16} /> Tailor-Made Tours
              </NavLink>
            </div>
          )}

          {/* Destinations */}
          <NavLink
            to="/admin/destinations"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive ? activeClass : defaultClass
              }`
            }
          >
            <Map size={18} /> Destinations
          </NavLink>

          {/* Experiences */}
          <NavLink
            to="/admin/experiences"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive ? activeClass : defaultClass
              }`
            }
          >
            <PenTool size={18} /> Experiences
          </NavLink>

          {/* Blog */}
          <NavLink
            to="/admin/blogs"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive ? activeClass : defaultClass
              }`
            }
          >
            <MessageSquare size={18} /> Blog
          </NavLink>

          {/* Contact */}
          <NavLink
            to="/admin/contacts"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                isActive ? activeClass : defaultClass
              }`
            }
          >
            <Mail size={18} /> Contact
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
