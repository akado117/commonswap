import React from 'react';
import Calendar from 'material-ui/DatePicker/Calendar';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';

//const profile = <FontIcon className="material-icons">person</FontIcon>;

const styles = {
    button: {
        margin: 12,
    }
};

class Planner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            controlledDate: null,
        };
    }

    handleChange = (event, date) => {
        console.log('HERE');
        this.setState({
            controlledDate: date,
        });
        console.log(date);
        console.log(this.state.controlledDate);
    };

    render() {
        return (
            <div className="container" id="planner">
                <div className="row">
                    <div className="col s12 z-depth-2">
                        <div className="row">
                            <div className="col s12 calendar-container">
                                <Calendar
                                    onChange={this.handleChange}
                                    value={this.state.controlledDate}
                                    className='calendar-test'
                                    id='calendar'
                                    firstDayOfWeek={0} style={{ width: '500px' }}></Calendar>
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
                            <img className="circle responsive-img" src="http://via.placeholder.com/140x100" alt="profDemo" />
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
                            <img className="circle responsive-img" src="http://via.placeholder.com/140x100" alt="profDemo" />
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
                                <h5><strong>James wants to swap with you from July 14-16!</strong></h5>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s2">
                                <div className="col s12">
                                    <img className="circle responsive-img" src="http://via.placeholder.com/140x100" alt="profDemo" />
                                </div>
                                <div className="col s12">
                                    <p>James</p>
                                </div>
                                <div className="col s12">
                                    <p style={{ marginTop: '0px' }}>Chicago, IL</p>
                                </div>
                            </div>
                            <div className="col s4" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                                <img src="http://via.placeholder.com/250x220" alt="" />
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
            </div>
        );
    }
}

export default Planner