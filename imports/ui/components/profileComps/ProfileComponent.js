import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectBuilder from '../forms/SelectBuilder.js'
import ButtonArray from '../forms/ButtonArrayComp.js'

function onChangeHelper(event) {
    return event.target.value;
}

class ProfileComponent extends Component {

    BUTTONS = [
        {label: 'Beach Bum', name: 'beachBum'},
        {label: 'Photography', name: 'photography'},
        {label: 'Wineries', name: 'wineries'},
        {label: 'Film Buff', name: 'film'},
        {label: 'Hiker', name: 'hiking'},
        {label: 'Clubbing & Nightlife', name: 'clubber'},
        {label: 'Live Music & Concerts', name: 'liveMusic'},
        {label: 'Food & Restaurants', name: 'foodie'},
        {label: 'Organized Tours', name: 'orgTour'},
    ];

    constructor() {
        super()

        this.state = {
            firstName: '',
            lastName: '',
            gender:'',
            birthday:'',
            email:'',
            phone:'',
            language:'',
            descPersonal:'',
            school:'',
            classOf:'',
            cleanliness:45,
            personality:65,
            beachBum: true,
            wineries: true,
            photography:false,
            film: true,
            hiking:false,
            clubbing:true,
            concerts:true,
            food:true,
            tours:false,
        }
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

    getValueFunc = (key, value) => {
        if (this.props.getValueFunc) {
            this.props.getValueFunc('profile', key, value);
        }
    }

    render() {
        const getValueFunc = this.getValueFunc;
        const { profile, interests } = this.props.profile;
        const genderFields = {
            defaultField: <span><i className="fa fa-venus fa-1x" aria-hidden="true"></i> I am: </span>,
            fields: {
                displayNames: ['Male', 'Female'],
                values: ['male', 'female'],
            }
        };

        const langFields = {
            defaultField: 'Preferred Language',
            fields: {
                displayNames: ['English', 'Spanish', 'Chinese', 'French'],
                values: ['english', 'spansih', 'chinese', 'french'],
            }
        };

        return (
            <div className="row">
                <div className="row">
                    <div className="col s6 input-field inline">
                        <input type="text" onChange={e => getValueFunc('firstName', onChangeHelper(e))} className="validate" defaultValue={profile.firstName} />
                        <label htmlFor="firstName">First Name: </label>
                    </div>
                    <div className="col s6 input-field inline">
                        <input type="text" onChange={e => getValueFunc('lastName', onChangeHelper(e))} className="validate" id="lastName" defaultValue={profile.lastName} />
                        <label htmlFor="lastName">Last Name: </label>
                    </div>
                </div>
                <div className="row">
                    <div className="col s6 input-field inline">
                        <SelectBuilder
                            onChange={(value) => getValueFunc('gender', value)}
                            selectArrObj={genderFields.fields}
                            defaultSelection={genderFields.defaultField}
                        />
                    </div>
                    <div className="col s6 input-field">
                        <SelectBuilder
                            onChange={(value) => getValueFunc('lang', value)}
                            selectArrObj={langFields.fields}
                            defaultSelection={langFields.defaultField}
                            defaultValue={profile.firstName}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col s6 input-field inline">
                        <label htmlFor=""><i className="fa fa-birthday-cake fa-1x" aria-hidden="true"></i> Date of Birth</label>
                        <input type="text" className="datepicker" onChange={e => getValueFunc('birthday', onChangeHelper(e))} defaultValue={profile.birthday} />
                    </div>
                    <div className="col s6 input-field inline">
                        <label><i className="fa fa-envelope-o fa-1x" aria-hidden="true"></i> Email</label>
                        <input type="email" className="" onChange={e => getValueFunc('email', onChangeHelper(e))} defaultValue={profile.email} />
                        <p className="help-block text-danger"></p>
                    </div>
                </div>
                <div className="row">
                    <div className="col s6 input-field inline">
                        <label><i className="fa fa-mobile fa-1x" aria-hidden="true"></i> Phone</label>
                        <input type="tel" className="" id="phone" onChange={e => getValueFunc('phone', onChangeHelper(e))} defaultValue={profile.phone} />
                        <p className="help-block text-danger"></p>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <div className="card-panel teal">
                            <span className="white-text">
                                CommonSwap relies on the trust and respect of our community! Tell us a little about yourself to get to know you. What's your favorite food? What's your ideal Friday night activity? Have a fun fact?
                            </span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 input-field inline">
                        <label><i className="fa fa-pencil" aria-hidden="true"></i> Describe Yourself:</label>
                        <textarea className="materialize-textarea" id="notes" onChange={e => getValueFunc('personalSummary', onChangeHelper(e))} defaultValue={profile.personalSummary} />
                        <p className="help-block text-danger"></p>
                    </div>
                </div>
                <div className="row">
                    <div className="col s6 input-field inline">
                        <label><i className="fa fa-university fa-1x" aria-hidden="true"></i> School</label>
                        <input type="text" className="validate" id="school" onChange={e => getValueFunc('school', onChangeHelper(e))} defaultValue={profile.school} />
                    </div>
                    <div className="col s6 input-field inline">
                        <label>Class of: </label>
                        <input type="number" min="1950" max="2035" className="validate" onChange={e => getValueFunc('classOf', onChangeHelper(e))} defaultValue={profile.classOf} />
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <p className="range-field">
                            <label htmlFor="amount">Somewhat clean</label>
                            <label htmlFor="amount" style={{ float: 'right' }}>Clean</label>
                            <input type="range" id="test5" min="0" max="100" onChange={e => getValueFunc('cleanliness', onChangeHelper(e))} defaultValue={profile.cleanliness} />
                        </p>
                    </div>
                    <div className="col s12">
                        <p className="range-field">
                            <label htmlFor="amount">A Homebody</label>
                            <label htmlFor="amount" style={{ float: 'right' }} >A Party Animal</label>
                            <input type="range" id="test5" min="0" max="100" onChange={e => getValueFunc('personality', onChangeHelper(e))} defaultValue={profile.personality} />
                        </p>
                    </div>
                </div>
                <ButtonArray getValueFunc={(key, value) => this.props.getValueFunc('interests', key, value)} buttonData={this.BUTTONS} defaultValues={interests} />
            </div>
        );
    }
}

ProfileComponent.propTypes = {
    getValueFunc: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};


export default ProfileComponent;