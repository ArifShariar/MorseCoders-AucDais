import React from "react";
import {Card} from "react-bootstrap";
class AddAuctionPhotos extends React.Component{
    continue = e => {
        const {photos} = this.props.values;
        if (photos.length > 0) {
            e.preventDefault();
            this.props.nextStep();
        }
        else {
            e.preventDefault();
            alert("Please fill in all required fields");
        }
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
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header className={"bg-dark text-white text-center"}>Add Auction Photos</Card.Header>
                <Card.Body>
                    <form encType={"multipart/form-data"}>
                        <div className="form-group">
                            <label htmlFor="photos">Auction Product Photos*</label>
                            <input type="file" className="form-control" id="photos" accept="image/png, image/gif, image/jpeg"
                                   aria-describedby="photos" placeholder="Photos" name="photos"
                                   onChange={handleChange('photos')} defaultValue={values.photos} required={true} multiple={true}/>
                        </div>

                        <div className="form-group text-center" style={marginTop}>
                            <button type="submit" className="btn btn-primary" onClick={this.continue}>Next</button>
                        </div>
                        <div className="form-group text-center" style={marginTop}>
                            <button type="submit" className="btn btn-danger" onClick={this.back}>Back</button>
                        </div>

                    </form>
                </Card.Body>
            </Card>
        );
    }
}
export default AddAuctionPhotos;