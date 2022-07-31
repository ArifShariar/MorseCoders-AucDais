import React from "react";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";
import './Card.css'

class AddAuctionSuccess extends React.Component{
    render() {
        return (
            <div className="card-container">
                <div className='container-fluid' >
                    <div className="row">
                        <div className=" col-sm-12">
                        <Card className=" bg-warning.bg-gradient">
                            <Card.Header className={"bg-warning text-white text-center"}> Saved Auctions </Card.Header>
                             <Card.Body>
                                <h1 className={"text-center"}>Auction Created Successfully</h1>
                            </Card.Body>
                            <Card.Footer className={"bg-white text-white text-center"}>
                                <Link to={'/'} className={"btn btn-primary"}>Home</Link>
                            </Card.Footer> 
                        </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default AddAuctionSuccess;