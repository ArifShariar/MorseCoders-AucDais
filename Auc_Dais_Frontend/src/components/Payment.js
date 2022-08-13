import React, { Component,useState } from 'react'
import {BsFillCreditCard2FrontFill,BsPaypal} from "react-icons/bs";
import {Card} from "react-bootstrap";
// import {FaGooglePay} from "react-icons/fa"
// import { useBkash } from 'react-bkash'; 
import PaymentWithCard from './PaymentWithCard';
import PaymentWithPayPal from './PaymentWithPayPal'; 
import PaymentWithBkash from './PaymentWithBkash';



function Payment(){ 
    /* const { error, loading, triggerBkash } = useBkash({
        
		onSuccess: (data) => {
			console.log(data); // this contains data from api response from onExecutePayment
		},
		onClose: () => {
			console.log('Bkash iFrame closed');
		},
		bkashScriptURL: 'https://merchantserver.sandbox.bka.sh/api/checkout/v1.2.0-beta/payment/create/bKash-checkout-sandbox.js', // https://scripts.sandbox.bka.sh/versions/1.2.0-beta/checkout/bKash-checkout-sandbox.js
		amount: 1000,
		onCreatePayment: async (paymentRequest) => {
			// call your API with the payment request here
			return await fetch('<your backend api>/create/', {
				method: 'POST',
				body: JSON.stringify(paymentRequest),
			}).then((res) => res.json());

			// must return the following object:
			// {
			// 	paymentID: string;
			// 	createTime: string;
			// 	orgLogo: string;
			// 	orgName: string;
			// 	transactionStatus: string;
			// 	amount: string;
			// 	currency: string;
			// 	intent: string;
			// 	merchantInvoiceNumber: string;
			// }
		},
		onExecutePayment: async (paymentID) => {
			// call your executePayment API here
			return await fetch('<your backend api>/execute/${paymentID}', {
				method: 'POST',
			}).then((res) => res.json());

			// it doesn't matter what you return here, any errors thrown here will be available on error return value of the useBkash hook
		},
	}); */
    
    const [useCard, setCard] = useState (false)
    const [usePaypal,setPaypal] = useState(false) 
    const [useBkash,setBkash] = useState(false)

    const handleCardClick =() => {
        setCard (true) 
        setPaypal(false);
        setBkash(false)
    } 
    const handlePayPalClick =() => {
        setCard (false) 
        setPaypal(true);
        setBkash(false)
    }
    const handleBkashClick =() => {
        setCard (false) 
        setPaypal(false);
        setBkash(true)
    }

    return (
        <div className="home-element-padding">
            <div className="card-container">
                <div className='container-fluid' >
                    <div className="row">
                        <div className=" col-sm-12">
                        <Card className=" bg-warning.bg-gradient">
                            <Card.Header className={"bg-warning text-white text-center"}> Choose Payment Method </Card.Header>
                            <Card.Body> 
                                <div className='d-flex flex-row justify-content-between'>
                                    <BsFillCreditCard2FrontFill size = '50px' onClick={handleCardClick}/>
                                    <BsPaypal size = '50px' onClick={handlePayPalClick}/> 
                                    <img
                                        src={require("../images/bkash-icon.png")}
                                        alt="bkash icon"
                                        height={'50px'}
                                        width={'50px'}
                                        onClick={handleBkashClick}
                                    />

                                </div>
                                <hr/>
                                {useCard === true ?
                                    <PaymentWithCard/>:
                                    <></>
                                }
                                {usePaypal === true ?
                                    <PaymentWithPayPal/>:
                                    <></>
                                } 
                                {useBkash===true ?
                                    <PaymentWithBkash/>:
                                    <></>
                                }
                                
                            </Card.Body>  
                        </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  
}

export default Payment