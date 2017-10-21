import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import SimpleModalSlideshow from 'react-simple-modal-slideshow';
import SlideShow from 'react-image-slideshow';
import InfiniteCalendar, { Calendar, defaultMultipleDateInterpolation, withMultipleDates } from 'react-infinite-calendar';
import '../../../node_modules/react-infinite-calendar/styles.css';
import Navbar from '../components/Navbar';

const styles = {
    button: {
        margin: 12,
    }
};
var today = new Date();
const MultipleDatesCalendar = withMultipleDates(Calendar);

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
            ]
        };

    }
    handleSlideshowOpen(index) {
        this.refs.SlideShow.handleModalOpen(index);
    };
    componentDidMount = () => {
        //this.handleSlideshowOpen(0);
    }

    render() {
        return (
            <div>
                <Navbar></Navbar>
                <div className="container" id="planner" style={{marginTop:'20px'}}>
                    <div className="row" >
                        <div className="col s12 z-depth-2 calendar-parent">
                            <div className="row">
                                <div className="col s12 calendar-container" style={{paddingLeft:'0px', paddingRight:'0px'}}>
                                    {/* <InfiniteCalendar
                                    Component={MultipleDatesCalendar}
                                    width={400}
                                    height={600}
                                    selected={today}
                                    disabledDays={[0, 6]}
                                    minDate={lastWeek}
                                    interpolateSelection={defaultMultipleDateInterpolation}
                                /> */}
                                    <InfiniteCalendar
                                        Component={MultipleDatesCalendar}
                                        /*
                                         * The `interpolateSelection` prop allows us to map the resulting state when a user selects a date.
                                         * By default, it adds the date to the selected dates array if it isn't already selected.
                                         * If the date is already selected, it removes it.
                                         *
                                         * You could re-implement this if this isn't the behavior you want.
                                         */
                                        height={250}
                                        interpolateSelection={defaultMultipleDateInterpolation}
                                        selected={[new Date()]}
                                    />
                                </div>
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
                    <div className="row">
                        <div className="col s12 z-depth-2" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                            <div className="col s3">
                                <img className="circle responsive-img" src="http://stretchflex.net/photos/profileStock.jpeg" alt="profDemo" style={{height:'140px',width:'140px'}}/>
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
                    <div className="row">
                        <div className="col s12 z-depth-2" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                            <div className="col s3">
                                <img className="circle responsive-img" src="http://stretchflex.net/photos/profileStock.jpeg" alt="profDemo" style={{height:'140px',width:'140px'}}/>
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
                    <div className="row">
                        <div className="col s12 z-depth-2">
                            <div className="row">
                                <div className="col s12" style={{ textAlign: 'center' }}>
                                    <h5><strong>Katherine wants to swap with you from July 14-16!</strong></h5>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s2">
                                    <div className="col s12">
                                        <img className="circle responsive-img" src="http://stretchflex.net/photos/profileStock2.jpeg" alt="profDemo" style={{height:'140px',width:'140px'}}/>
                                    </div>
                                    <div className="col s12">
                                        <p>Katherine</p>
                                    </div>
                                    <div className="col s12">
                                        <p style={{ marginTop: '0px' }}>Chicago, IL</p>
                                    </div>
                                </div>
                                <div className="col s4" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                                    <img src="http://stretchflex.net/photos/apartment.jpeg" alt="" onClick={() => this.handleSlideshowOpen(0)} style={{height:'250px',width:'260px'}}/>
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
                                    <div className="row">
                                        <p><u>Message From James:</u><a href="">  (View Profile)</a></p>
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
                    <div className="row">
                        <div className="col s12 z-depth-2">
                            <SlideShow imgs={this.state.imgsData} ref="SlideShow" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Planner