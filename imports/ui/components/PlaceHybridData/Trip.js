import React from 'react';
import PropTypes from 'prop-types';
import Rater from 'react-rater';
import TextField from 'material-ui/TextField';
import { stateFields, defaultImageUrls, tripStatus } from '../../../lib/Constants';

const { values, displayNames } = stateFields.fields;

function getRater(rating, message, active) {
    if (!active) return <div className="col s12 l5" > </div>;
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

const Trip = ({ swapObj, showRating,  }) => {
    const { address, dates, firstName, rating, ratingMessage, profileImg, place, swapperMessage } = swapObj;
    const displayState = displayNames[values.indexOf(address.state)];
    const showName = swapObj.status === tripStatus.ACTIVE || swapObj.status === tripStatus.COMPLETE;
    return (
        <div className="row z-depth-2 trip-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            <div className="col s12 l3 trip-image">
                <img className="" src={profileImg.url || defaultImageUrls.cameraDude} alt="profDemo" />
            </div>
            <div className="col s12 l4">
                {showName ? <h4>{firstName}</h4> : ''}
                <h5>{`${address.city}, ${displayState}`}</h5>
                <h5>{`${dates.arrival} - ${dates.departure}`}</h5>
            </div>
            {getRater(rating, ratingMessage, showRating)}
        </div>
    );
};

Trip.propTypes = {
    swapObj: PropTypes.object.isRequired,
    showRating: PropTypes.bool,
};

Trip.defaultProps = {
    showRating: false,
};

export default Trip;