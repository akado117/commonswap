import React, { Component } from 'react';

class Trust extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div className="col 12 qa-block">
                    <h4><strong>What if something goes wrong during my swap?</strong></h4>
                    <p>Please communicate any issues to your swap. If needed, contact CommonSwap Support for any assistance using the contact information
                        listed above. We expect our community to use good judgment, be considerate/respectful, and be fair/accountable - refer to our
                        Community Values section for details.
                    </p>
                </div>
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
        );
    }
}

export default Trust;
