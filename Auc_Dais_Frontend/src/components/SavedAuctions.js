import React from "react";
import {Card} from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import Button from "react-bootstrap/Button";

// this class will show the saved auctions by a user

class SavedAuctions extends React.Component{

    render() {


        return (

                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header className={"bg-dark text-white"}>Saved Auctions</Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark" responsive>
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
                            <tr>
                                <td>1</td>
                                <td>Casio Calculator</td>
                                <td>John Doe</td>
                                <td>500</td>
                                <td>12/05/2022:12.00pm</td>
                                <td>14/05/2022:12.00pm</td>
                                <td><Button >View</Button></td>
                                <td><Button variant="danger">Delete</Button></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Casio Calculator</td>
                                <td>John Doe</td>
                                <td>500</td>
                                <td>12/05/2022:12.00pm</td>
                                <td>14/05/2022:12.00pm</td>
                                <td><Button >View</Button></td>
                                <td><Button variant="danger">Delete</Button></td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Casio Calculator</td>
                                <td>John Doe</td>
                                <td>500</td>
                                <td>12/05/2022:12.00pm</td>
                                <td>14/05/2022:12.00pm</td>
                                <td><Button >View</Button></td>
                                <td><Button variant="danger">Delete</Button></td>
                            </tr>
                            </tbody>
                        </Table>

                    </Card.Body>
                </Card>

        );
    }
}

export default SavedAuctions;