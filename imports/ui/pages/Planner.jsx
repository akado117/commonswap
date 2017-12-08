import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import 'react-rater/lib/react-rater.css';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import addDays from 'date-fns/add_days'
import InfiniteCalendar, { Calendar, withMultipleRanges, EVENT_TYPES } from 'react-infinite-calendar';
import AppBar from 'material-ui/AppBar';
import { FormateDate, ParseDates, PrettyDate } from '../../helpers/DateHelpers';
import '../../../node_modules/react-infinite-calendar/styles.css';
import '../../../node_modules/react-select/dist/react-select.css';
import Footer from '../components/Footer';
import ProfileActions from '../../actions/ProfileActions';
import PlaceActions from '../../actions/PlaceActions';
import Trip from '../components/PlaceHybridData/Trip';
import { defaultImageUrls, tripStatus } from '../../lib/Constants';

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
    firstName: 'Michaelangelo',
    dates: {
        departure: PrettyDate(addDays(minDate, 5)),
        arrival: PrettyDate(minDate),
    },
    status: tripStatus.ACTIVE,
    rating: 4,
    message: 'This is an example past swap, please complete a swap and tell us how your experience was.',
};

const exampleActiveSwap = {
    address: {
        state: 'OH',
        city: 'Columbus',
    },
    profileImg: {
        url: defaultImageUrls.alex,
    },
    firstName: 'Leonardo (Example Active Swap)',
    dates: {
        departure: PrettyDate(addDays(today, 5)),
        arrival: PrettyDate(today),
    },
    status: tripStatus.ACTIVE,
};

const pendingSwaps = [
    {
        address: {
            state: 'HI',
            city: 'Honolulu',
        },
        profileImg: {
            url: defaultImageUrls.cameraDude,
        },
        firstName: 'Raphael (Example)',
        dates: {
            departure: PrettyDate(addDays(today, 5)),
            arrival: PrettyDate(today),
        },
        status: tripStatus.PENDING,
    }, {
        address: {
            state: 'HI',
            city: 'Honolulu',
        },
        profileImg: {
            url: defaultImageUrls.cameraDude,
        },
        firstName: 'Donatello (Example)',
        dates: {
            departure: PrettyDate(addDays(today, 5)),
            arrival: PrettyDate(today),
        },
        status: tripStatus.ACCEPTED,
    },{
        address: {
            state: 'NY',
            city: 'New York',
        },
        profileImg: {
            url: defaultImageUrls.sassyChick,
        },
        firstName: 'Shredder (Example)',
        dates: {
            departure: FormateDate(addDays(today, 5)),
            arrival: FormateDate(today),
        },
        status: tripStatus.PENDING,
        place: {
            image: {
                url: defaultImageUrls.awesomePlace
            },
            numOfGuests: 15,
            bedrooms: 2,
        },
        requesterMessage: 'This is an example of what you will see when someone else requests to swap with you',
        examplePlace: true,
    }];

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

    isAPlace = swapObj => (this.props.user.userId && swapObj.status === tripStatus.PENDING && this.props.user.userId === swapObj.requesteeId) || swapObj.examplePlace;

    render() {
        return (
            <div className="planner-container">
                <div className="container" id="planner" style={{ marginTop: '20px' }}>
                    <div className="row" >
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
                                <div className="col s12 l6">
                                    <RaisedButton
                                        className=""
                                        target="_blank"
                                        label="Save"
                                        style={{ margin: '15px'}}
                                        primary
                                        icon={<FontIcon className="material-icons">check</FontIcon>}
                                        onClick={this.saveDates}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <AppBar
                            title={<span>Activity - UNDER CONSTRUCTION</span>}
                            showMenuIconButton={false}
                            style={{ marginBottom: '10px', zIndex: '0' }}
                        />
                        {pendingSwaps.map((swap, idx) => <Trip key={`trip-${idx}`} swapObj={swap} showPlace={!!this.isAPlace(swap)} />)}

                    </div>
                    <div className="row">
                        <AppBar
                            title={<span>Upcoming Trips</span>}
                            showMenuIconButton={false}
                            style={{ marginBottom: '10px', zIndex: '0' }}
                        />
                        <Trip swapObj={exampleActiveSwap} />
                    </div>
                    <div className="row">
                        <AppBar
                            title={<span>Past Trips</span>}
                            showMenuIconButton={false}
                            style={{ marginBottom: '10px', zIndex: '0' }}
                        />
                        <Trip swapObj={examplePastSwap} showRating />
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
    const { profile, place, user } = state;
    return {
        profile,
        place,
        user,
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
