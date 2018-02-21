import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
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
            <div className="">
                <div className="community-container">
                    <div className="container" style={{ marginTop: '35px', height: '90%', minHeight: '500px' }}>
                        <div className="row">
                            <h2 className="faq-title">Community Values</h2>
                        </div>
                        <div className="row">
                            <div className="col 12 qa-block">
                                <h4><strong>Be Considerate and Respect Others</strong></h4>
                                <p>Since CommonSwap requires a direct exchange of living accommodations between our users, we prevent
                                    the displacement of locals by not having large corporations or investors purchase large amounts of local residences for the sole intention
                                    of rental property.
                            </p>
                            </div>
                            <div className="col 12 qa-block">
                                <h4><strong>Communication is Key</strong></h4>
                                <p>Since CommonSwap requires a direct exchange of living accommodations between our users, we prevent
                                    the displacement of locals by not having large corporations or investors purchase large amounts of local residences for the sole intention
                                    of rental property.
                            </p>
                            </div>
                        </div>
                        <div className="col 12 qa-block">
                            <h4><strong>“Mi Casa Su Casa”</strong></h4>
                            <p>Make sure the bedroom, living area, bed sheets, pillow cases, etc. are clean. Check in with your swap to make sure he/she has arrived
                                safely. Provide recommendations and any relevent information about your city to your swap.
                            </p>
                        </div>
                        <div className="col 12 qa-block">
                            <h4><strong>Be Fair and Accountable</strong></h4>
                            <p>Work together and be fair in resolving issues. If needed, communicate any issues to CommonSwap Support.
                            </p>
                        </div>
                        <div className="col 12 qa-block">
                            <h4><strong>Be Responsible</strong></h4>
                            <p>Use good judgement and remove yourself from situations that can cause you or your swap's place harm.
                            </p>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Community;
