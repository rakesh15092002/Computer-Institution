import React from 'react'
import './Home.css'

import Header from '../../components/Header/Header'

import AboutDirector from '../../components/AboutDirector/AboutDirector'
import Address from '../../components/Address/Address'
// import Review from '../../components/Review/Review'
import PopularCourses from '../../components/PopularCourses/PopularCourses'
import TestimonialsSlider from '../../components/Testimonials/TestimonialsSlider'


const Home = () => {
  return (
    <div className='home'>
     <Header/>
     {/* <PopularCourses/> */}
    <PopularCourses/>
     <Address/>
     <AboutDirector/>
     <TestimonialsSlider/>
     {/* <Review/> */}
     
    </div>
  )
}

export default Home
