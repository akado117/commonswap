import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileActions from '../../actions/ProfileActions';
import CardForm from '../../components/verificationComponent/CardForm';
import Emergency from '../../components/trust/emergency';

class Verify extends Component {
    componentDidMount() { }

    handleSubmit = (event) => {
        event.preventDefault();

    };

    saveContact = (data) => {
        const { firstName, lastName, relationship, phone, profile } = data;
        this.props.profileActions.saveContact({
            firstName,
            lastName,
            relationship,
            phone,
            profile,
        });
    }

    render() {
        return (
            <div>
                <CardForm></CardForm>
                <Emergency
                    saveContact={data => this.saveContact(data)}>
                </Emergency>
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
  
  Verify.propTypes = {
    user: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    profileActions: PropTypes.object.isRequired,
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Verify);
