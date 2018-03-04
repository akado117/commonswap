import React from 'react';
import PropTypes from 'prop-types';

const FAElements = ({ label, iconName, name }) => {
    return (
        <div className="interest-element">
            <p><i className={`fa fa-${iconName}`} aria-hidden="true" /> {name}</p>
        </div>
    );
}

FAElements.propTypes = {
    name: PropTypes.string.isRequired,
    iconName: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func,
};

FAElements.defaultProps = {
    onClick: () => { },
};

export default FAElements;
