import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import Footer from '../components/Footer';
import Founders from '../components/about/Founders';
import AboutUs from '../components/about/AboutUs';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from '../../../node_modules/react-swipeable-views';
import Testimonials from '../components/Testimonials';

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

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: parseInt(props.params.index, 10) || 0,
        };
    }

    handleChange = (newValue, oldVal, { reason }) => {
        if (reason !== 'focus') {
            this.setState({
                slideIndex: newValue,
            });
        }
    };

    select = (index) => this.setState({ selectedIndex: index });

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
            <Tab className="nav-label" label={<span className="tab-text">Our Purpose</span>} value={0} style={tabStyle} />
            <Tab className="nav-label" label={<span className="tab-text">Co-Founders</span>} value={1} style={tabStyle} />
            <Tab className="nav-label" label={<span className="tab-text">Testimonials</span>} value={2} style={tabStyle} />
        </Tabs>
    )

    render() {
        return (
            <div className="about-container">
                <div className="row container" style={{ marginTop: '35px' }}>
                    <div className="row">
                        <h2 className="about-title">About</h2>
                    </div>
                    <div className="row">
                        {this.getTabs()}
                    </div>
                    <SwipeableViews
                        index={this.state.slideIndex}
                        onChangeIndex={this.handleChange}
                    >
                        <div style={styles.slide}>
                            <div className="col 12 purpose-statement">
                                <h4>“We exist to foster a new way of traveling. Our goal is to
                                connect a community of adventure seekers founded on the
                                values of respect and integrity to experience more of the
                                world. We are firm believers that traveling opens up the
                                mind and heart - it provides us the opportunity to
                                experience, understand, and learn to respect and appreciate
                                the life of another person, culture, or country. With each
                                opportunity to experience life through the lens of others, we
                                become more compassionate, empathetic, and respectful of
                                each other.”</h4>
                            </div>
                        </div>
                        <div style={styles.slide}>
                            <Founders />
                        </div>
                        <div style={styles.slide}>
                            <Testimonials />
                        </div>
                    </SwipeableViews>
                </div>
                <Footer />
            </div>
        );
    }
}

export default About;
