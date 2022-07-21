import React from "react";
import {Card} from "react-bootstrap";
import './Card.css'
class AddAuctionDetails extends React.Component{
    continue = e => {
        // check if all required fields are filled
        const {product_name, product_description, minimum_price, address} = this.props.values;
        if (product_name && product_description && minimum_price && address) {
            e.preventDefault();
            this.props.nextStep();
        }
        else {
            e.preventDefault();
            alert("Please fill in all required fields");
        }

    }
    render() {
        const {values, handleChange} = this.props;
        return (
            <div className="card-container">
            <Card className=" bg-warning.bg-gradient">
                <Card.Header className={" bg-warning text-dark text-center"}>Add Auction Details</Card.Header>
                <Card.Body className="card-body-container">
                    <form>
                        <div className="form-group">
                            <label htmlFor="product_name">Product Name*</label>
                            <input type="text" className="form-control" id="product_name" aria-describedby="product_name"
                                   placeholder="Product Name" name="product_name"
                            onChange={handleChange('product_name')} defaultValue={values.product_name} required={true}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="product_description">Product Description*</label>
                            <input type="text" className="form-control" id="product_description" aria-describedby="product_description" placeholder="Product Description"
                                   name="product_description" onChange={handleChange('product_description')} defaultValue={values.product_description} required={true}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="minimum_price">Minimum Price*</label>
                            <input type="number" className="form-control" id="minimum_price" aria-describedby="minimum_price" placeholder="000000"
                                   name="minimum_price" onChange={handleChange('minimum_price')} defaultValue={values.minimum_price} required={true}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address*</label>
                            <input type="text" className="form-control" id="address" aria-describedby="address" placeholder="Address"
                                   name="address" onChange={handleChange('address')} defaultValue={values.address} required={true}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="tags">Tags</label>
                            <input type="text" className="form-control" id="tags" aria-describedby="tags" placeholder="electronics, cars, etc"
                                   name="tags" onChange={handleChange('tags')} defaultValue={values.tags} required={false}/>
                        </div>


                        <div className="d-grid gap-2 col-6 mx-auto text-container">
                            <button type="submit" className="btn btn-primary" onClick={this.continue}>Next</button>
                        </div>

                    </form>
                </Card.Body>
            </Card>
            </div>
        );
    }
}
export default AddAuctionDetails;