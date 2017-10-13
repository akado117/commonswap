import React, { Component } from 'react'


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
        return (
            <div className="row">
                <div className="col s9 offset-s3">
                    <div className="row">
                        <div className="col s6 input-field inline">
                            <input type="text" value={this.state.firstName} className="validate" />
                            <label htmlFor="firstName">First Name: </label>
                        </div>
                        <div className="col s6 input-field inline">
                            <input type="text" value={this.state.lastName} className="validate" id="lastName" />
                            <label htmlFor="lastName">Last Name: </label>
                        </div>
                        <div className="col s6 input-field inline">

                            <select type="text" value={this.state.gender} className="validate" placeholder="Gender *">
                                <option disabled defaultValue>Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                            <label htmlFor=""><i className="fa fa-venus fa-1x" aria-hidden="true"></i> I am: </label>
                        </div>
                        <div className="col s6 input-field inline">
                            <label htmlFor=""><i className="fa fa-birthday-cake fa-1x" aria-hidden="true"></i> Date of Birth</label>
                            <input type="text" className="datepicker"  value={this.state.birthday}/>
                        </div>
                        <div className="col s6 input-field inline">
                            <label><i className="fa fa-envelope-o fa-1x" aria-hidden="true"></i> Email</label>
                            <input type="email" className="" value={this.state.email} />
                            <p className="help-block text-danger"></p>
                        </div>
                        <div className="col s6 input-field inline">
                            <label><i className="fa fa-mobile fa-1x" aria-hidden="true"></i> Phone</label>
                            <input type="tel" className="" id="phone" value={this.state.phone}/>
                            <p className="help-block text-danger"></p>
                        </div>
                        <div className="col s6 input-field">
                            <select>
                                <option value={this.state.language} disabled defaultValue>Choose your Language</option>
                                <option>English</option>
                                <option>Spanish</option>
                                <option>Chinese</option>
                                <option>French</option>
                            </select>
                            <label>Preferred Language</label>
                        </div>
                        <div className="col s12 input-field inline">
                            <label><i className="fa fa-pencil" aria-hidden="true"></i> Describe Yourself:</label>
                            <textarea className="materialize-textarea" id="notes" value={this.state.descPersonal} ></textarea>
                            <p className="help-block text-danger"></p>
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
                    </div>
                </div>
            </div>
        )
    }
}