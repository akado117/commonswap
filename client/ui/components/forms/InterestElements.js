import React from 'react';
import PropTypes from 'prop-types';

const InterestElements = ({label, iconName, name}) => {
    console.log('ICON NAME');
    console.log(iconName);
    return (
        <div className="col s4">
            <p><i className={`fa fa-${iconName}`} aria-hidden="true"></i> {name}</p>
        </div>
    )
}

InterestElements.propTypes = {
    name: PropTypes.string.isRequired,
    iconName: PropTypes.bool,
};

InterestElements.defaultProps = {
    onClick: () => {},
};

export default InterestElements;
