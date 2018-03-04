import React from 'react';
import PropTypes from 'prop-types';

const styles = {
    height: '3.5rem',
    width: '3.5rem'
}

const divStyle = {
    minHeight: '100px'
}

const CustomIcon = ({ label, url, name }) => {
    return (
        <div className="amenity-element center-align" style={divStyle} >
            <img src={`${url}`} alt={name} style={styles} /><p>{name}</p>
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
