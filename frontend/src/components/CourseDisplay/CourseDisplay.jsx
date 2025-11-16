import React, { useContext } from "react";
import StoreContext from "../../context/StoreContext";
import CourseItem from "../CourseItem/CourseItem";
import "./CourseDisplay.css";

const CourseDisplay = () => {
    const { course_list } = useContext(StoreContext);

    return (
        <div className="cd-display">
            <h1 className="cd-display-header">Our Popular Courses</h1>

            <div className="cd-display-list">
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

            <div className="cd-view-more-container">
                <button className="cd-view-more-button">View more</button>
            </div>
        </div>
    );
};

export default CourseDisplay;
