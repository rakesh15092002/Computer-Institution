import React, { useContext, useEffect, useState } from "react";
import "./PopularCourses.css";
import StoreContext from "../../context/StoreContext";
import CourseItem from "../CourseItem/CourseItem";

const PopularCourses = () => {
  const { course_list } = useContext(StoreContext);
  const [popularCourses, setPopularCourses] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setPopularCourses(course_list.slice(0, 3)); // phone → 3 cards
      } else {
        setPopularCourses(course_list.slice(0, 4)); // desktop/tablet → 4 cards
      }
    };

    handleResize(); // run on load
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [course_list]);

  return (
    <div className="pc-display">
      <h1 className="pc-header">Our Popular Courses</h1>

      <div className="pc-list">
        {popularCourses.map((item) => (
          <CourseItem
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.image}
            description={item.description}
            category={item.category}
            price={item.fees}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularCourses;
