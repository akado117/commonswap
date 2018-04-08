import React, { Component } from 'react';
import Footer from '../components/Footer';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { defaultImageUrls } from '../../../imports/lib/Constants';
import LoggedInContent from '../components/homeComps/LoggedInContent';
import HomeDefaultContent from '../components/homeComps/HomeDefaultContent';
import SignupModalButton from '../components/SignupModalButton';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const styles = {
    customWidth: {
        width: 300,
    },
};


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

    // getValueFunc = (key, value) => {
    //     if (this.props.getValueFunc) {
    //         this.props.getValueFunc('profile', key, value);
    //     }
    // }

    render() {
        return (
            <div className="home-container">
                <header className="head-mobile video-parent">
                    <div className="video-parent video-text-container">
                        <div className="mask"></div>
                        <ReactCSSTransitionGroup
                            transitionName="example"
                            transitionAppear={true}
                            transitionAppearTimeout={1250}
                            transitionEnter={false}
                            transitionLeave={false}
                        >
                            <h3 className="center-align header-desc">We connect travelers from different cities to exchange living accommodations</h3>
                        </ReactCSSTransitionGroup>
                    </div>
                    {/* <button className="play-button" onClick={this.togglePlaying}>
                        <i className={`fa fa-${this.state.playing ? 'pause' : 'play'} fa-1x`} aria-hidden="true" />
                    </button> */}
                    {/*<button className="mute-button" onClick={this.toggleMuted}>*/}
                    {/*<i className={`fa fa-volume-${this.state.muted ? 'up' : 'off'} fa-1x`} aria-hidden="true" />*/}
                    {/*</button>*/}
                    <video playsInline autoPlay loop muted={this.state.muted} poster={defaultImageUrls.videos.homeVideoPoster} preload="auto" width="100%" height="auto" id="home-video" >
                        <source src={defaultImageUrls.videos.homeVideo} type="video/mp4" />
                    </video>
                </header>
                <HomeDefaultContent user={this.props.user.userId} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return {
        user,
    };
}

export default connect(mapStateToProps)(Home);
