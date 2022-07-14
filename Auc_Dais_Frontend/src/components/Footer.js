import React from 'react';
import {Col, Navbar} from "react-bootstrap";
import Container from "react-bootstrap/Container";

class Footer extends React.Component {

    render() {
        let currentYear = new Date().getFullYear();
        let githubLink = "https://github.com/ArifShariar/";
        let gitHubIcon = "https://img.icons8.com/bubbles/50/000000/github.png";
        return (
            <Navbar bg="dark" variant="dark">
                <Container fluid={true}>

                    <Col lg={12} className="text-center text-muted">
                        <div>All rights reserved by MorseCoders © {currentYear}</div>
                        </Col>

                </Container>
                <Container fluid={true}>
                        <Col lg={12} className="text-center text-muted">
                            <div>
                                Find us on<a href={githubLink} target="_blank" rel="noopener noreferrer"><img src={gitHubIcon} alt={"GitHub"}/></a>
                            </div>
                        </Col>
                </Container>
            </Navbar>
        );
    }
}

export default Footer;