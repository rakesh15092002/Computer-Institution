import React, { useContext } from "react";
import StoreContext from "../../context/StoreContext";
import CourseItem from "../CourseItem/CourseItem";
import "./CourseDisplay.css";

const CourseDisplay = () => {
    const { course_list } = useContext(StoreContext);

    console.log("✅ Course List in CourseDisplay:", course_list); // 🔎 Debugging ke liye

    return (
        <div className="course-display">
            <h1>Our Popular Courses</h1>
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
                            price={item.price}
                        />
                    ))}
            </div>
            <div className="view-more-button">
                <button>View more</button>
            </div>
        </div>
    );
};

export default CourseDisplay;
