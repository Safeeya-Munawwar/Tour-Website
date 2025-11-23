import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import VideoSection from '../components/VideoSection'
import Tours from '../components/Tours'
import Cards from '../components/Cards'
import Call from '../components/Call'
import Why from '../components/Why'
import Destination from '../components/Destination'
import Testimonials from '../components/Testimonials'
import Stats from '../components/Stats'
import Video1 from '../components/Video1'
import Stories from '../components/Stories'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div>
     
      <Header/>
      <VideoSection videoSrc="/tr1.mp4"/>
      <Stats/>
      <Tours/>
      <Cards/>
      <Call/>
      <Why/>
      <Destination/>
      <Video1/>
      <Stories/>
      <Testimonials/>
    
     
    </div>
  )
}
