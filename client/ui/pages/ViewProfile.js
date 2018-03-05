import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { find } from 'lodash';
import { Tabs, Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import ProfileActions from '../actions/ProfileActions';
import AppBar from 'material-ui/AppBar';
import PlaceActions from '../actions/PlaceActions';
import FileActions from '../actions/FileActions';
import Checkbox from '../components/forms/Checkbox';
import IconElements from '../components/forms/IconElements';
import { FormateDate, ParseDates, PrettyDate, convertPlannerDates, Today } from '../../../imports/helpers/DateHelpers';
import Footer from '../components/Footer';
import SwapPicker from '../components/viewProfile/SwapPicker';
import SendMessage from '../components/viewProfile/SendMessage';
import ImageCarousel from '../components/ImageCarousel';
import ModalActions from '../actions/ModalActions';
import ChargeCardModal from '../components/dialog/ChargeCardModal';
import SwipeableViews from '../../../node_modules/react-swipeable-views';
import InfiniteCalendar, { Calendar, withMultipleRanges, EVENT_TYPES } from 'react-infinite-calendar';
import ConnectedButton from '../components/forms/ConnectedButton';

const amenitiesTextMap = {
    gym: 'Gym/Fitness Center',
    parking: 'Parking',
    handicap: 'Handicap Friendly',
    heat: 'Heat/Air Conditioning',
    wiFi: 'WiFi',
    kitchen: 'Kitchen Appliances',
    washer: 'Washer/Dryer',
}

const amenitiesIcons = {
    gym: 'https://s3.us-east-2.amazonaws.com/cslistingphotos/icons/GymFitness.svg',
    parking: 'https://s3.us-east-2.amazonaws.com/cslistingphotos/icons/Parking.svg',
    handicap: 'https://s3.us-east-2.amazonaws.com/cslistingphotos/icons/Handicapped.svg',
    heat: 'https://s3.us-east-2.amazonaws.com/cslistingphotos/icons/AirCondition.svg',
    wiFi: 'https://s3.us-east-2.amazonaws.com/cslistingphotos/icons/Wifi.svg',
    kitchen: 'https://s3.us-east-2.amazonaws.com/cslistingphotos/icons/KitchenAppliances.svg',
    washer: 'https://s3.us-east-2.amazonaws.com/cslistingphotos/icons/WasherDryer.svg',
}

const interestIcons = {
    books: 'book',
    breweries: 'beer',
    cars: 'car',
    clubber: 'star',
    environment: 'tree',
    fashion: 'cut',
    film: 'film',
    arts: 'paint-brush',
    foodie: 'cutlery',
    gaming: 'gamepad',
    fitness: 'heartbeat',
    hiking: 'image',
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
    environment: 'Nature Lover',
    fashion: 'Fashion',
    film: 'Movies',
    arts: 'Fine Arts',
    foodie: 'Restaurants',
    gaming: 'Gaming',
    fitness: 'Health/Fitness',
    hiking: 'Hiking',
    liveMusic: 'Music/Concerts',
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
        padding: "15px 10px",
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

    componentDidUpdate(prevProps) {
        if (this.props.place.place.availableDates && !prevProps.place.place.availableDates) {
            this.setState({ selectedDates: convertPlannerDates(ParseDates(this.props.place.place.availableDates || [])) });
        }
    }

    handleChange = (newValue, oldVal, { reason }) => {
        if (reason !== 'focus') {
            this.setState({
                slideIndex: newValue,
            });
        }
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

    requestSwap = (data, props) => {
        const { placeId } = props.params;
        this.props.profileActions.requestSwap({
            placeId,
            Arrival: data.dates.arrival,
            Departure: data.dates.departure,
            Notes: data.swapperMessage,
            User: props.user,
        });
    }

    chargeCardModal(data, props, currentPlace, modalActions) {
        modalActions.openModal(<ChargeCardModal
            buttonAccept={() => this.continueSaving(data, props, currentPlace, modalActions)}
            buttonDecline={this.props.modalActions.closeModal} />);
    }

    continueSaving = (data, props, currentPlace, modalActions) => {
        this.props.modalActions.closeModal();
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
    getTabs = profile => (
        <Tabs
            onChange={(index, e) => this.handleChange(index, this.state.slideIndex, {
                reason: 'click',
            })}
            value={this.state.slideIndex}
            initialSelectedIndex={0}
            style={{ backgroundColor: 'transparent' }}
            className="tab-row"
        >
            <Tab className="nav-label" label={<span className="tab-text">{`${profile.firstName}'s Place`}</span>} value={0} icon={<i className="fa fa-home" aria-hidden="true" />} />
            <Tab className="nav-label" label={<span className="tab-text">{`${profile.firstName}'s Calendar`}</span>} value={1} icon={<i className="fa fa-calendar-o" aria-hidden="true" />} />
            <Tab className="nav-label" label={<span className="tab-text">Send a Message</span>} value={2} icon={<i className="fa fa-envelope-o" aria-hidden="true" />} />
            <Tab className="nav-label" label={<span className="tab-text">Request a Swap</span>} value={3} icon={<i className="fa fa-plane" aria-hidden="true" />} />
        </Tabs>
    )

    getProfile = (place) => {
        const { amenities, numOfGuests, placeImgs, bedrooms, detailedDesc, recommendations, generalNotes } = place;
        const remappedImages = placeImgs.map(image => ({ original: image.url, thumbnail: image.url, originalClass: "img-gal" }));

        const amenitiesElements = Object.keys(amenities).map((key, idx) => {
            if (amenitiesTextMap[key] && amenitiesIcons[key]) {
                return <div className="col s6"><IconElements key={`interests-${idx}`} iconName={amenitiesIcons[key]} name={amenitiesTextMap[key]} /></div>;
            }
        })

        return (
            <div className="place-images row">
                <div className="col s12 l6">
                    <ImageCarousel images={remappedImages} extraProps={{ showBullets: true }} />
                    <div className="space-top show-on-large hide-on-med-and-down">
                        <div className="place-section z-depth-2">
                            <AppBar
                                title={<span>Recommendations</span>}
                                showMenuIconButton={false}
                                style={{ marginBottom: '10px', zIndex: 0 }}
                            />
                            <div className="col s12">
                                <p>{recommendations}</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-top show-on-large hide-on-med-and-down">
                        <div className="place-section z-depth-2">
                            <AppBar
                                title={<span>General Courtesy Guidelines</span>}
                                showMenuIconButton={false}
                                style={{ marginBottom: '10px', zIndex: 0 }}
                            />
                            <div className="col s12">
                                <p>{generalNotes}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col s12 l6">
                    <div className="place-section z-depth-2">
                        <AppBar
                            title={<span>Basic Information</span>}
                            showMenuIconButton={false}
                            style={{ marginBottom: '10px', zIndex: 0 }}
                        />
                        <div className="row reduced-row-margin">
                            <div className="col s4" style={{ textAlign: 'center' }}>
                                <p>{place.access}</p>
                                <p><FontIcon className="material-icons large">home</FontIcon></p>
                            </div>
                            <div className="col s4" style={{ textAlign: 'center' }}>
                                <p>{numOfGuests} guests</p>
                                <p><FontIcon className="material-icons large">people_outline</FontIcon></p>
                            </div>
                            <div className="col s4" style={{ textAlign: 'center' }}>
                                <p>{bedrooms} Bedroom</p>
                                <p><FontIcon className="material-icons large">hotel</FontIcon></p>
                            </div>
                        </div>
                        <div className="col s12">
                            <h6>Amenities: </h6>
                        </div>
                        {amenitiesElements}
                    </div>
                    <div className="space-top">
                        <div className="place-section z-depth-2 ">
                            <AppBar
                                title={<span>Description</span>}
                                showMenuIconButton={false}
                                style={{ marginBottom: '10px', zIndex: 0 }}
                            />
                            <div className="col s12">
                                <p>{detailedDesc}</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-top hide-on-large-only">
                        <div className="place-section z-depth-2">
                            <AppBar
                                title={<span>Recommendations</span>}
                                showMenuIconButton={false}
                                style={{ marginBottom: '10px', zIndex: 0 }}
                            />
                            <div className="col s12">
                                <p>{recommendations}</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-top hide-on-large-only">
                        <div className="place-section z-depth-2">
                            <AppBar
                                title={<span>General Courtesy Guidelines</span>}
                                showMenuIconButton={false}
                                style={{ marginBottom: '10px', zIndex: 0 }}
                            />
                            <div className="col s12">
                                <p>{generalNotes}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    gotToPath(props, path) {
        const { router } = props;
        router.push(path);
    }

    getSaveButtons(props) {
        if (props.params.placeId !== props.place.place._id) return '';
        return (
            <div className="row">
                <div className="col s6 m4 l3 offset-m4 offset-l6">
                    <ConnectedButton
                        icon={<i className="fa fa-floppy-o fa-1x" aria-hidden="true" style={{ float: 'left' }} />}
                        buttonText="Save"
                        onClick={() => this.gotToPath(props, '/explore')}
                    />
                </div>
                <div className="col s6 m4 l3">
                    <ConnectedButton
                        icon={<i className="fa fa-edit fa-1x" aria-hidden="true" style={{ float: 'left' }} />}
                        buttonText="edit"
                        onClick={() => this.gotToPath(props, '/profile')}
                    />
                </div>
            </div>
        );
    }
    render() {
        const { placeId } = this.props.params;
        const place = this.getPlace();
        const { interests, profile, profileImg, address } = place;

        const interestsElements = Object.keys(interests).map((key) => {
            if (interests[key] && interestsTextMap[key]) {
                return <Checkbox label={interestsTextMap[key]} active name={key} key={key} />;
            }
        });

        const interestIconLabels = Object.keys(interests).map((key, idx) => {
            if (interests[key] && interestIcons[key]) {
                return <div className="col s6 m6 l4"><IconElements key={`interests-${idx}`} iconName={interestIcons[key]} name={interestsTextMap[key]} /></div>;
            }
        })

        return (
            <section className="profile-view-container">
                <div className="container">
                    <div className="row" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                        <div className="col s12 m4" >
                            <div className="" >
                                <img className="responsive-img" src={profileImg ? profileImg.url : 'https://s3.us-east-2.amazonaws.com/cslistingphotos/home/profStock.jpeg'} alt="profDemo" />
                            </div>
                        </div>
                        <div className="col s12 m8 profile-info">
                            <h4 className="header"><strong>{profile.firstName}, ({address.city} {address.state})</strong></h4>
                            <h5>{profile.occupation}</h5>
                            <p className="school">{profile.school} {profile.classOf}</p>
                            <h6><strong>About Me</strong></h6>
                            <p>{profile.personalSummary}</p>
                            <h6><strong>Interests</strong></h6>
                            <div className="interests-section row">
                                {interestIconLabels}
                            </div>
                        </div>
                    </div>
                    {this.getSaveButtons(this.props)}
                    <div className="row">
                        <div className="row">
                            {this.getTabs(profile)}
                            <SwipeableViews
                                index={this.state.slideIndex}
                                onChangeIndex={this.handleChange}
                            >
                                <div style={styles.slide}>
                                    {this.getProfile(place)}
                                </div>
                                <div style={styles.slide}>
                                    <div className="z-depth-2 calendar-wrapper" >
                                        <div className="calendar-container" >
                                            <InfiniteCalendar
                                                Component={withMultipleRanges(Calendar)}
                                                height={500}
                                                width="100%"
                                                selected={this.state.selectedDates}
                                                initialSelectedDate={Today}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div style={styles.slide}>
                                    <SendMessage
                                        sendMessage={data => this.sendMessage(data)}
                                        disableButton={!placeId || placeId === this.props.user.userId}
                                    />
                                </div>
                                <div style={styles.slide}>
                                    <div className="center-align">
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