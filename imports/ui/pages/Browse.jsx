import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
const _ = require('lodash');
import ProfileActions from '../../actions/ProfileActions';
import PlaceActions from '../../actions/PlaceActions';
import FileActions from '../../actions/FileActions';

import FontIcon from 'material-ui/FontIcon';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import MapComponent from '../components/MapComponent';
import BetaWarning from '../components/BetaWarning';

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
            <div className="browse-container">
                <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDB1VkVvNXQUiKRzjVJoWfsyrusO5pkAWE&callback=initMap"
                    type="text/javascript"></script>
                <Navbar></Navbar>
                <div className="container">
                    <BetaWarning></BetaWarning>
                    <div className="row">
                        <div className="col s12 l4">
                            <TextField
                                hintText=""
                                floatingLabelText={<span><FontIcon className="material-icons">near_me</FontIcon> Enter your destination</span>}
                            />
                        </div>
                        <div className="col s12 l2">
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
                        <div className="col s12 l3">
                            <DatePicker
                                onChange={(nul, date) => this.updateArrival(date)}
                                floatingLabelText={<span><FontIcon className="material-icons">date_range</FontIcon> Arrival</span>}
                            //defaultDate={this.state.arrival}
                            //disableYearSelection={this.state.disableYearSelection}
                            />
                        </div>
                        <div className="col s12 l3">
                            <DatePicker
                                onChange={(nul, date) => this.updateDeparture(date)}
                                floatingLabelText={<span><FontIcon className="material-icons">date_range</FontIcon> Departure</span>}

                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div style={{ minHeight: '750px' }} className="col s12 l6">
                        <MapComponent className="" style={{ height: '100%' }}></MapComponent>
                    </div>
                    <div className="scroll-listing col s12 l6" style={{ overflowY: 'scroll', maxHeight: '750px' }}>
                        <div className="col s12 z-depth-2 swap-card" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                            <div className="col s12 l5">
                                <div className="premier-image" style={{ height: '100%' }}>
                                    <img src={this.props.images.placeImgs[0] ? this.props.images.placeImgs[0].url : 'http://stretchflex.net/photos/apartment.jpeg'} alt="" style={{ height: '350px', width: '100%' }} />
                                </div>
                            </div>
                            <div className="col s12 l7">
                                <div className="row">
                                    <div className="col s12">
                                        <p><strong>{this.props.place.place.shortDesc}</strong></p>
                                    </div>
                                    <div className="col s12">
                                        <div className="col s6 l5">
                                            <p><i className="fa fa-users" aria-hidden="true"></i> Guests: {this.props.place.place.numOfGuests}</p>
                                        </div>
                                        <div className="col s6 l7">
                                            <p><i className="fa fa-bed" aria-hidden="true"></i> Bedrooms: {this.props.place.place.bedrooms}</p>
                                        </div>
                                    </div>
                                    <div className="col s12">
                                        <div className="col s6 l5">
                                            <p><i className="fa fa-bath" aria-hidden="true"></i> Baths: {this.props.place.place.bathrooms}</p>
                                        </div>
                                        <div className="col s6 l5">
                                            <p><i className="fa fa-home" aria-hidden="true"></i> Partial Apt.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s6">
                                        <img className="circle responsive-img" src={this.props.user.picture ? this.props.user.picture : 'http://stretchflex.net/photos/profileStock.jpeg'} alt="profDemo" style={{ height: '140px', width: '140px' }} />
                                        {/* <img className="circle responsive-img" src="http://stretchflex.net/photos/profileStock.jpeg" alt="profDemo" style={{ height: '140px', width: '140px' }} /> */}
                                    </div>
                                    <div className="col s6">
                                        <div className="col s12 l4">
                                            <p><strong>{this.props.profile.profile.firstName}</strong></p>
                                        </div>
                                        <div className="col s12 l8">
                                            <p><strong>{this.props.place.address.city} {this.props.place.address.state}</strong></p>
                                        </div>
                                        <div className="col l12">
                                            <p>{this.props.profile.profile.school} {this.props.profile.profile.classOf}</p>
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

function mapStateToProps(state) {
    const { profile, place, images, user } = state;
    return {
        profile,
        place,
        images,
        user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        profileActions: bindActionCreators(ProfileActions, dispatch),
        placeActions: bindActionCreators(PlaceActions, dispatch),
        fileActions: bindActionCreators(FileActions, dispatch),
    };
}

Browse.propTypes = {
    profileActions: PropTypes.object.isRequired, //eslint-disable-line
    placeActions: PropTypes.object.isRequired,
    fileActions: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    place: PropTypes.object.isRequired,
    images: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Browse);
