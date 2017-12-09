import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import InfiniteCalendar, { Calendar, withMultipleRanges, EVENT_TYPES } from 'react-infinite-calendar';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import { FormateDates, ParseDates } from '../../helpers/DateHelpers';
import '../../../node_modules/react-infinite-calendar/styles.css';
import '../../../node_modules/react-select/dist/react-select.css';
import Footer from '../components/Footer';
import ProfileActions from '../../actions/ProfileActions';
import PlaceActions from '../../actions/PlaceActions';
import Dialog from 'material-ui/Dialog';

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


const today = new Date();

function logChange(val) {
    console.log("Selected: " + JSON.stringify(val));
}

class Planner extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            controlledDate: [new Date()],
            testDates: [new Date(), new Date(), new Date()],
            selectedDates: ParseDates(props.place.place.availableDates || []),
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
            cities: [],
            open: false,
        };
        var options = CITIES[this.state.country];
    }

    componentDidUpdate = (prevProps) => {
        if (!prevProps.place.place._id && this.props.place.place._id) { //set dates from newly logged in user
            const selectedDates = ParseDates(this.props.place.place.availableDates || []);
            this.setState({ selectedDates });
        }
    }

    handleSlideshowOpen(index) {
        //this.refs.SlideShow.handleModalOpen(index);
    };

    changeRating(newRating) {
        this.setState({
            rating: newRating,
        });
    }

    createCharge = () => {

    }

    handleOpen = () => {

        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    displayDates() {
        console.log("SELECTED DATES");
        console.log(this.state.selectedDates);
    }

    componentDidMount = () => {
        //this.handleSlideshowOpen(0);
    }

    saveDates = () => {
        this.props.placeActions.updatePlaceDates(this.state.selectedDates || []);
    }

    onCalendarSelect = (selectedDates, eventData) => {
        if (eventData && eventData.eventType === EVENT_TYPES.END) {
            const dateObj = selectedDates[eventData.modifiedDateIndex] || {};
            this.setState({
                selectedDates,
                initialSelectedDate: dateObj.start,
            });
        }
    }

    render() {
        const actions = [
            <FlatButton
                label="OK"
                primary={true}
                onClick={this.handleClose}
            />,
        ];
        return (
            <div className="planner-container">
                <div className="container" id="planner" style={{ marginTop: '20px' }}>
                    <div className="row" >
                        <div className="col s12 calendar-parent">
                            <AppBar
                                title={<span>{"My Swap's Availability"}</span>}
                                showMenuIconButton={false}
                                style={{ marginBottom: '10px', zIndex: '0' }}
                            />
                            <div className="z-depth-2">
                                <div className="row">
                                    <div className="col s12 calendar-container" >
                                        <InfiniteCalendar
                                            Component={withMultipleRanges(Calendar)}
                                            height={350}
                                            min={new Date(2017, 8, 1)}
                                            selected={this.state.selectedDates}
                                            initialSelectedDate={this.state.initialSelectedDate}
                                            // selected={[
                                            //     new Date(2017, 11, 12),
                                            //     new Date(2017, 11, 16),
                                            //     new Date(2017, 11, 20),
                                            // ]}
                                            layout={'portrait'}
                                            width={'100%'}
                                            onSelect={this.onCalendarSelect}
                                        />
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
                                            label="Save"
                                            primary={true}
                                            style={styles.button}
                                            icon={<FontIcon className="material-icons">check</FontIcon>}
                                            onClick={this.saveDates}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <AppBar
                                title={<span>Activity - UNDER CONSTRUCTION</span>}
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
                                                    onClick={this.handleOpen}
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
                                    <Dialog
                                        title=""
                                        actions={actions}
                                        modal={true}
                                        open={this.state.open}
                                    >
                                        <div className="row">
                                            <div className="col s12 center-align">
                                                <img src="https://s3.us-east-2.amazonaws.com/com-swap-prod/static/checkMark.png" alt="checkMark" style={{ height: '140px', width: '140px' }} />
                                            </div>
                                            <div className="col s12 center-align">
                                                <h3>Swap Accepted</h3>
                                            </div>
                                            <div className="col s12">
                                                <div className="col s6 center-align">
                                                    <img className="circle responsive-img" src="http://stretchflex.net/photos/profileStock2.jpeg" alt="profDemo" style={{ height: '140px', width: '140px' }} />
                                                </div>
                                                <div className="col s6 center-align">
                                                    <img className="circle responsive-img" src="http://stretchflex.net/photos/profileStock.jpeg" alt="profDemo" style={{ height: '140px', width: '140px' }} />
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog>
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
        placeActions: bindActionCreators(PlaceActions, dispatch),
    };
}

Planner.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Planner);
