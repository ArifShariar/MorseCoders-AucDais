import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Card.css'
import {Card} from "react-bootstrap";
import axios from "axios";
import {toast} from "react-toastify";





function Carousels () {
    const navigate = useNavigate();
    let user_id = localStorage.getItem('user_id');
    const [auctions, setAuctions] = useState([]);


    const randomAuctions = () => {

        if (user_id === null) {
            let url = "http://localhost:8080/auction_products/auction/random";
            axios.get(url).then(r => {
                setAuctions(r.data);
            }).catch(e => {
                toast.error("Error fetching auctions");
            })
        }
        else{
            let url = "http://localhost:8080/auction_products/auction/random/" + user_id;
            axios.get(url).then(r => {
                setAuctions(r.data);
            }).catch(e => {
                toast.error("Error fetching auctions");
            })
        }


    }



    useEffect(() => {
        randomAuctions();
    }, []);


    const navigateToDetails = (auction_id) => {
        navigate("/auction/" + auction_id, {state: {auctionId: auction_id}});
    };


    return (
        <div className="card-container">
            <div className='container-fluid' >

                {auctions.length === 0 ?
                    <div className="row">
                        <div className=" col-sm-12">
                            <Card className=" bg-warning.bg-gradient">
                                <Card.Header className={"bg-warning text-white text-center"}>No Auction Found</Card.Header>
                                <Card.Body >
                                    <p className={"text-center"}>No Auction Found</p>

                                </Card.Body>
                            </Card>
                        </div>
                    </div> :
                    auctions.map(auction => {
                        return(
                            <div className="row">
                                <div className=" col-sm-12">
                                    <Card className=" bg-warning.bg-gradient">
                                        <Card.Header className={"bg-warning text-white text-center"}>{auction.product_name}</Card.Header>
                                        <Card.Body >
                                            <div className="card-image-container">
                                                <img width={200} height={200} src={auction.photos} alt="product image"/>

                                                <div className="card-body-container">
                                                    <p>
                                                        <b>Description </b><br></br>
                                                        {auction.product_description}
                                                    </p>
                                                    <button type="button" className="btn btn-outline-secondary" onClick={()=>navigateToDetails(auction.id)}>Show Details</button>

                                                </div>

                                            </div>

                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default Carousels;