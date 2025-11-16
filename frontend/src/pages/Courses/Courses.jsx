import React, { useContext } from "react";
import "./Courses.css";
import { assets } from "../../assets/assets";
import CourseItem from "../../components/CourseItem/CourseItem";
import StoreContext from "../../context/StoreContext";

const Courses = () => {
  const { course_list } = useContext(StoreContext);

  return (
    <div className="cr-display">

      <h3 className="cr-heading">Recommended courses</h3>

      <div className="cr-course-display">
        <div className="cr-photo">
          <img src={assets.course_11} alt="" />
        </div>

        <div className="cr-display-text">
          <div className="cr-content-heading">
            <h3>thi suhf besa sdufh f asdf</h3>
          </div>

          <div className="cr-content-details">
            <p>Learn from industry experts</p>
            <p>Comprehensive course material</p>
            <p>Hands-on project work</p>
            <p>Earn a verified certification</p>
            <p className="cr-content-price">₹4500</p>
          </div>
        </div>
      </div>

      <h3 className="cr-all-title">All Courses</h3>

      <div className="cr-display-list-container">
        <div className="cr-display-list">
          {course_list &&
            course_list.map((item, index) => (
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

    </div>
  );
};

export default Courses;
