import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const _ = require('lodash')
import PropTypes from 'prop-types'
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
//import SlideShow from 'react-image-slideshow';
import InfiniteCalendar, { Calendar, defaultMultipleDateInterpolation, withMultipleDates } from 'react-infinite-calendar';
import '../../../node_modules/react-infinite-calendar/styles.css';
import Navbar from '../components/Navbar';
import Select from 'react-select';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import '../../../node_modules/react-select/dist/react-select.css';
import Footer from '../components/Footer';
import SelectBuilder from '../components/forms/SelectBuilder';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'
import BetaWarning from '../components/BetaWarning';
import ProfileActions from '../../actions/ProfileActions';

const styles = {
    button: {
        margin: 12,
    }
};

const stateFields = {
    fields: {
        displayNames: ["N/A", "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Maryland", "Massachusetts", "Michigan",
            "Minnesota", "Mississippi", "Missouri", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"],
        values: ["N/A", "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MT", "NE",
            "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "MD", "MA", "MI", "MN", "MS", "MO", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"],
    },
};

// const STATES = require('../../../node_modules/react-select/examples/src/data/states');
const CITIES = require('../../../node_modules/react-select/examples/src/data/states');


var today = new Date();
const MultipleDatesCalendar = withMultipleDates(Calendar);

function logChange(val) {
    console.log("Selected: " + JSON.stringify(val));
}

class Planner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            controlledDate: [new Date()],
            testDates: [new Date(),new Date(), new Date()],
            selectedDates:[],
            imgsData: [
                {
                    url: 'http://stretchflex.net/photos/apartment.jpeg'
                },
                {
                    url: 'http://stretchflex.net/photos/apartment2.jpeg'
                },
                {
                    url: 'http://stretchflex.net/photos/apartment3.jpeg'
                }
            ],
            cities: []
        };
        var options = CITIES[this.state.country];
    }

    handleSlideshowOpen(index) {
        //this.refs.SlideShow.handleModalOpen(index);
    };

    changeRating(newRating) {
        this.setState({
            rating: newRating
        });
    }

    displayDates() {
        console.log("SELECTED DATES");
        console.log(this.state.selectedDates);
    }

    componentDidMount = () => {
        //this.handleSlideshowOpen(0);
        console.log('CITIES');
        console.log(CITIES);
    }

    saveDatesTest() {
        const testDates = [new Date(),new Date(), new Date()];

        this.props.profileActions.saveSelectedDates({
            SelectedDates: testDates
        });
    }

    render() {
        return (
            <div className="planner-container">
                <Navbar></Navbar>
                <div className="container" id="planner" style={{ marginTop: '20px' }}>
                <BetaWarning></BetaWarning>
                    <div className="row" >
                        <div className="col s12 calendar-parent">
                            <AppBar
                                title={<span>My Calendar</span>}
                                showMenuIconButton={false}
                                style={{ marginBottom: '10px', zIndex: '0' }}
                            />
                            <div className="z-depth-2">
                                <div className="row">
                                    <div className="col s12 calendar-container" >
                                        <InfiniteCalendar
                                            Component={MultipleDatesCalendar}
                                            height={250}
                                            interpolateSelection={defaultMultipleDateInterpolation}
                                            selected={this.state.selectedDates}
                                            layout={'portrait'}
                                            width={'100%'}
                                            onSelect={(selectedDate) => defaultMultipleDateInterpolation(selectedDate, this.state.selectedDates)}
                                        />
                                    </div>
                                </div>
                                <div className="col s12">
                                    <div className="card-panel primary">
                                        <span className="blue-text text-darken-2">
                                            Desired locations to stay
                                    </span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s12">
                                        <div className="col s12 l6">
                                            <SelectBuilder
                                                //onChange={value => getValueFunc('state', value)}
                                                selectArrObj={stateFields.fields}
                                                label="State"
                                                extraProps={{
                                                    style: { top: '-7px' },
                                                }}
                                            //defaultValue={defaultValues.state}
                                            />
                                        </div>
                                        <div className="col s12 l6 input-field inline">
                                            <label htmlFor="city">City</label>
                                            <input id="city" type="text" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    {/* <Select
                                    name="form-field-name"
                                    value=""
                                    options={options}
                                    onChange={logChange}
                                    multi={true}/> */}
                                </div>
                                <div className="row">
                                    <div className="col s12 l6">
                                        <RaisedButton
                                            className=""
                                            target="_blank"
                                            label="Available"
                                            primary={true}
                                            style={styles.button}
                                            icon={<FontIcon className="material-icons">check</FontIcon>}
                                            onClick={() => this.saveDatesTest()}
                                        />
                                        <RaisedButton
                                            className=""
                                            target="_blank"
                                            label="Remove"
                                            secondary={true}
                                            style={styles.button}
                                            icon={<FontIcon className="material-icons">close</FontIcon>}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <AppBar
                                title={<span>Activity</span>}
                                showMenuIconButton={false}
                                style={{ marginBottom: '10px', zIndex: '0' }}
                            />
                            <div className="row">
                                <div className="col s12">
                                    <div className="col s12 z-depth-2" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                                        <div className="col s12 l3">
                                            <img className="circle responsive-img" src="http://stretchflex.net/photos/profileStock.jpeg" alt="profDemo" style={{ height: '140px', width: '140px' }} />
                                        </div>
                                        <div className="col s12 l5">
                                            <div className="col s12" id="message" style={{ top: '5px' }}>
                                                <p><strong>Kevin accepted your request.</strong></p>
                                            </div>
                                        </div>
                                        <div className="col l4">
                                            <div className="col s12">
                                                <p>Washington DC</p>
                                            </div>
                                            <div className="col s12">
                                                <p>May 14, 2017 - May 16, 2017</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <div className="col s12 z-depth-2" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                                        <div className="col s12 l3">
                                            <img className="circle responsive-img" src="http://stretchflex.net/photos/profileStock.jpeg" alt="profDemo" style={{ height: '140px', width: '140px' }} />
                                        </div>
                                        <div className="col s12 l5">
                                            <div className="col s12" id="message" style={{ top: '5px' }}>
                                                <p><strong>Your request to swap with Mike is pending</strong></p>
                                            </div>
                                        </div>
                                        <div className="col l4">
                                            <div className="col s12">
                                                <p>San Francisco</p>
                                            </div>
                                            <div className="col s12">
                                                <p>June 14, 2017 - June 16, 2017</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <div className="col s12 z-depth-2">
                                        <div className="row">
                                            <div className="col s12" style={{ textAlign: 'center' }}>
                                                <h5><strong>Katherine wants to swap with you from July 14-16!</strong></h5>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col s12 l2">
                                                <div className="col s12">
                                                    <img className="circle responsive-img" src="http://stretchflex.net/photos/profileStock2.jpeg" alt="profDemo" style={{ height: '140px', width: '140px' }} />
                                                </div>
                                                <div className="col s4 l12">
                                                    <p>Katherine</p>
                                                </div>
                                                <div className="col s6 l12">
                                                    <p className="location">Chicago, IL</p>
                                                </div>
                                            </div>
                                            <div className="col s12 l4 img-cont" onClick={() => this.handleSlideshowOpen(0)}>
                                                <img src="http://stretchflex.net/photos/apartment.jpeg" alt="" className="image" style={{ height: '250px', width: '100%' }} />
                                                <div className="middle">
                                                    <div className="text">View Place</div>
                                                </div>
                                            </div>

                                            <div className="col s12 l6">
                                                <div className="row">
                                                    <div className="col s4" style={{ textAlign: 'center' }}>
                                                        <p>Entire Apt</p>
                                                        <p><FontIcon className="material-icons large">home</FontIcon></p>
                                                    </div>
                                                    <div className="col s4" style={{ textAlign: 'center' }}>
                                                        <p>4 guests</p>
                                                        <p><FontIcon className="material-icons large">people_outline</FontIcon></p>
                                                    </div>
                                                    <div className="col s4" style={{ textAlign: 'center' }}>
                                                        <p>1 Bedroom</p>
                                                        <p><FontIcon className="material-icons large">hotel</FontIcon></p>
                                                    </div>
                                                </div>
                                                <div className="row col s12">
                                                    <p><u>Message From James:</u><a href="/viewprofile">  (View Profile)</a></p>
                                                    <p>Hello! My name is James and I am interested in swapping with you. Looking to go to NY for the weekend just to getaway.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col s12 l6">
                                                <RaisedButton
                                                    className=""
                                                    target="_blank"
                                                    label="Accept"
                                                    primary={true}
                                                    style={styles.button}
                                                    icon={<FontIcon className="material-icons">check</FontIcon>}
                                                />
                                                <RaisedButton
                                                    className=""
                                                    target="_blank"
                                                    label="Decline"
                                                    secondary={true}
                                                    style={styles.button}
                                                    icon={<FontIcon className="material-icons">close</FontIcon>}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <AppBar
                                title={<span>Upcoming Trips</span>}
                                showMenuIconButton={false}
                                style={{ marginBottom: '10px', zIndex: '0' }}
                            />
                            <div className="col s12 z-depth-2" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                                <div className="col s12 l3">
                                    <img className="circle responsive-img" src="http://stretchflex.net/photos/profileStock.jpeg" alt="profDemo" style={{ height: '140px', width: '140px' }} />
                                </div>
                                <div className="col s12 l9">
                                    <div className="col s12">
                                        <h5>Tim</h5>
                                    </div>
                                    <div className="col s12">
                                        <p>Columbus, Ohio</p>
                                    </div>
                                    <div className="col s12">
                                        <p>May 14, 2017 - May 16, 2017</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <AppBar
                                title={<span>Past Trips</span>}
                                showMenuIconButton={false}
                                style={{ marginBottom: '10px', zIndex: '0' }}
                            />
                            <div className="col s12 z-depth-2" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                                <div className="col s12 l3">
                                    <img className="circle responsive-img" src="http://stretchflex.net/photos/profileStock.jpeg" alt="profDemo" style={{ height: '140px', width: '140px' }} />
                                </div>
                                <div className="col s12 l4">
                                    <div className="col s12">
                                        <h5>Alex</h5>
                                    </div>
                                    <div className="col s12">
                                        <p>Pittsburgh, Pennsylvania</p>
                                    </div>
                                    <div className="col s12">
                                        <p>November 12, 2017 - November 16, 2017</p>
                                    </div>
                                </div>
                                <div className="col s12 l5">
                                    <div className="col s12">
                                        <Rater 
                                            total={5} 
                                            rating={2} 
                                            interactive={true} 
                                            />
                                    </div>
                                    <div className="col s12">
                                        <TextField
                                            hintText="Feedback"
                                            floatingLabelText="Tell us about your experience"
                                            multiLine={true}
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            {/*<SlideShow imgs={this.state.imgsData} ref="SlideShow" />*/}
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
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
    };
}

Planner.propTypes = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Planner);
