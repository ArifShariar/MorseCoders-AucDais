import React from 'react'

function PaymentWithBkash() {
  return (
    <div className='payment-method'>
        <h3 className='text-center'> Payment with Bkash</h3>
        <form className='payment-method'>
            <div className="form-group d-flex flex-row justify-content-between">
                <input type="number" className="form-control rounded-pill" id="phonenumber" placeholder="Phone Number"/>
            </div>
            <div className="form-group d-flex flex-row justify-content-between">
                <input type="text" className="form-control rounded-pill" id="trx_id" aria-describedby="name" placeholder="Trx Number"/>
            </div>
            <div className="form-group d-flex flex-row justify-content-between">
                <input type="text" className="form-control rounded-pill" id="amount" aria-describedby="name" placeholder="amount"/>
            </div>
            <div className="form-group d-flex flex-row justify-content-between">
                <input type="password" className="form-control rounded-pill" id="pin" placeholder="Enter Pin"/>
            </div>
            <hr/> 
            <hr></hr>
            <div className="message-container">
                <h4>Payment Details</h4>
                <div className="form-group d-flex flex-row justify-content-between">
                    <p>Account type</p> 
                    <p> account type cost</p>              
                </div>
                <hr></hr>
                <div className="form-group d-flex flex-row justify-content-between">
                    <p>total</p> 
                    <p>100000000000 $</p>              
                </div>
            </div>
             <div className="d-grid gap-2 col-6 mx-auto text-container" >
                <button type="submit" className="btn btn-danger">Confirm Payment</button>
            </div>
        </form>
    </div>
  )
}

export default PaymentWithBkash