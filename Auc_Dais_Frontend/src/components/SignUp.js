import React, { useState } from "react";
import {Card, Form} from "react-bootstrap";
import './Card.css';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "./context/AuthProvider";
import { useNavigate } from "react-router-dom";

function SignUp() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpass, setConPassword] = useState('');
    const [dateOfBirth, setDob] = useState('');
    const [user, setUser] = useState();
    const useauth = useAuth();
    const navigate = useNavigate();

    const submitUser = event => {
        event.preventDefault();

        var fname = document.getElementById("fname").value;
        var lname = document.getElementById("lname").value;
        var mail = document.getElementById("mail").value;
        var phone = document.getElementById("phone").value;
        var addr = document.getElementById("addr").value;
        var pwd = document.getElementById("pwd").value;
        var cpwd = document.getElementById("cpwd").value;
        var dob = document.getElementById("dob").value;

        const newUser = {
            firstName: fname,
            lastName: lname,
            email: mail,
            phoneNumber: phone, 
            address: addr,
            password: pwd,
            dateOfBirth: dob
        }

        if (pwd !== cpwd) {
            notify("Passwords do not match");
            return;
        }

        axios.post('http://localhost:8080/users/signup', newUser).then(
            response => {
                if(response.data != null) {
                    if(response.status == 200) {
                        setFirstName('');
                        setLastName('');
                        setEmail('');
                        setAddress('');
                        setPhoneNumber('');
                        setPassword('');
                        setConPassword('');
                        setDob('');
                        // useauth.login(response.data.token);
                        
                        navigate('/login', {
                                state: {
                                    created: true,
                                    name: fname
                                },
                                replace: true
                            }
                        );
                    }
                }
            }
        ).catch(error => {
            // check if the error code is 5**
            if (error.response.status >= 500) {
                alert("Server Error: Failed to create user, please try with different credentials");
            }
            else if (error.response.status == 400) {
                notify("Email already taken");
            }
	    });
    }

    
    const notify = (msg) => {
        toast.error(msg,
            {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
            },
        );
    }

    const setcurrentUser = (event) => {
        setEmail(event.target.value);
        setUser(event.target.value);
    }

    return(
        <div className="card-container">
            <div className='container-fluid' >
                <div className="row">
                    <div className="col">
                    <Card className=" bg-warning.bg-gradient">
                        <Card.Header className={"bg-warning text-white text-center"}> Sign Up</Card.Header>
                            <Card.Body>
                            <div className="row">
                            <div className="col">
                                <Form id="signupform" onSubmit={submitUser}>
                                    <Form.Group className="mb-3" controlId="inputFirstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control required onChange={(e)=>setFirstName(e.target.value)} type="text" name="firstName" placeholder="First Name" id="fname"/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="inputLastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control required onChange={(e)=>setLastName(e.target.value)} type="text" name="lastName" placeholder="Last Name" id="lname"/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="inputEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control required onChange={setcurrentUser} type="email" name="email" placeholder="Enter email" id="mail"/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="inputPhone">
                                        <Form.Label>Phone Number</Form.Label>
                                        <Form.Control required onChange={(e)=>setPhoneNumber(e.target.value)} type="text" name="phoneNumber" placeholder="Enter Phone" id="phone"/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="inputAddress">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control required onChange={(e)=>setAddress(e.target.value)} type="text" name="address" placeholder="Enter Address" id="addr"/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="inputPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control required onChange={(e)=>setPassword(e.target.value)} type="password" name="password" placeholder="Password" id="pwd"/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="confirmPassword">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <Form.Control required onChange={(e)=>setConPassword(e.target.value)} type="password" name="confirmpass" placeholder="Confirm Password" id="cpwd"/>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="inputDOB">
                                        <Form.Label>Date of Birth</Form.Label>
                                        <Form.Control required onChange={(e)=>setDob(e.target.value)} type="date" name="dateOfBirth" placeholder="Enter Date of Birth" id="dob"/>
                                    </Form.Group>

                                    <div className="form-group d-grid gap-2 col-6 mx-auto text-container">
                                        <button type="submit" className="btn btn-secondary">Submit</button>
                                    </div>
                                </Form>
                                </div>
                                        <div className="image-container col">
                                            <img
                                                src={require("../images/online-auctions.jpg")}
                                                alt="online-auctions photo"
                                                height={'100%'}
                                                width={'100%'}
                                            /> 
                                        </div>
                                    </div>
                            </Card.Body>
                        </Card> 
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default SignUp;
