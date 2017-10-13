import React from 'react'
const _ = require('lodash')//required so it can be used easily in chrome dev tools.
import DatePicker from 'material-ui/DatePicker';
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';


const profile = <FontIcon className="material-icons">person</FontIcon>;
const trust = <FontIcon className="material-icons">favorite</FontIcon>;
const place = <FontIcon className="material-icons">weekend</FontIcon>;

const scrolling = {
    position: 'fixed',
    top: '0',
};

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedIndex: 0,
            address:'',
            descPlace:'',
            beds:1,
            bedType:'',
            monthlyRent:100,
            bathrooms:0,
            guests:2,
            guestBeds:0,
            smoking: false,
            pets: false,
            petType:'',
            essentials: true,
            wifi: true,
            heat:false,
            gym: true,
            washer:false,
            ktichen:true,
            closet:true,
            pool:true,
            parking:false,
            specInstruc:'',
            descNeighborhood:'',
            picutrePath: '',
            photosPlace: ['',''],
        };
    }

    select = (index) => this.setState({ selectedIndex: index });

    componentDidMount = () => {
        $('select').material_select();
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15, // Creates a dropdown of 15 years to control year,
            today: 'Today',
            clear: 'Clear',
            close: 'Ok',
            closeOnSelect: false // Close upon selecting a date,
        });
        function initMap() {
            var uluru = {
              lat: -25.363,
              lng: 131.044
            };
            var map = new google.maps.Map($('#map'), {
              zoom: 4,
              center: uluru
            });
            var marker = new google.maps.Marker({
              position: uluru,
              map: map
            });
          }
    }

    getFormData = () => {

    }

    render() {
        return (
            <section className="profile" >
                <Paper zDepth={1}>
                    <BottomNavigation selectedIndex={this.state.selectedIndex} style={{ position: 'fixed',zIndex: '999' }}>
                        <BottomNavigationItem
                            label="My Profile"
                            icon={profile}
                            onClick={() => this.select(0)}
                        />
                        <BottomNavigationItem
                            label="My Place"
                            icon={place}
                            onClick={() => this.select(1)}
                        />
                        <BottomNavigationItem
                            label="Trust &amp; Verification"
                            icon={trust}
                            onClick={() => this.select(2)}
                        />
                    </BottomNavigation>
                </Paper>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
                <div className="container" style={{ paddingTop: '45px' }}>
                    <div className="row">
                        <div className="col s3" id="header-inner" style={{ position: 'fixed', display: 'block' }}>
                            <h4>Profile Page</h4>
                            <div className="col s6 offset-s2">
                                <i className="fa fa-user-circle fa-4x" aria-hidden="true"></i>
                            </div>
                            <div className="col s12">
                                <p><i className="fa fa-plus-square-o fa-2x" aria-hidden="true"></i> Add Photo</p>
                                <input type="file" value={this.state.picture}/>
                            </div>
                        </div>
                        <div className="col s9 offset-s3">
                            <div className="row">
                                <div className="card-panel teal">
                                    <span className="white-text">
                                        For a compatible match, anser the questions below. We understand that though everyone might not be the same, we are all a lot more alike than we think. We hope the questions below provide our community enough information to find the ideal swap.
                                        </span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s6 input-field inline">
                                    <label><i className="fa fa-university fa-1x" aria-hidden="true"></i> School</label>
                                    <input type="text" className="validate" id="school" value={this.state.school}/>
                                </div>
                                <div className="col s6 input-field inline">
                                    <label>Class of: </label>
                                    <input type="text" className="validate" value={this.state.classOf}/>
                                </div>
                            </div>
                            <div className="col s12">
                                <form action="#">
                                    <p className="range-field">
                                        <label htmlFor="amount">Somewhat clean</label>
                                        <label htmlFor="amount" style={{ float: 'right' }}>Clean</label>
                                        <input type="range" id="test5" min="0" max="100" value={this.state.cleanliness}/>
                                    </p>
                                </form>
                            </div>
                            <div className="col s12">
                                <form action="#">
                                    <p className="range-field">
                                        <label htmlFor="amount">A Homebody</label>
                                        <label htmlFor="amount" style={{ float: 'right' }} value={this.state.personality} >A Party Animal</label>
                                        <input type="range" id="test5" min="0" max="100" />
                                    </p>
                                </form>
                            </div>
                            <div className="col s12">
                                <div className="row" style={{ paddingTop: '15px' }}>
                                    <div className="col s4">
                                        <label>Beach bum</label>
                                        <button type="button" className="beach btn btn-sm" value={this.state.beachBum} style={{ borderRadius: '30px', float: 'right' }}><i className="fa fa-check" aria-hidden="true"></i></button>
                                    </div>
                                    <div className="col s4">
                                        <label>Wineries</label>
                                        <button type="button" className="beach btn btn-sm" value={this.state.wineries} style={{ borderRadius: '30px', float: 'right' }}><i className="fa fa-check" aria-hidden="true"></i></button>
                                    </div>
                                    <div className="col s4">
                                        <label>Photography</label>
                                        <button type="button" className="beach btn btn-sm" value={this.state.photography} style={{ borderRadius: '30px', float: 'right' }}><i className="fa fa-check" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                                <div className="row" style={{ paddingTop: '15px' }}>
                                    <div className="col s4" style={{ height: '150%' }}>
                                        <label>Film</label>
                                        <button type="button" className="beach btn btn-sm" value={this.state.film} style={{ borderRadius: '30px', float: 'right' }}><i className="fa fa-check" aria-hidden="true"></i></button>
                                    </div>
                                    <div className="col s4">
                                        <label>Hiking</label>
                                        <button type="button" className="beach btn btn-sm" value={this.state.hiking} style={{ borderRadius: '30px', float: 'right' }}><i className="fa fa-check" aria-hidden="true"></i></button>
                                    </div>
                                    <div className="col s4">
                                        <label>Clubbing &amp; Nightlife</label>
                                        <button type="button" className="beach btn btn-sm" value={this.state.clubbing} style={{ borderRadius: '30px', float: 'right' }}><i className="fa fa-check" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                                <div className="row" style={{ paddingTop: '15px' }}>
                                    <div className="col s4">
                                        <label>Live Music &amp; Concerts</label>
                                        <button type="button" className="beach btn btn-sm " value={this.state.concerts} style={{ borderRadius: '30px', float: 'right' }}><i className="fa fa-check" aria-hidden="true"></i></button>
                                    </div>
                                    <div className="col s4">
                                        <label>Food &amp; Restaurants</label>
                                        <button type="button" className="beach btn btn-sm" value={this.state.food} style={{ borderRadius: '30px', float: 'right' }}><i className="fa fa-check" aria-hidden="true"></i></button>
                                    </div>
                                    <div className="col s4">
                                        <label>Organized Tours</label>
                                        <button type="button" className="beach btn btn-sm" value={this.state.tours} style={{ borderRadius: '30px', float: 'right' }}><i className="fa fa-check" aria-hidden="true"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="place">
                                <div className="col s9 offset-s3">
                                    <div className="row">
                                        <div className="col s12 input-field inline">
                                            <label htmlFor=""><i className="fa fa-location-arrow" aria-hidden="true"></i> Enter your address: </label>
                                            <input type="text" className="html" id="" value={this.state.address}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col s12 input-field inline">
                                            <input type="text" className="" id="" value={this.state.descPlace}/>
                                            <label htmlFor="exampleInputEmail1"><i className="fa fa-pencil" aria-hidden="true"></i> Write a short description about your place: (This is what users will see)</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col s12 input-field inline" style={{ paddingTop: '20px' }}>
                                            <div id="map" style={{height: '400px', width:'100%'}}></div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col s6 input-field inline">
                                            <input type="text" className="" id="" value={this.state.address}/>
                                            <label htmlFor=""><i className="fa fa-location-arrow" aria-hidden="true"></i> Enter your address: </label>
                                        </div>
                                        <div className="col s6 input-field inline">
                                            <div className="col s6" style={{ paddingLeft: '0px' }}>
                                                <select type="number" className="" value={this.state.beds}>
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                </select>
                                                <label><i className="fa fa-bed" aria-hidden="true"></i> How many beds can guests use?</label>
                                            </div>
                                            <div className="col s6 input-field inline" style={{ paddingRight: '0px', marginTop: '0px' }}>
                                                <select type="text" className="" value={this.state.bedType}>
                                                    <option>Full</option>
                                                    <option>Half</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col s6 input-field inline">
                                            <label htmlFor=""><i className="fa fa-usd" aria-hidden="true"></i> What is your monthly rent?</label>
                                            <input type="text" className="" id="" value={this.state.monthlyRent}/>
                                        </div>
                                        <div className="col s6 input-field inline">
                                            <select type="number" className="" value={this.state.bathrooms}>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </select>
                                            <label><i className="fa fa-bath" aria-hidden="true"></i> How many bathrooms can guest use?</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col s6 input-field inline">
                                            <input type="number" className="" id="" value={this.state.guests}/>
                                            <label htmlFor=""><i className="fa fa-users" aria-hidden="true"></i> How many guests can your place accomodate?</label>
                                        </div>
                                        <div className="col s6 input-field inline">
                                            <select type="number" className="" value={this.state.smoking}>
                                                <option>Yes</option>
                                                <option>No</option>
                                            </select>
                                            <label>Smoking Allowed?</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col s6 input-field">
                                            <label htmlFor=""><i className="fa fa-bed" aria-hidden="true"></i> How many bedrooms can guest use?</label>
                                            <input type="number" className="" id="" value={this.state.guestBeds}/>
                                        </div>
                                        <div className="col s6">
                                            <div className="col s6 input-field" style={{ paddingLeft: '0px' }}>
                                                <select type="text" className="" value={this.state.pets}>
                                                    <option>Yes</option>
                                                    <option>No</option>
                                                </select>
                                                <label style={{ float: 'left' }}>Pets?</label>
                                            </div>
                                            <div className="col s6 input-field inline" style={{ paddingRight: '0px' }}>
                                                <label htmlFor="">What kind?</label>
                                                <input type="text" className="" id="" value={this.state.petType}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col s9 offset-s3">
                                    <div className="col s12">
                                        <div className="row" style={{ paddingTop: '15px' }}>
                                            <div className="col s4 input-field inline">
                                                <label>Essentials (towels, etc)</label>
                                                <button type="button" value={this.state.essentials} className="beach btn btn-sm" style={{ borderRadius: '30px', float: 'right' }}><i className="fa fa-check" aria-hidden="true"></i></button>
                                            </div>
                                            <div className="col s4 input-field inline">
                                                <label>Wifi</label>
                                                <button type="button" value={this.state.wifi} className="beach btn btn-sm" style={{ borderRadius: '30px', float: 'right' }}><i className="fa fa-check" aria-hidden="true"></i></button>
                                            </div>
                                            <div className="col s4 input-field inline">
                                                <label>Heat</label>
                                                <button type="button" value={this.state.heat} className="beach btn btn-sm" style={{ borderRadius: '30px', float: 'right' }}><i className="fa fa-check" aria-hidden="true"></i></button>
                                            </div>
                                        </div>
                                        <div className="row" style={{ paddingTop: '15px' }}>
                                            <div className="col s4 input-field inline" style={{ height: '150%' }}>
                                                <label>Gym/ fitness center</label>
                                                <button type="button" value={this.state.gym} className="beach btn btn-sm" style={{ borderRadius: '30px', float: 'right' }}><i className="fa fa-check" aria-hidden="true"></i></button>
                                            </div>
                                            <div className="col s4 input-field inline">
                                                <label>Washer/ dryer</label>
                                                <button type="button" value={this.state.washer} className="beach btn btn-sm" style={{ borderRadius: '30px', float: 'right' }}><i className="fa fa-check" aria-hidden="true"></i></button>
                                            </div>
                                            <div className="col s4 input-field inline">
                                                <label>Kitchen Appliances</label>
                                                <button type="button" value={this.state.kitchen} className="beach btn btn-sm" style={{ borderRadius: '30px', float: 'right' }}><i className="fa fa-check" aria-hidden="true"></i></button>
                                            </div>
                                        </div>
                                        <div className="row" style={{ paddingTop: '15px' }}>
                                            <div className="col s4 input-field inline">
                                                <label>Closet/ drawers</label>
                                                <button type="button" value={this.state.closet} className="beach btn btn-sm " style={{ borderRadius: '30px', float: 'right' }}><i className="fa fa-check" aria-hidden="true"></i></button>
                                            </div>
                                            <div className="col s4 input-field inline">
                                                <label>Pool</label>
                                                <button type="button" value={this.state.pool} className="beach btn btn-sm" style={{ borderRadius: '30px', float: 'right' }}><i className="fa fa-check" aria-hidden="true"></i></button>
                                            </div>
                                            <div className="col s4 input-field inline">
                                                <label>Parking</label>
                                                <button type="button" value={this.state.parking} className="beach btn btn-sm" style={{ borderRadius: '30px', float: 'right' }}><i className="fa fa-check" aria-hidden="true"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col s9 offset-s3">
                                    <div className="col s12">
                                        <label>Write a detailed description about your place:</label>
                                        <textarea className="materialize-textarea" ></textarea>
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div className="col s12">
                                        <label>Special instructions:</label>
                                        <textarea className="materialize-textarea" value={this.state.specInstruc}></textarea>
                                        <p className="help-block text-danger"></p>
                                    </div>
                                    <div className="col s12">
                                        <label>About the area &amp; neighborhood (transportatin, what's near, etc.)</label>
                                        <textarea className="materialize-textarea"value={this.state.descNeighborhood} ></textarea>
                                        <p className="help-block text-danger"></p>
                                    </div>
                                </div>
                                <div className="col s9 offset-s3">
                                    <div className="panel panel-info">
                                        <div className="panel-heading">Add photos &amp; videos</div>
                                        <div className="panel-body">
                                        </div>
                                    </div>
                                </div>
                                <div className="col s12">
                                    <div className="row">
                                        <div className="col s3 offset-s6">
                                            <a className="waves-effect waves-light btn-large" type="submit" style={{ width: '100%' }}><i className="fa fa-floppy-o fa-1x" aria-hidden="true" style={{ float: 'left' }}></i> Save</a>
                                        </div>
                                        <div className="col s3">
                                            <a className="waves-effect waves-light btn-large" type="submit" style={{ width: '100%' }}><i className="fa fa-hand-o-right" aria-hidden="true" style={{ float: 'left' }}></i> Next</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAoLzYqxbgSUGz2DKfZj6vvsxRVjGP-sDw&callback=initMap" type="text/javascript"></script>
            </section>
        );
    }
    testState = () => {
        roomiesActions.saveRoom(this.state,this.props.dispatch)
    }
}
export default Profile