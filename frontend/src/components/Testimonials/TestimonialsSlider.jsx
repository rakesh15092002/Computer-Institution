import React, { useEffect, useState, useContext } from 'react'; // Imports add kiye
import Slider from 'react-slick';
import axios from 'axios'; // Axios import kiya
import StoreContext from '../../context/StoreContext'; // Aapka context import kiya (path check kar lein)
import './TestimonialsSlider.css';

// react-slick ki default CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// --- MODIFIED: TestimonialCard Component ---
// (Yeh wahi card hai jismein photo, name, review sab hai)
const TestimonialCard = ({ avatar, name, course, review, rating }) => {
  return (
    <div className="testimonial-card">
      <img
        src={avatar || 'https://via.placeholder.com/100?text=No+Image'}
        alt={name}
        className="testimonial-image"
      />
      <h3 className="testimonial-name">{name}</h3>
      <p className="testimonial-position">{course}</p>
      <p className="testimonial-message">"{review}"</p>
      <p className="testimonial-rating">
        {"⭐".repeat(rating)} ({rating})
      </p>
    </div>
  );
};

// Main TestimonialsSlider Component
const TestimonialsSlider = () => {

  // --- DATA FETCHING LOGIC ---
  const [testimonialsData, setTestimonialsData] = useState([]); // Default empty array
  const { url } = useContext(StoreContext); // URL context se liya

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        // Backend se data fetch kiya
        const res = await axios.get(`${url}/api/testimonials/allTestimonials`);
        setTestimonialsData(res.data); // State mein data set kiya
      } catch (error) {
        console.error("❌ Error fetching testimonials:", error);
      }
    };
    
    fetchTestimonials();
  }, [url]); // Jab 'url' badle, tab dobara fetch kare

  // --- React-Slick Settings ---
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 640,  // Mobile
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <section className="testimonials-slider">
      <h2 className="testimonials-heading">What Our Students Say</h2>
      
      <Slider {...settings}>
        {/* Data ko 'testimonialsData' state se map kiya */}
        {testimonialsData.map((testimonial) => (
          <div key={testimonial.id || testimonial._id} className="testimonial-slide-item"> 
            <TestimonialCard
              avatar={testimonial.avatar}
              name={testimonial.name}
              course={testimonial.course}
              review={testimonial.review}
              rating={testimonial.rating}
            />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default TestimonialsSlider;