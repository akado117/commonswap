import React from 'react';
import { connect }  from 'react-redux';
import PropTypes from 'prop-types';
import { defaultImageUrls } from '../../../../imports/lib/Constants';

function ConnectedButton({ icon, service, actionType, className, buttonText, onClick, disabled }) {
    const component = service[actionType] ? <img src={defaultImageUrls.assets.loadingSpinner} className="loading-gif" /> : icon || '';
    return (
        <button className={`waves-effect waves-light btn-large connected-button-container ${className}`} onClick={onClick} disabled={disabled}>
            <div className={`background-highlight ${!icon ? 'full-width' : ''}`}>
                { component ? <div className="icon-container">
                    {component}
                </div> : ''}
                { icon || (!icon && !component) ? <div className="text-container">
                    {buttonText}
                </div> : ''}
            </div>
        </button>
    );
}

ConnectedButton.propTypes = {
    icon: PropTypes.element,
    service: PropTypes.object.isRequired,
    actionType: PropTypes.string.isRequired,
    className: PropTypes.string,
    buttonText: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

ConnectedButton.defaultProps = {
    icon: undefined,
    className: '',
    disabled: false,
};

function mapStateToProps(state) {
    const { service } = state;
    return {
        service,
    };
}

export default connect(mapStateToProps)(ConnectedButton);