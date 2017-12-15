import React, { Component } from 'react';

class BetaWarning extends Component {
    constructor() {
        super();

    }

    render() {
        return (
            <div className="card orange lighten-5" style={{ marginTop: '20px' }}>
                <div className="card-content orange-text">
                    WARNING: This feature is in beta. Will be working soon!
                </div>
            </div>
        );
    }
}

export default BetaWarning;
