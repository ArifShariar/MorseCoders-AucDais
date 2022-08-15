import React, {useEffect, useState} from "react";
import {Card} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";


function UpdateAuction () {
    const {state} = useLocation();
    let auction_id = state.auctionId;
    const navigate = useNavigate();

    let user_id = localStorage.getItem('user_id');
    let user_token = localStorage.getItem('user');

    let [auction, setAuction] = useState([]);

    const fetchAuction = () => {
        let url = "http://localhost:8080/auction_products/auction/" + auction_id;
        axios.get(url).then(r => {
            setAuction(r.data);
            console.log(r.data);
        }).catch(e => {
            toast.error("Error fetching auction");
        });
    }


    const updateAuction = () => {
        let product_name = "";
        let product_description = "";
        let minimum_price = "";
        let address = "";
        let tags = "";

        if (document.getElementById("product_name").value !== "") {
            product_name = document.getElementById("product_name").value;
        }
        if (document.getElementById("product_description").value !== "") {
            product_description = document.getElementById("product_description").value;
        }
        if (document.getElementById("minimum_price").value !== "") {
            minimum_price = document.getElementById("minimum_price").value;
        }
        if (document.getElementById("address").value !== ""){
            address = document.getElementById("address").value;
        }
        if (document.getElementById("tags").value !== ""){
            tags = document.getElementById("tags").value;
        }



        // http://localhost:8080/auction_products/update/21?product_name=casio calculator&isOnline=true&tags=calculator, electronics
        console.log(product_name);
        console.log(product_description);
        let url = "http://localhost:8080/auction_products/update/" + auction_id + "?" + "product_name=" + product_name
         + "&" + "product_description=" + product_description + "&" + "minimum_price=" + minimum_price + "&" + "address=" + address + "&" + "tags=" + tags;

        axios.put(url).then(r => {
            toast.success("Auction updated successfully");

        }).catch(e => {
            toast.error("Error updating auction");
        });

        navigate("/myAuctions/myAuction/" + auction_id, {state: {auctionId: auction_id}});



    }

    useEffect(() => {
        fetchAuction();
    },[]);
    return (
        <div className="home-element-padding">
            <div className="card-container">
                <div className='container-fluid' >
                    <div className="row">
                        <div className=" col-sm-12">
                            <Card className=" bg-warning.bg-gradient">
                                <Card.Header className={"bg-warning text-white text-center"}>Update Auction</Card.Header>
                                <Card.Body>
                                    <form encType={"multipart/form-data"}>
                                        <div className="form-group">
                                            <label htmlFor="product_name">Product Name</label>
                                            <input type="text" className="form-control" id="product_name" aria-describedby="product_name"
                                                   placeholder="Product Name" name="product_name"
                                                   defaultValue={auction.product_name}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="product_description">Product Description*</label>
                                            <input type="text" className="form-control" id="product_description" aria-describedby="product_description" placeholder="Product Description"
                                                   name="product_description"  defaultValue= {auction.product_description}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="minimum_price">Minimum Price</label>
                                            <input type="number" className="form-control" id="minimum_price" aria-describedby="minimum_price" placeholder="000000"
                                                   name="minimum_price" defaultValue={auction.minimum_price}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="address">Address</label>
                                            <input type="text" className="form-control" id="address" aria-describedby="address" placeholder="Address"
                                                   name="address" defaultValue={auction.address}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="tags">Tags</label>
                                            <input type="text" className="form-control" id="tags" aria-describedby="tags" placeholder="electronics, cars, etc"
                                                   name="tags" defaultValue={auction.tags}/>
                                        </div>



                                        <div className="d-grid gap-2 col-6 mx-auto text-container">
                                            <button type="submit" className="btn btn-primary" onClick={updateAuction} >Update</button>
                                        </div>

                                    </form>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UpdateAuction;