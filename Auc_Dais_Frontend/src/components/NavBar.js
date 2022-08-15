import React from 'react';
import { NavDropdown, Navbar, Nav, Form, Button, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import { useAuth } from './context/AuthProvider';
import "./SideBar.css"
import "./DropDownMenu.css"

function NavBar() {
    const navigate = useNavigate();
    const useauth = useAuth();
    let searchResult = [];
    //console.log('in navbar'+useAuth);

    const onSubmit = (e) => {
        e.preventDefault();
        let search_keyword = document.getElementById("search_keyword").value;


        if (localStorage.getItem('user_id') === null) {
            axios.get("http://localhost:8080/auction_products/search/" + search_keyword)
                .then(response => response.data)
                .then(data => {
                    searchResult = data;
                    navigate("/search", {state: {searchResult: searchResult}});

                })
                .catch(error => {
                    console.log(error);
                })
        }

        else {
            axios.get("http://localhost:8080/auction_products/search/" + search_keyword + "/" + localStorage.getItem('user_id'))
                .then(response => response.data)
                .then(data => {
                    searchResult = data;
                    navigate("/search", {state: {searchResult: searchResult}});

                })
                .catch(error => {
                    console.log(error);
                })
        }

    }

    const handleLogout = (event) => {
        event.preventDefault();
        useauth.logout();
        window.location.replace("http://localhost:3000");
    }

    const paddingLeft = {
        paddingLeft: "10px"
    }

    return (
        <Navbar collapseOnSelect expand="lg" sticky="top">
                <img
                    src={require("../images/auction-logo.webp")}
                    width="100"
                    height="40"
                    className="d-inline-block align-top left-padding-for-logo"
                    alt=""
                />
                
                <Navbar.Brand className="justify-content-end px-3">
                <Link to={""} className="navbar-brand text-white">
                    AucDais
                </Link>
                </Navbar.Brand>

                <Navbar.Collapse className="d-flex justify-content-center">
                     <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Enter Keyword"
                                className="mx-2 p-2"
                                aria-label="Search"
                                id="search_keyword"
                                name="search_keyword"
                            />
                            <div className="d-grid gap-2 mx-auto bg-danger text-white ">
                                <Button type="submit" className="btn btn-danger"
                                        onClick={onSubmit}> Search</Button>
                            </div>
                        </Form>
                </Navbar.Collapse>


                    {!useauth.isLogin() && (
                            <Nav className="d-flex justify-content-end mx-3">
                                <Link to={"login"} className={"nav-link text-white"}>Log In</Link>
                                <Link to={"signup"} className={"nav-link text-white"}>Sign Up</Link>
                            </Nav>
                        )
                    }

                    {useauth.isLogin() && (
                            <Nav className="d-flex justify-content-center px-4" pullRight>
                                <NavDropdown title={
                                    <span className='text-white'>
                                        {useauth.getName()}
                                        <Image className="thumbnail-image"
                                            src={useauth.getImage()?useauth.getImage():"https://raw.githubusercontent.com/PhenoApps/Field-Book/master/.github/blank-profile.png?s=100"}
                                            roundedCircle
                                            alt="user pic"
                                            style={{ width: '30px', height: '25px', margin:'2px 0px 0px 10px'}}
                                        />
                                    </span>
                                }
                                id="basic-nav-dropdown"
                                className="drop-down-menu">

                                    <NavDropdown.Item className="nav-item">
                                        <Link to={"profile"} className="nav-link text-dark">Profile</Link>
                                    </NavDropdown.Item>

                                    <NavDropdown.Item className="nav-item">
                                        <Link to={"settings"} className='nav-link text-dark'>Settings</Link>
                                    </NavDropdown.Item>

                                    <NavDropdown.Item className="nav-item">
                                        <Link to={""} className='nav-link text-dark' onClick={handleLogout}>Logout</Link>
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        )
                    }
        </Navbar>
    )

}

export default NavBar;