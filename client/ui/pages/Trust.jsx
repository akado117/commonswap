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
                <div className="container" style={{ marginTop: '35px', height: '90%', minHeight: '500px' }}>
                    <div className="row">
                        <h2 className="faq-title">Trust &amp; Safety</h2>
                    </div>
                    <div className="row">
                        <div className="col 12 qa-block">
                            <h4><strong>User Verification</strong></h4>
                            <p>CommonSwap performs a general user verification screening and requires all beta users to be Facebook verified.
                            </p>
                        </div>
                        <div className="col 12 qa-block">
                            <h4><strong>24/7 Contact Support</strong></h4>
                            <p>Users will be provided a 24/7 hotline and can also contact CommonSwap Support via email during their swap to report any issues or problems.
                            </p>
                        </div>
                    </div>
                    <div className="col 12 qa-block">
                        <h4><strong>Message Inquiry</strong></h4>
                        <p>Each of our user will go through a background check and verification process
                        </p>
                    </div>
                    <div className="col 12 qa-block">
                        <h4><strong>Community Values</strong></h4>
                        <p>CommonSwap has outlined our standards and expectations in our Community Values section and any violators will be banned from our
                            community.
                        </p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Trust;
