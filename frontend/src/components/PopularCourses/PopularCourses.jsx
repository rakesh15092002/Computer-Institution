import React, { useContext, useEffect, useState } from 'react'
import './PopularCourses.css'
import StoreContext from '../../context/StoreContext'
import CourseItem from '../CourseItem/CourseItem'

const PopularCourses = () => {
    const { course_list } = useContext(StoreContext);
    const [popularCourses, setPopularCourses] = useState([]);

   useEffect(() => {
  const totalPopularCourses = course_list.slice(0, 3); // ✅ First 3
  setPopularCourses(totalPopularCourses);
}, [course_list]);


    return (
        <div className="course-display">
            <h1>Our Popular Courses</h1>
            <div className="course-display-list">
                {popularCourses.map((item, index) => (
                    <CourseItem index
                        key={item._id} // `_id` ko key banana better practice hai
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
