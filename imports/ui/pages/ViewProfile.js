import React from 'react';
import { bindActionCreators } from 'redux';
import { connect }  from 'react-redux';
const _ = require('lodash')//required so it can be used easily in chrome dev tools.
import DatePicker from 'material-ui/DatePicker';
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import ProfileComponent from '../components/profileComps/ProfileComponent.js'
import InterestsComponent from '../components/forms/ButtonArrayComp.js'
import PlaceComponent from '../components/placeComponents/PlaceComponent.js'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import ProfileActions from '../../actions/ProfileActions';

const profile = <FontIcon className="material-icons">person</FontIcon>;

class ViewProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrival: '',
            departure: '',
            notes: '',
        };

        this.updateArrival = this.updateArrival.bind(this);
        this.updateDeparture = this.updateDeparture.bind(this);
        this.updateNotes = this.updateNotes.bind(this);
    }

    updateArrival = (date) => {
        console.log(date);
        this.setState({
            arrival: date,
        });
    }
    updateDeparture = (evt) => {
        console.log(evt);
        this.setState({
            departure: evt.target.value
        });
    }
    updateNotes = (evt) => {
        console.log(evt);
        this.setState({
            notes: evt.target.value
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
            internalComponent = <ProfileComponent getValueFunc={this.addValueOnChange}/>
        } else if (this.state.selectedIndex === 1) {
            internalComponent = <PlaceComponent getValueFunc={this.addValueOnChange}/>
        }

        return (
            <section className="profile-view-container">
                <Navbar></Navbar>
                <div className="container">
                    <div className="col s12 z-depth-2 place-images">
                        <div className="row">
                            <div className="col s8 main-image">
                                <img src="http://stretchflex.net/photos/apartment.jpeg" alt="" className="main-image"/>
                            </div>
                            <div className="col s4 scroll-image">
                                <img src="http://stretchflex.net/photos/apartment2.jpeg" alt="" className="main-image"/>
                                <img src="http://stretchflex.net/photos/apartment3.jpeg" alt="" className="main-image"/>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s8">
                            <div className="row">
                                <div className="col s12 z-depth-2" style={{paddingLeft: '0px', paddingRight: '0px'}}>
                                    <AppBar
                                        title={<span>About John</span>}
                                        showMenuIconButton={false}
                                        style={{marginBottom: '10px'}}
                                    />
                                    <div className="col s3">
                                        <img className="circle responsive-img"
                                             src="http://stretchflex.net/photos/profileStock.jpeg" alt="profDemo"
                                             style={{height: '140px', width: '140px'}}/>
                                    </div>
                                    <div className="col s3" id="message" style={{top: '5px'}}>
                                        <div className="row">
                                            <div className="col s12">
                                                <h5><strong>John</strong></h5>
                                            </div>
                                            <div className="col s12">
                                                <h5><strong>New York, NY</strong></h5>
                                            </div>
                                            <div className="col s12">
                                                <p>Fordham University 15'</p>
                                                <p>BNY Mellon</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col s6">
                                        <p>Hello! My name is John and I have been living in New York for a little over
                                            two years now. I work as a Financial Analyst
                                            for BNY Mellon. In my free time, I enjoy going to live concerts, and
                                            experiencing all of what the NYC night life has to
                                            offer. I am a big fan of the New York Giants and enjoy a nice cold, IPA.
                                            Send me a swap request - I have reccomendations
                                            for anything that you are interested in!
                                        </p>
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
                        <div className="col s4">
                            <div className="col s12 z-depth-2">
                                <div className="row">
                                    <div className="input-field col s12">
                                        <label htmlFor=""><FontIcon className="material-icons">date_range</FontIcon>
                                            Arrival</label>
                                        <input type="text" className="datepicker" value={this.state.arrival}
                                               onChange={this.updateArrival}/>
                                        <DatePicker
                                            onChange={(nul, date) => this.updateArrival(date)}
                                            floatingLabelText={<span><FontIcon className="material-icons">date_range</FontIcon>Arrival</span>}
                                            //defaultDate={this.state.arrival}
                                            //disableYearSelection={this.state.disableYearSelection}
                                        />
                                    </div>
                                    <div className="input-field col s12">
                                        <label htmlFor=""><FontIcon className="material-icons">date_range</FontIcon>
                                            Departure</label>
                                        <input type="text" className="datepicker" value={this.state.departure}
                                               onChange={this.updateDeparture}/>
                                    </div>
                                    <div className="input-field col s12">
                                        <label htmlFor="textarea1">Add a message: </label>
                                        <textarea id="textarea1" className="materialize-textarea" data-length="400"
                                                  value={this.state.notes} onChange={this.updateNotes}></textarea>
                                    </div>
                                    <div className="col s12">
                                        <RaisedButton label="Request Swap" primary={true} fullWidth={true}
                                                      onClick={() => this.requestSwap()}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col s8">
                        <div className="row">
                            <div className="col s8 z-depth-2" style={{paddingLeft: '0px', paddingRight: '0px'}}>
                                <AppBar
                                    title={<span>About John's Place</span>}
                                    showMenuIconButton={false}
                                    style={{marginBottom: '10px'}}
                                />
                                <div className="col s12">
                                    <div className="row">
                                        <div className="col s4" style={{textAlign: 'center'}}>
                                            <p>Entire Apt</p>
                                            <p><FontIcon className="material-icons large">home</FontIcon></p>
                                        </div>
                                        <div className="col s4" style={{textAlign: 'center'}}>
                                            <p>4 guests</p>
                                            <p><FontIcon className="material-icons large">people_outline</FontIcon></p>
                                        </div>
                                        <div className="col s4" style={{textAlign: 'center'}}>
                                            <p>1 Bedroom</p>
                                            <p><FontIcon className="material-icons large">hotel</FontIcon></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col s12">
                                    <strong>Amenities: </strong>
                                </div>
                                <div className="col s12">
                                    <div className="col s4 checkbox-container">
                                        <label>Essentials</label>
                                        <FontIcon className="material-icons">check</FontIcon>
                                    </div>
                                    <div className="col s4 checkbox-container">
                                        <label>Wifi</label>
                                        <FontIcon className="material-icons">check</FontIcon>
                                    </div>
                                    <div className="col s4 checkbox-container">
                                        <label>Heat</label>
                                        <FontIcon className="material-icons">check</FontIcon>
                                    </div>
                                </div>
                                <div className="col s12">
                                    <div className="col s4 checkbox-container">
                                        <label>Gym/ Fitness Center</label>
                                        <FontIcon className="material-icons">check</FontIcon>
                                    </div>
                                    <div className="col s4 checkbox-container">
                                        <label>Washer/ dryer</label>
                                        <FontIcon className="material-icons">check</FontIcon>
                                    </div>
                                    <div className="col s4 checkbox-container">
                                        <label>Kitchen</label>
                                        <FontIcon className="material-icons">check</FontIcon>
                                    </div>
                                </div>
                                <div className="col s12">
                                    <div className="col s4 checkbox-container">
                                        <label>Closet and Drawers</label>
                                        <FontIcon className="material-icons">check</FontIcon>
                                    </div>
                                </div>
                                <div className="col s12">
                                    <strong>Description: </strong>
                                </div>
                                <div className="col s12">
                                    <p>A spacious modern 1 bedroom condo near downtown! This place can accomodate up to
                                        2 guests.
                                        You will have access to the entire place, including the kitchen.
                                    </p>
                                </div>
                                <div className="col s12">
                                    <strong>Special Instructions: </strong>
                                </div>
                                <div className="col s12">
                                    <p>I have a key pad lock right outside the door which I will provide the code.
                                        Please no smoking
                                        inside the house.
                                    </p>
                                </div>
                                <div className="col s12">
                                    <strong>About the area and neighborhood: </strong>
                                </div>
                                <div className="col s12">
                                    <p>My place is about a ten minute walk from the heart of Times Square. There is a
                                        subway stop just a
                                        block away. Also there is a convenience store downstairs near the lobby.
                                    </p>
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
        alert('A name was submitted: ' + this.state.arrival);
        console.log(this.state.arrival);
        console.log(this.state.departure);
        this.props.profileActions.requestEmail({
            Arrival: this.state.arrival,
            Departure: this.state.departure,
            Notes: this.state.notes,
        });
    }
}

function mapStateToProps(state) {
    const { profile, place } = state;
    return {
        profile,
        place,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        profileActions: bindActionCreators(ProfileActions, dispatch),
        //placeActions: bindActionCreators(PlaceActions, dispatch),
    };
}

ViewProfile.propTypes = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile);