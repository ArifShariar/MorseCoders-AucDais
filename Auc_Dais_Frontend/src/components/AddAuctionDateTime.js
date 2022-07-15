import React from "react";
import {Card} from "react-bootstrap";
class AddAuctionDateTime extends React.Component{
    continue = e => {
        // check if all required fields are filled
        const {start_date, start_time, end_date, end_time} = this.props.values;
        if (start_date && start_time && end_date && end_time) {
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
                <Card.Header className={"bg-dark text-white text-center"}>Add Auction Date and Time</Card.Header>
                <Card.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="start_date">Auction Start Date*</label>
                            <input type="date" className="form-control" id="start_date" aria-describedby="start_date" placeholder="Start Date"
                                   onChange={handleChange('start_date')} defaultValue={values.start_date} required={true}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="start_time">Auction Start Time*</label>
                            <input type="time" className="form-control" id="start_time" aria-describedby="start_time" placeholder="Start Time"
                                      onChange={handleChange('start_time')} defaultValue={values.start_time} required={true}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="end_date">Auction End Date*</label>
                            <input type="date" className="form-control" id="end_date" aria-describedby="end_date" placeholder="End Date"
                                      onChange={handleChange('end_date')} defaultValue={values.end_date} required={true}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="end_time">Auction End Time*</label>
                            <input type="time" className="form-control" id="end_time" aria-describedby="end_time" placeholder="End Time"
                                        onChange={handleChange('end_time')} defaultValue={values.end_time} required={true}/>
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
export default AddAuctionDateTime;