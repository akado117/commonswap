import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import { defaultImageUrls } from '../../../../imports/lib/Constants';

const ChargeCardModal = ({ requesterProfileImg = {}, requesteeProfileImg = {}, primaryText, buttonAccept, buttonDecline }) => (
    <div className="row">
        <div className="col s12">
            <h4>We need your permission</h4>
        </div>
        <div className="col s12">
            <p>Upon clicking accept we will charge your credit card $50.</p>
        </div>
        {buttonAccept ? <FlatButton
            label="Accept"
            primary={true}
            onClick={buttonAccept}
        /> : ''}
        {buttonDecline ? <FlatButton
            label="Decline"
            primary={true}
            onClick={buttonDecline}
        /> : ''}
    </div>
);

ChargeCardModal.propTypes = {
    buttonAccept: PropTypes.func,
    buttonDecline: PropTypes.func,
};

ChargeCardModal.defaultProps = {
    
};

export default ChargeCardModal;