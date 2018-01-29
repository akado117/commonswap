import React from 'react';
import PropTypes from 'prop-types';

const InterestElements = ({ label, iconName, name }) => {
    return (
        <div className="interest-element">
            <p><i className={`fa fa-${iconName}`} aria-hidden="true" /> {name}</p>
        </div>
    );
}

InterestElements.propTypes = {
    name: PropTypes.string.isRequired,
    iconName: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func,
};

InterestElements.defaultProps = {
    onClick: () => {},
};

export default InterestElements;
