import React, {useEffect, useState} from 'react';
import {Card} from "react-bootstrap";
import RatingReviewAdd from "./RatingReviewAdd";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

function ShowAuctionDetails() {
    const {state} = useLocation();
    let auction_id = state.auctionId;
    // store auction_id in local storage
    localStorage.setItem('auction_id', auction_id);
    let user_id = localStorage.getItem('user_id');
    const navigate = useNavigate();
    const [auction, setAuction] = useState([]);

    const fetchAuction = () => {
        let url = "http://localhost:8080/auction_products/auction/" + auction_id;
        axios.get(url).then(r => {
            setAuction(r.data);
            console.log(r.data);
        }).catch(e => {
            toast.error("Error fetching auction");
        });
    }

    useEffect(() => {
        fetchAuction();
    }, []);




    return (
        <div className="home-element-padding">
            <div className="card-container">
                <div className='container-fluid' >

                    <div className="row">
                        <div className=" col-sm-12">
                            <Card className=" bg-warning.bg-gradient">

                                <Card.Header className={"bg-warning text-white text-center"}>{auction.product_name}</Card.Header>
                                <Card.Body >
                                    <div className="card-image-container text-center">
                                        <img
                                            src={auction.photos}
                                            alt="Product image"
                                        />
                                    </div>
                                    <div className="row">
                                        <div className=" col-sm-12">
                                            {auction.sold === true ? <p className={"bg-danger text-white text-center rounded-pill text-padding"}> Sold </p> : <p className={"bg-warning text-white text-center rounded-pill text-padding"}> Not Sold Yet </p>}

                                            <p className={"bg-warning text-white text-center rounded-pill text-padding"}> Product Id :: {auction.id} </p>
                                            <Card className=" bg-warning.bg-gradient">
                                                <Card.Header className={"bg-secondary text-white text-center"}> Product description</Card.Header>
                                                <Card.Body >
                                                    <p className='card-body-container'>
                                                        {auction.product_description}
                                                    </p>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className=" col-sm-12">
                                            <Card className=" bg-warning.bg-gradient">
                                                <Card.Header className={"bg-dark text-white text-center "}> Bid Details</Card.Header>
                                                <Card.Body  >
                                                    <div className="row rounded-pill">
                                                        <div className="col-md-4">
                                                            <p className="bg-secondary bg-gradient text-white  rounded-pill  text-padding">
                                                                Bid Status  </p> </div> <div className="col-md-4"> </div>
                                                        <div className="col-md-4">
                                                            <p className="bg-secondary bg-gradient text-white  rounded-pill  text-padding">
                                                                {auction.ongoing === true ? "Ongoing" : "Closed"}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="row rounded-pill">
                                                        <div className="col-md-4"> <p className="bg-secondary bg-gradient text-white  rounded-pill  text-padding">
                                                            Minimum Price  </p> </div> <div className="col-md-4"> </div>
                                                        <div className="col-md-4"> <p className="bg-secondary bg-gradient text-white  rounded-pill  text-padding">
                                                            {auction.minimum_price}$  </p> </div>
                                                    </div>

                                                    <div className="row  rounded-pill " >
                                                        <div className="col-md-4"> <p className="bg-secondary bg-gradient text-white  rounded-pill  text-padding">
                                                            Current Bid  </p> </div> <div className="col-md-4"> </div>
                                                        <div className="col-md-4"> <p className="bg-secondary bg-gradient text-white  rounded-pill  text-padding">
                                                            {auction.max_bid}$  </p> </div>
                                                    </div>

                                                    <div className="row  rounded-pill " >
                                                        <div className="col-md-4"> <p className="bg-secondary bg-gradient text-white  rounded-pill  text-padding">
                                                            Start Time  </p> </div> <div className="col-md-4"> </div>
                                                        <div className="col-md-4"> <p className="bg-secondary bg-gradient text-white  rounded-pill  text-padding">
                                                            {auction.auction_start_date}  </p> </div>
                                                    </div>

                                                    <div className="row  rounded-pill " >
                                                        <div className="col-md-4"> <p className="bg-secondary bg-gradient text-white  rounded-pill  text-padding">
                                                            End Time  </p> </div> <div className="col-md-4"> </div>
                                                        <div className="col-md-4"> <p className="bg-secondary bg-gradient text-white  rounded-pill  text-padding">
                                                            {auction.auction_end_date}  </p> </div>
                                                    </div>

                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </div>


                                    <div className="row">
                                        <div className=" col-sm-12">
                                            <Card className=" bg-warning.bg-gradient">
                                                <Card.Header className={"bg-secondary text-white text-center"}> Leave Us a Review</Card.Header>
                                                <Card.Body >
                                                    <RatingReviewAdd/>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ShowAuctionDetails;