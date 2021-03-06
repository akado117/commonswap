import React from 'react';
import PropTypes from 'prop-types';


export default function CloseButton({ onClick }) {
    return (
        <div className="close-button-container">
            <button onClick={onClick} className="btn waves-effect waves-light">
                <div>&times;</div>
            </button>
        </div>
    );
}

CloseButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};