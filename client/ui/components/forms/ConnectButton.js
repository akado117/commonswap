import React from 'react';
import { connect }  from 'react-redux';
import PropTypes from 'prop-types';
import { defaultImageUrls } from '../../../../imports/lib/Constants';

function ConnectedButton({ icon, service, actionType, className, buttonText, onClick }) {
    const component = service[actionType] ? <img src={defaultImageUrls.assets.loadingSpinner} className="loading-gif" /> : icon || '';
    return (
        <button className={`waves-effect waves-light btn-large connected-button-container ${className}`} onClick={onClick}>
            <div className="icon-container">
                {component}
            </div>
            <div className="text-container">
                {buttonText}
            </div>
        </button>
    );
}

ConnectedButton.propTypes = {
    icon: PropTypes.element.isRequired,
    service: PropTypes.object.isRequired,
    actionType: PropTypes.string.isRequired,
    className: PropTypes.string,
    buttonText: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

ConnectedButton.defaultProps = {
    className: '',
};

function mapStateToProps(state) {
    const { service } = state;
    return {
        service,
    };
}

export default connect(mapStateToProps)(ConnectedButton);