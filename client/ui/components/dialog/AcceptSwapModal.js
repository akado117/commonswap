import React from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import { defaultImageUrls } from '../../../../imports/lib/Constants';

const AcceptSwapModal = ({ requesterProfileImg = {}, requesteeProfileImg = {}, primaryText, buttonHandler }) => (
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
        {buttonHandler ? <FlatButton
            label="OK"
            primary={true}
            onClick={buttonHandler}
        /> : ''}
    </div>
);

AcceptSwapModal.propTypes = {
    requesterProfileImg: PropTypes.object.isRequired,//eslint-disable-line
    requesteeProfileImg: PropTypes.object.isRequired,//eslint-disable-line
    primaryText: PropTypes.string,
    buttonHandler: PropTypes.func,
};

AcceptSwapModal.defaultProps = {
    primaryText: '',
};

export default AcceptSwapModal;