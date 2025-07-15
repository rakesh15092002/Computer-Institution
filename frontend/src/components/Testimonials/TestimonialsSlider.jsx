import React, { useEffect, useState, useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './TestimonialsSlider.css';
import { Pagination, Navigation } from 'swiper/modules';
import axios from 'axios';
import StoreContext from '../../context/StoreContext'; // adjust if needed

const TestimonialsSlider = () => {
  const [testimonialsData, setTestimonialsData] = useState([]);
  const { url } = useContext(StoreContext);

  useEffect(() => {
    console.log("testimonial")
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get(`${url}/api/testimonials/allTestimonials`);
        setTestimonialsData(res.data);
      } catch (error) {
        console.error("❌ Error fetching testimonials:", error);
      }
    };
    
    fetchTestimonials();
    console.log("testimonial2")
  }, [url]);

  return (
    <section className="testimonials-section">
      <h2 className="testimonials-title">What Our Students Say</h2>

      {/* Navigation Buttons */}
      <div className="swiper-navigation">
        <div className="swiper-button-prev">❮</div>
        <div className="swiper-button-next">❯</div>
      </div>

      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        speed={500}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        breakpoints={{
          1024: { slidesPerView: 4, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 10 },
          480: { slidesPerView: 1, spaceBetween: 10 },
          412: { slidesPerView: 1, spaceBetween: 10 },
          390: { slidesPerView: 1, spaceBetween: 10 },
          0: { slidesPerView: 1, spaceBetween: 5 },
        }}
      >
        {testimonialsData.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="testimonial-card">
              <img
                src={testimonial.avatar || 'https://via.placeholder.com/100?text=No+Image'}
                alt={testimonial.name}
                className="testimonial-image"
              />
              <h3 className="testimonial-name">{testimonial.name}</h3>
              <p className="testimonial-position">{testimonial.course}</p>
              <p className="testimonial-message">"{testimonial.review}"</p>
              <p className="testimonial-rating">
                {"⭐".repeat(testimonial.rating)} ({testimonial.rating})
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TestimonialsSlider;
