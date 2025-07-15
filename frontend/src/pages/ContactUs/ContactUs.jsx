import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope , faPhone ,faLocation} from '@fortawesome/free-solid-svg-icons'
import './ContactUs.css';
import { assets } from '../../assets/assets';

const ContactUs = () => {

  const [formData,setFormData] = useState({
    name:"",
    email:"",
    message:""
  });

  const onChangeHandeler = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const onSubmitHandeler = (event) => {
    event.preventDefault();
    setFormData({ name: '', email: '', message: '' });
  }

  useEffect(() => {
    console.log("Our form data is:", formData);
  }, [formData]);

  return (
    <div className='contact'>
      <h1>Contact Us</h1>
      <div className='contact-container'>
        <div className='contact-connect-section'>
          <div className='box'>
          <h3><FontAwesomeIcon icon={faPhone} /></h3> 
            <p>630763384</p>
          </div>
          <div className='box'>
            <h3><FontAwesomeIcon icon={faEnvelope} /></h3>
            <p>example@email.com</p>
          </div>
          <div className='box'>
            <h3><FontAwesomeIcon icon={faLocation} /></h3>
            <p>123 Business St, City, Country</p>
          </div>
          <div className='box'>
            <h3>Support</h3>
            <p>support@company.com</p>
          </div>
        </div>
        <div className='contact-content-section'>
          <div className='form'>
            <form onSubmit={onSubmitHandeler}>
              <label>Name:</label>
              <input onChange={onChangeHandeler} name='name' value={formData.name} type='text' placeholder='Your Name' required />

              <label>Email:</label>
              <input onChange={onChangeHandeler} name='email' value={formData.email} type='email' placeholder='Your Email' required />

              <label>Message:</label>
              <textarea onChange={onChangeHandeler} name='message' value={formData.message} placeholder='Your Message' required></textarea>

              <button type='submit'>Send</button>
            </form>
          </div>
          <div className='img-section'>
            <img src={assets.contactUs} alt="" />
          </div>
        </div>
      </div>
      <div className="map">
        <iframe
          title='Google Map'
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3548.3628567790415!2d82.47727697517787!3d27.207755247349542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39974680c555eaa7%3A0x8681aca010c35d2e!2sBhadariya%20-%20Barhni%20Rd%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1740840592257!5m2!1sen!2sin'
          width='100%'
          height='300'
          style={{ border: 0 }}
          allowFullScreen=''
          loading='lazy'
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
