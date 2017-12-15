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
                    title={<span>Our Purpose</span>}
                    showMenuIconButton={false}
                    style={{ marginBottom: '10px', zIndex: '0' }}
                />
                <div className="col s12">
                    <p style={{fontSize:'1.5rem'}}>We exist to foster a new way of traveling. Our goal is to connect a community of adventure seekers founded on the values of respect and integrity to experience more of the world.
                        We are firm believers that traveling opens up the mind and heart - it provides us the opportunity to experience, understand, and learn to respect and appreciate the life of another person, culture, or country.
                        With each opportunity to experience life through the lens of others, we become more compassionate, empathetic, and respectful of each other</p>
                </div>
            </div>
        );
    }
}

export default AboutUs;
