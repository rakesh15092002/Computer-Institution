import React from 'react'
import './Gallery.css'
import { image_list } from '../../assets/assets'

const Gallery = () => {
  return (
    <div className='gellery-section'>

      <h1>This is the gallery section</h1>

      <div className="gallery-collection">
        {
          image_list.map((item,index) =>{
            return (
              <div className="gallery-item" key={index}>
                <img src={item.image} alt="" />
                <h3>{item.title}</h3>
              </div>
            )
          })
        }

      </div>
      
    </div>
  )
}

export default Gallery
