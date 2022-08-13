import React, {useEffect, useState} from "react";
import {Card} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function SavedAuctions() {
    let [savedAuctions, setSavedAuctions] = useState([]);
    let user_id = localStorage.getItem('user_id');
    let user_token = localStorage.getItem('user');
    let [numSaveAuc, setNumSaveAuc] = useState();

    const navigate = useNavigate();

    const deleteAuction = (id) => {
        // /delete/user/{userId}/auction/{auctionId}/{token}
        let delete_url = "http://localhost:8080/savedAuctions/delete/user/" + localStorage.getItem('user_id') + "/auction/" + id + "/" + localStorage.getItem('user');
        axios({
            method: 'delete',
            url: delete_url
        }).then(() => {
            setNumSaveAuc(numSaveAuc-1)
        })
    }


    const showAuctionDetails = (id) => {
        // use navigate to go to the auction details page
        navigate("/auction/" + id, {state: {auctionId: id}});
    }

    useEffect(() => {
        axios.get("http://localhost:8080/savedAuctions/get/user/" + user_id + "/" + user_token)
            .then(response =>response.data)
            .then(data =>{
                setNumSaveAuc(data.length);
                setSavedAuctions(data);
            })
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8080/savedAuctions/get/user/" + user_id + "/" + user_token)
            .then(response =>response.data)
            .then(data =>{
                setSavedAuctions(data);
            })
    }, [numSaveAuc]);

    return(
        <div className="home-element-padding">
            <div className="card-container ">
                <div className='container-fluid' >
                    <div className="row">
                        <div className=" col-sm-12">
                            <Card className=" bg-warning.bg-gradient">
                                <Card.Header className={"bg-warning text-white text-center"}> Saved Auctions </Card.Header>
                                <Card.Body>
                                    <Table bordered hover striped responsive>
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th className={"text-center"}>Auction Product</th>
                                            <th className={"text-center"}>Owner</th>
                                            <th className={"text-center"}>Max Bid</th>
                                            <th className={"text-center"}>Start Date</th>
                                            <th className={"text-center"}>End Date</th>
                                            <th colSpan={2} className={"text-center"}>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {savedAuctions.length === 0 ?
                                            <tr>
                                                <td colSpan={7} className={"text-center"}>No saved auctions</td>
                                            </tr> :
                                            savedAuctions.map((auction, index) => {
                                                return (
                                                    <tr key={auction.auctionProduct.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{auction.auctionProduct.product_name}</td>
                                                        <td>{auction.auctionProduct.owner.firstName}</td>
                                                        <td>{auction.auctionProduct.max_bid}</td>
                                                        <td>{auction.auctionProduct.auction_start_date}</td>
                                                        <td>{auction.auctionProduct.auction_end_date}</td>
                                                        <td>
                                                            <Button variant="outline-danger" size="sm" className={"text-center"} onClick={()=>deleteAuction(auction.auctionProduct.id)}>Delete</Button>
                                                        </td>
                                                        <td>
                                                            <Button variant="outline-success" size="sm" className={"text-center"} onClick={()=>showAuctionDetails(auction.auctionProduct.id)}>View</Button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );




}
export default SavedAuctions;