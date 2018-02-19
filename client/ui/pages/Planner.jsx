import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import 'react-rater/lib/react-rater.css';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import AppBar from 'material-ui/AppBar';
import addDays from 'date-fns/add_days';
import InfiniteCalendar, { Calendar, withMultipleRanges, EVENT_TYPES } from 'react-infinite-calendar';
import { FormateDate, ParseDates, PrettyDate, convertPlannerDates, Today } from '../../../imports/helpers/DateHelpers';
import '../../../node_modules/react-infinite-calendar/styles.css';
import '../../../node_modules/react-select/dist/react-select.css';
import Footer from '../components/Footer';
import AcceptSwapModal from '../components/dialog/AcceptSwapModal';
import ChargeCardModal from '../components/dialog/ChargeCardModal';
import ProfileActions from '../actions/ProfileActions';
import PlaceActions from '../actions/PlaceActions';
import ModalActions from '../actions/ModalActions';
import Trip from '../components/PlaceHybridData/Trip';
import { actionTypes } from '../helpers/ConstantsRedux';
import { defaultImageUrls, tripStatus } from '../../../imports/lib/Constants';
import ConnectedButton from '../components/forms/ConnectedButton';
import SignupModalButton from '../components/SignupModalButton';


// const STATES = require('../../../node_modules/react-select/examples/src/data/states');
const CITIES = require('../../../node_modules/react-select/examples/src/data/states');


const minDate = addDays(Today, -20);

const examplePastSwap = [{
    address: {
        state: 'DC',
        city: 'Washington',
    },
    requesterProfileImg: {
        url: defaultImageUrls.kevin,
    },
    requesteeProfileImg: {
        url: defaultImageUrls.kevin,
    },
    requesterName: 'Michaelangelo',
    requesteeName: 'Michaelangelo',
    dates: {
        departure: PrettyDate(addDays(minDate, 5)),
        arrival: PrettyDate(minDate),
    },
    status: tripStatus.ACTIVE,
    rating: 4,
    message: 'This is an example past swap, please complete a swap and tell us how your experience was.',
    _id: '1',
}];

const exampleActiveSwap = [{
    address: {
        state: 'OH',
        city: 'Columbus',
    },
    requesterProfileImg: {
        url: defaultImageUrls.alex,
    },
    requesteeProfileImg: {
        url: defaultImageUrls.alex,
    },
    requesterName: 'Leonardo (Example Active Swap)',
    requesteeName: 'Leonardo (Example Active Swap)',
    dates: {
        departure: PrettyDate(addDays(Today, 5)),
        arrival: PrettyDate(Today),
    },
    status: tripStatus.ACTIVE,
    _id: '2',
}];

const examplePendingSwaps = [
    {
        address: {
            state: 'HI',
            city: 'Honolulu',
        },
        requesterProfileImg: {
            url: defaultImageUrls.cameraDude,
        },
        requesteeProfileImg: {
            url: defaultImageUrls.cameraDude,
        },
        requesterName: 'Raphael (Example)',
        requesteeName: 'Raphael (Example)',
        dates: {
            departure: PrettyDate(addDays(Today, 5)),
            arrival: PrettyDate(Today),
        },
        status: tripStatus.PENDING,
        _id: '3',
    }, {
        address: {
            state: 'HI',
            city: 'Honolulu',
        },
        requesterProfileImg: {
            url: defaultImageUrls.cameraDude,
        },
        requesteeProfileImg: {
            url: defaultImageUrls.cameraDude,
        },
        requesterName: 'Donatello (Example)',
        requesteeName: 'Donatello (Example)',
        dates: {
            departure: PrettyDate(addDays(Today, 5)),
            arrival: PrettyDate(Today),
        },
        status: tripStatus.ACCEPTED,
        _id: '4',
    }, {
        address: {
            state: 'NY',
            city: 'New York',
        },
        requesterProfileImg: {
            url: defaultImageUrls.sassyChick,
        },
        requesteeProfileImg: {
            url: defaultImageUrls.sassyChick,
        },
        requesterName: 'Shredder (Example)',
        requesteeName: 'Shredder (Example)',
        dates: {
            departure: FormateDate(addDays(Today, 5)),
            arrival: FormateDate(Today),
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
        _id: '5',
    }];

class Planner extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDates: convertPlannerDates(ParseDates(props.place.place.availableDates || [])),
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
        // const { placeId } = this.props.params;
        // if(placeId) {
        //     this.acceptModalAcceptHandler
        // }
    }

    componentDidMount = () => {
        if (!this.props.trip.getTripsCalled) {
            this.props.placeActions.getSwaps({ id: this.props.user.userId || Meteor.userId() });
        }
    }
    componentDidUpdate = (prevProps) => {
        if (!prevProps.place.place._id && this.props.place.place._id) { //set dates from newly logged in user
            const selectedDates = convertPlannerDates(ParseDates(this.props.place.place.availableDates || []));
            this.setState({ selectedDates });
            if (!this.props.trip.getTripsCalled) this.props.placeActions.getSwaps({ id: this.props.user.userId || Meteor.userId() });
        }
    }

    // handleSlideshowOpen(index) {
    //     //this.refs.SlideShow.handleModalOpen(index);
    // };

    changeRating(newRating) {
        this.setState({
            rating: newRating,
        });
    }

    createCharge = () => {

    }

    displayDates() {
        console.log("SELECTED DATES");
        console.log(this.state.selectedDates);
    }

    saveDates = () => {
        this.props.placeActions.updatePlaceDates(convertPlannerDates(this.state.selectedDates));
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

    tripBuilder = (trips, userId) => trips.map((trip, idx) => <Trip
        key={`trip-${trip._id}`}
        swapObj={trip}
        currentUserId={userId}
        acceptSwapHandler={(requesterProfileImage, requesteeProfileImage) => this.openAcceptModal(requesterProfileImage, requesteeProfileImage, this.props.modalActions, true, trip)}
        declineSwapHandler={(requesterProfileImage, requesteeProfileImage) => this.openAcceptModal(requesterProfileImage, requesteeProfileImage, this.props.modalActions, false, trip)}
    />);

    exampleTripBuilder = (trips, userId, idxToForcePlace) => trips.map((trip, idx) => <Trip key={`trip-${trip._id}`} swapObj={trip} currentUserId={userId} showPlace={idx === idxToForcePlace} />);

    onChargeCardAccept(modalActions, trip, accepted) {
        //if (accepted) this.props.placeActions.chargeCards(trip);//charges and updates to accepted
        modalActions.closeModal();
    }

    openChargeCardModal(modalActions, trip) {
        modalActions.openModal(
            <ChargeCardModal
                buttonAccept={() => this.onChargeCardAccept(modalActions, trip, false)}
                isRequester
            />,
        );
    }

    acceptModalAcceptHandler = (trip, accepted, modalActions) => {
        const { _id, status } = trip;
        if (!accepted) {
            this.props.placeActions.updateSwapStatus({ _id, prevStatus: status, status: tripStatus.DECLINED });
            this.props.modalActions.closeModal();
        } else {
            this.props.modalActions.closeModal();
            this.props.placeActions.updateSwapStatus({ _id, prevStatus: status, status: tripStatus.ACTIVE });
            this.openChargeCardModal(modalActions, trip);
        }
    };

    openAcceptModal(requesterProfileImage, requesteeProfileImage, modalActions, accepted, trip) {
        modalActions.openModal(
            <AcceptSwapModal
                requesterProfileImg={requesterProfileImage}
                primaryText={accepted ? 'Accept Swap?' : 'Really Decline Swap?'}
                requesteeProfileImg={requesteeProfileImage}
                acceptButtonHandler={() => this.acceptModalAcceptHandler(trip, accepted, modalActions)}
                declineButtonHandler={() => this.props.modalActions.closeModal()}
            />);
    }

    //todo: tim if you hook up the param to autolaunch accept modal. This should work out of the box
    openAcceptOrDeclineModal(requesterProfileImage, requesteeProfileImage, trip, modalActions, requesteeName) {
        modalActions.openModal(
            <AcceptSwapModal
                requesterProfileImg={requesterProfileImage}
                primaryText={`Accept swap with ${requesteeName}`}
                requesteeProfileImg={requesteeProfileImage}
                acceptButtonHandler={() => this.acceptModalAcceptHandler(trip, true, modalActions)}
                declineButtonHandler={() => this.acceptModalAcceptHandler(trip, false, modalActions)}
            />);
    }

    updateAvailableAnytime(availableAnytime, place, placeActions, userId) {
        const { _id, ownerUserId } = place;
        placeActions.updateAlwaysAvailable({ availableAnytime, _id, ownerUserId: userId });
    }

    render() {
        const { userId } = this.props.user;
        const { pendingTrips, activeTrips, pastTrips } = this.props.trip;
        const { place } = this.props.place;
        const pendTrips = pendingTrips.length ? this.tripBuilder(pendingTrips, userId) : this.exampleTripBuilder(examplePendingSwaps, userId, 2);
        const actTrips = activeTrips.length ? this.tripBuilder(activeTrips, userId) : this.tripBuilder(exampleActiveSwap, userId);
        const pastedTrips = pastTrips.length ? this.tripBuilder(pastTrips, userId) : this.tripBuilder(examplePastSwap, userId);
        const actions = [//you can add a param to trip builder and feed these into the open accept modal if you want. But you can also style the modal content to be however you want
            <FlatButton
                label="OK"
                primary={true}
                onClick={this.props.modalActions.closeModal}
            />,
        ];
        return (
            <div className="planner-container">
                <div className="container" id="planner" style={{ marginTop: '20px' }}>
                    <div className="row" >
                        <AppBar
                            title={<span>My Availability</span>}
                            showMenuIconButton={false}
                            style={{ marginBottom: '10px', zIndex: '0' }}
                        />
                        <p className="planner-helper-text">Select the date range(s) that you are able to travel</p>
                        {userId ? '' : (
                            <div className="row center-content signup-button">
                                <SignupModalButton
                                    className="col s6 m4 l3"
                                />
                            </div>
                        )}
                        <div className="z-depth-2 calendar-wrapper" >
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
                                        minDate={Today}
                                    />
                                </div>
                            </div>
                            <div className="col s12">
                                <div className="row center-content">
                                    <div className="col s6 m4 l3 offset-m4 offset-l6">
                                        <Toggle
                                            toggled={place.availableAnytime}
                                            onToggle={(obj, state) => this.updateAvailableAnytime(state, place, this.props.placeActions, userId)}
                                            label="Always Available?"
                                            labelStyle={{ fontWeight: 'bold', fontSize: '1rem', textAlign: 'right' }}
                                        />
                                    </div>
                                    <div className="col s6 m4 l3 ">
                                        <ConnectedButton
                                            icon={<i className="fa fa-floppy-o fa-1x" aria-hidden="true" style={{ float: 'left' }} />}
                                            actionType={actionTypes.SAVE_PLACE_AVAILABILITY}
                                            buttonText="Save"
                                            onClick={this.saveDates}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <AppBar
                            title={<span>Activity</span>}
                            showMenuIconButton={false}
                            style={{ marginBottom: '10px', zIndex: '0' }}
                        />
                        {pendTrips}
                    </div>
                    <div className="row">
                        <AppBar
                            title={<span>Upcoming Trips</span>}
                            showMenuIconButton={false}
                            style={{ marginBottom: '10px', zIndex: '0' }}
                        />
                        {actTrips}
                    </div>
                    <div className="row">
                        <AppBar
                            title={<span>Past Trips</span>}
                            showMenuIconButton={false}
                            style={{ marginBottom: '10px', zIndex: '0' }}
                        />
                        {pastedTrips}
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
    const { profile, place, user, trip } = state;
    return {
        profile,
        place,
        user,
        trip,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        profileActions: bindActionCreators(ProfileActions, dispatch),
        placeActions: bindActionCreators(PlaceActions, dispatch),
        modalActions: bindActionCreators(ModalActions, dispatch),
    };
}

Planner.propTypes = {
    profile: PropTypes.object,
    place: PropTypes.object,
    user: PropTypes.object,
    trip: PropTypes.object,
    modalActions: PropTypes.object,
    placeActions: PropTypes.object,
    profileActions: PropTypes.object,
};

Planner.defaultProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Planner);
