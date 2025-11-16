import React, { useState } from 'react';
import './AboutDirector.css';
import { assets } from '../../assets/assets';

const AboutDirector = () => {
  // Original text with paragraphs separated by newlines
  const fullText = `
SoftDEVtallyguru Computer Education Center is An ISO 9001-2015 Certificate and U.P. Govt. Registered Institute in Basti. 
We are providing latest and quality concept based computer education at reasonable rates for the last 10+ years by qualified 
and experienced faculties. We are running by professionals, for Professionals.

We are teaching various computer courses like Accounting, Hardware, Software and Networking.

The Institute computer lab is equipped with 24-hour Internet Broadband facility for the students.
  `;

  // Text ko paragraphs mein split karein (jahan bhi do newlines hon)
  // .trim() se shuru aur ant ke faltu space hataye
  // .split(/\n\s*\n/) se text ko paragraphs mein tode
  const paragraphs = fullText.trim().split(/\n\s*\n/);

  const [showMore, setShowMore] = useState(false);

  return (
    <div className='about-director-section'>
      
      {/* PHOTO SECTION */}
      {/* Modern layout mein photo ko pehle rakhna (desktop par right mein) CSS se handle karenge */}
      <div className="photo-section">
        <img src={assets.director_photo} alt="Director - SoftDEV Tally Guru" />
      </div>

      {/* TEXT CONTENT SECTION */}
      <div className="about-director-content">
        
        <h2>Welcome to</h2>
        <h1>SOFTDEV TALLY GURU</h1>

        {/* Paragaphs ko render karne ka logic */}
        <div className="about-director-text">
          {showMore
            ? paragraphs.map((para, index) => (
                <p key={index}>{para}</p>
              ))
            : // Sirf pehla paragraph dikhayein aur agar zyada hain toh "..." add karein
              <p>
                {paragraphs[0]}
                {paragraphs.length > 1 ? "..." : ""}
              </p>
          }
        </div>

        {/* Button tabhi dikhega jab 1 se zyada paragraph hon */}
        {paragraphs.length > 1 && (
          <button 
            className='show-btn' 
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Show Less" : "Read More"}
          </button>
        )}
      </div>
      
    </div>
  );
}

export default AboutDirector;