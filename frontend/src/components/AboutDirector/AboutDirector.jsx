import React, { useState } from 'react'
import './AboutDirector.css'
import { assets } from '../../assets/assets'

const AboutDirector = () => {

  const fullText = `
SoftDEVtallyguru Computer Education Center is An ISO 9001-2015 Certificate and U.P. Govt. Registered Institute in Basti. 
We are providing latest and quality concept based computer education at reasonable rates for the last 10+ years by qualified 
and experienced faculties. We are running by professionals, for Professionals.

We are teaching various computer courses like Accounting, Hardware, Software and Networking.

The Institute computer lab is equipped with 24-hour Internet Broadband facility for the students.
  `;

  const [showMore, setShowMore] = useState(false);

  const shortText = fullText.substring(0, 280); // Short preview text

  return (
    <div className='about-director-section'>

        {/* TEXT */}
        <div className="about-director">
            
            <h1>Welcome to SOFTDEV TALLY GURU</h1>

            <p>
              {showMore ? fullText : shortText + "..."}
            </p>

            <button 
              className='show-btn' 
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
        </div>

        {/* PHOTO */}
        <div className="photo-section">
            <img src={assets.director_photo} alt="" />
        </div>
      
    </div>
  )
}

export default AboutDirector
