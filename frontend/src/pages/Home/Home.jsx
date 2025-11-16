import React from "react";
import Header from "../../components/Header/Header";
import AboutDirector from "../../components/AboutDirector/AboutDirector";
import Address from "../../components/Address/Address";
import PopularCourses from "../../components/PopularCourses/PopularCourses";
import TestimonialsSlider from "../../components/Testimonials/TestimonialsSlider";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23062f4f' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            position: "absolute",
            inset: 0,
            zIndex: -1, // This ensures it's behind other content
          }}
        ></div>
        <Header />
      </div>

      <PopularCourses />
      <Address />
      <AboutDirector />
      <TestimonialsSlider />
    </div>
  );
};

export default Home;