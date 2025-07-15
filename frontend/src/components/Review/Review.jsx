import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Review.css";

const reviews = [
  { name: "Amit Sharma", text: "Great experience! Very helpful.", photo: "amit_sharma.jpg", rating: "★★★★★" },
  { name: "Priya Verma", text: "Smooth UI. Loved it!", photo: "priya_verma.jpg", rating: "★★★★☆" },
  { name: "Rahul Mehta", text: "Support team was quick!", photo: "rahul_mehta.jpg", rating: "★★★★☆" },
  { name: "Sonia Gupta", text: "Highly recommended!", photo: "sonia_gupta.jpg", rating: "★★★★★" },
  { name: "Rohan Das", text: "Seamless experience!", photo: "rohan_das.jpg", rating: "★★★★☆" },
  { name: "Kavita Jain", text: "Great customer support!", photo: "kavita_jain.jpg", rating: "★★★★☆" },
  { name: "Vikas Yadav", text: "Fast response, very satisfied.", photo: "vikas_yadav.jpg", rating: "★★★★☆" },
  { name: "Nisha Roy", text: "User-friendly interface!", photo: "nisha_roy.jpg", rating: "★★★★★" }
];

const Review = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800, // Smoother transition
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500, // Faster sliding
    cssEase: "ease-in-out", // Smooth transition
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
  <>      
  <h2>Customer Reviews</h2>
    <div className="review-container">
      <Slider {...settings}>
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <img src={review.photo} alt={review.name} className="review-photo" />
            <p>"{review.text}"</p>
            <h4>- {review.name}</h4>
            <p className="rating">{review.rating}</p>
          </div>
        ))}
      </Slider>
    </div>
  </>

  );
};

export default Review;
