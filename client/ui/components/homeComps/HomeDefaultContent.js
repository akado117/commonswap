import React from 'react';
import PropTypes from 'prop-types';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { defaultImageUrls } from '../../../../imports/lib/Constants';

function HomeDefaultContent() {
    return (
        <div>
            <div className="col s12 purpose">
                <div className="row">
                    <div className="col s12 l6 center-align">
                        <p className="col s12 center-align purpose-desc" style={{ fontSize: '2.0rem !important' }}>We connect like-minded travelers from different cities to exchange living accommodations to reduce travel expenses</p>
                    </div>
                    <div className="col s12 l6 how-video">
                        {/* <ReactPlayer url="https://s3.us-east-2.amazonaws.com/com-swap-prod/static/video/CommonSwap+Demo+Video.mp4" playing muted={this.state.muted} width="100%" height="100%" /> */}
                        <video playsInline poster={defaultImageUrls.videos.whoAreWePoster} src={defaultImageUrls.videos.whoAreWe} type="video/mp4" preload="auto" controls width="100%" height="100%" />
                    </div>
                </div>
            </div>
            <div className="col s12 how-title">
                <div className="row">
                    <div className="col s12 center-align">
                        <h2 className="how-title">HOW IT WORKS</h2>
                    </div>
                </div>
            </div>
            <div className="col s12">
                <div className="row">
                    <div className="col s12 l4 center-align">
                        <div className="s12">
                            <img className="how-img" src={defaultImageUrls.homeAssets.joinHome} alt="joinHome" />
                        </div>
                        <p className="how-text col s12">
                            <strong>Join Our Community of Adventure Seekers</strong>
                            <br />
                            Create your profile, list your space, and tell us a little bit about yourself. Each user will go through a background check and verification process to ensure the safety of our community.
                        </p>
                    </div>
                    <div className="col s12 l4 center-align">
                        <div className="s12">
                            <img className="how-img" src={defaultImageUrls.homeAssets.bookHome} alt="bookHome" />
                        </div>
                        <p className="how-text col s12"><strong>Book Your Destination</strong><br />Select your travel destinations and travel dates. Browse profiles and select who you want to swap with based on your preferences such as similar profession, alma mater, interests, or amenities</p>
                    </div>
                    <div className="col s12 l4 center-align">
                        <div className="s12">
                            <img className="how-img" src={defaultImageUrls.homeAssets.travelHome} alt="travelHome2" />
                        </div>
                        <p className="how-text col s12"><strong>Travel and Explore</strong><br />Communicate directly with your swap to discuss general ground rules and logistics. Since our swaps are driven by the commonalities of our users, your own personal tour guide is just a message away. Want to know the best Mexican restaurant in town? Ask your swap.</p>
                    </div>
                </div>
            </div>
            <div className="col s12 how-title">
                <div className="row">
                    <div className="col s12 center-align">
                        <h2 className="how-title">WHY COMMONSWAP?</h2>
                    </div>
                </div>
            </div>
            {/* <div className="col s12">
             <div className="row">
             <div className="col l4 s12 center-align home-icon">
             <img src="https://s3.us-east-2.amazonaws.com/com-swap-prod/static/moneyHome.png" alt="moneyHome" />
             <h5>Money Saved</h5>
             </div>
             <div className="col l4 s12 center-align home-icon">
             <img src="https://s3.us-east-2.amazonaws.com/com-swap-prod/static/planeHome.png" alt="planeHome" />
             <h5>Experience More</h5>
             </div>
             <div className="col l4 s12 center-align home-icon">
             <img src="https://s3.us-east-2.amazonaws.com/com-swap-prod/static/connectHome.png" alt="connectHome" />
             <h5>Connect with Others</h5>
             </div>
             </div>
             </div> */}
            <div className="col s12">
                <div className="row">
                    <div className="col s12 center-align">
                        <div className="col s12 l4">
                            <div className="col s12 center-align home-icon">
                                <div className="col s12">
                                    <img src={defaultImageUrls.homeAssets.moneyhome} alt="moneyHome" />
                                </div>
                                <br />
                                <div className="col s12">
                                    <h5>Money Saved</h5>
                                </div>
                            </div>
                            <div className="s12">
                                <img className="test-img" src={defaultImageUrls.homeAssets.alysa} alt="testimonial" />
                            </div>
                            <p className="how-text col s12">
                                <strong>Perry and Alyssa</strong>
                                <br />
                                <strong>(Washington D.C.)</strong>
                                <br />
                                We recently used CommonSwap for our weekend trip to New York. Using CommonSwap made it easy and affordable to travel to NYC without the expenses of overpriced hotels and Airbnbs. We were able to spend the money saved on other things during our trip.
                            </p>
                            <div className="col s12 center-align quote-icon">
                                <div className="col s12">
                                    <img src={defaultImageUrls.homeAssets.quotes} alt="quotes" />
                                </div>
                            </div>
                        </div>
                        <div className="col s12 l4">
                            <div className="col s12 center-align home-icon">
                                <img src={defaultImageUrls.homeAssets.planeHome} alt="planeHome" />
                                <h5>Experience More</h5>
                            </div>
                            <div className="s12">
                                <img className="test-img" src={defaultImageUrls.homeAssets.amjed} alt="testimonial" />
                            </div>
                            <p className="how-text col s12">
                                <strong>Amjed</strong>
                                <br />
                                <strong>(New York, NY)</strong>
                                <br />
                                I really enjoyed my experience with CommonSwap. The opportunity to meet people who shared the same living space with the person I was swapping with was a huge positive about my experience. I would be more than happy to use it again and recommend it to a friend.
                            </p>
                            <div className="col s12 center-align quote-icon">
                                <div className="col s12">
                                    <img src={defaultImageUrls.homeAssets.quotes} alt="quotes" />
                                </div>
                            </div>
                        </div>
                        <div className="col s12 l4">
                            <div className="col s12 center-align home-icon">
                                <img src={defaultImageUrls.homeAssets.conHome} alt="connectHome" />
                                <h5>Connect with Others</h5>
                            </div>
                            <div className="s12">
                                <img className="test-img" src={defaultImageUrls.homeAssets.bolai} alt="testimonial" />
                            </div>
                            <p className="how-text col s12">
                                <strong>Bolaji</strong>
                                <br />
                                <strong>(Columbus, OH)</strong>
                                <br />
                                My experience with CommonSwap was great. My swap’s room was tidy and the apartment had everything I needed for my trip. My swap was very helpful in directing me to the best attractions and sites based on my interests. CommonSwap allows me to take more trips during the year than normal with the money saved.
                            </p>
                            <div className="col s12 center-align">
                                <div className="col s12">
                                    <img src={defaultImageUrls.homeAssets.quotes} alt="quotes" />
                                </div>
                            </div>
                        </div>
                        {/* <div className="col s4">
                         <img src="https://s3.us-east-2.amazonaws.com/cslistingphotos/home/quotes.png" alt="quotes" />
                         </div>
                         <div className="col s4">
                         <img src="https://s3.us-east-2.amazonaws.com/cslistingphotos/home/quotes.png" alt="quotes" />
                         </div>
                         <div className="col s4">
                         <img src="https://s3.us-east-2.amazonaws.com/cslistingphotos/home/quotes.png" alt="quotes" />
                         </div> */}
                    </div>
                </div>
            </div>
            <div className="col s12 how-title">
                <div className="row">
                    <div className="col s12 center-align">
                        <h2 className="how-title">JOIN OUR COMMUNITY</h2>
                        <p className="how-desc">We are currently accepting beta users for the 2018 calendar year.</p>
                    </div>
                </div>
            </div>
            <div className="col s12 signin">
                <div className="row">
                    <div className="col s12 l6 center-align sign-up">
                        <RaisedButton
                            href="https://github.com/callemall/material-ui"
                            target="_blank"
                            label="Sign up with Facebook"
                            backgroundColor="#3B5998"
                            labelColor="white"
                            className="sign-button"
                            icon={<FontIcon className="fa fa-facebook" />}
                        />
                    </div>
                    <div className="col s12 l6 center-align sign-up-mail">
                        <RaisedButton
                            label="Sign up with Email"
                            containerElement="label"
                            icon={<FontIcon className="fa fa-envelope-open-o" />}
                            className="sign-button"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeDefaultContent;