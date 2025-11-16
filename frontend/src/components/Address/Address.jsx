import React from 'react';
import './Address.css';
// Icon ke liye import karein
import { FaMapMarkerAlt } from 'react-icons/fa';

const Address = () => {
    return (
        <div className='address-container'>
            <div className='address-content'>
                
                {/* TEXT SECTION */}
                <div className="address-section">
                    <h1>
                        <FaMapMarkerAlt /> {/* Icon yahan add kiya */}
                        Learning Centre Near Me
                    </h1>
                    <p>
                        Find a nearby learning centre where experts guide you through tailored 
                        educational experiences,
                        
                    </p>
                    <p>Locate your nearest learning centre easily and start your journey today.</p>
                    
                    {/* --- CTA BUTTON --- */}
                    <button className='map-cta-btn'>
                        Get Directions
                    </button>
                </div>

                {/* MAP SECTION */}
                <div className="address-map-section">
                    {/* IMPORTANT: 
                      Apne Google Maps embed code ko yahan 'src' mein paste karein.
                      Maine abhi placeholder ke liye Taj Mahal ka map dala hai.
                    */}
                    <iframe
                        title="Google Map - Learning Centre"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3548.3628567790415!2d82.47727697517787!3d27.207755247349542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39974680c555eaa7%3A0x8681aca010c35d2e!2sBhadariya%20-%20Barhni%20Rd%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1740840592257!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>

            </div>
        </div>
    );
};

export default Address;