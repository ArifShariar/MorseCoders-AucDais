import React, {useState} from 'react'
import {Card} from "react-bootstrap";
import './Card.css'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { useEffect } from 'react';

import {toast} from "react-toastify";
import {Button} from "react-bootstrap";

function WonAuctions (){

    let user_id = localStorage.getItem('user_id');

    const  [auctions, setAuctions] = useState([]);
    const navigate = useNavigate();


    const fetchWonAuctions = () => {
        let url = "http://localhost:8080/won_auctions/all/" + user_id;

        axios.get(url).then(r => {
            setAuctions(r.data);
        }).catch(e => {
            toast.error("Error fetching auctions");
        })

    }

    const payment = (auction_id) => {
        navigate('payment', {state: {auction_id: auction_id}});

    }

    const viewAndBid = (auction_id) => {
        alert("View and Bid");
    }

    useEffect(() => {
        fetchWonAuctions();
    },[]);

    return (
        <div className="home-element-padding">
            <div className="card-container">
                <div className='container-fluid' >
                    <div className="row">
                        <div className=" col-sm-12">
                            <Card className=" bg-warning.bg-gradient">
                                <Card.Header className={"bg-warning text-white text-center"}> Won Auctions </Card.Header>
                                {auctions.length === 0 ? <Card.Body> No Won auctions </Card.Body> :
                                    auctions.map(auction => {
                                        return(
                                            <Card.Body key={auction.id}>
                                                <div className='card-image-container border border-warning'>
                                                    <img
                                                        src={auction.auctionProduct.photos}
                                                        alt="product image"
                                                        height={200}
                                                        width={200}
                                                    />
                                                    <div className="image-desc-container">
                                                        <p>Product name : {auction.auctionProduct.product_name}</p>
                                                        <p>Max Bid: {auction.auctionProduct.max_bid}</p>
                                                        <p>Start Date: {auction.auctionProduct.auction_start_date}</p>
                                                        <p>End Date: {auction.auctionProduct.auction_end_date}</p>
                                                        <Button variant="secondary" onClick={()=>viewAndBid(auction.auctionProduct.id)} id={"view"}>View</Button>{' '}
                                                        <Button variant="info" onClick={()=>payment(auction.auctionProduct.id)} id={"payment"}>Proceed to Pay</Button>{' '}

                                                    </div>
                                                </div>
                                            </Card.Body>
                                        );
                                    })
                                }

                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WonAuctions;