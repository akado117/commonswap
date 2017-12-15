import React, { Component } from 'react';
import Footer from '../components/Footer';


class Trust extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="trust-container">
                <header style={{ paddingTop: '35px' }}>
                    <div className="col s12 center-align">
                        <div className="header-container overlay-desc">
                            <h1 className="header-title">Trust &amp; Verification<br />
                            </h1>
                        </div>
                    </div>
                </header>
                <div className="row container">
                    <div className="col s12">
                        <ul>
                            <li>User Verification – Each of our user will go through a background check and verification process.</li>
                            <li>Profile Reviews – Get to know your swap through detailed profile reviews. </li>
                            <li>24/7 Contact Support – Users will be provided a 24/7 hotline and can also contact CommonSwap Support via email during their swap to report any issues or problems.</li>
                            <li>Message Inquiry – We provide a platform to reach out to potential swaps and learn more about them or ask any questions.</li>
                        </ul>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Trust;
