import React, { useContext } from "react"; // ✅ Correct import
import "./Courses.css";
import { assets } from "../../assets/assets";
import CourseItem from "../../components/CourseItem/CourseItem";// Make sure this path is correct
import StoreContext from '../../context/StoreContext'


const Courses = () => {
  const { course_list } = useContext(StoreContext);
  return (
    <div className='course'>
      <h3>Recommended courses</h3>
      <div className="course-recomendation">
        <div className="course-photo">
          <img src={assets.course_11} alt="" />
        </div>
        <div className="course-content">
          <div className="course-content-heading">
            <h3>thi suhf besa  sdufh f asdf</h3>
          </div>
          <div className="course-content-details">
            <p>Learn from industry experts</p>
            <p>Comprehensive course material</p>
            <p>Hands-on project work</p>
            <p>Earn a verified certification</p>
            <p className="course-content-price">₹4500</p>
          </div>



        </div>
      </div>
      <div className="all-courses">

        <h3>All Courses</h3>
      </div>

      <div className="course-display">
        <div className="course-display-list">
          {course_list &&
            course_list.map((item, index) => (
              <CourseItem
                key={index}
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
  )
}

export default Courses
