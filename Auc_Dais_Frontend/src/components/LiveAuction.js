import React, {useEffect, useState} from 'react'
import {Card, Button, ListGroup} from "react-bootstrap";
import './Card.css'
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import {clear} from "@testing-library/user-event/dist/clear";

function LiveAuction () {
    const {state} = useLocation();
    let user_id = localStorage.getItem('user_id');
    const navigate = useNavigate();
    let [auction, setAuction] = useState([]);
    let auction_id = state.auctionId;
    let [lastBid, setLastBid] = useState(0);
    let [chat, setChat] = useState([]);

    const fetchMessages = () =>{
        let url = "http://localhost:8080/chatroom/get/all/" + auction_id;
        axios.get(url).then(r => {
            setChat(r.data);
        }).then(e => {
            // console.log("chat fetched");
        })

    }

    const fetchMyLastBid = () =>{
        let url = "http://localhost:8080/history/get/last/user/"+ user_id +"/auction/"+ auction_id +"/" + localStorage.getItem('user');
        axios.get(url).then(r => {
            setLastBid(r.data);
        }).catch(e => {
            // toast.error("Error fetching last bid");
        })
    }


    const fetchLiveAuction = () => {
        let url = "http://localhost:8080/auction_products/auction/" + auction_id;
        axios.get(url).then(r => {
            setAuction(r.data);
            console.log(r.data);
        }).catch(e => {
            // toast.error("Error fetching auction");
        });

    }

    const sendMessage = () => {
        let message = document.getElementById("message");
        let url = "http://localhost:8080/chatroom/send/"+ auction_id +"/"+ user_id +"/" + localStorage.getItem('user');

        if(message.value === "" || message.value === null || message.value === undefined){
            toast.error("Message cannot be empty");
        }
        else{
            axios({
                method: 'post',
                url: url,
                headers: {},
                data: {
                    message: message.value,
                }
            }).then(response => {
              if (response.data!=null){
                  clear(document.getElementById("message"));
              }
            }).catch(error => {
                toast.error("Error sending message");
            })
        }
    }

    const placeBid = () => {
        let bid_amount = document.getElementById("bidAmount").value;

        if (bid_amount < auction.max_bid || bid_amount === auction.max_bid || bid_amount === 0
        || bid_amount === null || bid_amount === undefined || bid_amount === "" || bid_amount < auction.minimum_price){
            toast.error("Bid amount must be greater than current bid amount");
        }
        else{
            let url = "http://localhost:8080/auction_products/update/max_bid/" + auction_id;
            axios.put(url,
                {},
                {
                    params: {
                        user_id: user_id,
                        max_bid: bid_amount
                    },
                    data: {
                        token: localStorage.getItem('user')
                    }
                })
                .then(response => {
                  if (response.status === 200){
                      toast.success("Bid placed");
                        document.getElementById("bidAmount").value = "";

                  }
                }).catch(error => {
                    toast.error("Error placing bid");
            })

        }

    }

    // TODO: REMOVE [] from useEffect
    useEffect(() => {
        fetchLiveAuction();
        fetchMessages();
        fetchMyLastBid();
    });

    const padding_top ={
        paddingTop: '10px'
    }

    const padding_top_bottom_between_text ={
        paddingTop: '10px',
        paddingBottom: '10px'
    }



    return (
        <div className="home-element-padding">
        <div className="card-container">
            <div className='container-fluid' >
                <div className="row">
                <div className=" col-sm-6">
                    <Card className=" bg-warning.bg-gradient">
                        <Card.Header className={"bg-warning text-white text-center"}> Product Details </Card.Header>
                         <Card.Body>
                            <div className='card-image-container'>
                                <img
                                    src={auction.photos}
                                    alt="product image"
                                />
                                <div className="image-desc-container">
                                    <p>
                                        <b>Description </b><br></br>
                                        {auction.product_description}
                                    </p>

                                </div>

                            </div>
                        </Card.Body>

                    </Card>
                    </div>

                    <div className=" col-sm-6">
                    <Card className=" bg-warning.bg-gradient">
                        <Card.Header className={"bg-warning text-white text-center"}> Bid Details</Card.Header>
                         <Card.Body>
                             <div className="row">
                                 <div className="col-md-4">
                                     <p className="text-dark">Minimum Bid</p>
                                 </div>
                                 <div className="col-md-4"> </div>
                                 <div className="col-md-4">
                                     <p className="bg-success bg-gradient text-white text-center  rounded-pill">
                                         ${auction.minimum_price}
                                     </p>
                                 </div>
                             </div>

                            <div className="row">
                                <div className="col-md-4">
                                    <p className="text-dark"> Max Bid  </p>
                                </div>
                                <div className="col-md-4"> </div>
                                <div className="col-md-4">
                                    <p className="bg-success bg-gradient text-white text-center  rounded-pill">
                                        ${auction.max_bid}
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <p className="text-dark"> Your Last Bid  </p>
                                </div>
                                <div className="col-md-4"> </div>
                                <div className="col-md-4">
                                    <p className="bg-success bg-gradient text-white text-center  rounded-pill">
                                        ${lastBid.bid_amount}
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <p className="text-dark"> Auction Ending </p>
                                </div>
                                <div className="col-md-4"> </div>
                                <div className="col-md-4">
                                    <p className="bg-success bg-gradient text-white text-center  rounded-pill">
                                        {Math.ceil((new Date(auction.auction_end_date) - new Date().getTime())/ (1000 * 60 * 60 ))} Hours
                                    </p>
                                </div>
                            </div>
                            <div className='row'>
                                <form >
                                    <div className="form-group">
                                        <label htmlFor="place_bid">Place Your Bid</label>
                                        <input type="number" className="form-control border-warning" id="bidAmount" name="bidAmount" placeholder='Enter amount'/>

                                    </div>
                                    <div className="d-grid gap-2 col-6 mx-auto text-container">
                                        <Button className="btn btn-success btn-lg btn-block" onClick={() => placeBid()}> Bid </Button>
                                    </div>
                                </form>

                            </div>
                        </Card.Body>
                    </Card>
                    </div>
                </div>
                <Card className=" bg-warning.bg-gradient">
                    <Card.Header className={"bg-warning text-white text-center"}> Chat Room </Card.Header>
                     <Card.Body>
                        <div>
                            <div className='message-container overflow-auto '>
                                {chat.length === 0 ? <div>No messages</div> :

                                    chat.map((chat, index) => {
                                        return(

                                            <ListGroup>
                                                {Number(chat.sender.id) === Number(user_id) ?

                                                    <ListGroup.Item key="{index}"
                                                                    variant="info w-50 align-self-end rounded-pill d-flex justify-content-end shadow text-padding"
                                                                    style={padding_top_bottom_between_text}>{chat.message}
                                                    </ListGroup.Item>:

                                                    <ListGroup.Item variant="warning w-50 align-self-start rounded-pill shadow text-padding"
                                                                    style={padding_top_bottom_between_text}><b>{chat.sender.firstName +' '+ chat.sender.lastName} :</b> {chat.message}
                                                    </ListGroup.Item>


                                                }
                                            </ListGroup>
                                        );
                                    })
                                }

                            </div>
                        </div>
                    </Card.Body>
                </Card>
                <Card className={'bg-warning.bg-gradient'}>
                    <div style={padding_top}>
                        <InputGroup className="mb-3" size="lg">
                            <Form.Control
                                placeholder="Type Message..."
                                aria-label="Type Message..."
                                aria-describedby="basic-addon2"
                                id = "message"
                            />
                            <Button type={"submit"} variant="primary" onClick={sendMessage}>Send</Button>
                        </InputGroup>
                    </div>
                </Card>
            </div>
        </div></div>
    )
}


export default LiveAuction