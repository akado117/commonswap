import React from 'react';
import { bindActionCreators } from 'redux';
import { connect }  from 'react-redux';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
const _ = require('lodash');//required so it can be used easily in chrome dev tools.

import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import ProfileComponent from '../components/profileComps/ProfileComponent';
import PlaceComponent from '../components/placeComponents/PlaceComponent';
import CreditCard from '../components/verificationComponent/CreditCard';
import CardForm from '../components/verificationComponent/CardForm';
import Verify from '../components/trust/Verify';
import { obfiscateId } from '../../../imports/helpers/DataHelpers';

import ProfileActions from '../actions/ProfileActions';
import PlaceActions from '../actions/PlaceActions';
import FileActions from '../actions/FileActions';
const profileIcon = <FontIcon className="material-icons">person</FontIcon>;
const trust = <FontIcon className="material-icons">favorite</FontIcon>;
const placeIcon = <FontIcon className="material-icons">weekend</FontIcon>;

const scrolling = {
    position: 'fixed',
    top: '0',
};

class Profile extends React.Component {
    valueMap = {
        profile: new Map(),
        interests: new Map(),
        emergencyContacts: new Map(),
    }
    placeValueMap = {
        place: new Map(),
        address: new Map(),
        amenities: new Map(),
    }
    constructor() {
        super();
        this.state = {
            selectedIndex: 0,
        };
    }

    select = (index) => this.setState({ selectedIndex: index });

    componentDidMount = () => {

    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.didUserChange(prevProps, this.props)) {
            const curIdx = this.state.selectedIndex;
            this.setState({ selectedIndex: curIdx + 1 }, () => {
                this.setState({ selectedIndex: curIdx });
            });
        }
        if (prevProps.place.place && (!prevProps.place.place._id || (!prevState.selectedIndex && this.state.selectedIndex)) && this.props.place.place._id && !this.props.images.placeImgs.length) { //get new images on login or check for new ones when going from profile to place (and signed in and image length zero)
            this.props.fileActions.getImagesForPlace({ placeId: this.props.place.place._id });
        }
    }

    didUserChange = (prevProps, props) => {
        const oldUser = prevProps.user;
        const newUser = props.user;
        return (Object.keys(oldUser).length !== Object.keys(newUser).length);
    }

    addValueOnChange = (section, key, value) => {
        const realSection = this.valueMap[section];
        if (realSection) realSection.set(key, value);
    }

    addValueOnChangePlace = (section, key, value) => {
        const realSection = this.placeValueMap[section];
        if (realSection) realSection.set(key, value);
    }

    getFormData = () => {
        const formData = {
            profile: {},
            interests: {},
            emergencyContacts: [],
        };
        this.valueMap.profile.forEach((value, key) => {
            formData.profile[key] = value;
        });
        this.valueMap.interests.forEach((value, key) => {
            formData.interests[key] = value;
        });
        this.valueMap.emergencyContacts.forEach((value) => {
            formData.emergencyContacts.push(value);
        });

        return formData;
    };

    getPlaceFormData = () => {
        const formData = {};
        Object.keys(this.placeValueMap).forEach((key) => {
            formData[key] = {};
            this.placeValueMap[key].forEach((value, mapKey) => {
                formData[key][mapKey] = value;
            });
        });

        return formData;
    };

    saveProfileFunction = (transitionOnSave) => {
        if (!this.props.images.profileImg.url && this.props.user.picture) {
            const profileImgObj = {
                url: this.props.user.picture,
                name: obfiscateId(this.props.user.userId),
                profileId: this.props.user.userId,
            };
            this.props.fileActions.addProfileImageToDataBase(profileImgObj);
        }
        this.props.profileActions.upsertProfile(this.getFormData(), transitionOnSave ? () => this.setState({ selectedIndex: 1 }) : () => {});
    }

    savePlaceFunction = () => {
        this.props.placeActions.upsertPlace(this.getPlaceFormData());
    }

    render() {
        let internalComponent;
        if (this.state.selectedIndex === 0){
            internalComponent = <ProfileComponent getValueFunc={this.addValueOnChange} profile={this.props.profile} user={this.props.user} saveProfile={this.saveProfileFunction} saveProfileImage={this.props.fileActions.addProfileImageToDataBase} profileImg={this.props.images.profileImg} />;
        } else if (this.state.selectedIndex === 1) {
            internalComponent = (
                <PlaceComponent
                    placeImages={this.props.images.placeImgs}
                    savePlaceImage={this.props.fileActions.addPlaceImageToDataBase}
                    getValueFunc={this.addValueOnChangePlace}
                    place={this.props.place}
                    savePlace={this.savePlaceFunction}
                    fileActions={this.props.fileActions}
                    router={this.props.router}
                />);
        }
        else if (this.state.selectedIndex === 2) {
            internalComponent = <Verify/>;
        }
        const path = browserHistory.getCurrentLocation().pathname === '/profile';
        return (
            <section className="profile-container" >
                <Paper id="profile-nav" zDepth={1} /*Todo: animate and use transitions to have it follow scroll*/>
                    <BottomNavigation selectedIndex={this.state.selectedIndex}>
                        <BottomNavigationItem
                            label="My Profile"
                            icon={profileIcon}
                            onClick={() => this.select(0)}
                        />
                        <BottomNavigationItem
                            label="My Place"
                            icon={placeIcon}
                            onClick={() => this.select(1)}
                        />
                        <BottomNavigationItem
                            label="Trust &amp; Verification"
                            icon={trust}
                            onClick={() => this.select(2)}
                        />
                    </BottomNavigation>
                </Paper>
                <div className="container">
                    {internalComponent}
                </div>
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
        user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        profileActions: bindActionCreators(ProfileActions, dispatch),
        placeActions: bindActionCreators(PlaceActions, dispatch),
        fileActions: bindActionCreators(FileActions, dispatch),
    };
}

Profile.propTypes = {
    profileActions: PropTypes.object.isRequired, //eslint-disable-line
    placeActions: PropTypes.object.isRequired,
    fileActions: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    place: PropTypes.object.isRequired,
    images: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);