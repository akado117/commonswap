import React, { PropTypes } from 'react';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import SimpleModalSlideshow from 'react-simple-modal-slideshow';
//import SlideShow from 'react-image-slideshow';
import InfiniteCalendar, { Calendar, defaultMultipleDateInterpolation, withMultipleDates } from 'react-infinite-calendar';
import '../../../node_modules/react-infinite-calendar/styles.css';
import Navbar from '../components/Navbar';
import Select from 'react-select';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import '../../../node_modules/react-select/dist/react-select.css';
import Footer from '../components/Footer';
//import StarRatings from '../../../node_modules/react-star-ratings';

const styles = {
    button: { 
        margin: 12,
    }
};

// const STATES = require('../../../node_modules/react-select/examples/src/data/states');
const CITIES = require('../../../node_modules/react-select/examples/src/data/states');


var today = new Date();
const MultipleDatesCalendar = withMultipleDates(Calendar);

function logChange(val) {
    console.log("Selected: " + JSON.stringify(val));
}

class Planner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            controlledDate: null,
            imgsData: [
                {
                    url: 'http://stretchflex.net/photos/apartment.jpeg'
                },
                {
                    url: 'http://stretchflex.net/photos/apartment2.jpeg'
                },
                {
                    url: 'http://stretchflex.net/photos/apartment3.jpeg'
                }
            ],
            cities: []
        };
        var options = CITIES[this.state.country];
    }

    // handleSlideshowOpen(index) {
    //     this.refs.SlideShow.handleModalOpen(index);
    // };

    changeRating(newRating) {
        this.setState({
            rating: newRating
        });
    }

    componentDidMount = () => {
        //this.handleSlideshowOpen(0);
        console.log('CITIES');
        console.log(CITIES);
    }

    render() {
        return (
            <div>
                <Navbar></Navbar>
                <div className="container" id="planner" style={{ marginTop: '20px' }}>
                    <div className="row" >
                        <div className="col s12 calendar-parent">
                            <AppBar
                                title={<span>My Calendar</span>}
                                showMenuIconButton={false}
                                style={{ marginBottom: '10px', zIndex:'0' }}
                            />
                            <div className="z-depth-2">
                                <div className="row">
                                    <div className="col s12 calendar-container" >
                                        <InfiniteCalendar
                                            Component={MultipleDatesCalendar}
                                            height={250}
                                            interpolateSelection={defaultMultipleDateInterpolation}
                                            selected={[new Date()]}
                                            layout={'portrait'}
                                            width={'100%'}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    {/* <Select
                                    name="form-field-name"
                                    value=""
                                    options={options}
                                    onChange={logChange}
                                    multi={true}/> */}
                                </div>
                                <div className="row">
                                    <div className="col s6">
                                        <RaisedButton
                                            className=""
                                            target="_blank"
                                            label="Available"
                                            primary={true}
                                            style={styles.button}
                                            icon={<FontIcon className="material-icons">check</FontIcon>}
                                        />
                                        <RaisedButton
                                            className=""
                                            target="_blank"
                                            label="Remove"
                                            secondary={true}
                                            style={styles.button}
                                            icon={<FontIcon className="material-icons">close</FontIcon>}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <AppBar
                                title={<span>Activity</span>}
                                showMenuIconButton={false}
                                style={{ marginBottom: '10px' , zIndex:'0'}}
                            />
                            <div className="row">
                                <div className="col s12">
                                    <div className="col s12 z-depth-2" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                                        <div className="col s3">
                                            <img className="circle responsive-img" src="http://stretchflex.net/photos/profileStock.jpeg" alt="profDemo" style={{ height: '140px', width: '140px' }} />
                                        </div>
                                        <div className="col s5" id="message" style={{ top: '5px' }}>
                                            <p><strong>Kevin accepted your request.</strong></p>
                                        </div>
                                        <div className="col s4">
                                            <div className="col s12">
                                                <p>Washington DC</p>
                                            </div>
                                            <div className="col s12">
                                                <p>May 14, 2017 - May 16, 2017</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <div className="col s12 z-depth-2" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                                        <div className="col s3">
                                            <img className="circle responsive-img" src="http://stretchflex.net/photos/profileStock.jpeg" alt="profDemo" style={{ height: '140px', width: '140px' }} />
                                        </div>
                                        <div className="col s5" id="message" style={{ top: '5px' }}>
                                            <p><strong>Your request to swap with Mike is pending</strong></p>
                                        </div>
                                        <div className="col s4">
                                            <div className="col s12">
                                                <p>San Francisco</p>
                                            </div>
                                            <div className="col s12">
                                                <p>June 14, 2017 - June 16, 2017</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s12">
                                    <div className="col s12 z-depth-2">
                                        <div className="row">
                                            <div className="col s12" style={{ textAlign: 'center' }}>
                                                <h5><strong>Katherine wants to swap with you from July 14-16!</strong></h5>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col s2">
                                                <div className="col s12">
                                                    <img className="circle responsive-img" src="http://stretchflex.net/photos/profileStock2.jpeg" alt="profDemo" style={{ height: '140px', width: '140px' }} />
                                                </div>
                                                <div className="col s12">
                                                    <p>Katherine</p>
                                                </div>
                                                <div className="col s12">
                                                    <p style={{ marginTop: '0px' }}>Chicago, IL</p>
                                                </div>
                                            </div>
                                            <div className="col s4 img-cont" onClick={() => this.handleSlideshowOpen(0)}>
                                                <img src="http://stretchflex.net/photos/apartment.jpeg" alt="" className="image" style={{ height: '250px', width: '100%' }} />
                                                <div className="middle">
                                                    <div className="text">View Place</div>
                                                </div>
                                            </div>

                                            <div className="col s6">
                                                <div className="row">
                                                    <div className="col s4" style={{ textAlign: 'center' }}>
                                                        <p>Entire Apt</p>
                                                        <p><FontIcon className="material-icons large">home</FontIcon></p>
                                                    </div>
                                                    <div className="col s4" style={{ textAlign: 'center' }}>
                                                        <p>4 guests</p>
                                                        <p><FontIcon className="material-icons large">people_outline</FontIcon></p>
                                                    </div>
                                                    <div className="col s4" style={{ textAlign: 'center' }}>
                                                        <p>1 Bedroom</p>
                                                        <p><FontIcon className="material-icons large">hotel</FontIcon></p>
                                                    </div>
                                                </div>
                                                <div className="row col s12">
                                                    <p><u>Message From James:</u><a href="/viewprofile">  (View Profile)</a></p>
                                                    <p>Hello! My name is James and I am interested in swapping with you. Looking to go to NY for the weekend just to getaway.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col s6">
                                                <RaisedButton
                                                    className=""
                                                    target="_blank"
                                                    label="Accept"
                                                    primary={true}
                                                    style={styles.button}
                                                    icon={<FontIcon className="material-icons">check</FontIcon>}
                                                />
                                                <RaisedButton
                                                    className=""
                                                    target="_blank"
                                                    label="Decline"
                                                    secondary={true}
                                                    style={styles.button}
                                                    icon={<FontIcon className="material-icons">close</FontIcon>}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <AppBar
                                title={<span>Upcoming Trips</span>}
                                showMenuIconButton={false}
                                style={{ marginBottom: '10px', zIndex:'0' }}
                            />
                            <div className="col s12 z-depth-2" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                                <div className="col s3">
                                    <img className="circle responsive-img" src="http://stretchflex.net/photos/profileStock.jpeg" alt="profDemo" style={{ height: '140px', width: '140px' }} />
                                </div>
                                <div className="col s9">
                                    <div className="col s12">
                                        <h5>Tim</h5>
                                    </div>
                                    <div className="col s12">
                                        <p>Columbus, Ohio</p>
                                    </div>
                                    <div className="col s12">
                                        <p>May 14, 2017 - May 16, 2017</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <AppBar
                                title={<span>Past Trips</span>}
                                showMenuIconButton={false}
                                style={{ marginBottom: '10px', zIndex:'0' }}
                            />
                            <div className="col s12 z-depth-2" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                                <div className="col s3">
                                    <img className="circle responsive-img" src="http://stretchflex.net/photos/profileStock.jpeg" alt="profDemo" style={{ height: '140px', width: '140px' }} />
                                </div>
                                <div className="col s4">
                                    <div className="col s12">
                                        <h5>Alex</h5>
                                    </div>
                                    <div className="col s12">
                                        <p>Pittsburgh, Pennsylvania</p>
                                    </div>
                                    <div className="col s12">
                                        <p>November 12, 2017 - November 16, 2017</p>
                                    </div>
                                </div>
                                <div className="col s5">
                                    <div className="col s12">
                                        <h6>Rate your Experience: </h6>
                                        {/* <StarRatings
                                            rating={rating}
                                            isSelectable={true}
                                            isAggregateRating={false}
                                            changeRating={this.changeRating}
                                            numOfStars={5}
                                        /> */}
                                    </div>
                                    <div className="col s12">
                                        <TextField
                                            hintText="Feedback"
                                            floatingLabelText="Tell us about your experience"
                                            multiLine={true}
                                            rows={4}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            {/*<SlideShow imgs={this.state.imgsData} ref="SlideShow" />*/}
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

export default Planner