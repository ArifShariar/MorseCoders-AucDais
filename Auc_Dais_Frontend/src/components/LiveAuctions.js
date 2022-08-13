import React, {useState} from 'react'
import {Card} from "react-bootstrap"; 
import './Card.css'
import axios from "axios"; 
import {useNavigate} from "react-router-dom";
import { useEffect } from 'react';

import {toast} from "react-toastify";
import {Button} from "react-bootstrap";

function LiveAuctions (){

    let user_id = localStorage.getItem('user_id');
    const  [auctions, setAuctions] = useState([]);
    const navigate = useNavigate();


    const fetchLiveAuctions = () => {
        let url = "http://localhost:8080/auction_products/all/ongoing/user/" + user_id;

        axios.get(url).then(r => {
            setAuctions(r.data);
        }).catch(e => {
            toast.error("Error fetching auctions");
        })

    }

    const saveAuction = (auction_id) => {
        let url = "http://localhost:8080/savedAuctions/create/user/" + user_id + "/auction/" + auction_id + "/" + localStorage.getItem('user');
        axios({
            method: 'post',
            url: url,
            headers: {},
            data: {
                date: new Date(),
            }
        }).then(response => {
            if (response.data!=null){
                if (response.status === 200){
                    toast.success("Auction added to saved auctions");
                    document.getElementById("save").disabled = true;
                }
            }
        }).catch(error => {
            console.log(error);
            toast.error("Error adding auction to saved auctions");
            document.getElementById("save").disabled = true;
        });

    }

    const viewAndBid = (auction_id) => {
        navigate("/liveAuction", {state: {auctionId: auction_id}});
    }

    useEffect(() => {
        fetchLiveAuctions();
    },[]);

    return (
        <div className="home-element-padding">
        <div className="card-container">
            <div className='container-fluid' >
                <div className="row">
                    <div className=" col-sm-12">
                        <Card className=" bg-warning.bg-gradient">
                            <Card.Header className={"bg-warning text-white text-center"}> Live Auctions </Card.Header>
                            {auctions.length === 0 ? <Card.Body> No live auctions </Card.Body> :
                                auctions.map(auction => {
                                    return(
                                        <Card.Body key={auction.id}>
                                            <div className='card-image-container border border-warning'>
                                                <img
                                                    src={require('../images/vase.jpeg')}
                                                    alt="product image"
                                                    height={200}
                                                    width={150}
                                                />
                                                <div className="image-desc-container">
                                                    <p>Product name : {auction.product_name}</p>
                                                    <p>Max Bid: {auction.max_bid}</p>
                                                    <p>Start Date: {auction.auction_start_date}</p>
                                                    <p>End Date: {auction.auction_end_date}</p>

                                                    <Button variant="primary" onClick={()=>saveAuction(auction.id)} id={"save"}>Save</Button>{' '}
                                                    <Button variant="secondary" onClick={()=>viewAndBid(auction.id)} id={"view"}>View and Bid</Button>{' '}

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
        </div></div>
    );
}

export default LiveAuctions;