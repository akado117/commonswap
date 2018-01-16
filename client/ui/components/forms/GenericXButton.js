import React from 'react';

const GenericXButton = ({ className, onClick, fontIconClass }) => (
    <div className={`generic-x-button ${className}`}>
        <button onClick={onClick}>
            <div className="background-div"></div>
            <i className={`fa ${fontIconClass || 'fa-times-circle'} fa-2x`} />
        </button>
    </div>
)

export default GenericXButton;