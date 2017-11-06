import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

const items = [
  <MenuItem key={1} value={1} primaryText="1" />,
  <MenuItem key={2} value={2} primaryText="2" />,
  <MenuItem key={3} value={3} primaryText="3" />,
  <MenuItem key={4} value={4} primaryText="4" />,
  <MenuItem key={5} value={5} primaryText="5" />,
];

class Browse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guests: null,
        };
    }

    handleChange = (event, index, guests) => this.setState({guests});

    updateArrival = (date) => {
        this.setState({
            arrival: date.getDate()
        });
    }
    updateDeparture = (date) => {
        this.setState({
            departure: date.getDate()
        });
    }

    render() {
        return (
            <div>
                <Navbar></Navbar>
                <div className="container">
                    <div className="row">
                        <div className="col s4">
                        <TextField
                            hintText=""
                            floatingLabelText={<span><FontIcon className="material-icons">near_me</FontIcon> Enter your destination</span>}
                        />
                        </div>
                        <div className="col s2">
                            <SelectField
                                value={this.state.guests}
                                onChange={this.handleChange}
                                floatingLabelText={<span><FontIcon className="material-icons">person</FontIcon> Number of Guests</span>}
                                floatingLabelFixed={true}
                                hintText=""
                            >
                                {items}
                            </SelectField>
                        </div>
                        <div className="col s3">
                        <DatePicker
                                            onChange={(nul, date) => this.updateArrival(date)}
                                            floatingLabelText={<span><FontIcon className="material-icons">date_range</FontIcon> Arrival</span>}
                                        //defaultDate={this.state.arrival}
                                        //disableYearSelection={this.state.disableYearSelection}
                                        />
                        </div>
                        <div className="col s3">
                        <DatePicker
                                            onChange={(nul, date) => this.updateDeparture(date)}
                                            floatingLabelText={<span><FontIcon className="material-icons">date_range</FontIcon> Departure</span>}

                                        />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Browse;
