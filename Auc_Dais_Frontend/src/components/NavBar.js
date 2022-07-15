import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";


class NavBar extends React.Component {
  render() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container fluid>
            <Link to={""} className="navbar-brand">
                AucDais
            </Link>
            {/*<Navbar.Brand href="#home">AucDais</Navbar.Brand>*/}
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                  <Link to={"addAuction"} className={"nav-link"}>Add Auction</Link>
                <Link to={"liveAuctions"} className={"nav-link"}>Live Auctions</Link>
                <Link to={"savedAuctions"} className={"nav-link"}>Saved Auctions</Link>
                <Link to={"history"} className={"nav-link"}>History</Link>

                <Form className="d-flex">
                  <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Nav>
                <Nav className="ml-auto">
                    <Link to={"login"} className={"nav-link"}>Log In</Link>
                    <Link to={"signup"} className={"nav-link"}>Sign Up</Link>
                </Nav>

            </Navbar.Collapse>
          </Container>
        </Navbar>
    )
  }
}

export default NavBar;