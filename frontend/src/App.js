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
import ExperienceList from "./pages/experience/ExperienceList";
import AddExperience from "./pages/experience/AddExperience";
import EditExperience from "./pages/experience/EditExperience";
import BlogList from "./pages/blog/BlogList";
import AddBlog from "./pages/blog/AddBlog";
import EditBlog from "./pages/blog/EditBlog";

function App() {
  const location = useLocation();

  // Hide Navbar + Footer for admin pages
  const hideLayout = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen">
      {!hideLayout && <Navbar />}
      <main className="flex-grow">
        <Routes>
          {/* USER ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/our-journey" element={<OurJourney />} />
          <Route path="/community-impact" element={<CommunityImpact />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/destinations" element={<Destination />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/experience" element={<Experiences />} />
          <Route path="/experience/:id" element={<ExperienceDetail />} />
          <Route path="/day-tours" element={<DayTour />} />
          <Route path="/round-tours" element={<RoundTour />} />
          <Route path="/day-tour-detail" element={<TourDetail />} />
          <Route path="/round-tour-detail" element={<RoundTourDetail />} />
          <Route path="/tailor-made-tours" element={<TailorMadeTours />} />

          {/* ADMIN ROUTES */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
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
          <Route path="/admin/experiences" element={<ExperienceList />} />
          <Route path="/admin/experiences/new" element={<AddExperience />} />
          <Route
            path="/admin/experiences/edit/:id"
            element={<EditExperience />}
          />
          <Route path="/admin/blogs" element={<BlogList />} />
          <Route path="/admin/blogs/new" element={<AddBlog />} />
          <Route path="/admin/blogs/edit/:id" element={<EditBlog />} />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
}

export default App;
