import React from 'react'
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {Button} from "react-bootstrap";

function PaymentWithPayPal() {

    let user_id = localStorage.getItem('user_id');
    const {state} = useLocation();
    let [wonAuction, setWonAuction] = useState([]);

    let won_auction_id = localStorage.getItem('won_auction_id');

    const fetchAuction = () => {
        let url = "http://localhost:8080/won_auctions/get/" + won_auction_id;
        axios.get(url).then(r => {
            setWonAuction(r.data);
        }).catch(e => {
            toast.error("Error fetching auction");
        })
    }

    const payWithPaypal = () => {
        let url = "http://localhost:8080/won_auctions/pay/" + won_auction_id;
        axios({
            method: 'put',
            url: url,
            data: {
                paymentMethod : "PAYPAL"
            }

        });

        toast.success("Payment successful");
    }

    useEffect(() => {
        fetchAuction();
    }, []);



    return (
        <div className='payment-method'>
            <h3 className='text-center'> Payment with PayPal</h3>
            <form className='payment-method'>
                <div className="form-group d-flex flex-row justify-content-between">
                    <input type="name" className="form-control rounded-pill" id="name" aria-describedby="name" placeholder="First Name"/>
                    <input type="name" className="form-control rounded-pill" id="name" aria-describedby="name" placeholder="Last Name"/>
                </div>
                <div className="form-group d-flex flex-row justify-content-between">
                    <input type="email" className="form-control rounded-pill" id="email" placeholder="Email"/>
                    <input type="number" className="form-control rounded-pill" id="phonenumber" placeholder="Phone Number"/>
                </div>
                <hr/>

                <h5>Card Details</h5>
                <div className="form-group d-flex flex-row justify-content-between">

                    <input type="number" className="form-control rounded-pill" id="phonenumber" placeholder="Card Number"/>
                    <input
                        type="text"
                        className="form-control rounded-pill"
                        onFocus={
                            (e)=> {
                                e.currentTarget.type = "date";
                                e.currentTarget.placeholder = "Expiration date in dd/mm/yyyy"
                                e.currentTarget.focus();
                            }
                        }
                        placeholder="Expiration date"
                    />
                    <input type="number" className="form-control rounded-pill" id="cvv2" placeholder="cvv"/>
                </div>
                <hr></hr>
                <div className="message-container">
                    <h4>Payment Details</h4>
                    <hr></hr>
                    <div className="form-group d-flex flex-row justify-content-between">
                        <p>total</p>
                        <p>{wonAuction.bid} $</p>
                    </div>
                </div>
                <div className="d-grid gap-2 col-6 mx-auto text-container" >
                    <Button variant="danger" onClick={payWithPaypal}>Confirm Payment</Button>
                </div>
            </form>
        </div>
    )
}

export default PaymentWithPayPal