import React from "react";
import {Card, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useLocation} from "react-router-dom";
import axios from "axios";




function SearchResult() {
    const {state} = useLocation();
    console.log(state.searchResult);
    // get search_keyword from url
    let search_result = state.searchResult;
    let user_id = 2;


    function AddToSave(id){
        //http://localhost:8080/savedAuctions/create/user/1/auction/2
        let url = "http://localhost:8080/savedAuctions/create/user/" + user_id + "/auction/" + id;
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
                    alert("Auction added to saved auctions");
                    // disable button
                    document.getElementById(id).disabled = true;
                }
            }
        }).catch(error => {
            console.log(error);
            alert("Error adding auction to saved auctions");
            document.getElementById(id).disabled = true;
        });
    }


    function ViewAuctionDetails(id) {
        console.log("View Auction Details : " + id);
    }

    return(
                <div className="card-container">
                    <div className='container-fluid' >
                        <div className="row">
                            <div className=" col-sm-12">
                                <Card className=" bg-warning.bg-gradient">
                                    <Card.Header className={"bg-warning text-white text-center"}> Search Result </Card.Header>
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
                                            {search_result.length === 0 ?
                                                <tr>
                                                    <td colSpan={7} className={"text-center"}>No Matching Result</td>
                                                </tr> :
                                                search_result.map((auction, index) => {
                                                    return (
                                                        <tr key={auction.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{auction.product_name}</td>
                                                            <td>{auction.owner.firstName}</td>
                                                            <td>{auction.max_bid}</td>
                                                            <td>{auction.auction_start_date}</td>
                                                            <td>{auction.auction_end_date}</td>
                                                            <td>
                                                                <Button variant="outline-danger" size="sm" onClick={()=>ViewAuctionDetails(auction.id)}>View</Button>
                                                            </td>
                                                            <td>
                                                                <Button variant="outline-success" size="sm" onClick={()=>AddToSave(auction.id)} id={auction.id}>Save</Button>
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
            );


}

export default SearchResult;