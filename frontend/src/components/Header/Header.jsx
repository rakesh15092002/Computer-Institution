import React from 'react';
import './Header.css';
import { assets } from '../../assets/assets';
import { ReactTyped } from 'react-typed';

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2><span>SOFTDEV</span> TALLY GURU</h2>

        {/* Auto typing effect */}
        <ReactTyped
          className="typed-text"
          strings={['CCC', 'DCA', 'TALLY', 'O LEVEL', 'EXCEL']}
          typeSpeed={100}
          backSpeed={50}
          loop
        />

        <p>LEARN BY BRIJLAL MAURYA</p>
        <button>BOOK APPOINTMENT</button>
      </div>
      <div className="header-image">
        <img src={assets.studentImage} alt="Students" />
      </div>
    </div>
  );
};

export default Header;
