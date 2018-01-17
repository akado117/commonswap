import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import handleSignup from '../../../../imports/modules/signup';
import ProfileActions from '../../actions/ProfileActions';
import { onChangeHelper } from '../../../../imports/helpers/DataHelpers';
import { actionTypes } from '../../helpers/ConstantsRedux';
import ConnectedButton from '../forms/ConnectedButton';

class Emergency extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName:'',
            relationship:'',
            phone:'',
        };
    }

    // function onChangeHelper(event) {
    //     return event.target.value;
    // }

    handleSubmit = (event) => {
        event.preventDefault();
    };

    render() {
        const getValueFunc = this.getValueFunc;
        const { profile } = this.props.profile;
        const user = this.props.user;
        return (
            <div>
                <AppBar
                    title={<span>Emergency Contacts</span>}
                    showMenuIconButton={false}
                    style={{ marginBottom: '10px', zIndex: '0' }}
                />
                <div className="row">

                    <div className="col s12 m6 input-field inline">
                        <label htmlFor="firstName">First Name</label>
                        <input 
                            type="text" 
                            className="validate" 
                            id="firstName" 
                            onChange={e => this.setState({ firstName: onChangeHelper(e)})} 
                            defaultValue={this.state.firstName} />
                    </div>

                    <div className="col s12 m6 input-field inline">
                        <label htmlFor="lastName">Last Name</label>
                        <input 
                            type="text" 
                            className="validate" 
                            id="lastName" 
                            onChange={e => this.setState({ lastName: onChangeHelper(e)})} 
                            defaultValue={this.state.lastName} />
                    </div>

                    <div className="col s12 m6 input-field inline">
                        <label htmlFor="realtionship">Relationship</label>
                        <input 
                            type="text" 
                            className="validate" 
                            id="phone" 
                            onChange={e => this.setState({ relationship: onChangeHelper(e)})} 
                            defaultValue={this.state.relationship} />
                    </div>

                    <div className="col s12 m6 input-field inline">
                        <label htmlFor="phone">Phone</label>
                        <input 
                            type="text" 
                            className="validate" 
                            id="phone" 
                            onChange={e => this.setState({ phone: onChangeHelper(e)})} 
                            defaultValue={this.state.phone} />
                    </div>
                
                </div>
                <div className="row">
                    <div className="col m4 s9">
                        <ConnectedButton
                            icon={<i className="fa fa-floppy-o" aria-hidden="true"></i>}
                            actionType={actionTypes.SAVE_CONTACT}
                            buttonText="Save Contact"
                            onClick={() => this.props.saveContact(this.state)}
                            className=""
                        />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { profile, user } = state;
    return {
        profile,
        user,
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
        profileActions: bindActionCreators(ProfileActions, dispatch),
    };
  }
  
  Emergency.propTypes = {
    saveContact: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    profileActions: PropTypes.object.isRequired,
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Emergency);
