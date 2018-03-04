import React from 'react';
import PropTypes from 'prop-types';
import FAElements from './FAElements';
import CustomIcon from './CustomIcon';
const _ = require('lodash')

const IconElements = ({ label, iconName, name }) => {
    return (
        <div className="amenity-element">
            {_.includes(iconName, 'https://') ?
                <CustomIcon key={`amenities-${name}`} url={iconName} name={name} />
                : <FAElements key={`amenities-${name}`} iconName={iconName} name={name} />}
        </div>
    );
}

IconElements.propTypes = {
    name: PropTypes.string.isRequired,
    iconName: PropTypes.string,
    label: PropTypes.string,
    onClick: PropTypes.func,
};

IconElements.defaultProps = {
    onClick: () => { },
};

export default IconElements;
