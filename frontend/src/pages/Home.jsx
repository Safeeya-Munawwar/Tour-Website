import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import VideoSection from '../components/VideoSection'
import Tours from '../components/Tours'
import Cards from '../components/Cards'
// import Call from '../components/Call'
import Why from '../components/Why'
import Destination from '../components/Destination'
import TripAdvisor from '../components/TripAdvisor'
import Stats from '../components/Stats'
import Video1 from '../components/Video1'
import Stories from '../components/Stories'
import ExploreMapSection from '../components/ExploreMapSection';

export default function Home() {
  const [currentPage] = useState(1);
  // Scroll to top on page change
    useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [currentPage]);
  return (
    <div>
    <div className="">
  <Header />
</div>
      <VideoSection videoSrc="/tr1.mp4"/>
      <Stats/>
      <Cards/>
      <Tours/>
      {/* <Call/> */}
      <Why/>
      <Destination/>
      <Video1/>
      <Stories/>
      <ExploreMapSection />
      <TripAdvisor />
    
     
    </div>
  )
}
