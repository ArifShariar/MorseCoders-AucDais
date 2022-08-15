import React from 'react'
import "./RatingReview.css"
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import {toast} from "react-toastify";

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"

};

function RatingReviewAdd() {
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const stars = Array(5).fill(0);
    let user_id = localStorage.getItem('user_id');
    let auction_id = localStorage.getItem('auction_id');

    const handleClick = value => {
        setCurrentValue(value);
    }

    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }

    const submitReview = () => {
        let review = document.getElementById("review").value;
        alert(`You have rated stars:` + currentValue + ` and wrote: ` + review + ` on product with id: ` + auction_id);
        let url = "http://localhost:8080/ratingReview/create/" + user_id +"/" + auction_id;
        axios({
            method: 'post',
            url: url,
            headers: {},
            data: {
                rating: currentValue,
                review: review
            }
        }).then(response => {
            toast.success("Review added successfully");
        }).catch(error => {
            toast.error("Error adding review");
        });
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
            <div className="form-group">
                <textarea className="form-control textarea" id="review" rows="3" placeholder="What's your experience?"></textarea>
                <div className="d-grid gap-2 col-6 mx-auto text-container">
                    <button className="btn btn-success" onClick={submitReview}>Submit</button>
                </div>
            </div>

        </div>
    );
}

export default RatingReviewAdd