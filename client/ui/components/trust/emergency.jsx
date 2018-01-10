import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import handleSignup from '../../../../imports/modules/signup';
import ProfileActions from '../../actions/ProfileActions';

class Emergency extends Component {
    componentDidMount() {
        if (Object.keys(this.props.profile.card).length < 1)
            this.props.profileActions.retrieveCardInfo();
    }

    handleSubmit = (event) => {
        event.preventDefault();

    };

    render() {
        return (
            <div>
                <AppBar
                    title={<span>Emergency Contacts</span>}
                    showMenuIconButton={false}
                    style={{ marginBottom: '10px', zIndex: '0' }}
                />
                <div className="row">
                    <div className="col s6 input-field inline">
                        <label htmlFor="school">Name</label>
                        <input type="text" className="validate" id="school" onChange={e => getValueFunc('occupation', onChangeHelper(e))} defaultValue={profile.occupation} />
                    </div>
                    <div className="col s6 input-field inline">
                        <label htmlFor="school">Relationship</label>
                        <input type="text" className="validate" id="school" onChange={e => getValueFunc('occupation', onChangeHelper(e))} defaultValue={profile.occupation} />
                    </div>
                    <div className="col s6 input-field inline">
                        <label htmlFor="school"><i className="fa fa-phone fa-1x" aria-hidden="true"></i>Phone Number</label>
                        <input placeholder="This information will be kept private" type="text" className="validate" id="emergencyPhone" onChange={e => getValueFunc('occupation', onChangeHelper(e))} defaultValue={profile.occupation} />
                    </div>
                </div>
                <div className="row">
                    <div className="col s12">
                        <RaisedButton label="Save Contacts" primary onClick={this.handleSubmit} />
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
    user: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    profileActions: PropTypes.object.isRequired,
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Emergency);
