import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import ReactPlayer from 'react-player';
import Footer from '../components/Footer';
import { render } from 'react-dom';
import { defaultImageUrls } from '../../../imports/lib/Constants';
import RaisedButton from 'material-ui/RaisedButton';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            muted: true,
            playing: true,
        };
    }

    toggleMuted = () => this.setState({ muted: !this.state.muted });

    togglePlaying = () => {
        const video = document.getElementById('home-video');
        if (video) {
            const junk = this.state.playing ? video.pause() : video.play();
        }
        this.setState({ playing: !this.state.playing });
    };

    render() {
        return (
            <div className="home-container">
                <header className="head-mobile video-parent">
                    <button className="play-button" onClick={this.togglePlaying}>
                        <i className={`fa fa-${this.state.playing ? 'pause' : 'play'} fa-1x`} aria-hidden="true" />
                    </button>
                    <button className="mute-button" onClick={this.toggleMuted}>
                        <i className={`fa fa-volume-${this.state.muted ? 'up' : 'off'} fa-1x`} aria-hidden="true" />
                    </button>
                    <div className="home-video-container">
                        <video playsInline autoPlay loop muted={this.state.muted} poster={defaultImageUrls.videos.homeVideoPoster} preload="auto" width="100%" height="auto" id="home-video" >
                            <source src={defaultImageUrls.videos.homeVideo} type="video/mp4" />
                        </video>
                        <div className="col s12 center-align">
                            <div className="header-container overlay-desc">
                                <h1 className={`header-title ${this.state.muted ? '' : 'fade-out'}`}> <br />
                                    <strong>Experience More</strong>
                                </h1>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="col s12 purpose">
                    <div className="row">
                        <div className="col s12 l6 center-align">
                            <p className="col s12 center-align purpose-desc" style={{ fontSize: '2.0rem !important' }}>We connect like-minded travelers from different cities to exchange living accommodations to reduce travel expenses</p>
                        </div>
                        <div className="col s12 l6 how-video">
                            {/* <ReactPlayer url="https://s3.us-east-2.amazonaws.com/com-swap-prod/static/video/CommonSwap+Demo+Video.mp4" playing muted={this.state.muted} width="100%" height="100%" /> */}
                            <video playsInline muted poster={defaultImageUrls.videos.whoAreWePoster} src={defaultImageUrls.videos.whoAreWe} type="video/mp4" preload="auto" controls width="100%" height="100%" />
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
                                <img className="how-img" src="https://s3.us-east-2.amazonaws.com/com-swap-prod/static/joinHome.png" alt="joinHome" />
                            </div>
                            <p className="how-text col s12">
                                <strong>Join Our Community of Adventure Seekers</strong>
                                <br />
                                Create your profile, list your space, and tell us a little bit about yourself. Each user will go through a background check and verification process to ensure the safety of our community.
                            </p>
                        </div>
                        <div className="col s12 l4 center-align">
                            <div className="s12">
                                <img className="how-img" src="https://s3.us-east-2.amazonaws.com/com-swap-prod/static/bookHome.png" alt="bookHome" />
                            </div>
                            <p className="how-text col s12"><strong>Book Your Destination</strong><br />Select your travel destinations and travel dates. Browse profiles and select who you want to swap with based on your preferences such as similar profession, alma mater, interests, or amenities</p>
                        </div>
                        <div className="col s12 l4 center-align">
                            <div className="s12">
                                <img className="how-img" src="https://s3.us-east-2.amazonaws.com/com-swap-prod/static/travelHome2.png" alt="travelHome2" />
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
                <div className="col s12">
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
                </div>
                <div className="col s12">
                    <div className="row">
                        <div className="col s12 center-align">
                            <div className="col s4">
                                <div className="s12">
                                    <img className="test-img" src="https://s3.us-east-2.amazonaws.com/cslistingphotos/home/alyssa.png" alt="testimonial" />
                                </div>
                                <p className="how-text col s12">
                                    <strong>Perry and Alyssa</strong>
                                    <br />
                                    <strong>(Washington D.C.)</strong>
                                    <br />
                                    We recently used CommonSwap for our weekend trip to New York. Using CommonSwap made it easy and affordable to travel to NYC without the expenses of overpriced hotels and Airbnbs. We were able to spend the money saved on other things during our trip.
                                    </p>
                            </div>
                            <div className="col s4">
                                <div className="s12">
                                    <img className="test-img" src="https://s3.us-east-2.amazonaws.com/cslistingphotos/home/amjed.png" alt="testimonial" />
                                </div>
                                <p className="how-text col s12">
                                    <strong>Amjed</strong>
                                    <br />
                                    <strong>(New York, NY)</strong>
                                    <br />
                                    I really enjoyed my experience with CommonSwap. The opportunity to meet people who shared the same living space with the person I was swapping with was a huge positive about my experience. I would be more than happy to use it again and recommend it to a friend.
                            </p>
                            </div>
                            <div className="col s4">
                                <div className="s12">
                                    <img className="test-img" src="https://s3.us-east-2.amazonaws.com/cslistingphotos/home/bolaji.png" alt="testimonial" />
                                </div>
                                <p className="how-text col s12">
                                    <strong>Bolaji</strong>
                                    <br />
                                    <strong>(Columbus, OH)</strong>
                                    <br />
                                    My experience with CommonSwap was great. My swap’s room was tidy and the apartment had everything I needed for my trip. My swap was very helpful in directing me to the best attractions and sites based on my interests. CommonSwap allows me to take more trips during the year than normal with the money saved.
                            </p>
                            </div>
                            <div className="col s4">
                                <img src="https://s3.us-east-2.amazonaws.com/cslistingphotos/home/quotes.png" alt="quotes" />
                            </div>
                            <div className="col s4">
                                <img src="https://s3.us-east-2.amazonaws.com/cslistingphotos/home/quotes.png" alt="quotes" />
                            </div>
                            <div className="col s4">
                                <img src="https://s3.us-east-2.amazonaws.com/cslistingphotos/home/quotes.png" alt="quotes" />
                            </div>
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
                        <div className="col s6 center-align">
                            <RaisedButton
                                href="https://github.com/callemall/material-ui"
                                target="_blank"
                                label="Sign up with Facebook"
                                primary={true}
                                icon={<FontIcon className="fa fa-facebook" />}
                            />
                        </div>
                        <div className="col s6 center-align">
                            <RaisedButton
                                label="Sign up with Email"
                                containerElement="label"
                                icon={<FontIcon className="fa fa-envelope-open-o" />}
                            />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default Home;
