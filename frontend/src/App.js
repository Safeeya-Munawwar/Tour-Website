import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";

// User Pages
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import OurTeam from "./pages/OurTeam";
import OurJourney from "./pages/OurJourney";
import CommunityImpact from "./pages/CommunityImpact";
import Contact from "./pages/Contact";
import Destination from "./pages/Destination";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Experiences from "./pages/Experiences";
import ExperienceDetail from "./pages/ExperienceDetail";
import DayTour from "./pages/DayTour";
import RoundTour from "./pages/RoundTour";
import TourDetail from "./pages/TourDetail";
import RoundTourDetail from "./pages/RoundTourDetail";
import TailorMadeTours from "./pages/TailorMadeTours";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import BookEventTour from "./components/BookEventTour";
import QuickTaxiButton from "./components/QuickTaxiButton";
import QuickTaxi from "./pages/QuickTaxi";
import ScrollToTopButton from "./components/ScrollToTopButton";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import SuperAdminDashboard from "./pages/admin/SuperAdminDashboard";
import SectionNotifications from "./pages/admin/SectionNotifications";
import AdminSectionRequest from "./pages/admin/AdminSectionRequest";
import AdminManageAbout from "./pages/admin/ManageAbout";
import AdminManageTeam from "./pages/admin/ManageTeam";
import AdminManageJourney from "./pages/admin/ManageJourney";
import AdminManageCommunityImpact from "./pages/admin/ManageCommunityImpact";
import ManageDestination from "./pages/admin/ManageDestination";
import DestinationList from "./pages/destinations/DestinationList";
import AddDestination from "./pages/destinations/AddDestination";
import EditDestination from "./pages/destinations/EditDestination";
import BlogList from "./pages/blog/BlogList";
import AddBlog from "./pages/blog/AddBlog";
import EditBlog from "./pages/blog/EditBlog";
import BlogView from "./pages/blog/BlogView";
import AdminTailorMade from "./pages/admin/ManageTailorMadeTour";
import DayTourList from "./pages/daytour/DayTourList";
import AddDayTour from "./pages/daytour/AddDayTour";
import EditDayTour from "./pages/daytour/EditDayTour";
import RoundTourList from "./pages/roundtour/RoundTourList";
import AddRoundTour from "./pages/roundtour/AddRoundTour";
import EditRoundTour from "./pages/roundtour/EditRoundTour";
import ExperienceList from "./pages/experience/ExperienceList";
import AddExperience from "./pages/experience/AddExperience";
import EditExperience from "./pages/experience/EditExperience";
import ExperienceView from "./pages/experience/ExperienceView";
import EditContact from "./pages/contact/EditContact";
import ContactList from "./pages/contact/ContactList";
import AdminManageHome from "./pages/admin/ManageHome";
import BlogComments from "./pages/admin/BlogComments";
import TourReviews from "./pages/admin/TourReviews";
import TailorComments from "./pages/admin/TailorComments";
import DayTourBookingAdmin from "./pages/admin/DayTourBooking";
import RoundTourBookingAdmin from "./pages/admin/RoundTourBooking";
import CustomizeTourBookingAdmin from "./pages/admin/CustomizeTourBooking";
import EventList from "./pages/admin/EventList";
import AddEvent from "./pages/admin/AddEvent";
import EditEvent from "./pages/admin/EditEvent";
import { FloatingButtonsProvider } from "./context/FloatingButtonsContext";
import EventTourBookingAdmin from "./pages/admin/EventTourBookingAdmin";
import QuickTaxiBookingAdmin from "./pages/admin/QuickTaxiBooking";
import TaxiList from "./pages/quickTaxi/TaxiList";
import AddTaxi from "./pages/quickTaxi/AddTaxi";
import EditTaxi from "./pages/quickTaxi/EditTaxi";
import Layout from "./components/Layout";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AddAdmin from "./pages/admin/AddAdmin";
import AdminList from "./pages/admin/AdminList";

function App() {
  const location = useLocation();
  const [showSessionModal, setShowSessionModal] = useState(false);

  // Hide Navbar + Footer on admin & super admin pages
  const hideLayout =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/super-admin");

  // Listen for 401 event from axios interceptor
  useEffect(() => {
    const handleSessionExpired = () => {
      setShowSessionModal(true);
      toast.error("Session expired. Please log in again.", {
        position: "top-right",
        autoClose: 4000,
      });
      // Clear tokens
      sessionStorage.removeItem("adminToken");
      sessionStorage.removeItem("superadminToken");
    };
    window.addEventListener("sessionExpired", handleSessionExpired);

    return () =>
      window.removeEventListener("sessionExpired", handleSessionExpired);
  }, []);

  return (
    <>
      {/* Toast for session expired */}
      <ToastContainer />

      <div className="flex flex-col min-h-screen">
        {!hideLayout && <Navbar />}

        <FloatingButtonsProvider>
          <ScrollToTop />
          {!hideLayout && <WhatsAppButton />}
          {!hideLayout && <QuickTaxiButton />}
          <ScrollToTopButton />
          <main className="flex-grow flex flex-col justify-start">
            <Routes>
              {/* ---------------------------USER ROUTES--------------------------- */}
              <Route
                path="/"
                element={
                  <Layout>
                    <Home />
                  </Layout>
                }
              />
              <Route path="/about" element={<About />} />
              <Route
                path="/our-team"
                element={
                  <Layout>
                    <OurTeam />
                  </Layout>
                }
              />
              <Route path="/our-journey" element={<OurJourney />} />
              <Route
                path="/community-impact"
                element={
                  <Layout>
                    <CommunityImpact />
                  </Layout>
                }
              />
              <Route
                path="/contact"
                element={
                  <Layout>
                    <Contact />
                  </Layout>
                }
              />
              <Route
                path="/destinations"
                element={
                  <Layout>
                    <Destination />
                  </Layout>
                }
              />
              <Route
                path="/blog"
                element={
                  <Layout>
                    <Blog />
                  </Layout>
                }
              />
              <Route path="blog/:slug" element={<BlogDetail />} />
              <Route path="/experience" element={<Experiences />} />
              <Route path="/experience/:slug" element={<ExperienceDetail />} />
              <Route
                path="/day-tours"
                element={
                  <Layout>
                    <DayTour />
                  </Layout>
                }
              />
              <Route
                path="/round-tours"
                element={
                  <Layout>
                    <RoundTour />
                  </Layout>
                }
              />
              <Route path="/day-tour-detail/:id" element={<TourDetail />} />
              <Route path="/round-tours/:id" element={<RoundTourDetail />} />
              <Route path="/tailor-made-tours" element={<TailorMadeTours />} />
              <Route
                path="/events"
                element={
                  <Layout>
                    <Events />
                  </Layout>
                }
              />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route
                path="/book-event"
                element={
                  <Layout>
                    <BookEventTour />
                  </Layout>
                }
              />
              <Route
                path="/quick-taxi"
                element={
                  <Layout>
                    <QuickTaxi />
                  </Layout>
                }
              />

              {/* ---------------------------ADMIN ROUTES--------------------------- */}
              <Route path="/admin/login" element={<AdminLogin />} />

              <Route
                path="/admin/dashboard"
                element={
                  <AdminProtectedRoute>
                    <AdminDashboard />
                  </AdminProtectedRoute>
                }
              />

              <Route
                path="/super-admin/dashboard"
                element={
                  <AdminProtectedRoute>
                    <SuperAdminDashboard />
                  </AdminProtectedRoute>
                }
              />

              <Route
                path="/super-admin/section-request"
                element={
                  <AdminProtectedRoute>
                    <AdminSectionRequest />
                  </AdminProtectedRoute>
                }
              />

              <Route
                path="/super-admin/section-notifications"
                element={
                  <AdminProtectedRoute>
                    <SectionNotifications />
                  </AdminProtectedRoute>
                }
              />

              {/* Admin Our Story */}
              <Route
                path="/admin/manage-about"
                element={
                  <AdminProtectedRoute>
                    <AdminManageAbout />
                  </AdminProtectedRoute>
                }
              />

              <Route
                path="/admin/manage-team"
                element={
                  <AdminProtectedRoute>
                    <AdminManageTeam />
                  </AdminProtectedRoute>
                }
              />

              <Route
                path="/admin/manage-journey"
                element={
                  <AdminProtectedRoute>
                    <AdminManageJourney />
                  </AdminProtectedRoute>
                }
              />

              <Route
                path="/admin/manage-community"
                element={
                  <AdminProtectedRoute>
                    <AdminManageCommunityImpact />
                  </AdminProtectedRoute>
                }
              />

              {/* Admin Destinations */}
              <Route
                path="/admin/manage-destination"
                element={
                  <AdminProtectedRoute>
                    <ManageDestination />
                  </AdminProtectedRoute>
                }
              />

              <Route
                path="/admin/destinations"
                element={
                  <AdminProtectedRoute>
                    <DestinationList />
                  </AdminProtectedRoute>
                }
              />

              <Route
                path="/admin/destinations/new"
                element={
                  <AdminProtectedRoute>
                    <AddDestination />
                  </AdminProtectedRoute>
                }
              />

              <Route
                path="/admin/destinations/edit/:id"
                element={
                  <AdminProtectedRoute>
                    <EditDestination />
                  </AdminProtectedRoute>
                }
              />

              {/* Admin Experiences */}
              <Route
                path="/admin/experiences"
                element={
                  <AdminProtectedRoute>
                    <ExperienceList />
                  </AdminProtectedRoute>
                }
              />

              <Route
                path="/admin/experiences/new"
                element={
                  <AdminProtectedRoute>
                    <AddExperience />
                  </AdminProtectedRoute>
                }
              />

              <Route
                path="/admin/experiences/edit/:id"
                element={
                  <AdminProtectedRoute>
                    <EditExperience />
                  </AdminProtectedRoute>
                }
              />

              <Route
                path="/admin/experiences/view/:id"
                element={
                  <AdminProtectedRoute>
                    <ExperienceView />
                  </AdminProtectedRoute>
                }
              />

              {/* Admin Blogs */}
              <Route
                path="/admin/blogs"
                element={
                  <AdminProtectedRoute>
                    <BlogList />
                  </AdminProtectedRoute>
                }
              />

              <Route
                path="/admin/blogs/new"
                element={
                  <AdminProtectedRoute>
                    <AddBlog />
                  </AdminProtectedRoute>
                }
              />

              <Route
                path="/admin/blogs/edit/:id"
                element={
                  <AdminProtectedRoute>
                    <EditBlog />
                  </AdminProtectedRoute>
                }
              />

              <Route
                path="/admin/blogs/view/:id"
                element={
                  <AdminProtectedRoute>
                    <BlogView />
                  </AdminProtectedRoute>
                }
              />

              {/* Admin Tailor Made Tours */}
              <Route
                path="/admin/tailor-made-tours"
                element={
                  <AdminProtectedRoute>
                    <AdminTailorMade />
                  </AdminProtectedRoute>
                }
              />

              {/* Admin Day Tours */}
              <Route
                path="/admin/day-tours"
                element={
                  <AdminProtectedRoute>
                    <DayTourList />
                  </AdminProtectedRoute>
                }
              />

              <Route
                path="/admin/day-tours/new"
                element={
                  <AdminProtectedRoute>
                    <AddDayTour />
                  </AdminProtectedRoute>
                }
              />

              <Route
                path="/admin/day-tours/edit/:id"
                element={
                  <AdminProtectedRoute>
                    <EditDayTour />
                  </AdminProtectedRoute>
                }
              />
              {/* ---------------------------ADMIN EVENT ROUTES--------------------------- */}
              <Route
                path="/admin/events"
                element={
                  <AdminProtectedRoute>
                    <EventList /> {/* list page */}
                  </AdminProtectedRoute>
                }
              />

              <Route
                path="/admin/events/new"
                element={
                  <AdminProtectedRoute>
                    <AddEvent /> {/* add page */}
                  </AdminProtectedRoute>
                }
              />

              <Route
                path="/admin/events/edit/:id"
                element={
                  <AdminProtectedRoute>
                    <EditEvent /> {/* edit page */}
                  </AdminProtectedRoute>
                }
              />

              {/* Admin Round Tours */}
              <Route
                path="/admin/round-tours"
                element={
                  <AdminProtectedRoute>
                    <RoundTourList />
                  </AdminProtectedRoute>
                }
              />

              <Route
                path="/admin/round-tours/new"
                element={
                  <AdminProtectedRoute>
                    <AddRoundTour />
                  </AdminProtectedRoute>
                }
              />

              <Route
                path="/admin/round-tours/edit/:id"
                element={
                  <AdminProtectedRoute>
                    <EditRoundTour />
                  </AdminProtectedRoute>
                }
              />

              {/* Admin Contact */}
              <Route
                path="/admin/contacts"
                element={
                  <AdminProtectedRoute>
                    <ContactList />
                  </AdminProtectedRoute>
                }
              />

              <Route
                path="/admin/contacts/edit"
                element={
                  <AdminProtectedRoute>
                    <EditContact />
                  </AdminProtectedRoute>
                }
              />

              {/* Admin Home */}
              <Route
                path="/admin/manage-home"
                element={
                  <AdminProtectedRoute>
                    <AdminManageHome />
                  </AdminProtectedRoute>
                }
              />

              {/* Blog Comments */}
              <Route
                path="/admin/blog-comments"
                element={
                  <AdminProtectedRoute>
                    <BlogComments />
                  </AdminProtectedRoute>
                }
              />

              {/* Contact Messages */}
              <Route
                path="/admin/tour-reviews"
                element={
                  <AdminProtectedRoute>
                    <TourReviews />
                  </AdminProtectedRoute>
                }
              />

              {/* Tailor Comments */}
              <Route
                path="/admin/tailor-comments"
                element={
                  <AdminProtectedRoute>
                    <TailorComments />
                  </AdminProtectedRoute>
                }
              />

              {/* Day Tour Bookings */}
              <Route
                path="/admin/day-tour-booking"
                element={
                  <AdminProtectedRoute>
                    <DayTourBookingAdmin />
                  </AdminProtectedRoute>
                }
              />
              <Route
                path="/admin/event-tour-booking"
                element={
                  <AdminProtectedRoute>
                    <EventTourBookingAdmin />
                  </AdminProtectedRoute>
                }
              />
              {/* Round Tour Bookings */}
              <Route
                path="/admin/round-tour-booking"
                element={
                  <AdminProtectedRoute>
                    <RoundTourBookingAdmin />
                  </AdminProtectedRoute>
                }
              />

              {/* Customize Tour Bookings */}
              <Route
                path="/admin/customize-tour"
                element={
                  <AdminProtectedRoute>
                    <CustomizeTourBookingAdmin />
                  </AdminProtectedRoute>
                }
              />

              {/* Quick Taxi Bookings */}
              <Route
                path="/admin/quick-taxi-booking"
                element={
                  <AdminProtectedRoute>
                    <QuickTaxiBookingAdmin />
                  </AdminProtectedRoute>
                }
              />

              {/* QUICK TAXI */}
              <Route
                path="/admin/taxis"
                element={
                  <AdminProtectedRoute>
                    <TaxiList />
                  </AdminProtectedRoute>
                }
              />

              <Route
                path="/admin/taxis/new"
                element={
                  <AdminProtectedRoute>
                    <AddTaxi />
                  </AdminProtectedRoute>
                }
              />

              <Route
                path="/admin/taxis/edit/:id"
                element={
                  <AdminProtectedRoute>
                    <EditTaxi />
                  </AdminProtectedRoute>
                }
              />

              <Route
                path="/admin/notifications"
                element={
                  <AdminProtectedRoute>
                    <AdminNotifications />
                  </AdminProtectedRoute>
                }
              />

<Route
  path="/super-admin/add-admin"
  element={
    <AdminProtectedRoute>
    <AddAdmin />
  </AdminProtectedRoute>
  }
/>

<Route
  path="/super-admin/admins"
  element={
    <AdminProtectedRoute>
    <AdminList />
  </AdminProtectedRoute>
  }
/>

            </Routes>
          </main>
        </FloatingButtonsProvider>
      </div>

      {/* Session Expired Modal */}
      {showSessionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-80 text-center shadow-lg">
            <h2 className="text-lg font-bold mb-4">Session Expired</h2>
            <p className="mb-6">
              Your session has expired. Please log in again.
            </p>
            <button
              onClick={() => (window.location.href = "/admin/login")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
