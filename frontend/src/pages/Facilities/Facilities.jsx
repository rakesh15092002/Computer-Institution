import React from 'react';
import './Facilities.css';
import { assets } from '../../assets/assets';

const Facilities = () => {
  return (
    <div className="facilities">
      <div className="facilities-container">

        <h1 className="facilities-title">Our Facilities</h1>

        <div className="facility-section">
          <div className="facility-content">
            <h2>Live Classes</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab veniam dolor est nemo tempore nulla ipsa sequi quisquam consectetur, iusto architecto quo repellat! Eveniet adipisci porro in aliquam eum similique.</p>
          </div>
          <div className="facility-image">
            <img src={assets.live_clasess} alt="Live Classes" />
          </div>
        </div>

        <div className="facility-section">
        <div className="facility-image">
            <img src={assets.lab_photo} alt="Practical Training" />
          </div>
          <div className="facility-content">
            <h2>Practical Training</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab veniam dolor est nemo tempore nulla ipsa sequi quisquam consectetur, iusto architecto quo repellat! Eveniet adipisci porro in aliquam eum similique.</p>
          </div>
        </div>

        <div className="facility-section">
          <div className="facility-content">
            <h2>Industry-Level Knowledge</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab veniam dolor est nemo tempore nulla ipsa sequi quisquam consectetur, iusto architecto quo repellat! Eveniet adipisci porro in aliquam eum similique.</p>
          </div>
          <div className="facility-image">
            <img src={assets.career_guidense} alt="Industry Knowledge" />
          </div>
        </div>

        <div className="facility-section">
        <div className="facility-image">
            <img src={assets.career_guidense} alt="Career Guidance" />
          </div>
          <div className="facility-content">
            <h2>Career Guidance</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab veniam dolor est nemo tempore nulla ipsa sequi quisquam consectetur, iusto architecto quo repellat! Eveniet adipisci porro in aliquam eum similique.</p>
          </div>
          
        </div>

        <div className="facility-section">
          <div className="facility-content">
            <h2>Modern Lab Facilities</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab veniam dolor est nemo tempore nulla ipsa sequi quisquam consectetur, iusto architecto quo repellat! Eveniet adipisci porro in aliquam eum similique.</p>
          </div>
          <div className="facility-image">
            <img src={assets.career_guidense} alt="Modern Lab Facilities" />
          </div>
        </div>

        <div className="facility-section">
        <div className="facility-image">
            <img src={assets.career_guidense} alt="Soft Skills Training" />
          </div>
          <div className="facility-content">
            <h2>Soft Skills Training</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab veniam dolor est nemo tempore nulla ipsa sequi quisquam consectetur, iusto architecto quo repellat! Eveniet adipisci porro in aliquam eum similique.</p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Facilities;
