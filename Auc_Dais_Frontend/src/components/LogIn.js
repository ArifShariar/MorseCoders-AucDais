import React from "react";
import {Card} from "react-bootstrap";
import axios from "axios";
class LogInPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.submitForm = this.submitForm.bind(this);
    }

    initialState = {
        email: '',
        password: ''
    }

    submitForm = event => {
        event.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('http://localhost:8080/users/login', user).then(
            response => {
                if(response.data != null) {
                    this.setState(this.initialState);
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
    render() {
        return (
            <div className="card-container">
                <div className='container-fluid' >
                    <div className="row">
                        <div className=" col-sm-12">
                        <Card className=" bg-warning.bg-gradient">
                            <Card.Header className={"bg-warning text-white text-center"}> Log In</Card.Header> 
                                <Card.Body>
                                    <div> 
                                        <form>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Email address</label>
                                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="exampleInputPassword1">Password</label>
                                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                                            </div>
                                            <div className="form-group d-grid gap-2 col-6 mx-auto text-container">
                                                <button type="submit" className="btn btn-secondary">Submit</button>
                                            </div>

                                        </form>
                                    </div>

                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default LogInPage;