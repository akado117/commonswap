import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ButtonArrayComp from '../forms/ButtonArrayComp';
import TextFieldStandardized from '../forms/TextFieldStandardized';
import Address from './Address';

const BUTTONS = [
    { label: 'Essentials (towels, etc)', name: 'essentials' },
    { label: 'Wifi', name: 'wiFi' },
    { label: 'Heat', name: 'heat' },
    { label: 'Gym/ fitness center', name: 'gym' },
    { label: 'Washer/ dryer', name: 'washerDryer' },
    { label: 'Kitchen Appliances', name: 'kitchen' },
    { label: 'Closet/ drawers', name: 'dressers' },
    { label: 'Pool', name: 'pool' },
    { label: 'Parking', name: 'parking' },
];

function onChangeHelper(event) {
    return event.target.value;
};

class PlaceComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...props.place.place,
        };
    }

    componentDidMount = () => {
        if (Materialize.updateTextFields) {
            Materialize.updateTextFields();
        }
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.profile !== this.props.profile && Materialize.updateTextFields) {
            Materialize.updateTextFields();
        }
    }

    checkBoxHelper = (e, type) => {
        const value = e.target.checked;
        console.log(value)
        this.getValueFunc(type, value);
        this.setState({
            [type]: value,
        });
    };

    getValueFunc = (key, value) => {
        if (this.props.getValueFunc) {
            this.props.getValueFunc('place', key, value);
        }
    }

    render(){
        const getValFunc = this.getValueFunc;
        const { place, address, amenities } = this.props.place;
        return (
            <div className="place-container">
                <Address getValueFunc={(key,value) => this.props.getValueFunc('address', key, value)} defaultValues={address} />
                <div className="row">
                    <div className="col s12 input-field inline">
                        <input type="text" className="" id="short-desc" onChange={e => getValFunc('shortDesc', onChangeHelper(e)) } defaultValue={place.shortDesc} />
                        <label htmlFor="short-desc"><i className="fa fa-pencil" aria-hidden="true"></i> Write a short description about your place: (This is what users will see)</label>
                    </div>
                    <div className="col s6 input-field inline">
                        <label htmlFor="rent"><i className="fa fa-usd" aria-hidden="true"></i> What is your monthly rent?</label>
                        <input type="text" className="" id="rent" onChange={e => getValFunc('rent', onChangeHelper(e)) } defaultValue={place.rent} />
                    </div>
                    <div className="col s6 input-field inline">
                        <input type="number" className="" id="beds" min="0" onChange={e => getValFunc('beds', onChangeHelper(e)) } defaultValue={place.beds} />
                        <label htmlFor="beds"><i className="fa fa-bed" aria-hidden="true"></i> How many beds can guests use?</label>
                    </div>
                    <div className="col s6 input-field inline">
                        <input type="number" className="" id="bathrooms" min="0" onChange={e => getValFunc('bathrooms', onChangeHelper(e)) } defaultValue={place.bathrooms} />
                        <label htmlFor="bathrooms"><i className="fa fa-bath" aria-hidden="true"></i> How many bathrooms can guest use?</label>
                    </div>
                    <div className="col s6 input-field inline">
                        <input type="number" className="" id="guest-cap" onChange={e => getValFunc('numOfGuests', onChangeHelper(e)) } defaultValue={place.numOfGuests} />
                        <label htmlFor="guest-cap"><i className="fa fa-users" aria-hidden="true"></i> Sleeps how many?</label>
                    </div>
                    <div className="col s6 input-field">
                        <label htmlFor="bedroom-count"><i className="fa fa-bed" aria-hidden="true"></i> How many bedrooms can guest use?</label>
                        <input type="number" className="" id="bedroom-count" onChange={e => getValFunc('bedrooms', onChangeHelper(e)) } defaultValue={place.bedrooms} />
                    </div>
                    <div className="col s6 custom-switch" >
                        <div>Smoking Allowed?</div>
                        <div className="switch">
                            <label>
                                No
                                <input type="checkbox" onChange={e => this.checkBoxHelper(e, 'smoking')} checked={this.state.smoking || false} />
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
                                <input type="checkbox" onChange={e => this.checkBoxHelper(e, 'pets')} checked={this.state.pets || false} />
                                <span className="lever"></span>
                                Yes
                            </label>
                        </div>
                    </div>
                    <div className="col s12 input-field inline" style={{ paddingRight: '0px' }}>
                        <label htmlFor="pet-type">What kind of pets are allowed?</label>
                        <input type="text" className="" id="pet-type" onChange={e => getValFunc('typeOfPets', onChangeHelper(e)) } defaultValue={place.typeOfPets} />
                    </div>
                    <div className="col s12 amenities-container">
                        <ButtonArrayComp
                            getValueFunc={(key, value) => this.props.getValueFunc('amenities', key, value) }
                            defaultValues={amenities}
                            buttonData={BUTTONS}
                        />
                    </div>
                    <div className="col s12">
                        <TextFieldStandardized
                            floatingLabelText="Write a detailed description about your place:"
                            onChange={(e, value) => getValFunc('detailedDesc', value)}
                            extraProps={{ defaultValue: place.detailedDesc }}
                        />
                    </div>
                    <div className="col s12">
                        <TextFieldStandardized
                            floatingLabelText="Special Instructions?"
                            onChange={(e, value) => getValFunc('specialInst', value)}
                            extraProps={{ defaultValue: place.specialInst }}
                        />
                    </div>
                    <div className="col s12">
                        <TextFieldStandardized
                            floatingLabelText="About the Area & Neighborhood (Transportatin, What's Near, etc.)"
                            onChange={(e, value) => getValFunc('notesOnArea', value)}
                            extraProps={{ defaultValue: place.notesOnArea }}
                        />
                    </div>
                    <div className="col s12">
                        <div className="row">
                            <div className="col s3 offset-s9">
                                <button
                                    className="waves-effect waves-light btn-large"
                                    type="submit"
                                    style={{ width: '100%' }}
                                    onClick={this.props.savePlace}
                                >
                                    <i className="fa fa-floppy-o fa-1x" aria-hidden="true" style={{ float: 'left' }} />Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

PlaceComponent.propTypes = {
    getValueFunc: PropTypes.func.isRequired,
    place: PropTypes.object.isRequired,
    savePlace: PropTypes.func.isRequired,
};

export default PlaceComponent;