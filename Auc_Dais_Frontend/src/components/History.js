import React from "react";
import {Table, Card, Button} from "react-bootstrap";
import './Card.css'
import axios from "axios";
import {Link} from "react-router-dom";

class History extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            history : [],
            // get user_id from local storage
            user_id : localStorage.getItem('user_id'),
            user_token: localStorage.getItem('user')
        }
    }


    componentDidMount() {
        let url = "http://localhost:8080/history/get/user/" + this.state.user_id + "/" + this.state.user_token;
        axios({
            method: 'get',
            url: url,
            headers: {},
            data: {
                token: this.state.user_token
            }
        })
            .then(response => response.data)
            .then(data => {
                this.state.history = data;
                this.setState(this.state.history);
            })
            .catch(error => {
                console.log(error);
            });

    }

    render() {
        return (
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

                                        {this.state.history.length === 0 ?
                                            <tr>
                                                <td colSpan={7} className={"text-center"}>No history</td>
                                            </tr> :
                                            this.state.history.map((history, index) => {
                                                    return (
                                                        <tr key={history.id}>
                                                            <td>{index + 1}</td>
                                                            <td className={"text-center"}>{history.auctionProduct.product_name}</td>
                                                            <td className={"text-center"}>{history.auctionProduct.owner.firstName}</td>
                                                            <td className={"text-center"}>{history.auctionProduct.max_bid}</td>
                                                            <td className={"text-center"}>{history.bid_amount}</td>
                                                            <td className={"text-center"}>{history.date}</td>
                                                            <td className={"text-center"}>
                                                                <Link to={'/auction/' + history.auctionProduct.id} className={"btn btn-primary"}>View</Link>
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
            </div></div>
        );
    }
}

export default History;