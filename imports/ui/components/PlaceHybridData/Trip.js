import React from 'react';
import PropTypes from 'prop-types';
import Rater from 'react-rater';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import FontIcon from 'material-ui/FontIcon';
import { stateFields, defaultImageUrls, tripStatus } from '../../../lib/Constants';
import { GetSwapDateRange } from '../../../helpers/DateHelpers';

const { values, displayNames } = stateFields.fields;

function getRater(rating, message, active) {
    if (!active || rating === undefined) return '';
    return (
        <div className="col s12 l5">
            <div className="col s12">
                <Rater
                    total={5}
                    rating={rating || 0}
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
    )
}

const TripRequest = (swapObj) => {
    const { address, dates, requesterName, requesterProfileImg, place, requesterMessage, placeImg, requesterPlaceId } = swapObj;
    const profileLink = `/viewProfile/${requesterPlaceId || ''}`
    return (
        <div className="col s12 z-depth-2">
            <div className="row">
                <div className="col s12 place-title" style={{ textAlign: 'center' }}>
                    <h3>
                        <strong>{`${requesterName} wants to swap with you from ${GetSwapDateRange(dates.arrival, dates.departure)}`}</strong>
                    </h3>
                </div>
            </div>
            <div className="row">
                <div className="col s12 l3">
                    <div className="trip-image">
                        <img className="" src={requesterProfileImg.url || defaultImageUrls.cameraDude} alt="profDemo" />
                    </div>
                    <div className="col s4 l12">
                        <h5>{requesterName}</h5>
                    </div>
                    <div className="col s6 l12">
                        <h5 className="location">{`${address.city}, ${address.state}`}</h5>
                    </div>
                </div>
                <div className="col s12 l4 img-cont" onClick={() => this.handleSlideshowOpen(0)}>
                    <img src={(placeImg && placeImg.url) || defaultImageUrls.awesomePlace} alt="" className="image" style={{ height: '250px', width: '100%' }} />
                    <div className="middle">
                        <div className="text">View Place</div>
                    </div>
                </div>

                <div className="col s12 l5">
                    <div className="row">
                        <div className="col s4" style={{ textAlign: 'center' }}>
                            <p>Entire Apt</p>
                            <p><FontIcon className="material-icons large">home</FontIcon></p>
                        </div>
                        <div className="col s4" style={{ textAlign: 'center' }}>
                            <p>{`${place.numOfGuests} guests`}</p>
                            <p><FontIcon className="material-icons large">people_outline</FontIcon></p>
                        </div>
                        <div className="col s4" style={{ textAlign: 'center' }}>
                            <p>{`${place.bedrooms} Bedrooms`}</p>
                            <p><FontIcon className="material-icons large">hotel</FontIcon></p>
                        </div>
                    </div>
                    <div className="row col s12">
                        <p><u>{`Message From ${requesterName}:`}</u><Link to={profileLink} > (View Profile)</Link></p>
                        <p>{requesterMessage}</p>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col s12 l6">
                    <RaisedButton
                        className=""
                        target="_blank"
                        label="Accept"
                        style={{ margin: '12px'}}
                        primary
                        icon={<FontIcon className="material-icons">check</FontIcon>}
                    />
                    <RaisedButton
                        className=""
                        target="_blank"
                        label="Decline"
                        style={{ margin: '12px'}}
                        secondary
                        icon={<FontIcon className="material-icons">close</FontIcon>}
                    />
                </div>
            </div>
        </div>
    );
}

function getNameAndImage(swapObj, status, currentUserId) {
    const isRequester = currentUserId === swapObj.requesterUserId;
    const firstName = isRequester ? swapObj.requesteeName : swapObj.requesterName;
    let formattedName;
    if (status === tripStatus.PENDING) formattedName = `Your request to swap with ${firstName} is pending`;
    else if (status === tripStatus.ACTIVE || status === tripStatus.COMPLETE) formattedName = firstName;
    else if (status === tripStatus.ACCEPTED) formattedName = `Your request to swap with ${firstName} has been accepted`;
    const profileImg = (isRequester ? swapObj.requesteeProfileImg : swapObj.requesterProfileImg);
    return {
        formattedName,
        profileImg,
    };
}

const TripCard = (swapObj, currentUserId, showRating) => {
    const { address, dates, rating, ratingMessage, status } = swapObj;
    const displayState = displayNames[values.indexOf(address.state)];
    const showName = status === tripStatus.ACTIVE || status === tripStatus.COMPLETE;
    const { formattedName, profileImg } = getNameAndImage(swapObj, status, currentUserId);
    const rater = getRater(rating, ratingMessage, showRating);
    return (
        <div className="z-depth-2 trip-card">
            <div className="col s12 l3">
                <div className="trip-image">
                    <img className="" src={profileImg.url || defaultImageUrls.cameraDude} alt="profDemo" />
                </div>
            </div>
            {!showName ? <div className="col s12 l5"><h5 className="pending-swap-text">{formattedName}</h5></div> : ''}
            <div className="col s12 l4">
                {showName ? <h4>{formattedName}</h4> : ''}
                <h5>{`${address.city}, ${displayState}`}</h5>
                <h5>{`${dates.arrival} - ${dates.departure}`}</h5>
            </div>
            {rater}
            {!rater && showName ? <div className="col s12 l5" > </div> : ''}
        </div>
    );
};

function isPlace(swapObj, currentUserId) {
    return swapObj.status === tripStatus.PENDING && currentUserId === swapObj.requesteeUserId;
}

/*
Pending && requester == currentUser => Trip Card with requestee profile Image and name
Pending && requester != currentuser => Trip request
(Accepted || Active || Completed) && requester == currentuser => Trip Card with requestee profile and name
 (Accepted || Active || Completed) && requester != currentuser => Trip Card with requester profile and name
*/
const Trip = ({ swapObj, showRating, showPlace, currentUserId }) => {
    const content = isPlace(swapObj, currentUserId) || showPlace
        ? TripRequest(swapObj)
        : TripCard(swapObj, currentUserId, showRating);
    return (
        <div className="trip-container">
            {content}
        </div>
    );
}

Trip.propTypes = {
    swapObj: PropTypes.object.isRequired,
    showRating: PropTypes.bool,
    showPlace: PropTypes.bool,
    currentUserId: PropTypes.string,
};

Trip.defaultProps = {
    showRating: false,
    showPlace: false,
    currentUserId: '',//this is needed but can't always be had on load
};

export default Trip;