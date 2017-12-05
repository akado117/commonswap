import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import 'react-rater/lib/react-rater.css';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import addDays from 'date-fns/add_days'
import InfiniteCalendar, { Calendar, withMultipleRanges, EVENT_TYPES } from 'react-infinite-calendar';
import AppBar from 'material-ui/AppBar';
import { FormateDates, ParseDates, PrettyDate } from '../../helpers/DateHelpers';
import '../../../node_modules/react-infinite-calendar/styles.css';
import '../../../node_modules/react-select/dist/react-select.css';
import Footer from '../components/Footer';
import ProfileActions from '../../actions/ProfileActions';
import PlaceActions from '../../actions/PlaceActions';
import Trip from '../components/PlaceHybridData/Trip';
import { defaultImageUrls, tripStatus } from '../../lib/Constants';


const styles = {
    button: {
        margin: 12,
    },
};

// const STATES = require('../../../node_modules/react-select/examples/src/data/states');
const CITIES = require('../../../node_modules/react-select/examples/src/data/states');


const today = new Date();
const minDate = addDays(today, -40);

const examplePastSwap = {
    address: {
        state: 'DC',
        city: 'Washington',
    },
    profileImg: {
        url: defaultImageUrls.kevin,
    },
    firstName: 'Kevin',
    dates: {
        departure: PrettyDate(addDays(minDate, 5)),
        arrival: PrettyDate(minDate),
    },
    status: tripStatus.ACTIVE,
    rating: 4,
    message: 'This is an example past swap, please complete a swap and tell us how your experience was.',
}

class Planner extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            controlledDate: [new Date()],
            testDates: [new Date(),new Date(), new Date()],
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
                                            min={minDate}
                                            selected={this.state.selectedDates}
                                            initialSelectedDate={this.state.initialSelectedDate}
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
                            <Trip swapObj={examplePastSwap} showRating />
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
