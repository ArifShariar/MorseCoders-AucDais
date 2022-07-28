import React from "react";
import {Card, Form} from "react-bootstrap";
import './Card.css'
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class SignUp extends React.Component{

    constructor(props) {
        super(props);
        this.state = this.initialstate;
        this.userChange = this.userChange.bind(this);
        this.submitUser = this.submitUser.bind(this);
    }

    initialstate = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        password: '',
        confirmpass: '',
        dateOfBirth: ''
    };

    submitUser = event => {
        event.preventDefault();
        const user = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phoneNumber: this.state.phoneNumber, 
            address: this.state.address,
            password: this.state.password,
            dateOfBirth: this.state.dateOfBirth
        }

        if (this.state.password !== this.state.confirmpass) {
            this.notify();
            return;
        }

        axios.post('http://localhost:8080/users/signup', user).then(
            response => {
                if(response.data != null) {
                    this.setState(this.initialstate);
                    alert("User Creation Successful");
                }
            }
        ).catch(error => {
	    console.log(error.response)
            // check if the error code is 5**
            if (error.response.status >= 500) {
                alert("Server Error: Failed to create user, please try with different credentials");
            }
	});
    }

    userChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    
    notify = () => {
        toast.error("Passwords do not match",
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


    render(){
        return(
            <div className="card-container">
                <div className='container-fluid' >
                    <div className="row">
                        <div className=" col-sm-12">
                        <Card className=" bg-warning.bg-gradient">
                            <Card.Header className={"bg-warning text-white text-center"}> Sign Up</Card.Header>
                             <Card.Body>
                                    <Form id="signupform" onSubmit={this.submitUser}>
                                        <Form.Group className="mb-3" controlId="inputFirstName">
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control required value={this.state.firstName} onChange={this.userChange} type="text" name="firstName" placeholder="First Name" />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="inputLastName">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control required value={this.state.lastName} onChange={this.userChange} type="text" name="lastName" placeholder="Last Name" />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="inputEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control required value={this.state.email} onChange={this.userChange} type="email" name="email" placeholder="Enter email" />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="inputPhone">
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control required value={this.state.phoneNumber} onChange={this.userChange} type="text" name="phoneNumber" placeholder="Enter Phone" />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="inputAddress">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control required value={this.state.address} onChange={this.userChange} type="text" name="address" placeholder="Enter Address" />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="inputPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control required value={this.state.password} onChange={this.userChange} type="password" name="password" placeholder="Password" />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="confirmPassword">
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control required value={this.state.confirmpass} onChange={this.userChange} type="password" name="confirmpass" placeholder="Confirm Password" />
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="inputDOB">
                                            <Form.Label>Date of Birth</Form.Label>
                                            <Form.Control required value={this.state.dateOfBirth} onChange={this.userChange} type="date" name="dateOfBirth" placeholder="Enter Date of Birth" />
                                        </Form.Group>

                                        <div className="form-group d-grid gap-2 col-6 mx-auto text-container">
                                            <button type="submit" className="btn btn-secondary">Submit</button>
                                        </div>
                                    </Form>

                                </Card.Body>
                            </Card> 
                        </div>
                    </div>
                </div>
                <ToastContainer/>
            </div>
        );
    }
}

export default SignUp;
