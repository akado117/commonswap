import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import MapComponent from '../components/MapComponent';

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

    handleChange = (event, index, guests) => this.setState({ guests });

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
                <div className="row">
                    <div style={{ minHeight: '750px' }} className="col s6">
                        <MapComponent className="" style={{ height: '100%' }}></MapComponent>
                    </div>
                    <div className="scroll-listing col s6" style={{ overflowY: 'scroll', maxHeight: '750px' }}>
                        <div className="col s12 z-depth-2 swap-card" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                            <div className="col s6">
                                <div className="premier-image" style={{height:'100%'}}>
                                    <img src="http://stretchflex.net/photos/apartment.jpeg" alt="" style={{height:'350px', width: '100%'}} />
                                </div>
                            </div>
                            <div className="col s6">
                                <div className="row">
                                    <div className="col s12">
                                        <p><strong>Spacious 1 bedroom condo near downtown!</strong></p>
                                    </div>
                                    <div className="col s12">
                                        <div className="col s6">
                                            <p>Accommodates: 2</p>
                                        </div>
                                        <div className="col s6">
                                            <p>Bedrooms: 1</p>
                                        </div>
                                    </div>
                                    <div className="col s12">
                                        <div className="col s6">
                                            <p>Bathrooms: 2</p>
                                        </div>
                                        <div className="col s6">
                                            <p>Entire Home:</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s6">
                                        <img className="circle responsive-img" src="http://stretchflex.net/photos/profileStock.jpeg" alt="profDemo" style={{ height: '140px', width: '140px' }} />
                                    </div>
                                    <div className="col s6">
                                        <div className="col s4">
                                            <p><strong>John</strong></p>
                                        </div>
                                        <div className="col s8">
                                            <p><strong>New York, NY</strong></p>
                                        </div>
                                        <div className="col s12">
                                            <p>Fordham University 15'</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col s12 z-depth-2 swap-card" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                            <div className="col s6">
                                <div className="premier-image" style={{height:'100%'}}>
                                    <img src="http://stretchflex.net/photos/apartment.jpeg" alt="" style={{height:'350px', width: '100%'}} />
                                </div>
                            </div>
                            <div className="col s6">
                                <div className="row">
                                    <div className="col s12">
                                        <p><strong>Spacious 1 bedroom condo near downtown!</strong></p>
                                    </div>
                                    <div className="col s12">
                                        <div className="col s6">
                                            <p>Accommodates: 2</p>
                                        </div>
                                        <div className="col s6">
                                            <p>Bedrooms: 1</p>
                                        </div>
                                    </div>
                                    <div className="col s12">
                                        <div className="col s6">
                                            <p>Bathrooms: 2</p>
                                        </div>
                                        <div className="col s6">
                                            <p>Entire Home:</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s6">
                                        <img className="circle responsive-img" src="http://stretchflex.net/photos/profileStock.jpeg" alt="profDemo" style={{ height: '140px', width: '140px' }} />
                                    </div>
                                    <div className="col s6">
                                        <div className="col s4">
                                            <p><strong>John</strong></p>
                                        </div>
                                        <div className="col s8">
                                            <p><strong>New York, NY</strong></p>
                                        </div>
                                        <div className="col s12">
                                            <p>Fordham University 15'</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col s12 z-depth-2 swap-card" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                            <div className="col s6">
                                <div className="premier-image" style={{height:'100%'}}>
                                    <img src="http://stretchflex.net/photos/apartment.jpeg" alt="" style={{height:'350px', width: '100%'}} />
                                </div>
                            </div>
                            <div className="col s6">
                                <div className="row">
                                    <div className="col s12">
                                        <p><strong>Spacious 1 bedroom condo near downtown!</strong></p>
                                    </div>
                                    <div className="col s12">
                                        <div className="col s6">
                                            <p>Accommodates: 2</p>
                                        </div>
                                        <div className="col s6">
                                            <p>Bedrooms: 1</p>
                                        </div>
                                    </div>
                                    <div className="col s12">
                                        <div className="col s6">
                                            <p>Bathrooms: 2</p>
                                        </div>
                                        <div className="col s6">
                                            <p>Entire Home:</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s6">
                                        <img className="circle responsive-img" src="http://stretchflex.net/photos/profileStock.jpeg" alt="profDemo" style={{ height: '140px', width: '140px' }} />
                                    </div>
                                    <div className="col s6">
                                        <div className="col s4">
                                            <p><strong>John</strong></p>
                                        </div>
                                        <div className="col s8">
                                            <p><strong>New York, NY</strong></p>
                                        </div>
                                        <div className="col s12">
                                            <p>Fordham University 15'</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col s12 z-depth-2 swap-card" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                            <div className="col s6">
                                <div className="premier-image" style={{height:'100%'}}>
                                    <img src="http://stretchflex.net/photos/apartment.jpeg" alt="" style={{height:'350px', width: '100%'}} />
                                </div>
                            </div>
                            <div className="col s6">
                                <div className="row">
                                    <div className="col s12">
                                        <p><strong>Spacious 1 bedroom condo near downtown!</strong></p>
                                    </div>
                                    <div className="col s12">
                                        <div className="col s6">
                                            <p>Accommodates: 2</p>
                                        </div>
                                        <div className="col s6">
                                            <p>Bedrooms: 1</p>
                                        </div>
                                    </div>
                                    <div className="col s12">
                                        <div className="col s6">
                                            <p>Bathrooms: 2</p>
                                        </div>
                                        <div className="col s6">
                                            <p>Entire Home:</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s6">
                                        <img className="circle responsive-img" src="http://stretchflex.net/photos/profileStock.jpeg" alt="profDemo" style={{ height: '140px', width: '140px' }} />
                                    </div>
                                    <div className="col s6">
                                        <div className="col s4">
                                            <p><strong>John</strong></p>
                                        </div>
                                        <div className="col s8">
                                            <p><strong>New York, NY</strong></p>
                                        </div>
                                        <div className="col s12">
                                            <p>Fordham University 15'</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Browse;
