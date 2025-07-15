import React from 'react'
import './CourseItem.css'
import { assets } from '../../assets/assets'
const CourseItem = ({ id, name, price, description, category, image }) => {
    return (
        <div className='course-item'>
            <div className="course-item-img-container">
                <img src={image} alt="" className="course-item-image" />
            </div>

            <div className="course-item-info">
                <div className="course-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_stars} alt="" />
                </div>
                <p>{description}</p>
                <p className="course-item-price">₹ {price}</p>
            </div>
        </div>
    )
}

export default CourseItem
