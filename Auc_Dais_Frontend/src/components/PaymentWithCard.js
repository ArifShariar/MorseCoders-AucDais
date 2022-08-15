import React from 'react'
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {Button} from "react-bootstrap";



function PaymentWithCard() {

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

    const payWithCard = () => {
        let url = "http://localhost:8080/won_auctions/pay/" + won_auction_id;
        axios({
            method: 'put',
            url: url,
            data: {
                paymentMethod : "CARD"
            }

        });

        toast.success("Payment successful");
    }

    useEffect(() => {
        fetchAuction();
    }, []);



    return (
        <div className='payment-method'>
            <h3 className='text-center'> Payment with Credit Card</h3>
            <form className='payment-method'>
                <div className="form-group">
                    <input type="name" className="form-control rounded-pill" id="name" aria-describedby="name" placeholder="Name on Card"/>
                </div>
                <div className="form-group d-flex flex-row justify-content-between">
                    <input type="text" className="form-control rounded-pill" id="type" placeholder="Card Type"/>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" href="#">MasterCard Titanium Card Credit Card</a>
                        <a className="dropdown-item" href="#">VISA Platinum Card Credit Card</a>
                        <a className="dropdown-item" href="#">VISA Classic Local Credit Card Credit Card</a>
                        <a className="dropdown-item" href="#">VISA Gold Local Credit Card Credit Card</a>
                    </div>
                    <input type="number" className="form-control rounded-pill" id="cardnumber" placeholder="Card Number"/>
                </div>
                <div className="form-group d-flex flex-row justify-content-between">
                    {/* <input type="date" className="form-control rounded-pill" id="expiration_date" placeholder="Expiration month"/> */}
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
                    <input type="number" className="form-control rounded-pill" id="cvv" placeholder="cvv"/>
                </div>
                <div className="form-group d-flex flex-row justify-content-between">
                    <input type="text" className="form-control rounded-pill" id="addr1" placeholder="Address Line 1"/>
                    <input type="text" className="form-control rounded-pill" id="addr2" placeholder="Address Line 2"/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control rounded-pill text-center" id="city" aria-describedby="city" placeholder="City"/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control rounded-pill text-center" id="postal_code" aria-describedby="postal_code" placeholder="Postal Code"/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control rounded-pill text-center" id="country" aria-describedby="country" placeholder="Country"/>
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
                    <Button variant="danger" onClick={payWithCard}>Confirm Payment</Button>
                </div>
            </form>
        </div>
    )
}

export default PaymentWithCard;