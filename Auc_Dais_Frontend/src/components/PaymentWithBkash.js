import React, {useEffect, useState} from 'react'
import {useLocation} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import {Button} from "react-bootstrap";

function PaymentWithBkash() {
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

    const payWithBkash = () => {
        if (Number(wonAuction.bid) === Number(document.getElementById("amount").value)) {
            let url = "http://localhost:8080/won_auctions/pay/" + won_auction_id;
            axios({
                method: 'put',
                url: url,
                data: {
                    paymentMethod : "BKASH"
                }

            });

            toast.success("Payment successful");
        }
        else{
            toast.error("Amount is not correct");
        }
    }

    useEffect(() => {
        fetchAuction();
    }, []);

    return (
        <div className='payment-method'>
            <h3 className='text-center'> Payment with Bkash</h3>
            <form className='payment-method'>
                <div className="form-group d-flex flex-row justify-content-between">
                    <input type="number" className="form-control rounded-pill" id="phonenumber" placeholder="Phone Number" required={true}/>
                </div>
                <div className="form-group d-flex flex-row justify-content-between">
                    <input type="text" className="form-control rounded-pill" id="trx_id" aria-describedby="name" placeholder="Trx Number" required={true}/>
                </div>
                <div className="form-group d-flex flex-row justify-content-between">
                    <input type="text" className="form-control rounded-pill" id="amount" aria-describedby="name" placeholder="Amount" required={true}/>
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
                    <Button className="btn btn-danger" onClick={payWithBkash}>Confirm Payment</Button>
                </div>
            </form>
        </div>
    )
}

export default PaymentWithBkash