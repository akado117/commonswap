import React from 'react';
import PropTypes from 'prop-types';


const CheckBox = ({label, active, onClick, name}) => {
    return (
        <div className="col s6 m4 checkbox-container">
            <div className="label-container">
                <label htmlFor={name}>{label}</label>
            </div>
            <button id={name} type="button" className={`btn btn-sm ${active ? 'active' : ''}`} onClick={e => onClick(e, name)}><i className={`fa ${active ? 'fa-check' : 'fa-times'}`} aria-hidden="true" /></button>
        </div>
    )
}

CheckBox.propTypes = {
    onClick: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    active: PropTypes.bool,
    label: PropTypes.string.isRequired,
};

CheckBox.defaultProps = {
    active: false,
};

export default CheckBox;