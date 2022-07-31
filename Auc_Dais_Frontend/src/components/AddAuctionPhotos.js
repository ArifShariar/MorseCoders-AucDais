import React from "react";
import {Card} from "react-bootstrap";
import './Card.css'
import {toast} from "react-toastify";

class AddAuctionPhotos extends React.Component{
    continue = e => {
        const {photos} = this.props.values;
        if (photos.length > 0) {
            e.preventDefault();
            this.props.nextStep();
        }
        else {
            e.preventDefault();
            this.notify();
        }
    }

    notify = () => {
        toast.error("Please fill in all required fields", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
        },);
    }


    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    render() {
        const marginTop = {
            marginTop: "10px"
        }
        const {values, handleChange} = this.props;
        return (
            <div className="card-container">
                <div className='container-fluid' >
                    <div className="row">
                        <div className=" col-sm-12">
                        <Card className=" bg-warning.bg-gradient">
                            <Card.Header className={"bg-warning text-white text-center"}> Add Photos </Card.Header>
                             <Card.Body>
                            <form encType={"multipart/form-data"}>
                                <div className="form-group">
                                    <label htmlFor="photos">Auction Product Photos*</label>
                                    <input type="file" className="form-control" id="photos" accept="image/png, image/gif, image/jpeg"
                                        aria-describedby="photos" placeholder="Photos" name="photos"
                                        onChange={handleChange('photos')} defaultValue={values.photos} required={true} multiple={true}/>
                                </div>

                                <div className="d-grid gap-2 col-6 mx-auto text-container" style={marginTop}>
                                    <button type="submit" className="btn btn-primary" onClick={this.continue}>Next</button>
                                </div>
                                <div className="d-grid gap-2 col-6 mx-auto text-container" style={marginTop}>
                                    <button type="submit" className="btn btn-danger" onClick={this.back}>Back</button>
                                </div>

                            </form>
                            </Card.Body>
                        </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default AddAuctionPhotos;