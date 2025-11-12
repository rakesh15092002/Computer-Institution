import React from 'react';
import './Header.css';
import { assets } from '../../assets/assets';
import { ReactTyped } from 'react-typed';

const Header = () => {
  return (
    <div className="header">
      <div
          className="absolute inset-0 header-pattern"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23062f4f' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            position: "absolute",
            inset: 0,
            zIndex: 0, // This ensures it's behind other content
          }}
        ></div>
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
        <p className='para'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quae molestiae ab voluptas obcaecati rerum amet, commodi, delectus neque perferendis quam suscipit sint autem! Deleniti minima, fugiat cum nesciunt ipsam itaque dolorem quos veritatis.</p>

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
