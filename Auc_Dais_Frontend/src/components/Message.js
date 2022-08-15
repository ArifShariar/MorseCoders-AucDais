import React, {useEffect, useState} from "react";
import {Card, ListGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import {clear} from "@testing-library/user-event/dist/clear";
import {toast} from "react-toastify";
import {useLocation} from "react-router-dom";


function Message (){
    const{state} = useLocation();

    let sender_id = localStorage.getItem('user_id');

    let receiver_id = state.other;

    const [message, setMessage] = useState([]);
    const [sender, setSender] = useState([]);
    const [receiver, setReceiver] = useState([]);

    const fetchSenderAndReceiver = () => {
        let sender_url = "http://localhost:8080/users/get/" + sender_id;
        let receiver_url = "http://localhost:8080/users/get/" + receiver_id;
        axios.get(sender_url).then(r => {
            setSender(r.data);
        }).catch(e => {

        });
        axios.get(receiver_url).then(r => {
            setReceiver(r.data);
        }).catch(e => {
        });
    }

    const fetchSentMessages = () => {
        let url = "http://localhost:8080/message/get/sender/" + sender_id +"/receiver/" + receiver_id + "/sorted";

        axios.get(url).then(r => {
            setMessage(r.data);
        }).catch(e => {
            // notify_error("Error fetching messages");
        })

    }

    useEffect( () =>{
        fetchSenderAndReceiver();
        fetchSentMessages();
        //mark_all_read/sender/{senderId}/receiver/{receiverId}
        let url = "http://localhost:8080/message/mark_all_read/sender/" + sender_id +"/receiver/" + receiver_id;
        axios.put(url).then(r => {
            console.log(r);
        });
    } );

    const padding_top ={
        paddingTop: '10px'
    }

    const padding_top_bottom_between_text ={
        paddingTop: '10px',
        paddingBottom: '10px'
    }

    const notify_error = (error_message) =>{
        toast.error(error_message,
            {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,

            })
    }

    const sendMessage = () => {
        let message = document.getElementById("message").value;
        let url = "http://localhost:8080/message/send/sender/" + sender_id + "/receiver/" + receiver_id;

        // check if message is empty
        if(message === "" || message === null || message === undefined) {
            notify_error("Message cannot be empty");
        }
        else{
            axios({
                method: 'post',
                url: url,
                headers: {},
                data: {
                    message: message,
                }
            }).then(response => {
                if (response.data!=null){
                    // if (response.status === 200){
                    //     notify_success("Message sent");
                    //     fetchSentMessages();
                    //     clearMessage();
                    // }
                    clear(document.getElementById("message"));
                } 
            }).catch(error => {
                console.log(error);
                notify_error("Failed to send message");
            });


        }


    }


    return (
        <div className="home-element-padding">
            <div className="card-container">
                <Card className={"bg-warning.bg-gradient"}>
                    <Card.Header className={"bg-warning text-white text-center"}> Send Message To {receiver.firstName+' ' + receiver.lastName}</Card.Header>
                        <div className='message-container overflow-auto '>
                            {message.length === 0 ? <div>No messages</div> :

                                message.map((message, index) => {
                                    return(

                                        <ListGroup>
                                            {message.sender.id === receiver_id ?
                                                <ListGroup.Item variant="warning w-50 align-self-start rounded-pill shadow text-padding"
                                                                style={padding_top_bottom_between_text}>{message.message}
                                                </ListGroup.Item> :

                                                <ListGroup.Item key="{index}"
                                                    variant="info w-50 align-self-end rounded-pill d-flex justify-content-end shadow text-padding"
                                                    style={padding_top_bottom_between_text}>{message.message}
                                                </ListGroup.Item>
                                            }
                                        </ListGroup>
                                    );
                                })
                            }


                        </div>
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
        </div>
    );
}

export default Message;
