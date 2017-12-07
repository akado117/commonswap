import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import ReactPlayer from 'react-player';
import Footer from '../components/Footer';
import { render } from 'react-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            muted: true,
        };
    }

    toggleMuted = () => this.setState({ muted: !this.state.muted });

    render() {
        return (
            <div className="home-container">
                <header className="head-mobile video-parent">
                    <button className="mute-button" onClick={this.toggleMuted}>
                        <i className={`fa fa-volume-${this.state.muted ? 'up' : 'off'} fa-1x`} aria-hidden="true" />
                    </button>
                    <div className="video-container">
                        <ReactPlayer url="https://www.youtube.com/embed/0gL-1YksKIE?ecver" playing loop muted={this.state.muted} width="100%" height="100%" />
                        <div className="col s12 center-align">
                            <div className="header-container overlay-desc">
                                <h1 className="header-title"> CommonSwap <br />
                                    <strong>Experience More</strong>
                                </h1>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="col s12" className="intro">
                    <div className="row">
                        <div className="col s12 center-align">
                            <h2 className="why-title">WHY COMMONSWAP</h2>
                        </div>
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
                <div className="col s12 purpose">
                    <div className="row">
                        <div className="col s12 l6 center-align">
                            <h2 className="col s12 purpose-title">OUR PURPOSE</h2>
                            <p className="col s12 center-align purpose-desc" style={{ fontSize: '2.0rem !important' }}>We exist to foster a new way of traveling. Our goal is to connect a community of adventure seekers founded on the values of respect and integrity to experience more of the world. We are firm believers that traveling opens up the mind and heart - it provides us the opportunity to experience, understand, and learn to respect and appreciate the life of another person, culture, or country. With each opportunity to experience life through the lens of others, we become more compassionate, empathetic, and respectful of each other.</p>
                        </div>
                        <div className="col s12 l6 how-video">
                            {/* <ReactPlayer url="https://s3.us-east-2.amazonaws.com/com-swap-prod/static/video/CommonSwap+Demo+Video.mp4" playing muted={this.state.muted} width="100%" height="100%" /> */}
                            <video poster="https://s3.us-east-2.amazonaws.com/com-swap-prod/static/video/Screen+Shot+2017-12-06+at+8.01.51+PM.png" src="https://s3.us-east-2.amazonaws.com/com-swap-prod/static/video/CommonSwap+Demo+Video.mp4" type="video/mp4" preload="auto" controls width="100%" height="100%"></video>
                        </div>
                    </div>
                </div>
                <div className="col s12 how-title">
                    <div className="row">
                        <div className="col s12 center-align">
                            <h2 className="how-title">HOW IT WORKS</h2>
                            <p className="col l8 offset-l2 center-align how-desc2">CommonSwap connects travelers with similar interests from different cities to exchange living accommodations in order to reduce travel expenses.</p>
                        </div>
                    </div>
                </div>
                <div className="col s12">
                    <div className="row">
                        <div className="col s12 l4 center-align">
                            <div className="s12">
                                <img className="how-img" src="https://s3.us-east-2.amazonaws.com/com-swap-prod/static/joinHome.png" alt="joinHome" />
                            </div>
                            <p className="how-text col s12"><strong>Join Our Community of Adventure Seekers</strong><br />We aim to create a community founded on the values of respect and integrity. Create your profile, list your space, and tell us a little bit about yourself. Each user will go through a background check and verification process to ensure the safety of our community.
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
                <div className="testimonial-container">
                    <div className="container pad-top">
                        <div className="row">
                            <div className="col s12 center-align">
                                <h2 className="how-title">TESTIMONIALS</h2>
                            </div>
                            <div className="col s12 l4">
                                <img className="grow test-img" src="https://s3.us-east-2.amazonaws.com/com-swap-prod/static/Testimonials/Testimonial2.JPG" alt="" />
                            </div>
                            <div className="col s12 l4">
                                <img className="grow test-img" src="https://s3.us-east-2.amazonaws.com/com-swap-prod/static/Testimonials/Testimonial1.JPG" alt="" />
                            </div>
                            <div className="col s12 l4">
                                <img className="grow test-img" src="https://s3.us-east-2.amazonaws.com/com-swap-prod/static/Testimonials/Testimonial3.JPG" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="col s12 register-image">
                    <div className="row">
                        <div className="col s6">
                            <div className="row">
                                <div className="col s6">
                                    <img src="" alt="" />
                                </div>
                            </div>
                            <div className="row center-align">
                                <h2 className="how-desc-title">Register</h2>
                                <p className="col s11 offset-s1 how-desc">Join our community by signing up and listing
                                    your space! Include high quality photos and information about your interests.</p>
                            </div>
                        </div>
                        <div className="col s6">
                            <div className=""></div>
                        </div>
                    </div>
                </div>
                <div className="col s12 book-image">
                    <div className="row">
                        <div className="offset-s4 offset-l6 col s8 l6">
                            <div className="row center-align">
                                <h2 className="col s12 how-desc-title">Book</h2>
                                <p className="col l9 s12 offset-l1 offset-s0 how-desc">Enter your travel dates and desired location.
                                    CommonSwap will automatically match you with another traveler looking to visit your
                                    city during the same period, all for only $50.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col s12 travel-image">
                    <div className="row">
                        <div className="col l6 s7">
                            <div className="row center-align">
                                <h2 className="col s12 how-desc-title">Travel</h2>
                                <p className="col s12 l9 offset-l1 offset-s0 how-desc">You're all set! Enjoy your getaway and
                                    experience everything the city has to offer. Feel free to communicate with your Swap
                                    to exchange recommendations.</p>
                            </div>
                        </div>
                    </div>
                </div> */}
                <Footer />
            </div>
        );
    }
}

export default Home;
