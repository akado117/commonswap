import React, { Component } from 'react';
import Footer from '../components/Footer';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { defaultImageUrls } from '../../../imports/lib/Constants';
import LoggedInContent from '../components/homeComps/LoggedInContent';
import HomeDefaultContent from '../components/homeComps/HomeDefaultContent';

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
        // const getValueFunc = this.getValueFunc;
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
                    </div>
                </header>
                {/*{this.props.user.userId ? <LoggedInContent /> : <HomeDefaultContent />}*/}
                <HomeDefaultContent />
                <Footer />
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
