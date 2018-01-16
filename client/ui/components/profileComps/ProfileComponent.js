import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'material-ui/DatePicker';
import SelectBuilder from '../forms/SelectBuilder.js'
import ButtonArrayComp from '../forms/ButtonArrayComp.js'
import TextFieldStandardized from '../forms/TextFieldStandardized';
import ProfileImage from './ProfileImage';
import { ParseDate } from '../../../../imports/helpers/DateHelpers';
import ConnectedButton from '../forms/ConnectedButton';
import { actionTypes } from '../../helpers/ConstantsRedux';

function onChangeHelper(event) {
    return event.target.value;
}

class ProfileComponent extends Component {

    BUTTONS = [
        { label: 'Beach Bum', name: 'beachBum' },
        { label: 'Photography', name: 'photography' },
        { label: 'Wineries', name: 'wineries' },
        { label: 'Film Buff', name: 'film' },
        { label: 'Hiker', name: 'hiking' },
        { label: 'Clubbing & Nightlife', name: 'clubber' },
        { label: 'Live Music & Concerts', name: 'liveMusic' },
        { label: 'Food & Restaurants', name: 'foodie' },
        { label: 'Organized Tours', name: 'orgTour' },
    ];

    constructor() {
        super()

        this.state = {
            firstName: '',
            lastName: '',
            gender: '',
            birthday: '',
            email: '',
            phone: '',
            language: '',
            descPersonal: '',
            school: '',
            classOf: '',
            occupation: '',
            cleanliness: 45,
            personality: 65,
            beachBum: true,
            wineries: true,
            photography: false,
            film: true,
            hiking: false,
            clubbing: true,
            concerts: true,
            food: true,
            tours: false,
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

    addDefaultToMap = (value, key) => {
        if (value) this.getValueFunc(key, value);
        return value;
    }

    render() {
        const getValueFunc = this.getValueFunc;
        const { profile, interests } = this.props.profile;
        const user = this.props.user;
        const genderFields = {
            defaultField: <span><i className="fa fa-venus fa-1x" aria-hidden="true"></i> I am: </span>,
            fields: {
                displayNames: ['Male', 'Female', 'Non-Binary', 'Trans', 'Other'],
                values: ['male', 'female', 'nonbinary', 'trans', 'other'],
            },
        };

        const langFields = {
            defaultField: 'Preferred Language',
            fields: {
                displayNames: ['English', 'Spanish', 'Chinese', 'French'],
                values: ['english', 'spansih', 'chinese', 'french'],
            },
        };

        return (
            <div className="row">
                <div className="col s6 m4 ">
                    <ProfileImage
                        imageSrc={this.props.profileImg.url || user.picture}
                        profile={profile}
                        saveProfileImage={this.props.saveProfileImage}
                    />
                </div>
                <div className="col s6 m4 input-field inline">
                    <input id="firstName" type="text" onChange={e => getValueFunc('firstName', onChangeHelper(e))} className="validate" defaultValue={profile.firstName || this.addDefaultToMap(user.firstName, 'firstName')} />
                    <label htmlFor="firstName">First Name </label>
                </div>
                <div className="col s6 m4 input-field inline">
                    <input id="lastName" type="text" onChange={e => getValueFunc('lastName', onChangeHelper(e))} className="validate" defaultValue={profile.lastName || this.addDefaultToMap(user.lastName, 'lastName')} />
                    <label htmlFor="lastName">Last Name </label>
                </div>
                <div className="col s6 m4 input-field inline">
                    <label htmlFor="email"><i className="fa fa-envelope-o fa-1x" aria-hidden="true"></i> Email</label>
                    <input id="email" type="email" className="" onChange={e => getValueFunc('email', onChangeHelper(e))} defaultValue={profile.email || this.addDefaultToMap(user.email, 'email')} />
                </div>
                <div className="col s6 m4 input-field inline">
                    <label htmlFor="phone"><i className="fa fa-mobile fa-1x" aria-hidden="true"></i> Phone</label>
                    <input type="tel" className="" id="phone" onChange={e => getValueFunc('phone', onChangeHelper(e))} defaultValue={profile.phone} />
                </div>
                <div className="col s6 m4 input-field inline">
                    <DatePicker
                        className="date-picker"
                        defaultDate={typeof profile.birthday !== 'undefined' ? ParseDate(profile.birthday) : undefined}
                        onChange={(nul, date) => getValueFunc('birthday', date)}
                        floatingLabelText={<span><i className="fa fa-birthday-cake fa-1x" aria-hidden="true"></i> Date of Birth</span>}
                    />
                </div>
                <div className="col s6 m4">
                    <SelectBuilder
                        label={<span><i className="fa fa-venus fa-1x" aria-hidden="true"></i>Gender</span>}
                        onChange={value => getValueFunc('gender', value)}
                        selectArrObj={genderFields.fields}
                        defaultSelection={genderFields.defaultField}
                        defaultValue={profile.gender}
                        extraProps={{ floatingLabelFixed: true }}
                    />
                </div>
                <div className="col s6 m4">
                    <SelectBuilder
                        label="Language"
                        onChange={value => getValueFunc('lang', value)}
                        selectArrObj={langFields.fields}
                        defaultSelection={langFields.defaultField}
                        defaultValue={profile.lang}
                        extraProps={{ floatingLabelFixed: true }}
                    />
                </div>
                <div className="col s12">
                    <div className="card-panel teal">
                        <span className="white-text">
                            CommonSwap relies on the trust and respect of our
                            community. Tell us a little bit about yourself to get to know you. What’s
                            your favorite music genre or sports team? What’s your ideal Friday
                            night activity? Have a fun fact?
                        </span>
                    </div>
                </div>
                <div className="col s12">
                    <TextFieldStandardized
                        floatingLabelText={<span><i className="fa fa-pencil" aria-hidden="true"></i> Describe Yourself</span>}
                        onChange={(e, value) => getValueFunc('personalSummary', value)}
                        hintText={"Hello! My name is Mike and I work in marketing. I am a big fan of traveling, trying out new restaurants, and attending music festivals. My favorite team is the Lakers and my favorite music artist is Drake. Feel free to reach out to learn more!"}
                        extraProps={{
                            defaultValue: profile.personalSummary,
                        }}
                    />
                </div>
                <div className="col s4 input-field inline">
                    <label htmlFor="school"><i className="fa fa-university fa-1x" aria-hidden="true"></i> School/Alma Mater</label>
                    <input type="text" className="validate" id="school" onChange={e => getValueFunc('school', onChangeHelper(e))} defaultValue={profile.school} />
                </div>
                <div className="col s2 input-field inline">
                    <label htmlFor="class">Class of: </label>
                    <input id="class" type="number" min="1950" max="2035" className="validate" onChange={e => getValueFunc('classOf', onChangeHelper(e))} defaultValue={profile.classOf} />
                </div>
                <div className="col s6 input-field inline">
                    <label htmlFor="occupation"><i className="fa fa-industry fa-1x" aria-hidden="true"></i> Occupation/Industry</label>
                    <input type="text" className="validate" id="school" onChange={e => getValueFunc('occupation', onChangeHelper(e))} defaultValue={profile.occupation} />
                </div>
                <div className="col s12">
                    <p className="range-field">
                        <label htmlFor="amount">Somewhat clean</label>
                        <label htmlFor="amount" style={{ float: 'right' }}>Clean</label>
                        <input type="range" id="cleanliness" min="0" max="100" onChange={e => getValueFunc('cleanliness', onChangeHelper(e))} defaultValue={profile.cleanliness} />
                    </p>
                </div>
                <div className="col s12">
                    <p className="range-field">
                        <label htmlFor="amount">A Homebody</label>
                        <label htmlFor="amount" style={{ float: 'right' }} >A Party Animal</label>
                        <input type="range" id="personality" min="0" max="100" onChange={e => getValueFunc('personality', onChangeHelper(e))} defaultValue={profile.personality} />
                    </p>
                </div>
                <div className="col s12">
                    <div className="card-panel teal">
                        <span className="white-text">
                            For a more compatible swap, check off your interests below. If
                            you can’t find an interest you would like to include, list it in the “Describe
                            Yourself” section.
                        </span>
                    </div>
                </div>
                <ButtonArrayComp getValueFunc={(key, value) => this.props.getValueFunc('interests', key, value)} buttonData={this.BUTTONS} defaultValues={interests} />
                <div className="col s12">
                    <div className="row">
                        <div className="col s6 m4 l3 offset-m4 offset-l6">
                            <ConnectedButton
                                icon={<i className="fa fa-floppy-o fa-1x" aria-hidden="true" style={{ float: 'left' }} />}
                                actionType={actionTypes.SAVE_PROFILE}
                                buttonText="Save"
                                onClick={() => this.props.saveProfile()}
                            />
                        </div>
                        <div className="col s6 m4 l3">
                            <ConnectedButton
                                icon={<i className="fa fa-floppy-o fa-1x" aria-hidden="true" style={{ float: 'left' }} />}
                                actionType={actionTypes.SAVE_PROFILE}
                                buttonText="Next"
                                onClick={() => this.props.saveProfile(true)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ProfileComponent.propTypes = {
    getValueFunc: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    saveProfile: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    saveProfileImage: PropTypes.func.isRequired,
    profileImg: PropTypes.object.isRequired,
};


export default ProfileComponent;