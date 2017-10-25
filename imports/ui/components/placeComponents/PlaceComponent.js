import React, { Component } from 'react'
import PropTypes from 'prop-types';

import ButtonArrayComp from '../forms/ButtonArrayComp.js';
import SelectBuilder from '../forms/SelectBuilder.js'

const BUTTONS = [
    {label: 'Essentials (towels, etc)', name: 'essentials'},
    {label: 'Wifi', name: 'wiFi'},
    {label: 'Heat', name: 'heat'},
    {label: 'Gym/ fitness center', name: 'gym'},
    {label: 'Washer/ dryer', name: 'washerDryer'},
    {label: 'Kitchen Appliances', name: 'kitchen'},
    {label: 'Closet/ drawers', name: 'dressers'},
    {label: 'Pool', name: 'pool'},
    {label: 'Parking', name: 'parking'},
];

function onChangeHelper(event) {
    return event.target.value
}

class PlaceComponent extends Component {
    constructor() {
        super();

        this.state = {
            address: '',
            shortDesc: '',
            detailedDesc: '',
            numOfGuests: 0,
            beds: [],
            rent: '',
            bathrooms: 0,
            smoking: false,
            bedrooms: 0,
            pets: false,
            typeOfPets: '',
            specialInst: '',
            notesOnArea: '',
        };
    }

    checkBoxHelper = (e, type) => {
        const value = onChangeHelper(e);
        console.log(value)
        this.setState({
            [type]: value
        })
    };

    render(){
        return (
            <div className="place">
                <div className="row">
                    <div className="col s12 input-field inline">
                        <label htmlFor=""><i className="fa fa-location-arrow" aria-hidden="true"></i> Enter your address: </label>
                        <input type="text" className="html" id="" defaultValue={this.state.address}/>
                    </div>
                    <div className="col s12 input-field inline">
                        <input type="text" className="" id="" defaultValue={this.state.descPlace}/>
                        <label htmlFor="exampleInputEmail1"><i className="fa fa-pencil" aria-hidden="true"></i> Write a short description about your place: (This is what users will see)</label>
                    </div>
                    <div className="col s12 input-field inline" style={{ paddingTop: '20px' }}>
                        <div id="map" style={{height: '400px', width:'100%'}}></div>
                    </div>
                    <div className="col s6 input-field inline">
                        <input type="text" className="" id="" defaultValue={this.state.address}/>
                        <label htmlFor=""><i className="fa fa-location-arrow" aria-hidden="true"></i> Enter your address: </label>
                    </div>
                    <div className="col s6 input-field inline">
                        <label htmlFor=""><i className="fa fa-usd" aria-hidden="true"></i> What is your monthly rent?</label>
                        <input type="text" className="" id="" defaultValue={this.state.monthlyRent}/>
                    </div>
                    <div className="col s6 input-field inline">
                        <input type="number" className="" id="beds" min='0' defaultValue={this.state.beds}/>
                        <label><i className="fa fa-bed" aria-hidden="true" htmlFor="beds"></i> How many beds can guests use?</label>
                    </div>
                    <div className="col s6 input-field inline">
                        <input type="number" className="" id="bathrooms" min='0' defaultValue={this.state.beds}/>
                        <label htmlFor="bathrooms"><i className="fa fa-bath" aria-hidden="true"></i> How many bathrooms can guest use?</label>
                    </div>
                    <div className="col s6 input-field inline">
                        <input type="number" className="" id="" defaultValue={this.state.guests}/>
                        <label htmlFor=""><i className="fa fa-users" aria-hidden="true"></i> Sleeps how many?</label>
                    </div>
                    <div className="col s6 input-field">
                        <label htmlFor=""><i className="fa fa-bed" aria-hidden="true"></i> How many bedrooms can guest use?</label>
                        <input type="number" className="" id="" defaultValue={this.state.guestBeds}/>
                    </div>
                    <div className="col s6 custom-switch" >
                        <div>Smoking Allowed?</div>
                        <div className="switch">
                            <label>
                                No
                                <input type="checkbox" />
                                <span className="lever"></span>
                                Yes
                            </label>
                        </div>
                    </div>
                    <div className="col s6 custom-switch" >
                        <div>Allow Pets?</div>
                        <div className="switch">
                            <label>
                                No
                                <input type="checkbox" onChange={e => this.checkBoxHelper(e, 'pets')}/>
                                <span className="lever"></span>
                                Yes
                            </label>
                        </div>
                    </div>
                    <div className="col s12 input-field inline" style={{ paddingRight: '0px' }}>
                        <label htmlFor="">What kind of pets are allowed?</label>
                        <input type="text" className="" id="" defaultValue={this.state.petType}/>
                    </div>
                    <div className="col s12">
                        <ButtonArrayComp getValueFunc={this.props.getValueFunc} buttonData={BUTTONS}/>
                    </div>
                    <div className="col s12">
                        <label>Write a detailed description about your place:</label>
                        <textarea className="materialize-textarea" ></textarea>
                        <p className="help-block text-danger"></p>
                    </div>
                    <div className="col s12">
                        <label>Special instructions:</label>
                        <textarea className="materialize-textarea" defaultValue={this.state.specInstruc}></textarea>
                        <p className="help-block text-danger"></p>
                    </div>
                    <div className="col s12">
                        <label>About the area &amp; neighborhood (transportatin, what's near, etc.)</label>
                        <textarea className="materialize-textarea"defaultValue={this.state.descNeighborhood} ></textarea>
                        <p className="help-block text-danger"></p>
                    </div>
                    <div className="panel panel-info">
                        <div className="panel-heading">Add photos &amp; videos</div>
                        <div className="panel-body">
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
        )
    }
}

PlaceComponent.propTypes = {
    getValueFunc: PropTypes.func.isRequired,
};

export default PlaceComponent;