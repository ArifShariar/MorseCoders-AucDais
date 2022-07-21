import React from "react";
import AddAuctionDetails from "./AddAuctionDetails";
import AddAuctionDateTime from "./AddAuctionDateTime";
import AddAuctionPhotos from "./AddAuctionPhotos";
import AddAuctionConfirm from "./AddAuctionConfirm";
import AddAuctionSuccess from "./AddAuctionSuccess";

class AddAuction extends React.Component{
    state = {
        step:1,
        product_name: "",
        product_description: "",
        minimum_bid: "",
        start_date: "",
        start_time: "",
        end_date: "",
        end_time: "",
        is_online: "",
        address: "",
        photos: [],
        tags:"",

    }

    // proceed to next step
    nextStep = () => {
        const {step} = this.state;
        this.setState({
            step: step + 1
        });
    }

    // go back to prev step
    prevStep = () => {
        const {step} = this.state;
        this.setState({
            step: step - 1
        });
    }

    // handle fields change
    handleChange = input => e => {
        this.setState({[input]: e.target.value});
    }
    render() {
        const {step} = this.state;
        const {product_name, product_description, minimum_price, start_date, start_time, end_date, end_time, is_online, address, photos, tags} = this.state;
        const values = {product_name, product_description, minimum_price, start_date, start_time, end_date, end_time, is_online, address, photos, tags};
        switch(step) {
            case 1:
                return (
                    <AddAuctionDetails
                    nextStep={this.nextStep}
                    handleChange={this.handleChange}
                    values={values}
                    />
                );
            case 2:
                return (
                    <AddAuctionDateTime
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                    />

                );

            case 3:
                return (
                    <AddAuctionPhotos
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                );
            case 4:
                return (
                    <AddAuctionConfirm
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        values={values}
                    />
                );
            case 5:
                return (
                    <AddAuctionSuccess/>
                );
            default:
                break;

        }
    }

}

export default AddAuction;