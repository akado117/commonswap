import React from 'react';



export default class Profile extends React.Component {
    constructor() {
        super();

        this.state = {}
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">
                                Common<span style={{ color: "#00FFFF" }}>Swap</span>
                            </a>
                        </div>
                    </div>
                </nav>
                <div className="container" style={{paddingTop:"70px"}}>
                    <div className="row">
                        <div className="col-md-4">
                            <label><i className="fa fa-calendar" aria-hidden="true"></i> Enter your Destination</label>
                            <input type="text" className="form-control" placeholder="Destination *" id="dest" required data-validation-required-message="Please enter your destination."/>
                                <p className="help-block text-danger"></p>
                        </div>
                        <div className="col-md-2">
                            <label><i className="fa fa-user-circle" aria-hidden="true"></i> People</label>
                            <select type="number" className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor=" "><i className="fa fa-calendar-plus-o " aria-hidden="true "></i> Arrival Date</label>
                            <input type="date" className="form-control " placeholder="Destination * " id="depdate " required data-validation-required-message="Please enter your destination. "/>
                        </div>
                        <div className="col-md-3 ">
                            <label htmlFor=" "><i className="fa fa-calendar-minus-o" aria-hidden="true"></i> Departure Date</label>
                            <input type="date" className="form-control " placeholder="Arrival * " id="depdate " required data-validation-required-message="Please enter your destination. "/>
                        </div>
                    </div>
                </div>
                <section id="team" className="">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="team-member">
                                    <img src="/Users/Tim/Desktop/commonSwapRegister.jpg" className="img-responsive img-circle" alt=""/>
                                        <h4 style={{textAlign: "center" }}>Register</h4>
                                        <p className="text-muted">Join our community by signing up and listing your space! Include high quality photos and information about your interests.</p>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="team-member">
                                    <img src="/Users/Tim/Desktop/commonSwapBook.jpg" className="img-responsive img-circle" alt=""/>
                                        <h4 style={{textAlign: "center" }}>Book</h4>
                                        <p className="text-muted">Enter your travel dates and desired location. CommonSwap will automatically match you with another traveler looking to visit your city during the same period, all for only $50.</p>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="team-member">
                                    <img src="/Users/Tim/Desktop/commonSwapTravel.jpeg" className="img-responsive img-circle" alt=""/>
                                        <h4 style={{textAlign: "center" }}>Travel</h4>
                                        <p className="text-muted">You're all set! Enjoy your getaway and experience everything the has to offer. Feel free to communicate with your Swap to exchange recommendations.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="profile">
                    <div className="container">
                        <div className="col-md-3">
                            <h2>Complete Your Profile</h2>
                            <div className="col-md-6 col-md-offset-2">
                                <i className="fa fa-user-circle fa-4x" aria-hidden="true"></i>
                            </div>
                            <div className="col-md-12">
                                <p><i className="fa fa-plus-square-o fa-2x" aria-hidden="true"></i> Add Photo</p>
                                <input type="file" id="exampleInputFile"/>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="panel panel-info">
                                <div className="panel-heading">Required</div>
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="exampleInputEmail1">First Name: </label>
                                            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email"/>
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="exampleInputEmail1">Last Name: </label>
                                            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email"/>
                                        </div>
                                        <div className="col-md-6">
                                            <label>I am: </label>
                                            <select type="text" className="form-control" placeholder="Gender *">
                                                <option></option>
                                                <option>Male</option>
                                                <option>Female</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label>Date of Birth: </label>
                                            <input type="date" name="" className="form-control"/>
                                        </div>
                                        <div className="col-md-6">
                                            <label>Email</label>
                                            <input type="email" className="form-control" placeholder="Your Email *" id="email" required data-validation-required-message="Please enter your email address."/>
                                                <p className="help-block text-danger"></p>
                                        </div>
                                        <div className="col-md-6">
                                            <label>Phone</label>
                                            <input type="tel" className="form-control" placeholder="Your Phone *" id="phone" required data-validation-required-message="Please enter your phone number."/>
                                                <p className="help-block text-danger"></p>
                                        </div>
                                        <div className="col-md-6">
                                            <label>Preferred Language</label>
                                            <select className="form-control">
                                                <option>English</option>
                                                <option>Spanish</option>
                                                <option>Chinese</option>
                                                <option>French</option>
                                            </select>
                                        </div>
                                        <div className="col-md-12">
                                            <label>Describe Yourself:</label>
                                            <textarea className="form-control" rows="7" placeholder="Details *" id="notes" required data-validation-required-message="Please enter details."></textarea>
                                            <p className="help-block text-danger"></p>
                                        </div>
                                        <div className="col-md-12">
                                            <p className="text-muted">CommonSwap relies on the trust and respect of our community! Tell us a little about yourself to get to know you. What's your favorite food? What's your ideal Friday night activity? Have a fun fact?</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                        </div>
                        <div className="col-md-9">
                            <div className="panel panel-info">
                                <div className="panel-heading">Recommended</div>
                                <div className="panel-body">
                                    <p className="text-muted">For a compatible match, anser the questions below. We understand that though everyone might not be the same, we are all a lot more alike than we think. We hope the questions below provide our community enough information to find the ideal
                                        swap.
                                    </p>
                                    <div className="col-md-6">
                                        <label>School</label>
                                        <input type="text" className="form-control" name=""/>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Class of: </label>
                                        <input type="text" className="form-control" name=""/>
                                    </div>
                                    <div className="col-md-12">
                                        <p>
                                            <label htmlFor="amount">Somewhat clean</label>
                                            <label htmlFor="amount" style={{ float: "right" }}>Clean</label>
                                            <input type="text" id="amount" readOnly style={{ border: 0, color: "#f6931f", fontWeight: "bold" }}/>
                                        </p>
                                        <div id="slider-range-max"></div>
                                    </div>
                                    <div className="col-md-12">
                                        <p>
                                            <label htmlFor="amount">A Homebody</label>
                                            <label htmlFor="amount" style={{ float: "right" }}>A Party Animal</label>
                                            <input type="text" id="amount-two" readOnly style={{ border: 0, color: "#f6931f", fontWeight: "bold" }}/>
                                        </p>
                                        <div id="slider-range-max-two"></div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="row" style={{ paddingTop: "15px"}}>
                                            <ButtonRow labels={["Beach Bum", "Wineries", "Photograpy"]} />
                                        </div>
                                        <div className="row" style={{ paddingTop: "15px" }}>
                                            <ButtonRow labels={["Film", "Hiking", "Clubbing"]} />
                                        </div>
                                        <div className="row" style={{ paddingTop: "15px"}} >
                                            <ButtonRow labels={["Live Music & Concerts", "Food & Restaurants", "Organized Tours"]} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="place">
                    <div className="container">
                        <div className="col-md-3">
                        </div>
                        <div className="col-md-9">
                            <div className="panel panel-info">
                                <div className="panel-heading">Place details</div>
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label htmlFor="exampleInputEmail1">Enter your address: </label>
                                            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="8432 Parnell St. Los Angeles, CA 22427"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label htmlFor="exampleInputEmail1">Write a short description about your place: (This is what users will see)</label>
                                            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="8432 Parnell St. Los Angeles, CA 22427"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12" style={{ paddingTop: "20px" }}>
                                            <div id="map"></div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="exampleInputEmail1"><i className="fa fa-location-arrow" aria-hidden="true"></i> Enter your address: </label>
                                            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="8432 Parnell St. Los Angeles, CA 22427"/>
                                        </div>
                                        <div className="col-md-6">
                                            <label>How many beds can guests use?</label>
                                            <div className="col-md-6" style={{ paddingLeft: "0px" }}>
                                                <select type="number" className="form-control">
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6" style={{ paddingRight: "0px" }}>
                                                <select type="text" className="form-control">
                                                    <option>Full</option>
                                                    <option>Half</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="exampleInputEmail1">What is your monthly rent?</label>
                                            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="$800 - $1000"/>
                                        </div>
                                        <div className="col-md-6">
                                            <label>How many bathrooms can guest use?</label>
                                            <select type="number" className="form-control">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="exampleInputEmail1">How many guests can your place accomodate?</label>
                                            <input type="number" className="form-control" id="exampleInputEmail1" placeholder=""/>
                                        </div>
                                        <div className="col-md-6">
                                            <label>Smoking Allowed?</label>
                                            <select type="number" className="form-control">
                                                <option>Yes</option>
                                                <option>No</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="exampleInputEmail1">How many bedrooms can guest use?</label>
                                            <input type="number" className="form-control" id="exampleInputEmail1" placeholder=""/>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="col-md-6" style={{ paddingLeft: "0px" }}>
                                                <label>Pets?</label>
                                                <select type="text" className="form-control">
                                                    <option>Yes</option>
                                                    <option>No</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6" style={{ paddingRight: "0px" }}>
                                                <label htmlFor="exampleInputEmail1">What kind?</label>
                                                <input type="text" className="form-control" id="exampleInputEmail1" placeholder=""/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                        </div>
                        <div className="col-md-9">
                            <div className="panel panel-info">
                                <div className="panel-heading">What amenities can your guests use?</div>
                                <div className="panel-body">
                                    <div className="col-md-12">
                                        <div className="row" style={{ paddingTop: "15px" }}>
                                            <ButtonRow labels={["Essentials (towels, etc)", "WiFi", "Heat"]}/>
                                        </div>
                                        <div className="row" style={{ paddingTop: "15px" }}>
                                            <ButtonRow labels={["Gym/ fitness center", "Washer/Dryer", "Kitchen Appliances"]} styles={[{ height: "150%" }]}/>
                                        </div>
                                        <div className="row" style={{ paddingTop: "15px" }}>
                                            <ButtonRow labels={["Closet/Drawers", "Pool", "Parking"]}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                        </div>
                        <div className="col-md-9">
                            <div className="panel panel-info">
                                <div className="panel-heading">Recommended</div>
                                <div className="panel-body">
                                    <div className="col-md-12">
                                        <label>Write a detailed description about your place:</label>
                                        <textarea className="form-control" rows="7" placeholder="Details *" id="notes" required data-validation-required-message="Please enter details."></textarea>
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div className="col-md-12">
                                        <label>Special instructions:</label>
                                        <textarea className="form-control" rows="7" placeholder="Details *" id="notes" required data-validation-required-message="Please enter details."></textarea>
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div className="col-md-12">
                                        <label>About the area &amp; neighborhood (transportatin, what's near, etc.)</label>
                                        <textarea className="form-control" rows="7" placeholder="Details *" id="notes" required data-validation-required-message="Please enter details."></textarea>
                                        <p className="help-block text-danger"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                        </div>
                        <div className="col-md-9">
                            <div className="panel panel-info">
                                <div className="panel-heading">Add photos &amp; videos</div>
                                <div className="panel-body">
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="col-md-3 col-md-offset-6">
                                <button className="btn btn-success btn-lg" type="submit" style={{ width: "100%" }}><i className="fa fa-floppy-o fa-1x" aria-hidden="true" style={{ float: "left" }}></i> Save</button>
                            </div>
                            <div className="col-md-3">
                                <button className="btn btn-info btn-lg" type="submit" style={{ width: "100%" }}><i className="fa fa-hand-o-right" aria-hidden="true" style={{ float: "left" }}></i> Next</button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

const ButtonRow = ({labels = [], styles= []}) => {
     const buttons = labels.map((label, idx) => {
        return (<div className="col-md-4" key={`buttonRow-${idx}`} style={styles[idx]}>
            <label htmlFor={label.split(' ')[0]}>{label}</label>
            <button id={label.split(' ')[0]} type="button" className="beach btn btn-sm float-button" ><i className="fa fa-check" aria-hidden="true"></i></button>
        </div>)
     });

     return <div>{buttons}</div>
};