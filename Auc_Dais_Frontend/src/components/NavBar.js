import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom"; 


class NavBar extends React.Component {
  render() {
    return (
        <Navbar collapseOnSelect expand="lg" sticky="top" >
          <Container fluid >
            <Link to={""} className="navbar-brand text-white">
                AucDais
            </Link>
            {/*<Navbar.Brand href="#home">AucDais</Navbar.Brand>*/}
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto ">
                  <Link to={"addAuction"} className={"nav-link text-white"}>Add Auction</Link>
                <Link to={"liveAuctions"} className={"nav-link text-white"}>Live Auctions</Link>
                <Link to={"savedAuctions"} className={"nav-link text-white"}>Saved Auctions</Link>
                <Link to={"history"} className={"nav-link text-white"}>History</Link>
                <Link to={"location"} className={"nav-link text-white"}>Location</Link>
                <Form className="d-flex">
                  <Form.Control
                      type="search"
                      placeholder="Enter Keyword"
                      className="me-2"
                      aria-label="Search"
                  />
                  <div className="d-grid gap-2 col-6 mx-auto bg-danger text-white ">
                      <Button type="submit" className="btn btn-danger"> Search</Button> 
                  </div>
                  
                </Form>
            


              </Nav>
                <Nav className="ml-auto">
                    <Link to={"login"} className={"nav-link text-white"}>Log In</Link>
                    <Link to={"signup"} className={"nav-link text-white"}>Sign Up</Link>
                </Nav>

            </Navbar.Collapse>
          </Container>
        </Navbar>
    )
  }
}

export default NavBar;