import React, { useState } from "react";
import {Card, Form} from "react-bootstrap";
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom"

function LogInPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitForm = (event) => {
        event.preventDefault();
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        axios.post('http://localhost:8080/users/login', {email: email, password: password}).then(
            response => {
                if(response.data != null) {
                    if(response.status === 200) {
                        //this.setState(this.initialState);
                        setEmail('');
                        setPassword('');
                        navigate("/?id=" + response.data.id, {
                            state: { 
                                    id: response.data.id,
                                }
                            }
                        );
                    }
                }
            }
        ).catch(error => {
        console.log(error.response)
            // check if the error code is 5**
            if (error.response.status >= 500) {
                alert("Server Error: Failed to login, please try with different credentials");
            }
            else if (error.response.status === 400) {
                notify();
            }
        });
    }

    const notify = () => {
        toast.error('Wrong email or password',
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

    return (
        <div className="card-container">
            <div className='container-fluid' >
                <div className="row">
                    <div className=" col-sm-12">
                    <Card className=" bg-warning.bg-gradient">
                        <Card.Header className={"bg-warning text-white text-center"}> Log In</Card.Header> 
                            <Card.Body>
                                <Form id="signupform" onSubmit={submitForm}>
                                    <Form.Group className="mb-3" controlId="inputEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control required id="email" type="email" name="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="inputPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control required id="password" type="password" name="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
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
    )
}

export default LogInPage;