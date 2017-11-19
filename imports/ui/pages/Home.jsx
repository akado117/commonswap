import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { render } from 'react-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isTop: true
        };
    }

    componentDidMount() {
        document.addEventListener('scroll', () => {
          this.setState({ isTop: window.scrollY < 100 })
        });
      }

    render() {
        return (
            <div className="home-container">
                <Navbar className={this.state.isTop ? 'invisible' : 'visible'} ></Navbar>
                <header className="head-mobile">
                    <div className="video-container">
                        <video src="https://s3.us-east-2.amazonaws.com/com-swap-images-dev/home_video/csVideo2.mp4" poster="" autoPlay loop muted>
                            <source src="" />
                        </video>
                        <div className="col s12 center-align">
                            <div className="header-container overlay-desc">
                                <h1 className="header-title"> CommonSwap <br />
                                    <strong>Experience More</strong>
                                </h1>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="col s12 register-image">
                    <div className="row">
                        <div className="col s6">
                            <div className="row">
                                <div className="col s6">
                                    <img src="" alt="" />
                                </div>
                            </div>
                            <div className="row center-align">
                                <h2 className="how-desc-title">Register</h2>
                                <p className="col s12 l9 offset-s1 how-desc">Join our community by signing up and listing
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
                </div>
                <Footer />
            </div>
        );
    }
}

export default Home;
