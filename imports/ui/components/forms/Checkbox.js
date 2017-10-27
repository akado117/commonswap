import React from 'react'
import PropTypes from 'prop-types'


const CheckBox = ({label, active, onClick, name}) => {
    return (
        <div className="col s4 checkbox-container">
            <label>{label}</label>
            <button type="button" className={`btn btn-sm ${active ? 'active' : ''}`} onClick={e => onClick(e, name)}><i className={`fa ${active ? 'fa-check' : 'fa-times'}`} aria-hidden="true"/></button>
        </div>
    )
}

CheckBox.propTypes = {
    onClick: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    active: PropTypes.bool,
    label: PropTypes.string.isRequired,
};

export default CheckBox