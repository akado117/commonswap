import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectBuilder from '../forms/SelectBuilder.jsx'

function onChangeHelper(event) {
    return event.target.value
}

class ProfileComponet extends  Component {
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

    render() {
        const { getValueFunc } = this.props;
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
                        <input type="text" onChange={e => getValueFunc('firstName', onChangeHelper(e))} className="validate" />
                        <label htmlFor="firstName">First Name: </label>
                    </div>
                    <div className="col s6 input-field inline">
                        <input type="text" onChange={e => getValueFunc('lastName', onChangeHelper(e))} className="validate" id="lastName" />
                        <label htmlFor="lastName">Last Name: </label>
                    </div>
                </div>
                <div className="row">
                    <div className="col s6 input-field inline">
                        <SelectBuilder onChange={(value) => getValueFunc('gender', value)}
                                       selectArrObj={genderFields.fields}
                                       defaultSelection={genderFields.defaultField}/>
                    </div>
                    <div className="col s6 input-field">
                        <SelectBuilder onChange={(value) => getValueFunc('lang', value)}
                                       selectArrObj={langFields.fields}
                                       defaultSelection={langFields.defaultField}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col s6 input-field inline">
                        <label htmlFor=""><i className="fa fa-birthday-cake fa-1x" aria-hidden="true"></i> Date of Birth</label>
                        <input type="text" className="datepicker" onChange={e => getValueFunc('birthday', onChangeHelper(e))}/>
                    </div>
                    <div className="col s6 input-field inline">
                        <label><i className="fa fa-envelope-o fa-1x" aria-hidden="true"></i> Email</label>
                        <input type="email" className="" onChange={e => getValueFunc('email', onChangeHelper(e))} />
                        <p className="help-block text-danger"></p>
                    </div>
                </div>
                <div className="row">
                    <div className="col s6 input-field inline">
                        <label><i className="fa fa-mobile fa-1x" aria-hidden="true"></i> Phone</label>
                        <input type="tel" className="" id="phone" onChange={e => getValueFunc('phone', onChangeHelper(e))}/>
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
                        <textarea className="materialize-textarea" id="notes" onChange={e => getValueFunc('personalSummary', onChangeHelper(e))} ></textarea>
                        <p className="help-block text-danger"></p>
                    </div>
                </div>
                <div className="row">
                    <div className="col s6 input-field inline">
                        <label><i className="fa fa-university fa-1x" aria-hidden="true"></i> School</label>
                        <input type="text" className="validate" id="school" onChange={e => getValueFunc('school', onChangeHelper(e))}/>
                    </div>
                    <div className="col s6 input-field inline">
                        <label>Class of: </label>
                        <input type="number" min="1950" max="2035" className="validate" onChange={e => getValueFunc('classOf', onChangeHelper(e))}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <p className="range-field">
                            <label htmlFor="amount">Somewhat clean</label>
                            <label htmlFor="amount" style={{ float: 'right' }}>Clean</label>
                            <input type="range" id="test5" min="0" max="100" onChange={e => getValueFunc('cleanliness', onChangeHelper(e))}/>
                        </p>
                    </div>
                    <div className="col s12">
                        <p className="range-field">
                            <label htmlFor="amount">A Homebody</label>
                            <label htmlFor="amount" style={{ float: 'right' }} onChange={e => getValueFunc('personality', onChangeHelper(e))}>A Party Animal</label>
                            <input type="range" id="test5" min="0" max="100" />
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

ProfileComponet.propTypes = {
    getValueFunc: PropTypes.func,
};

export default ProfileComponet;