import React from 'react'
import './About.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';


import { assets } from '../../assets/assets'

const About = () => {
  return (
    <div className='about-section'>
      <div className="about-container">
        <div className="about-content-section">
          <div className="about-title">
            <h1>About Us</h1>
          </div>
          <div className="about-content">
            <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores numquam rem </h3>
            <p>reiciendis, aperiam quibusdam at rerum suscipit natus sint.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi sed asperiores, quia aspernatur ratione saepe magnam hic deserunt facere incidunt ipsum minus vitae quidem ex, laudantium distinctio autem.
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consectetur sunt dolor dolorem fuga aut!
              </p>
            <div className="button">
              <button>Read More</button>
            </div>
          </div>
          <div className="social">
            
            <li><FontAwesomeIcon icon={faFacebook} /></li>
            <li><FontAwesomeIcon icon={faLinkedin}/></li>
            <li><FontAwesomeIcon icon={faInstagram} /></li>
          </div>
        </div>
        <div className="image-section">
          <img src={assets.about_page_photo} alt="" />
        </div>
      </div>

    </div>
  )
}

export default About
