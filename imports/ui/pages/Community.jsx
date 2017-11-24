import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


class Community extends Component {
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
                <Navbar className="invisible"></Navbar>
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
                        <dl>
                            <dt>1. Be Considerate and Respect Others</dt>
                            <dd>- CommonSwap is a community founded on the values of respect and integrity. Treat your swap’s place as if it was your own and follow the rules or special instructions provided by your swap.</dd>
                            <dt>2. Communication is Key </dt>
                            <dd>- Timely Responses – please respond to any inquiries or messages promptly.</dd>
                            <dd>- Communicate any general ground rules or special instructions prior to your swap (i.e. Do I need to bring toiletries? How do I access your place? What time will you be arriving/departing?)</dd>
                            <dd>- If you are ever in doubt, ask your swap!</dd>
                            <dd>- Escalate any issues or problems to CommonSwap Support immediately </dd>
                            <dt>3. “Mi Casa Su Casa”</dt>
                            <dd>- Making sure the bedroom, living area, bed sheets, pillow cases, etc. are clean</dd>
                            <dd>- Checking in with your swap to make sure he/she has arrived safely</dd>
                            <dd>- Providing recommendations about your city to your swap</dd>
                            <dt>4. Be Fair and Accountable</dt>
                            <dd>- Work together and be fair in resolving disputes. If needed, escalate any issues to CommonSwap Support.</dd>
                            <dd>- Own up to any mistakes or wrongdoings and inform your swap</dd>
                            <dt>5. Be Responsible</dt>
                            <dd>- Use good judgement and remove yourself from situations that can cause you or your swap's place harm.</dd>
                            <dt>6. Have Fun</dt>
                            <dd>- Most importantly, have a great time! Traveling should be a stress-free and wonderful experience. Enjoy everything the city has to offer.</dd>
                        </dl>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Community;
