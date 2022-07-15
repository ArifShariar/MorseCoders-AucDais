import React from "react";
import {Card, ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
class AddAuctionSuccess extends React.Component{
    continue = e => {
       // go to homepage

    }
    render() {
        const marginTop = {
            marginTop: "10px"
        }
        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header className={"bg-dark text-white text-center"}>Success</Card.Header>
                <Card.Body>
                    <h1 className={"text-center"}>Auction Created Successfully</h1>
                </Card.Body>
                <Card.Footer className={"bg-dark text-white text-center"}>
                    <Link to={'/'} className={"btn btn-primary"}>Home</Link>
                </Card.Footer>
            </Card>
        );
    }
}
export default AddAuctionSuccess;