import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {NavDropdown} from "react-bootstrap";

class NavBar extends React.Component {
  render() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container fluid>
            <Navbar.Brand href="#home">AucDais</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#features">Live Auctions</Nav.Link>
                <Nav.Link href="#pricing">Saved Auctions</Nav.Link>
                <NavDropdown title="Inventory" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Inventory</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  {/*<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
                  {/*<NavDropdown.Divider />*/}
                  {/*<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>*/}
                </NavDropdown>
                <Nav.Link href="#history">History</Nav.Link>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    )
  }
}

export default NavBar;