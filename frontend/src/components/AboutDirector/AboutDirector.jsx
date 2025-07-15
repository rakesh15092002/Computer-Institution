import React from 'react'
import './AboutDirector.css'
import { assets } from '../../assets/assets'

const AboutDirector = () => {
  return (
    <div className='about-director-section'>
        <div className="about-director">
            <h1>Welcome to SOFTDEV TALLY GURU</h1>
            <p>SoftDEVtallyguru Computer Education Center is An ISO 9001-2015 Certificate and U.P. Govt. Registered Institute in Basti. We are providing latest and quality concept based computer education at resonable rates for the last 10+ years by qualified and experienced faculties.We are running by professionals, for Professionals.</p>

            <p>We are teching in various computer courses like Accounting, Hardware and Software and Networking.</p>

            <p>The Institute computer lab is equipped with 24-hour Internet Broadband facility for the students. </p>
        </div>
        <div className="photo-section">
            <img src={assets.director_photo} alt="" />
        </div>
      
    </div>
  )
}

export default AboutDirector
