import React from "react";

class SignUp extends React.Component{
    render(){
        const marginTop = {
            marginTop: "10px"
        }
        return(
            <div>
                <h1>Sign Up</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="inputFirstName">First Name</label>
                        <input type="text" className="form-control" id="inputFirstName" aria-describedby="firstName" placeholder="First Name"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputLastName">Last Name</label>
                        <input type="text" className="form-control" id="inputLastName" aria-describedby="lastName" placeholder="Last Name"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputEmail">Email address</label>
                        <input type="email" className="form-control" id="inputEmail" aria-describedby="email" placeholder="Enter email"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputPhone">Phone Number</label>
                        <input type="text" className="form-control" id="inputPhone" aria-describedby="phone" placeholder="Enter Phone"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputAddress">Address</label>
                        <input type="text" className="form-control" id="inputAddress" aria-describedby="address" placeholder="Enter Address"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputPassword">Password</label>
                        <input type="password" className="form-control" id="inputPassword" placeholder="Password"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm password"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="inputDOB">Date of Birth</label>
                        <input type="date" className="form-control" id="inputDOB" aria-describedby="dob" placeholder="Enter Date of Birth"/>
                    </div>


                    <div className="form-group text-center" style={marginTop}>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>

                </form>
            </div>
        );
    }
}

export default SignUp;