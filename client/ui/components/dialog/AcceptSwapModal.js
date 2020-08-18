import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { defaultImageUrls } from '../../../../imports/lib/Constants';

const AcceptSwapModal = ({ requesterProfileImg = {}, requesteeProfileImg = {}, primaryText, acceptButtonHandler, declineButtonHandler }) => (
    <div className="accept-swap-modal">
        <div className="row">
            <div className="col s12 center-align">
                <img src={defaultImageUrls.assets.checkMark} alt="checkMark" style={{ height: '140px', width: '140px' }} />
            </div>
            <div className="col s12 center-align">
                <h3>{primaryText}</h3>
            </div>
            <div className="col s12">
                <div className="col s6 center-align">
                    <img className="circle responsive-img" src={requesterProfileImg.url || defaultImageUrls.cameraDude} alt="profDemo" style={{ height: '140px', width: '140px' }} />
                </div>
                <div className="col s6 center-align">
                    <img className="circle responsive-img" src={requesteeProfileImg.url || defaultImageUrls.cameraDude} alt="profDemo" style={{ height: '140px', width: '140px' }} />
                </div>
            </div>
        </div>
        <div className="row button-row">
            {acceptButtonHandler ? <RaisedButton
                className="col s4 l3 no-padding right"
                target="_blank"
                label="Yes"
                style={{ margin: '12px' }}
                primary
                icon={<FontIcon className="material-icons">check</FontIcon>}
                onClick={acceptButtonHandler}
            /> : ''}
            {declineButtonHandler ? <RaisedButton
                className="col s4 l3 no-padding right"
                target="_blank"
                label="No"
                style={{ margin: '12px' }}
                secondary
                onClick={declineButtonHandler}
                icon={<FontIcon className="material-icons">close</FontIcon>}
            /> : ''}
        </div>
    </div>
);

AcceptSwapModal.propTypes = {
    requesterProfileImg: PropTypes.object.isRequired,//eslint-disable-line
    requesteeProfileImg: PropTypes.object.isRequired,//eslint-disable-line
    primaryText: PropTypes.string,
    acceptButtonHandler: PropTypes.func,
    declineButtonHandler: PropTypes.func,
};

AcceptSwapModal.defaultProps = {
    primaryText: '',
};

export default AcceptSwapModal;