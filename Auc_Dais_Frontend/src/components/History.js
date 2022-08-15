import React, {useEffect, useState} from 'react';
import {Button, Card, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

function History(){
    let user_id = localStorage.getItem('user_id');
    let user_token = localStorage.getItem('user');
    const[auctions, setAuctions] = useState([]);
    const navigate = useNavigate();


    const fetchHistory = () => {
        let url = "http://localhost:8080/history/get/user/" + user_id + "/" + user_token;
        axios.get(url).then(r => {
            setAuctions(r.data);
        }).catch(e => {
            toast.error("Error fetching history");
        });
    }


    useEffect(() => {
        fetchHistory();
    },[]);


    const viewAuction = (id) => {
        navigate("/auction/" + id, {state: {auctionId: id}});
    }

    return(
        <div className="home-element-padding">
            <div className="card-container">
                <div className='container-fluid' >
                    <div className="row">
                        <div className=" col-sm-12">
                            <Card className=" bg-warning.bg-gradient">
                                <Card.Header className={"bg-warning text-white text-center"}>History</Card.Header>
                                <Card.Body>
                                    <Table striped bordered hover size="sm">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th className={"text-center"}>Auction Product</th>
                                            <th className={"text-center"}>Owner</th>
                                            <th className={"text-center"}>Current Max Bid</th>
                                            <th className={"text-center"}>Your Bid</th>
                                            <th className={"text-center"}>Bid Date</th>
                                            <th className={"text-center"}>View Auction</th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        {auctions.length === 0 ?
                                            <tr>
                                                <td colSpan={7} className={"text-center"}>No history</td>
                                            </tr> :
                                            auctions.map((history, index) => {
                                                    return (
                                                        <tr key={history.id}>
                                                            <td>{index + 1}</td>
                                                            <td className={"text-center"}>{history.auctionProduct.product_name}</td>
                                                            <td className={"text-center"}>{history.auctionProduct.owner.firstName}</td>
                                                            <td className={"text-center"}>{history.auctionProduct.max_bid}</td>
                                                            <td className={"text-center"}>{history.bid_amount}</td>
                                                            <td className={"text-center"}>{history.date}</td>
                                                            <td className={"text-center"}>
                                                                <Button variant={'primary'} onClick={()=>viewAuction(history.auctionProduct.id)}>View</Button>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            )
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
export default History;