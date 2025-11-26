import React from "react";
import { Routes, Route } from "react-router-dom";
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
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/our-journey" element={<OurJourney />} />
          <Route path="/community-impact" element={<CommunityImpact />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/destinations" element={<Destination />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/experience" element={<Experiences />} />
          <Route path="/experience/:slug" element={<ExperienceDetail />} />
          <Route path="/day-tours" element={<DayTour/>} />
          <Route path="/round-tours" element={<RoundTour/>} />
          <Route path="/day-tour-detail" element={<TourDetail/>} />
          <Route path="/round-tour-detail" element={<RoundTourDetail/>} />
          <Route path="/tailor-made-tours" element={<TailorMadeTours />} />
          
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
