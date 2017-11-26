import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import Footer from '../components/Footer';


class Press extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let internalComponent;
        if (this.state.selectedIndex === 0) {
            internalComponent = <AboutUs />;
        }
        else if (this.state.selectedIndex === 1) {
            internalComponent = <Founders />;
        }
        return (
            <div className="community-container">
                <header style={{ paddingTop: '35px' }}>
                    <div className="col s12 center-align">
                        <div className="header-container overlay-desc">
                            <h1 className="header-title">Community Values<br />
                            </h1>
                        </div>
                    </div>
                </header>
                <div className="row container">
                    <div className="col s12">
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Press;
