import React from 'react'
import "./RatingReview.css"
import { FaStar } from "react-icons/fa";
import { useState } from "react"; 

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9"
  
};

function RatingReviewAdd() {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0)

  const handleClick = value => {
    setCurrentValue(value)
  }

  const handleMouseOver = newHoverValue => {
    setHoverValue(newHoverValue)
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  }
  return (
    <div className='container justify-content-center'>
      <h2 className='text-center'>Rate the Product </h2>
      <div className='stars rating-body-container d-flex justify-content-center'>
        {stars.map((_, index) => {
          return ( 
              <FaStar
                key={index}
                size={24}
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMouseOver(index + 1)}
                onMouseLeave={handleMouseLeave}
                color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                style={{
                  marginRight: 10,
                  cursor: "pointer",
                }} 
              /> 
          )
        })}
      </div>
      <div class="form-group"> 
        <textarea class="form-control textarea" id="textarea1" rows="3" placeholder="What's your experience?"></textarea>
        <div className="d-grid gap-2 col-6 mx-auto text-container">
            <button type="submit" className="btn btn-success" >Submit</button>
        </div>
      </div> 
      
    </div>
  ); 
}

export default RatingReviewAdd