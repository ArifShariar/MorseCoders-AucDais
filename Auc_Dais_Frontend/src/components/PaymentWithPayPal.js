import React from 'react'

function PaymentWithPayPal() {
  return (
    <div className='payment-method'>
        <h3 className='text-center'> Payment with PayPal</h3>
        <form className='payment-method'>
            <div class="form-group d-flex flex-row justify-content-between">
                <input type="name" class="form-control rounded-pill" id="name" aria-describedby="name" placeholder="First Name"/> 
                <input type="name" class="form-control rounded-pill" id="name" aria-describedby="name" placeholder="Last Name"/>
            </div>
            <div class="form-group d-flex flex-row justify-content-between"> 
                <input type="email" class="form-control rounded-pill" id="email" placeholder="Email"/> 
                <input type="number" class="form-control rounded-pill" id="phonenumber" placeholder="Phone Number"/>
            </div>
            <hr/>

            <h5>Card Details</h5>
            <div class="form-group d-flex flex-row justify-content-between"> 
                
                <input type="number" class="form-control rounded-pill" id="phonenumber" placeholder="Card Number"/>
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
            <div class="message-container">
                <h4>Payment Details</h4>
                <div class="form-group d-flex flex-row justify-content-between"> 
                    <p>Account type</p> 
                    <p> account type cost</p>              
                </div>
                <hr></hr>
                <div class="form-group d-flex flex-row justify-content-between"> 
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

export default PaymentWithPayPal