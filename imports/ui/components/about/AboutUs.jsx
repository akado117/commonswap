import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';

class AboutUs extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <AppBar
                    title={<span>About Us</span>}
                    showMenuIconButton={false}
                    style={{ marginBottom: '10px', zIndex: '0' }}
                />

            </div>
        );
    }
}

export default AboutUs;
