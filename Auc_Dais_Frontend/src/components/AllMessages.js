import React, {useEffect, useState} from "react";
import {Card, ListGroup} from "react-bootstrap";
import axios from "axios";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";




function AllMessages() {

    let user_id = localStorage.getItem('user_id');
    const  [message, setMessage] = useState([]);
    const navigate = useNavigate();

    const fetchMessages = () => {
        let url = "http://localhost:8080/message/get/all/user/" + user_id;


        axios.get(url).then(r => {
            setMessage(r.data);
            console.log(r.data);
        }).catch(e => {
            notify_error("Error fetching messages");
        });
    }


    const showMessage = (id1, id2) => {
        if (Number(user_id)=== Number(id1)){
            navigate('message', {state: {user: id1, other: id2}});
        }
        else{
            navigate('message', {state: {user: id2, other: id1}});
        }
    }

    useEffect(() => {
        fetchMessages();
    },[]);

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

    return (
        <div className="home-element-padding">
            <div className="card-container">
                <Card className={"bg-warning.bg-gradient"}>
                    <Card.Header className={"bg-warning text-white text-center"}>All Messages</Card.Header>
                    { message.length === 0 ? <div className="text-center">No messages</div> :
                        message.map(message => {
                            return (
                                <ListGroup id={message.id}>
                                    <ListGroup.Item onClick={()=> showMessage(message.receiver.id, message.sender.id)}
                                                    className="d-flex justify-content-between align-items-start">

                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">
                                                {/* print the receiver / sender name, but it will not be the user's name */}
                                                {message.sender.firstName + " " + message.sender.lastName} and {message.receiver.firstName + " " + message.receiver.lastName}

                                            </div>
                                            {message.message}
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                            );
                        })
                    }

                </Card>
            </div>
        </div>
    );

}

export default AllMessages;