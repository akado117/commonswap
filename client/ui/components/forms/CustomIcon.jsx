import React from 'react';
import PropTypes from 'prop-types';

const CustomIcon = ({ label, url, name }) => {
    return (
        <div className="amenity-element center-align">
            <img src={`${url}`} alt={name} height="20%" width="20%" /><p>{name}</p>
        </div>
    );
}

CustomIcon.propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func,
};

CustomIcon.defaultProps = {
    onClick: () => { },
};

export default CustomIcon;
