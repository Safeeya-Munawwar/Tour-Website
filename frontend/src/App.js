import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// User Pages
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
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

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
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
import ContactMessages from "./pages/admin/ContactMessages";
import TailorComments from "./pages/admin/TailorComments";
import TripadvisorReviews from "./pages/admin/TripadvisorReviews";
import DayTourBookingAdmin from "./pages/admin/DayTourBooking";
import RoundTourBookingAdmin from "./pages/admin/RoundTourBooking";
import CustomizeTourBookingAdmin from "./pages/admin/CustomizeTourBooking";

function App() {
  const location = useLocation();

  // Hide Navbar + Footer on admin pages
  const hideLayout = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Navbar />}

      <main className="flex-grow">
        <Routes>
          {/* ---------------------------USER ROUTES--------------------------- */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/our-journey" element={<OurJourney />} />
          <Route path="/community-impact" element={<CommunityImpact />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/destinations" element={<Destination />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogDetail />} />
          <Route path="/experience" element={<Experiences />} />
          <Route path="/experience/:slug" element={<ExperienceDetail />} />
          <Route path="/day-tours" element={<DayTour />} />
          <Route path="/round-tours" element={<RoundTour />} />
          <Route path="/day-tour-detail/:id" element={<TourDetail />} />
          <Route path="/round-tours/:id" element={<RoundTourDetail />} />
          <Route path="/tailor-made-tours" element={<TailorMadeTours />} />

          {/* ---------------------------ADMIN ROUTES--------------------------- */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          {/* Admin Our Story */}
          <Route path="/admin/manage-about" element={<AdminManageAbout />} />
          <Route path="/admin/manage-team" element={<AdminManageTeam />} />
          <Route
            path="/admin/manage-journey"
            element={<AdminManageJourney />}
          />
          <Route
            path="/admin/manage-community"
            element={<AdminManageCommunityImpact />}
          />
          {/* Admin Destinations */}
          <Route
            path="/admin/manage-destination"
            element={<ManageDestination />}
          />
          <Route path="/admin/destinations" element={<DestinationList />} />
          <Route path="/admin/destinations/new" element={<AddDestination />} />
          <Route
            path="/admin/destinations/edit/:id"
            element={<EditDestination />}
          />
          {/* Admin Experiences */}
          <Route path="/admin/experiences" element={<ExperienceList />} />
          <Route path="/admin/experiences/new" element={<AddExperience />} />
          <Route
            path="/admin/experiences/edit/:id"
            element={<EditExperience />}
          />
          <Route
            path="/admin/experiences/view/:id"
            element={<ExperienceView />}
          />
          {/* Admin Blogs */}
          <Route path="/admin/blogs" element={<BlogList />} />
          <Route path="/admin/blogs/new" element={<AddBlog />} />
          <Route path="/admin/blogs/edit/:id" element={<EditBlog />} />
          <Route path="/admin/blogs/view/:id" element={<BlogView />} />
          {/* Admin Tailor Made Tours */}
          <Route
            path="/admin/tailor-made-tours"
            element={<AdminTailorMade />}
          />
          {/* Admin Day Tours */}
          <Route path="/admin/day-tours" element={<DayTourList />} />
          <Route path="/admin/day-tours/new" element={<AddDayTour />} />
          <Route path="/admin/day-tours/edit/:id" element={<EditDayTour />} />
          {/* Admin Round Tours */}
          <Route path="/admin/round-tours" element={<RoundTourList />} />
          <Route path="/admin/round-tours/new" element={<AddRoundTour />} />
          <Route
            path="/admin/round-tours/edit/:id"
            element={<EditRoundTour />}
          />
          {/* Admin Contact */}
          <Route path="/admin/contacts" element={<ContactList />} />
          <Route path="/admin/contacts/edit" element={<EditContact />} />
          {/* Admin Home */}
          <Route path="/admin/manage-home" element={<AdminManageHome />} />
          {/* Blog Comments */}
          <Route path="admin/blog-comments" element={<BlogComments />} />
          {/* Contact Msgs */}
          <Route path="admin/contact-messages" element={<ContactMessages />} />
          {/* Tailor Comments */}
          <Route path="admin/tailor-comments" element={<TailorComments />} />
          {/* Tailor Comments */}
          <Route path="admin/tripadvisor-reviews" element={<TripadvisorReviews />} />
          {/* Day Tour Bookings */}
          <Route path="admin/day-tour-booking" element={<DayTourBookingAdmin />} />
          {/* Round Tour Bookings */}
          <Route path="admin/round-tour-booking" element={<RoundTourBookingAdmin />} />
          {/* Customize Tour Bookings */}
          <Route path="admin/customize-tour" element={<CustomizeTourBookingAdmin />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
