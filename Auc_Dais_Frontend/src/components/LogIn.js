import React, { useState } from "react";
import {Card, Form} from "react-bootstrap";
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate, useLocation} from "react-router-dom";
import {useAuth} from "./context/AuthProvider";

function LogInPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState('');
    const useauth = useAuth();
    const location = useLocation();

    const submitForm = async(event) => {
        event.preventDefault();
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;
        await axios.post('http://localhost:8080/users/login', {email: email, password: password}).then(
            response => {
                if(response.data != null) {
                    if(response.status === 200) {
                        setEmail('');
                        setPassword('');
                        // Saving token in the local storage.
                        useauth.login(response);

                        /*===== Here I'm trying to redirect to the page the user clicked before loging in ====*/
                        /*===== Though not that necessary still a nice feature to have. ====*/
                        /*===== We get the path name from "RequireAuth.js" file =====*/
                        
                        //var homepath = '/?id=' + response.data.id;
                        //const redirectpath = location.state.path;
                        //alert(redirectpath);

                        navigate('/', {
                            state: { 
                                    id: response.data.user.id,
                                    created: false,
                                    name: response.data.firstName
                                },
                            replace: true
                            }
                        );
                    }
                }
            }
        ).catch(error => {
            console.log(error.response)
            // check if the error code is 5**
            if(error.response != null) {
                if (error.response.status >= 500) {
                    alert("Server Error: Failed to login, please try with different credentials");
                }
                else if (error.response.status === 400) {
                    notify();
                }
            }
            else    {console.log("login response is null");}
        });
    }

    const setcurrentUser = (event) => {
        setEmail(event.target.value);
        setUser(event.target.value);
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
        <div className="home-element-padding">
        <div className="card-container">
            <div className='container-fluid' >
                <div className="row">
                    <div className=" col-sm-12">
                    <Card className=" bg-warning.bg-gradient">
                        <Card.Header className={"bg-warning text-white text-center"}> Log In</Card.Header> 
                            <Card.Body>
                                <div className="row">
                                    <div className="col col-element">
                                        <Form id="signupform" onSubmit={submitForm}>
                                            <Form.Group className="mb-3" controlId="inputEmail">
                                                <Form.Label>Email</Form.Label>
                                                <Form.Control required id="email" type="email" name="email" placeholder="Email" onChange={setcurrentUser}/>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="inputPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control required id="password" type="password" name="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                                            </Form.Group>

                                            <div className="form-group d-grid gap-2 col-6 mx-auto text-container">
                                                <button type="submit" className="btn btn-secondary">Log In</button>
                                            </div>
                                        </Form>
                                    </div>
                                    <div className="image-container col">
                                        <img
                                            src={require("../images/login-auction.jpg")}
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
        </div></div>
    )
}

export default LogInPage;