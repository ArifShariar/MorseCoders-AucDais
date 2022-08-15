import React, {useState} from 'react'
import {Card} from "react-bootstrap";
import './Card.css'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { useEffect } from 'react';

import {toast} from "react-toastify";
import {Button} from "react-bootstrap";

function MyAuctions(){

    let user_id = localStorage.getItem('user_id');

    const  [auctions, setAuctions] = useState([]);
    const navigate = useNavigate();


    const fetchWonAuctions = () => {
        let url = "http://localhost:8080/auction_products/all/" + user_id;

        axios.get(url).then(r => {
            setAuctions(r.data);
        }).catch(e => {
            toast.error("Error fetching auctions");
        })

    }


    const view = (auction_id) => {
        navigate("/myAuctions/myAuction/" + auction_id, {state: {auctionId: auction_id}});
    }

    const update = (auction_id) => {
        navigate("/update/" + auction_id, {state: {auctionId: auction_id}});
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
                                <Card.Header className={"bg-warning text-white text-center"}> My Auctions </Card.Header>
                                {auctions.length === 0 ? <Card.Body className={"text-center"}> No Auctions </Card.Body> :
                                    auctions.map(auction => {
                                        return(
                                            <Card.Body key={auction.id}>
                                                <div className='card-image-container border border-warning'>
                                                    <img
                                                        src={auction.photos}
                                                        alt="product image"
                                                        height={200}
                                                        width={200}
                                                    />
                                                    <div className="image-desc-container">
                                                        <p>Product name : {auction.product_name}</p>
                                                        <p>Max Bid: {auction.max_bid}</p>
                                                        <p>Start Date: {auction.auction_start_date}</p>
                                                        <p>End Date: {auction.auction_end_date}</p>
                                                        <Button variant="secondary" onClick={()=>view(auction.id)} id={"view"}>View</Button>{' '}
                                                        <Button variant="info" onClick={()=>update(auction.id)} id={"payment"}>Update</Button>{' '}

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

export default MyAuctions;