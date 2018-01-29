import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { find } from 'lodash';
import ProfileActions from '../actions/ProfileActions';
import PlaceActions from '../actions/PlaceActions';
import FileActions from '../actions/FileActions';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from '../components/forms/Checkbox';
import InterestElements from '../components/forms/InterestElements';
import { FormateDate, ParseDates, PrettyDate, convertPlannerDates } from '../../../imports/helpers/DateHelpers';
import ProfileComponent from '../components/profileComps/ProfileComponent.js'
import PlaceComponent from '../components/placeComponents/PlaceComponent.js'
import Footer from '../components/Footer';
import AppBar from 'material-ui/AppBar';
import SwapPicker from '../components/viewProfile/SwapPicker';
import SendMessage from '../components/viewProfile/SendMessage';
import ImageCarousel from '../components/ImageCarousel';
import ModalActions from '../actions/ModalActions';
import ChargeCardModal from '../components/dialog/ChargeCardModal';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from '../../../node_modules/react-swipeable-views';
import InfiniteCalendar, { Calendar, withMultipleRanges, EVENT_TYPES } from 'react-infinite-calendar';
import BetaWarning from '../components/BetaWarning';

const amenitiesTextMap = {
    gym: 'Gym/Fitness Center',
    parking: 'Parking',
    handicap: 'Handicap Friendly',
    heat: 'Heat/Air Conditioning',
    wiFi: 'WiFi',
    kitchen: 'Kitchen Appliances',
    washer: 'Washer/Dryer',
}

const interestIcons = {
    books: 'book',
    breweries: 'beer',
    cars: 'car',
    clubber: 'clubbing',
    environment: 'tree',
    fashion: 'film',
    film: 'film',
    arts: 'paint-brush',
    foodie: 'cutlery',
    gaming: 'gamepad',
    fitness: 'heartbeat',
    hiking: 'heartbeat',
    liveMusic: 'music',
    orgTour: 'music',
    animals: 'paw',
    photography: 'camera-retro',
    politics: 'flag',
    wineries: 'glass',
}

const interestsTextMap = {
    books: 'Reading',
    breweries: 'Breweries',
    cars: 'Cars',
    clubber: 'Clubbing/Nightlife',
    environment: 'Environmental Issues',
    fashion: 'Fashion',
    film: 'Movies',
    arts: 'Fine Arts',
    foodie: 'Restaurants',
    gaming: 'Gaming',
    fitness: 'Health/Fitness',
    hiking: 'Hiking',
    liveMusic: 'Live Music/Concerts',
    orgTour: 'Organized Tours',
    animals: 'Pets/Animals',
    photography: 'Photography',
    politics: 'Politics',
    wineries: 'Wineries',
}

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    slide: {
        padding: 10,
    },
};

const profile = <FontIcon className="material-icons">person</FontIcon>;

class ViewProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrival: '',
            departure: '',
            notes: '',
            guests: '',
            slideIndex: 0,
            selectedDates: convertPlannerDates(ParseDates(props.place.place.availableDates || [])),
        };
        const { placeId } = this.props.params;
        if (placeId && !find(this.props.place.placesForBrowsing, place => place._id === placeId)) {
            props.placeActions.getPlaceById(placeId);
        }
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };

    getPlace = () => {
        const { placeId } = this.props.params;
        let placeForBrowse;
        if (placeId) {
            placeForBrowse = find(this.props.place.placesForBrowsing, place => place._id === placeId);
        }
        if (placeForBrowse) return placeForBrowse;
        const { place, amenities, address } = this.props.place;
        const { profile, interests } = this.props.profile;
        const { placeImgs } = this.props.images;

        placeForBrowse = {
            ...this.props.place.place,
            amenities,
            address,
            interests,
            profile,
            placeImgs,
        };
        return placeForBrowse;

    };

    requestSwap = (data) => {
        const { placeId, user } = this.props.params;
        this.props.profileActions.requestSwap({
            placeId,
            Arrival: data.dates.arrival,
            Departure: data.dates.departure,
            Notes: data.swapperMessage,
            User: user,
        });
    }

    chargeCardModal(data, props, currentPlace, modalActions) {
        modalActions.openModal(<ChargeCardModal
            buttonAccept={() => this.continueSaving(data, props, currentPlace, modalActions)}
            buttonDecline={this.props.modalActions.closeModal} />);
    }

    continueSaving = (data, props, currentPlace, modalActions) => {
        this.props.modalActions.closeModal();
        this.requestSwap(data);
        const { numOfGuests, bedrooms, _id } = props.place.place;
        const { state, city } = props.place.address;
        const { firstName, email } = props.profile.profile;
        const placeImg = props.images.placeImgs[0];
        const requesterProfileImg = props.images.profileImg;
        const userId = props.user._id;
        const requesteePlaceId = currentPlace._id;
        const requesteeUserId = currentPlace.ownerUserId;
        const requesteeProfileImg = currentPlace.profileImg;
        const swapObj = {
            place: {
                numOfGuests,
                bedrooms,
            },
            address: {
                state,
                city,
            },
            requesterName: firstName,
            requesterEmail: email,
            requesterPlaceId: _id,
            requesterUserId: userId || Meteor.userId(),
            requesterProfileImg,
            requesteeUserId,
            requesteePlaceId,
            requesteeProfileImg,
            placeImg,
            ...data,
        };
        props.placeActions.saveSwap(swapObj);
    }

    saveSwap = (data, props, currentPlace, modalActions) => {
        this.chargeCardModal(data, props, currentPlace, modalActions);
    }

    sendMessage = (data) => {
        const { placeId, question, user } = this.props.params;
        this.props.profileActions.sendMessage({
            placeId,
            Question: question,
            User: user,
        });
    }

    render() {
        let internalComponent;
        if (this.state.selectedIndex === 0) {
            internalComponent = <ProfileComponent getValueFunc={this.addValueOnChange} />
        } else if (this.state.selectedIndex === 1) {
            internalComponent = <PlaceComponent getValueFunc={this.addValueOnChange} />
        }

        const { placeId } = this.props.params;
        const place = this.getPlace();
        const { amenities, interests, profile, profileImg, placeImgs, address } = place;

        const amenitiesElements = Object.keys(amenities).map((key) => {
            if (amenities[key] && amenitiesTextMap[key]) {
                return <Checkbox label={amenitiesTextMap[key]} active name={key} key={key} />;
            }
        });

        const interestsElements = Object.keys(interests).map((key) => {
            if (interests[key] && interestsTextMap[key]) {
                return <Checkbox label={interestsTextMap[key]} active name={key} key={key} />;
            }
        });

        const interestIconLabels = Object.keys(interests).map((key) => {
            if(interests[key] && interestIcons[key]) {
                console.log('icon label');
                console.log();
                return <InterestElements iconName={interestIcons[key]} name={interestsTextMap[key]} />;
            }
        })
        const remappedImages = placeImgs.map(image => ({ original: image.url, thumbnail: image.url, originalClass: "img-gal" }));

        // onCalendarSelect = (selectedDates, eventData) => {
        // if (eventData && eventData.eventType === EVENT_TYPES.END) {
        //     const dateObj = selectedDates[eventData.modifiedDateIndex] || {};
        //     this.setState({
        //         selectedDates,
        //         initialSelectedDate: dateObj.start,
        //     });
        // }
        // }
        return (
            <section className="profile-view-container">
                <div className="container">
                    <BetaWarning></BetaWarning>
                    <div className="row">
                        <div className="col s4 center-align">
                            <img className="circle responsive-img" src={profileImg ? profileImg.url : 'http://stretchflex.net/photos/profileStock.jpeg'} alt="profDemo" style={{ height: '15.0rem', width: '15.0rem' }} />
                        </div>
                        <div className="col s8">
                            <div className="col s12">
                                <h4 className="header"><strong>{profile.firstName}, ({address.city} {address.state})</strong></h4>
                            </div>
                            <div className="col s12">
                                <h5>{profile.occupation}</h5>
                            </div>
                            <div className="col s12">
                                <p className="school">{profile.school} {profile.classOf}</p>
                            </div>
                            <div className="col s12">
                                <p><strong>About Me</strong></p>
                                <p>{profile.personalSummary}</p>
                            </div>
                            <div className="col s12">
                                <p><strong>Interests</strong></p>
                                {interestIconLabels}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <Tabs
                                    onChange={this.handleChange}
                                    value={this.state.slideIndex}
                                    initialSelectedIndex={0}
                                    style={{ backgroundColor: 'transparent' }}
                                >
                                    <Tab label={`${profile.firstName}'s Place`} value={0} icon={<i className="fa fa-home" aria-hidden="true"></i>} />
                                    <Tab label={`${profile.firstName}'s Calendar`} value={1} icon={<i className="fa fa-calendar-o" aria-hidden="true"></i>} />
                                    <Tab label="Send a Message" value={2} icon={<i className="fa fa-envelope-o" aria-hidden="true"></i>} />
                                    <Tab label="Request a Swap" value={3} icon={<i className="fa fa-plane" aria-hidden="true"></i>} />
                                </Tabs>
                                <SwipeableViews
                                    index={this.state.slideIndex}
                                    onChangeIndex={this.handleChange}
                                >
                                    <div>
                                        <div className="col s12">
                                            <div className="row">
                                                <div className="place-images">
                                                    <div className="col s12">
                                                        <ImageCarousel images={remappedImages} extraProps={{ showBullets: true }} />
                                                        <div className="col s12">
                                                            <div className="place-section z-depth-2">
                                                                <AppBar
                                                                    title={<span>Basic Information</span>}
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
                                                                            <p>{place.numOfGuests} guests</p>
                                                                            <p><FontIcon className="material-icons large">people_outline</FontIcon></p>
                                                                        </div>
                                                                        <div className="col s4" style={{ textAlign: 'center' }}>
                                                                            <p>{place.bedrooms} Bedroom</p>
                                                                            <p><FontIcon className="material-icons large">hotel</FontIcon></p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col s12">
                                                                    <strong>Amenities: </strong>
                                                                    <p>{amenitiesElements}</p>
                                                                </div>
                                                            </div>
                                                            <div className="space-top">
                                                                <div className="place-section z-depth-2 ">
                                                                    <AppBar
                                                                        title={<span>Description</span>}
                                                                        showMenuIconButton={false}
                                                                        style={{ marginBottom: '10px', zIndex: 0 }}
                                                                    />
                                                                    <div className="col s12">
                                                                        <p>{place.detailedDesc}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="space-top">
                                                                <div className="place-section z-depth-2">
                                                                    <AppBar
                                                                        title={<span>Recommendations</span>}
                                                                        showMenuIconButton={false}
                                                                        style={{ marginBottom: '10px', zIndex: 0 }}
                                                                    />
                                                                    <div className="col s12">
                                                                        <p>{place.recommendations}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="space-top">
                                                                <div className="place-section z-depth-2">
                                                                    <AppBar
                                                                        title={<span>General Courtesy Guidelines</span>}
                                                                        showMenuIconButton={false}
                                                                        style={{ marginBottom: '10px', zIndex: 0 }}
                                                                    />
                                                                    <div className="col s12">
                                                                        <p>{place.generalNotes}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={styles.slide}>
                                        <div className="z-depth-2 calendar-wrapper" >
                                            <div className="row">
                                                <div className="col s12 calendar-container" >
                                                    <InfiniteCalendar
                                                        width={'100%'}
                                                        selected={new Date(2016, 5, 2)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={styles.slide}>
                                        <div className="col s12">
                                            <SendMessage
                                                sendMessage={data => this.sendMessage(data)}
                                                disableButton={!placeId || placeId === this.props.user.userId}
                                            />
                                        </div>
                                    </div>
                                    <div style={styles.slide}>
                                        <div className="col s12 center-align">
                                            <SwapPicker
                                                requestSwap={data => this.saveSwap(data, this.props, place, this.props.modalActions)}
                                                disableButton={!placeId || placeId === this.props.user.userId}
                                            />
                                        </div>
                                    </div>
                                </SwipeableViews>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </section>
        );
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
        modalActions: bindActionCreators(ModalActions, dispatch),
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
    placeImgs: PropTypes.array,
    modalActions: PropTypes.object,
}
ViewProfile.defaultProps = {
    placeImgs: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewProfile);