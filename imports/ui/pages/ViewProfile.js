import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const _ = require('lodash')//required so it can be used easily in chrome dev tools.
import ProfileActions from '../../actions/ProfileActions';
import PlaceActions from '../../actions/PlaceActions';
import FileActions from '../../actions/FileActions';
import DatePicker from 'material-ui/DatePicker';
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import ProfileComponent from '../components/profileComps/ProfileComponent.js'
import InterestsComponent from '../components/forms/ButtonArrayComp.js'
import PlaceComponent from '../components/placeComponents/PlaceComponent.js'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import BetaWarning from '../components/BetaWarning';

const amenitiesTextMap = {
    wiFi: 'WiFi',
    heat: 'Heat',
    parking: 'Parking',
    essentials: 'Essentials (towels, etc)',
    gym: 'Gym/ Fitness Center',
    dressers: 'Closet/ Drawer',
    wiFi: 'Wifi',
    washerDryer: 'Washer/ Dryer',
    pool: 'Pool',
    heat: 'Heat',
    kitchen: 'Kitchen Appliances',
    parking: 'Parking'
}

const interestsTextMap = {
    photography: 'Photography',
    wineries: 'Wineries',
    beachBum: 'Beach Bum',
    film: 'Film',
    hiking: 'Hiking',
    clubber: 'Clubbing & Nightlife',
    liveMusic: 'Live Music',
    foodie: 'Food and Restaurants'
    //orgTour: Boolean
}

const profile = <FontIcon className="material-icons">person</FontIcon>;

const items = [
    <MenuItem key={1} value={1} primaryText="1" />,
    <MenuItem key={2} value={2} primaryText="2" />,
    <MenuItem key={3} value={3} primaryText="3" />,
    <MenuItem key={4} value={4} primaryText="4" />,
    <MenuItem key={5} value={5} primaryText="5" />,
];

class ViewProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrival: '',
            departure: '',
            notes: '',
            guests: ''
        };

        this.updateArrival = this.updateArrival.bind(this);
        this.updateDeparture = this.updateDeparture.bind(this);
        this.updateNotes = this.updateNotes.bind(this);
    }

    updateGuests = (event, index, guests) => this.setState({ guests });

    updateArrival = (date) => {
        this.setState({
            arrival: date.toLocaleDateString()
        });
    }
    updateDeparture = (date) => {
        this.setState({
            departure: date.toLocaleDateString()
        });
    }
    updateNotes = (notes) => {
        this.setState({
            notes: notes
        });
    }

    componentDidMount = () => {
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15, // Creates a dropdown of 15 years to control year,
            today: 'Today',
            clear: 'Clear',
            close: 'Ok',
            closeOnSelect: false // Close upon selecting a date,
        });


    }

    render() {
        let internalComponent;
        if (this.state.selectedIndex === 0) {
            internalComponent = <ProfileComponent getValueFunc={this.addValueOnChange} />
        } else if (this.state.selectedIndex === 1) {
            internalComponent = <PlaceComponent getValueFunc={this.addValueOnChange} />
        }

        const { amenities } = this.props.place;
        const amenitiesElements = Object.keys(amenities).map((key) => {
            if (amenities[key] && amenitiesTextMap[key]) {
                return (
                    <div key={key} className="col s6 m4 checkbox-container">
                        <label>{amenitiesTextMap[key]}</label>
                        <button type="button" className="checkbox btn btn-sm active"><i className="fa fa-check" aria-hidden="true" /></button>
                    </div>
                )
            }
        });

        return (
            <section className="profile-view-container">
                <Navbar></Navbar>
                <div className="container">
                    <BetaWarning></BetaWarning>
                    <div className="col s12 z-depth-2 place-images">
                        <div className="row">
                            <div className="col s12 l8 main-image">
                                <img src="http://stretchflex.net/photos/apartment.jpeg" alt="" className="main-image" />
                            </div>
                            <div className="col l4 scroll-image">
                                <img src="http://stretchflex.net/photos/apartment2.jpeg" alt="" className="main-image" />
                                <img src="http://stretchflex.net/photos/apartment3.jpeg" alt="" className="main-image" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 l8">
                            <div className="row">
                                <div className="col s12">
                                    <div className="col s12 z-depth-2" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                        <AppBar
                                            title={<span>About John</span>}
                                            showMenuIconButton={false}
                                            style={{ marginBottom: '10px', zIndex: 0 }}
                                        />
                                        <div className="col s6 l6">
                                            <img className="circle responsive-img" src={this.props.user.picture ? this.props.user.picture : 'http://stretchflex.net/photos/profileStock.jpeg'} alt="profDemo" style={{ height: '140px', width: '140px' }} />
                                        </div>
                                        <div className="col s6" id="message" style={{ top: '5px' }}>
                                            <div className="row">
                                                <div className="col s12">
                                                    <h5><strong>{this.props.profile.profile.firstName}</strong></h5>
                                                </div>
                                                <div className="col s12">
                                                    <h5><strong>{this.props.place.address.city} {this.props.place.address.state}</strong></h5>
                                                </div>
                                                <div className="col s12">
                                                    <p>{this.props.profile.profile.school} {this.props.profile.profile.classOf}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col s12">
                                            <p>{this.props.profile.profile.personalSummary}</p>
                                        </div>
                                        <div className="col s12">
                                            <strong>Interests: </strong>
                                        </div>
                                        <div className="col s12">
                                            <div className="col s4 checkbox-container">
                                                <label>Reading</label>
                                                <FontIcon className="material-icons">check</FontIcon>
                                            </div>
                                            <div className="col s4 checkbox-container">
                                                <label>Breweries</label>
                                                <FontIcon className="material-icons">check</FontIcon>
                                            </div>
                                            <div className="col s4 checkbox-container">
                                                <label>Museums</label>
                                                <FontIcon className="material-icons">check</FontIcon>
                                            </div>
                                        </div>
                                        <div className="col s12">
                                            <div className="col s4 checkbox-container">
                                                <label>Reading</label>
                                                <FontIcon className="material-icons">check</FontIcon>
                                            </div>
                                            <div className="col s4 checkbox-container">
                                                <label>Breweries</label>
                                                <FontIcon className="material-icons">check</FontIcon>
                                            </div>
                                            <div className="col s4 checkbox-container">
                                                <label>Museums</label>
                                                <FontIcon className="material-icons">check</FontIcon>
                                            </div>
                                        </div>
                                        <div className="col s12">
                                            <div className="col s4 checkbox-container">
                                                <label>Reading</label>
                                                <FontIcon className="material-icons">check</FontIcon>
                                            </div>
                                            <div className="col s4 checkbox-container">
                                                <label>Breweries</label>
                                                <FontIcon className="material-icons">check</FontIcon>
                                            </div>
                                            <div className="col s4 checkbox-container">
                                                <label>Museums</label>
                                                <FontIcon className="material-icons">check</FontIcon>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col s12 l4">
                            <div className="col s12 z-depth-2">
                                <div className="row">
                                    <div className="input-field col s12">
                                        <DatePicker
                                            onChange={(nul, date) => this.updateArrival(date)}
                                            floatingLabelText={<span><FontIcon className="material-icons">date_range</FontIcon> Arrival</span>}
                                        />
                                    </div>
                                    <div className="input-field col s12">
                                        <DatePicker
                                            onChange={(nul, date) => this.updateDeparture(date)}
                                            floatingLabelText={<span><FontIcon className="material-icons">date_range</FontIcon> Departure</span>}

                                        />
                                    </div>
                                    <div className="input-field col s12">
                                        <SelectField
                                            value={this.state.guests}
                                            onChange={this.updateGuests}
                                            floatingLabelText={<span><FontIcon className="material-icons">person</FontIcon> Number of Guests</span>}
                                            floatingLabelFixed={true}
                                        //hintText="Guests"
                                        >
                                            {items}
                                        </SelectField>
                                    </div>
                                    <div className="input-field col s12">
                                        <TextField
                                            hintText="Description"
                                            floatingLabelText={<span><FontIcon className="material-icons">speaker_notes</FontIcon> Add a message</span>}
                                            multiLine={true}
                                            rows={5}
                                            onChange={(nul, message) => this.updateNotes(message)}
                                        />
                                    </div>
                                    <div className="col s12">
                                        <RaisedButton label="Request Swap" primary={true} fullWidth={true}
                                            onClick={() => this.requestSwap()} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col s12">
                        <div className="col s12 l8">
                            <div className="row">
                                <div className="col s12 l8 z-depth-2" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                                    <AppBar
                                        title={<span>About John's Place</span>}
                                        showMenuIconButton={false}
                                        style={{ marginBottom: '10px', zIndex: 0 }}
                                    />
                                    <div className="col s12">
                                        <div className="row">
                                            <div className="col s4" style={{ textAlign: 'center' }}>
                                                <p>Entire Apt</p>
                                                <p><FontIcon className="material-icons large">home</FontIcon></p>
                                            </div>
                                            <div className="col s4" style={{ textAlign: 'center' }}>
                                                <p>{this.props.place.place.numOfGuests} guests</p>
                                                <p><FontIcon className="material-icons large">people_outline</FontIcon></p>
                                            </div>
                                            <div className="col s4" style={{ textAlign: 'center' }}>
                                                <p>{this.props.place.place.bedrooms} Bedroom</p>
                                                <p><FontIcon className="material-icons large">hotel</FontIcon></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col s12">
                                        <strong>Amenities: </strong>
                                    </div>
                                    <div className="row">
                                        {amenitiesElements}
                                    </div>
                                    <div className="col s12">
                                        <strong>Description: </strong>
                                    </div>
                                    <div className="col s12">
                                        <p>{this.props.place.place.detailedDesc}</p>
                                    </div>
                                    <div className="col s12">
                                        <strong>Special Instructions: </strong>
                                    </div>
                                    <div className="col s12">
                                        <p>{this.props.place.place.specialInst}
                                        </p>
                                    </div>
                                    <div className="col s12">
                                        <strong>About the area and neighborhood: </strong>
                                    </div>
                                    <div className="col s12">
                                        <p>{this.props.place.place.notesOnArea}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </section>
        );
    }
    requestSwap = () => {
        this.props.profileActions.requestEmail({
            Arrival: this.state.arrival,
            Departure: this.state.departure,
            Notes: this.state.notes,
        });
    }
}

function mapStateToProps(state) {
    const { profile, place, images, user } = state;
    return {
        profile,
        place,
        images,
        user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        profileActions: bindActionCreators(ProfileActions, dispatch),
        placeActions: bindActionCreators(PlaceActions, dispatch),
        fileActions: bindActionCreators(FileActions, dispatch),
    };
}

ViewProfile.propTypes = {
    profileActions: PropTypes.object.isRequired, //eslint-disable-line
    placeActions: PropTypes.object.isRequired,
    fileActions: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    place: PropTypes.object.isRequired,
    images: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile);