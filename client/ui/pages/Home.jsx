import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import ReactPlayer from 'react-player';
import Footer from '../components/Footer';
import { render } from 'react-dom';
import { defaultImageUrls } from '../../../imports/lib/Constants';

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
                                {/* <h1 className={`header-title ${this.state.muted ? '' : 'fade-out'}`}> CommonSwap <br />
                                    <strong>Experience More</strong>
                                </h1> */}
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
                </div>
                <Footer />
            </div>
        );
    }
}

export default Home;
