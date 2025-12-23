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
} from "lucide-react";
import { FaTripadvisor, FaStarHalfAlt, } from "react-icons/fa";

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [openStoryMenu, setOpenStoryMenu] = useState(false);
  const [openToursMenu, setOpenToursMenu] = useState(false);
  const [openCommentsMenu, setOpenCommentsMenu] = useState(false);
  const [openBookingMenu, setOpenBookingMenu] = useState(false);

  const activeClass = "bg-[#487898] text-white";
  const defaultClass = "text-gray-200 hover:bg-[#487898]/20 hover:text-white";

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/admin/login");
  };

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
      src="/images/logo.png"
      alt="Logo"
      className="w-32 h-auto object-contain"
    />
  </div>
     

        {/* Navigation */}
       <nav className="p-4 space-y-2 mt-4 flex-1 overflow-y-auto">

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

          {/* ---------------- BOOKING MENU ---------------- */}
          <button
            onClick={() => setOpenBookingMenu(!openBookingMenu)}
            className="flex items-center justify-between w-full px-4 py-2 rounded-lg hover:bg-[#487898]/20 transition"
          >
            <span className="flex items-center gap-3">
              <CalendarCheck size={18} />
              Booking
            </span>
            {openBookingMenu ? (
              <ChevronDown size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>

          {openBookingMenu && (
            <div className="ml-10 mt-1 flex flex-col space-y-1">
              <NavLink
                to="/admin/day-tour-booking"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-2 py-2 rounded transition ${
                    isActive ? activeClass : defaultClass
                  }`
                }
              >
                <Map size={16} /> Day Tour
              </NavLink>

              <NavLink
                to="/admin/round-tour-booking"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-2 py-2 rounded transition ${
                    isActive ? activeClass : defaultClass
                  }`
                }
              >
                <Compass size={16} /> Round Tour
              </NavLink>

              <NavLink
                to="/admin/customize-tour"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-2 py-2 rounded transition ${
                    isActive ? activeClass : defaultClass
                  }`
                }
              >
                <PenTool size={16} /> Customize Tour
              </NavLink>
            </div>
          )}

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

          {/* ---------------- COMMENTS MENU ---------------- */}
          <button
            onClick={() => setOpenCommentsMenu(!openCommentsMenu)}
            className="flex items-center justify-between w-full px-4 py-2 rounded-lg hover:bg-[#487898]/20 transition"
          >
            <span className="flex items-center gap-3">
              <MessageCircle size={18} />
              Comments
            </span>
            {openCommentsMenu ? (
              <ChevronDown size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>

          {openCommentsMenu && (
            <div className="ml-10 mt-1 flex flex-col space-y-1">
              {/* Blog Comments */}
              <NavLink
                to="/admin/blog-comments"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-2 py-2 rounded transition ${
                    isActive ? activeClass : defaultClass
                  }`
                }
              >
                <NotebookPen size={16} /> Blog Comments
              </NavLink>

              {/* Contact Form Messages */}
              <NavLink
                to="/admin/tour-reviews"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-2 py-2 rounded transition ${
                    isActive ? activeClass : defaultClass
                  }`
                }
              >
                <FaStarHalfAlt size={16} /> Tour Reviews
              </NavLink>

              {/* Tailor-Made Tour Comments */}
              <NavLink
                to="/admin/tailor-comments"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-2 py-2 rounded transition ${
                    isActive ? activeClass : defaultClass
                  }`
                }
              >
                <Star size={16} /> Tailor Reviews
              </NavLink>

              {/* TripAdvisor Reviews */}
              <NavLink
                to="/admin/tripadvisor-reviews"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-2 py-2 rounded transition ${
                    isActive ? activeClass : defaultClass
                  }`
                }
              >
                <FaTripadvisor size={16} /> TripAdvisor
              </NavLink>
            </div>
          )}

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

export default AdminSidebar;
