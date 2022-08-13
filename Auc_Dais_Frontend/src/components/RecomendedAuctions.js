import React from "react";
import {Routes, Route, useNavigate,Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Card.css'
import {Card} from "react-bootstrap"; 
import ShowAuctionDetails from "./AddAuctionDetails";

function Carousels () {
    const navigate = useNavigate();

    const navigateToDetails = () => {
      navigate('/auction/12');
    };
        return (
            <div className="card-container">
                <div className='container-fluid' >

                    <div className="row">
                        <div className=" col-sm-12">
                        <Card className=" bg-warning.bg-gradient">
                            <Card.Header className={"bg-warning text-white text-center"}> Vase picture</Card.Header>
                            <Card.Body >
                                <div className="card-image-container"> 
                                    <img 
                                        src={require('../images/vase.jpeg')}
                                        alt="First slide" 
                                    />
                                    <div className="card-body-container">
                                        <p>
                                            <b>Description </b><br></br>
                                            There are many variations of passages of Lorem Ipsum available.
                                        </p>
                                        <p> Max Bid : 100 </p>
                                        <button type="button" className="btn btn-outline-secondary" onClick={navigateToDetails}>Show Details</button>
                                        <Routes>
                                            <Route path="/auctionTitleWithId" element={<ShowAuctionDetails />} />
                                        </Routes>
                                        
                                    </div>

                                </div>

                            </Card.Body>
                        </Card>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                        <Card className="bg-warning.bg-gradient">
                            <Card.Header className={"bg-warning text-white text-center"}> Car picture</Card.Header>
                            <Card.Body >
                                <div className="card-image-container"> 
                                    <img 
                                        src={require('../images/car.jpeg')}
                                        alt="First slide" 
                                    />
                                    <div className="card-body-container">
                                        <p>
                                            <b>Description </b><br></br>
                                            There are many variations of passages of Lorem Ipsum available.
                                        </p>
                                        <p> Max Bid : 100 </p>
                                        <button type="button" className="btn btn-outline-secondary" onClick={navigateToDetails}>Show Details</button>
                                        <Routes>
                                            <Route path="/AuctionTitleWithId" element={<ShowAuctionDetails />} />
                                        </Routes>
                                    </div>

                                </div>

                            </Card.Body>
                        </Card>
                                
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                        <Card className="bg-warning.bg-gradient">
                            <Card.Header className={"bg-warning text-white text-center"}> House picture</Card.Header>
                            <Card.Body >
                                <div className="card-image-container"> 
                                    <img 
                                        src={require('../images/house.jpeg')}
                                        alt="First slide"
                                    />
                                    <div className="card-body-container">
                                        <p>
                                            <b>Description </b><br></br>
                                            There are many variations of passages of Lorem Ipsum available.
                                        </p>
                                        <p> Max Bid : 100 </p>
                                        <button type="button" className="btn btn-outline-secondary" onClick={navigateToDetails}>Show Details</button>
                                        <Routes>
                                            <Route path="/AuctionTitleWithId" element={<ShowAuctionDetails />} />
                                        </Routes>
                                    </div>

                                </div>

                            </Card.Body>
                        </Card>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            
                                
                        </div>
                    </div>

                </div>
            </div>
        );
    }

export default Carousels;