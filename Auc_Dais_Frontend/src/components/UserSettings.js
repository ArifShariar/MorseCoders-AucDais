import React, {useEffect, useState} from "react";
import {Card, Col, Row, Container} from "react-bootstrap";
import "./Card.css"

function UserSettings () {

    return (
        <div className="home-element-padding">
        <div className={"card-container"}>
            <div className={"container-fluid"}>
                <Card className="bg-warning.bg-gradient" >
                    <Card.Header className={"bg-warning text-white text-center"}>Settings</Card.Header>
                    <Card.Body>
                        <Container>
                            <div className="">
                                <div className="input-container">
                                    <label>Do you like get email about ongoing auctions? Click the Bell</label>
                                </div>

                                <div className="input-container">
                                    <label>Do you like to get promotional mail? Click <button type="button" className="btn btn-outline-warning">Yes</button> ! </label>
                                </div>
                            </div>
                        </Container>
                    </Card.Body>
                </Card>
            </div>
        </div>
        </div>
    );
}
export default UserSettings;