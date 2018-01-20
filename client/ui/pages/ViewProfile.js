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
import Checkbox from '../components/forms/Checkbox'
import ProfileComponent from '../components/profileComps/ProfileComponent.js'
import PlaceComponent from '../components/placeComponents/PlaceComponent.js'
import Footer from '../components/Footer';
import AppBar from 'material-ui/AppBar';
import SwapPicker from '../components/viewProfile/SwapPicker';
import SendMessage from '../components/viewProfile/SendMessage';
import ImageCarousel from '../components/ImageCarousel';
import ModalActions from '../actions/ModalActions';
import ChargeCardModal from '../components/dialog/ChargeCardModal';

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
    foodie: 'Food and Restaurants',
    orgTour: 'Organized Tours'
}

const profile = <FontIcon className="material-icons">person</FontIcon>;

class ViewProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrival: '',
            departure: '',
            notes: '',
            guests: ''
        };
        const { placeId } = this.props.params;
        if (placeId && !find(this.props.place.placesForBrowsing, place => place._id === placeId)) {
            props.placeActions.getPlaceById(placeId);
        }
    }

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
        const remappedImages = placeImgs.map(image => ({ original: image.url, thumbnail: image.url, originalClass: "img-gal" }));
        return (
            <section className="profile-view-container">
                <div className="container">
                    <BetaWarning></BetaWarning>
                    <div className="row">
                        <div className="col s12 m8">
                            <div className="profile-section z-depth-2 " >
                                <AppBar
                                    title={<span>About {profile.firstName}</span>}
                                    showMenuIconButton={false}
                                    style={{ marginBottom: '10px', zIndex: 0 }}
                                />
                                <div className="col s6 l6">
                                    <img className="circle responsive-img" src={profileImg ? profileImg.url : 'http://stretchflex.net/photos/profileStock.jpeg'} alt="profDemo" style={{ height: '140px', width: '140px' }} />
                                </div>
                                <div className="col s6" id="message" style={{ top: '5px' }}>
                                    <div className="row">
                                        <div className="col s12">
                                            <h5><strong>{profile.firstName}</strong></h5>
                                        </div>
                                        <div className="col s12">
                                            <h5><strong>{address.city} {address.state}</strong></h5>
                                        </div>
                                        <div className="col s12">
                                            <p>{profile.school} {profile.classOf}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col s12">
                                    <p>{profile.personalSummary}</p>
                                </div>
                                <div className="col s12">
                                    <strong>Interests: </strong>
                                </div>
                                <div className="row">
                                    <div className="col s12">
                                        {interestsElements}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col s12 m4">
                            <SwapPicker
                                requestSwap={data => this.saveSwap(data, this.props, place, this.props.modalActions)}
                                disableButton={!placeId || placeId === this.props.user.userId}
                            />
                        </div>
                        <div className="col s12 m4 marg-top">
                            <SendMessage 
                                sendMessage={data => this.sendMessage(data)}
                                disableButton={!placeId || placeId === this.props.user.userId}
                            />
                        </div>
                    </div>
                    <div className="col s12 z-depth-2">
                        <div className="row">
                            <div className="place-images">
                                <div className="col s12">
                                    <ImageCarousel images={remappedImages} extraProps={{ showBullets: true }} />    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <div className="place-section z-depth-2">
                                <AppBar
                                    title={<span>About {profile.firstName}'s Place</span>}
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
                                </div>
                                <div className="col s12">
                                    <div className="col s12">
                                        {amenitiesElements} 
                                    </div>
                                </div>
                                <div className="col s12"> 
                                    <strong>Description: </strong>
                                </div>
                                <div className="col s12">
                                    <p>{place.detailedDesc}</p>
                                </div>
                                <div className="col s12">
                                    <strong>Special Instructions: </strong>
                                    <p>{place.specialInst}
                                    </p>
                                </div>
                                <div className="col s12">
                                    <strong>Top recommendations for visitors: </strong>
                                    <p>{place.recommendations}</p>
                                </div>
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