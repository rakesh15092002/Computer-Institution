import React from 'react';
import './CourseItem.css';
import { assets } from '../../assets/assets';

const CourseItem = ({ id, name, price, description, category, image }) => {
    return (
        <div className="ci-card">
            
            <div className="ci-img-container">
                {/* Modern Category Tag */}
                <span className="ci-category">{category}</span> 
                <img src={image} alt={name} className="ci-img" />
            </div>

            <div className="ci-info">
                <div className="ci-name-rating">
                    <p className="ci-name">{name}</p>
                    <img src={assets.rating_stars} alt="Rating" className="ci-rating" />
                </div>

                <p className="ci-description">{description}</p>
                
                {/* Price hamesha neeche align rahega */}
                <p className="ci-price">₹ {price}</p>
            </div>
        </div>
    );
};

export default CourseItem;