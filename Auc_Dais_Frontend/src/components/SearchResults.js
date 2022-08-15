import React from "react";
import {Card, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";




function SearchResult() {
    const {state} = useLocation();
    console.log(state.searchResult);
    // get search_keyword from url
    let search_result = state.searchResult;
    let user_id = localStorage.getItem('user_id');
    const navigate = useNavigate();

    function AddToSave(id){
        let url = "http://localhost:8080/savedAuctions/create/user/" + user_id + "/auction/" + id + "/" + localStorage.getItem('user');
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
                    document.getElementById(id).disabled = true;
                }
            }
        }).catch(error => {
            toast.error("Error adding auction to saved auctions");
            document.getElementById(id).disabled = true;
        });
    }

    const ViewAuctionDetails = (id) => {
        navigate("/auction/" + id, {state: {auctionId: id}});
    }

    return(
        <div className="home-element-padding">
        <div className="card-container">
            <div className='container-fluid' >
                <div className="row">
                    <div className=" col-sm-12">
                        <Card className=" bg-warning.bg-gradient">
                            <Card.Header className={"bg-warning text-white text-center"}> Search Result </Card.Header>
                            {search_result.length === 0 ? <Card.Body> No Auctions </Card.Body> :
                                search_result.map(auction => {
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
                                                    <Button variant="secondary" onClick={()=>ViewAuctionDetails(auction.id)} id={"view"}>View</Button>{' '}
                                                    <Button variant="info" onClick={()=>AddToSave(auction.id)} id={auction.id}>Save</Button>{' '}

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

export default SearchResult;