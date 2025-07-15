import React from 'react';
import './Address.css';

const Address = () => {
    return (
        <div className='address'>
            <div className="address-section">
                <h1>Learning Centre Near Me</h1>
                <p>
                    Find a nearby learning centre where experts guide you through tailored 
                    educational experiences, enabling you to acquire new skills and knowledge. 
                    Unlock your potential with Tally Certification and expert support, 
                    all conveniently located near you.
                </p>
                <p>Locate your nearest learning centre easily and start your journey today.</p>
            </div>
            <div className="address-map-section">
                {/* Embed Google Map */}
                <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3548.3628567790415!2d82.47727697517787!3d27.207755247349542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39974680c555eaa7%3A0x8681aca010c35d2e!2sBhadariya%20-%20Barhni%20Rd%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1740840592257!5m2!1sen!2sin"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
};

export default Address;
