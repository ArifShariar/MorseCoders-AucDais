import React from "react";
import {Card} from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/Button";
import axios from "axios";
import './Card.css'
// this class will show the saved auctions by a user

class SavedAuctions extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            saved_auctions: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8080/savedAuctions/get/user/1")
            .then(response =>response.data)
            .then((data)=>{
                this.setState({saved_auctions: data});
        })
    }

    render() {
        return (
            <div className="card-container">
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
                                        {this.state.saved_auctions.length === 0 ?
                                            <tr>
                                                <td colSpan={7} className={"text-center"}>No saved auctions</td>
                                            </tr> :
                                            this.state.saved_auctions.map((auction, index) => {
                                                return (
                                                    <tr key={auction.auctionProduct.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{auction.auctionProduct.product_name}</td>
                                                        <td>{auction.auctionProduct.owner.firstName}</td>
                                                        <td>{auction.auctionProduct.max_bid}</td>
                                                        <td>{auction.auctionProduct.auction_start_date}</td>
                                                        <td>{auction.auctionProduct.auction_end_date}</td>
                                                        <td>
                                                            <Button variant="outline-danger" size="sm">Delete</Button>
                                                        </td>
                                                        <td>
                                                            <Button variant="outline-success" size="sm">View</Button>
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
}

export default SavedAuctions;