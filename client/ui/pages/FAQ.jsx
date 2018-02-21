import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Footer from '../components/Footer';
import Founders from '../components/about/Founders';
import AboutUs from '../components/about/AboutUs';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from '../../../node_modules/react-swipeable-views';

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    slide: {
        padding: "15px 10px",
    },
};

const tabStyle = {
    backgroundColor: 'white',
    color: 'black',
}

class FAQ extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: props.params.index || 0,
        };
    }

    handleChange = (newValue, oldVal, { reason }) => {
        if (reason !== 'focus') {
            this.setState({
                slideIndex: newValue,
            });
        }
    };


    select = index => this.setState({ selectedIndex: index });

    getWhatItIs = () => {
        return (
            <div className="place-images row">
                <div className="col s12 l6">
                    <ImageCarousel images={remappedImages} extraProps={{ showBullets: true }} />
                </div>
                <div className="col s12 l6">
                    <div className="place-section z-depth-2">
                        <AppBar
                            title={<span>Basic Information</span>}
                            showMenuIconButton={false}
                            style={{ marginBottom: '10px', zIndex: 0 }}
                        />
                        <div className="row reduced-row-margin">
                            <div className="col s4" style={{ textAlign: 'center' }}>
                                <p>Entire Apt</p>
                                <p><FontIcon className="material-icons large">home</FontIcon></p>
                            </div>
                            <div className="col s4" style={{ textAlign: 'center' }}>
                                <p>{numOfGuests} guests</p>
                                <p><FontIcon className="material-icons large">people_outline</FontIcon></p>
                            </div>
                            <div className="col s4" style={{ textAlign: 'center' }}>
                                <p>{bedrooms} Bedroom</p>
                                <p><FontIcon className="material-icons large">hotel</FontIcon></p>
                            </div>
                        </div>
                        <div className="col s12">
                            <h6>Amenities: </h6>
                        </div>
                        {amenitiesElements}
                    </div>
                    <div className="space-top">
                        <div className="place-section z-depth-2 ">
                            <AppBar
                                title={<span>Description</span>}
                                showMenuIconButton={false}
                                style={{ marginBottom: '10px', zIndex: 0 }}
                            />
                            <div className="col s12">
                                <p>{detailedDesc}</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-top">
                        <div className="place-section z-depth-2">
                            <AppBar
                                title={<span>Recommendations</span>}
                                showMenuIconButton={false}
                                style={{ marginBottom: '10px', zIndex: 0 }}
                            />
                            <div className="col s12">
                                <p>{recommendations}</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-top">
                        <div className="place-section z-depth-2">
                            <AppBar
                                title={<span>General Courtesy Guidelines</span>}
                                showMenuIconButton={false}
                                style={{ marginBottom: '10px', zIndex: 0 }}
                            />
                            <div className="col s12">
                                <p>{generalNotes}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    getTabs = () => (
        <Tabs
            onChange={(index, e) => this.handleChange(index, this.state.slideIndex, {
                reason: 'click',
            })}
            value={this.state.slideIndex}
            initialSelectedIndex={0}
            style={{ backgroundColor: 'transparent' }}
            className="tab-row"
        >
            <Tab className="nav-label" label={<span className="tab-text">What it is</span>} value={0} style={tabStyle} />
            <Tab className="nav-label" label={<span className="tab-text">Cost</span>} value={1} style={tabStyle} />
            <Tab className="nav-label" label={<span className="tab-text">Safety</span>} value={2} style={tabStyle} />
            <Tab className="nav-label" label={<span className="tab-text">Problems</span>} value={3} style={tabStyle} />
        </Tabs>
    )

    render() {
        return (
            <div className="faq-container">
                <div className="container" style={{ marginTop: '35px', height: '90%', minHeight: '500px' }}>
                    <div className="row">
                        <h2 className="faq-title">FAQ</h2>
                    </div>
                    <div className="row">
                        {this.getTabs()}
                    </div>
                    <SwipeableViews
                        index={this.state.slideIndex}
                        onChangeIndex={this.handleChange}
                    >
                        <div style={styles.slide}>
                            <div className="col 12 qa-block">
                                <h4><strong>How does CommonSwap work?</strong></h4>
                                <p>Sign-up, create your profile, and list your space. CommonSwap will connect you with other travelers who are looking to go to your city.
                                            Browse profiles and request to swap with another user based on your interests, preferred living accommodations, and travel location/-
                                            dates preferences. Once each party confirms, exchange places to stay and experience each other’s city. Users are encouraged to provide
                                            each other recommendations based on your interests to truly capture a local, authentic experience.
                                </p>
                                <p><strong className="emphasize">Example: </strong>Ryan and Sarah from Chicago, IL swap places to stay with Mike and Katie from Los Angeles, CA during Labor Day weekend.
                                            Connecting through their love of hiking, Mike and Katie were able to recommend to Ryan and Sarah the best trails in their area.
                                </p>
                            </div>
                            <div className="col 12 qa-block">
                                <h4><strong> How is CommonSwap different from Airbnb?</strong></h4>
                                <p><strong className="emphasize">Displacement of Locals: </strong>Since CommonSwap requires a direct exchange of living accommodations between our users, we prevent
                                        the displacement of locals by not having large corporations or investors purchase large amounts of local residences for the sole intention
                                        of rental property.
                                </p>
                                <p><strong className="emphasize">Money Saved: </strong>CommonSwap is a direct exchange of living accommodations between our users allowing each party to save on travel
                                        expenses by not having to book an Airbnb or hotel.
                                </p>
                                <p><strong className="emphasize">Assurance: </strong>Once a swap has been confirmed, our users have full assurance that they will benefit from their vacant residency while they
                                        travel. Though we understand travelers can always put their place up on Airbnb during their trip, the occurrence of having someone rent
                                        out your place is not always guaranteed.
                                </p>
                                <p><strong className="emphasize">Accountability: </strong>CommonSwap fosters a “Mi Casa Su Casa” culture. Since each party will be staying at each other’s residence, there is a
                                        natural incentive to treat each other’s place with respect. In addition, we encourage our users to get to know each other to create a more
                                        compatible swap. With Airbnb, there is the potential that complete strangers will be renting out your place. They are also more prone to
                                        not treat it with respect due to the cleaning fee they have to pay as part of the Airbnb service.
                                </p>
                                <p><strong className="emphasize">Local Experience: </strong>Users are able to provide their swap the best recommendations about their city tailored to their interests.
                                </p>
                            </div>
                            <div className="col s12 qa-block">
                                <h4><strong>What makes a compatible swap?</strong></h4>
                                <p>We understand that each individual is different and have their own unique travel preferences. CommonSwap allows our users to browse
                                each other’s profiles and reach out to one another for any questions prior to their trip to find the most compatible swap. Swaps could be
                                based off similar interests, living accommodations, alma mater, occupation/job industry, location, mutual friends, etc.
                                </p>
                            </div>
                            <div className="col s12 qa-block">
                                <h4><strong>How do I access my swap's place?</strong></h4>
                                <p>It is up to the users to communicate these instructions to each other. CommonSwap suggests using a secure key-padlock, utilizing a
                                doorman (if applicable), or leaving the key with roommates or friends.
                                </p>
                            </div>
                        </div>
                        <div style={styles.slide}>
                            <div className="col s12 qa-block">
                                <h4><strong>Is CommonSwap free?</strong></h4>
                                <p>CommonSwap will currently be a free service during our beta period (remainder of 2018). All that we ask from our early adopters is to
                                provide us feedback and tell your friends about us!
                                </p>
                            </div>
                        </div>
                        <div style={styles.slide}>
                            <div className="col 12 qa-block">
                                <h4><strong>What if something goes wrong during my swap?</strong></h4>
                                <p>Please communicate any issues to your swap. If needed, contact CommonSwap Support for any assistance using the contact information
                                    listed above. We expect our community to use good judgment, be considerate/respectful, and be fair/accountable - refer to our
                                    Community Values section for details.
                                </p>
                            </div>
                        </div>
                        <div style={styles.slide}>
                            <div className="col 12 qa-block">
                                <h4><strong>How do I provide feedback or report any problems/issues?</strong></h4>
                                <p>Please email us at info@commonswap.com</p>
                            </div>
                        </div>
                    </SwipeableViews>
                </div>
                <Footer className="hide-on-med-and-down" />
            </div>
        );
    }
}

export default FAQ;
