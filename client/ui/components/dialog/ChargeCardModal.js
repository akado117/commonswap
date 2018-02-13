import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { defaultImageUrls, loginTypes } from '../../../../imports/lib/Constants';
import { triggerFBShareDialog } from '../../helpers/externalServiceScriptInjection';

const ChargeCardModal = ({ buttonAccept, buttonDecline, isRequester }) => (
    <div className="row">
        <div className="col s12">
            <h4>We need your permission</h4>
        </div>
        <div className="col s12">
            <p>Upon clicking accept, you give us the right to charge your credit card
                <span className="crossed-out"> $25</span>
                <strong> $0</strong>{isRequester ? 'if the other community member accepts your swap.' : ''}</p>
            <p>We hope you enjoy your experience. Please do us a favor and share CommonSwap with your friends!</p>
        </div>
        <div className="col s12">
            <div className="center-align">
                <RaisedButton
                    target="_blank"
                    label="Share"
                    backgroundColor="#3B5998"
                    labelColor="#ffffff"
                    className="sign-button"
                    style={{ width: '135px' }}
                    icon={<FontIcon className="fa fa-facebook" />}
                    onClick={() => triggerFBShareDialog()}
                />
            </div>
        </div>
        <div className="col s12">
            <div className="float-right">
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
        </div>
    </div>
);

ChargeCardModal.propTypes = {
    buttonAccept: PropTypes.func,
    buttonDecline: PropTypes.func,
    isRequester: PropTypes.bool,
    primaryText: PropTypes.string,
};

ChargeCardModal.defaultProps = {

};

export default ChargeCardModal;