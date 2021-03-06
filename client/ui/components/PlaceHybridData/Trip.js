import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router';
import FontIcon from 'material-ui/FontIcon';
import { stateFields, defaultImageUrls, tripStatus } from '../../../../imports/lib/Constants';
import { GetSwapDateRange } from '../../../../imports/helpers/DateHelpers';
import TripRater from './TripRater';

const { values, displayNames } = stateFields.fields;

function getRater(trip, active) {
    if (!active) return '';
    return (
        <TripRater
            trip={trip}
        />
    )
}

const TripRequest = (swapObj, handleAcceptSwap, handleDeclineSwap) => {
    const { address, dates = {}, requesterName, requesterProfileImg, requesteeProfileImg, place, requesterMessage, placeImg, requesterPlaceId } = swapObj;
    const profileLink = `/viewProfile/${requesterPlaceId || ''}`;
    return (
        <div className="col s12 z-depth-2">
            {swapObj.examplePlace && <div className="test-overlay" >EXAMPLE</div> }
            <div className="row">
                <div className="col s12 place-title" style={{ textAlign: 'center' }}>
                    <h3>
                        <strong>{`${requesterName} wants to swap with you from ${GetSwapDateRange(dates.arrival, dates.departure)}`}</strong>
                    </h3>
                </div>
            </div>
            <div className="row">
                <div className="col s12 m3 l3">
                    <div className="centering-container">
                        <div className="trip-image">
                            <img className="" src={requesterProfileImg != null ? requesterProfileImg.url : defaultImageUrls.cameraDude} alt="profDemo" />
                        </div>
                    </div>
                    <div className="col s4 m12 l12">
                        <div className="centering-container">
                            <h5>{requesterName}</h5>
                        </div>
                    </div>
                    <div className="col s6 m12 l12">
                        <div className="centering-container">
                            <h5 className="location">{`${address.city}, ${address.state}`}</h5>
                        </div>
                    </div>
                </div>
                <Link className="col s12 m4 l4 img-cont" to={profileLink}>
                    <img src={(placeImg && placeImg.url) || defaultImageUrls.awesomePlace} alt="" className="image" />
                    <div className="middle">
                        <div className="text">View Place</div>
                    </div>
                </Link>

                <div className="col s12 m5 l5">
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

            <div className="row float-right">
                <div className="col s12">
                    <RaisedButton
                        className=""
                        target="_blank"
                        label="Accept"
                        style={{ margin: '12px' }}
                        primary
                        icon={<FontIcon className="material-icons">check</FontIcon>}
                        onClick={() => handleAcceptSwap(requesterProfileImg, requesteeProfileImg) }
                    />
                    <RaisedButton
                        className=""
                        target="_blank"
                        label="Decline"
                        style={{ margin: '12px' }}
                        secondary
                        onClick={() => handleDeclineSwap(requesterProfileImg, requesteeProfileImg) }
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
    else if (status === tripStatus.DECLINED) formattedName = `Swap with ${firstName} has been declined`;
    const profileImg = (isRequester ? swapObj.requesteeProfileImg : swapObj.requesterProfileImg) || {};
    return {
        formattedName,
        profileImg,
    };
}

const TripCard = (swapObj, currentUserId, showRating) => {
    const { address, dates, status } = swapObj;
    const displayState = displayNames[values.indexOf(address.state)];
    const showName = status === tripStatus.ACTIVE || status === tripStatus.COMPLETE;
    const { formattedName, profileImg } = getNameAndImage(swapObj, status, currentUserId);
    const rater = getRater(swapObj, showRating);
    return (
        <div className="z-depth-2 trip-card">
            <div className="col s12 m3 l3">
                <div className="trip-image">
                    <img className="" src={profileImg == null ? defaultImageUrls.cameraDude : profileImg.url} alt="profDemo" />
                </div>
            </div>
            {!showName ? <div className="col s12 m5 l5"><h5 className="pending-swap-text">{formattedName}</h5></div> : ''}
            <div className="col s12 m4 l4">
                {showName ? <h4>{formattedName}</h4> : ''}
                <h5>{`${address.city}, ${displayState}`}</h5>
                <h5>{`${dates.arrival} - ${dates.departure}`}</h5>
            </div>
            {rater}
            {!rater && showName ? <div className="col s12 m5 l5" > </div> : ''}
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
const Trip = ({ swapObj, showRating, showPlace, currentUserId, acceptSwapHandler, declineSwapHandler }) => {
    const content = isPlace(swapObj, currentUserId) || showPlace
        ? TripRequest(swapObj, acceptSwapHandler, declineSwapHandler)
        : TripCard(swapObj, currentUserId, showRating);
    return (
        <div className="trip-container">
            {content}
            {swapObj.examplePlace && <div style={{clear: 'both'}} /> }
        </div>
    );
}

Trip.propTypes = {
    swapObj: PropTypes.object.isRequired,
    showRating: PropTypes.bool,
    showPlace: PropTypes.bool,
    currentUserId: PropTypes.string,
    acceptSwapHandler: PropTypes.func,
    declineSwapHandler: PropTypes.func,
};

Trip.defaultProps = {
    showRating: false,
    showPlace: false,
    currentUserId: '',//this is needed but can't always be had on load
    acceptSwapHandler: () => {},
    declineSwapHandler: () => {},
};

export default Trip;