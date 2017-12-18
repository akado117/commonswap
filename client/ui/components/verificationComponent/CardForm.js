import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Card from './Card';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import handleSignup from '../../../../imports/modules/signup';
import ProfileActions from '../../actions/ProfileActions';

class CardForm extends Component {
    componentDidMount() {
        if (Object.keys(this.props.profile.card).length < 1)
            this.props.profileActions.retrieveCardInfo();
    }

    handleSubmit = (event) => {
        event.preventDefault();
        handleSignup({ component: this });
    };

    render() {
        const { card } = this.props.profile;
        return (
            <div>
                <AppBar
                    title={<span><FontIcon className="material-icons">lock</FontIcon> Billing Information</span>}
                    showMenuIconButton={false}
                    style={{ marginBottom: '10px', zIndex: '0' }}
                />
                <div className="row">
                    <div className="col s12">
                        <p></p>
                    </div>
                     <div className="col s12">
                        <div className="col s6">
                            {card.last4}
                        </div>
                        <div className="col s6">
                            {card.brand}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col s8" style={{ marginBottom: '1.5rem', marginTop: '1.5rem' }}>
                        <Card ref={card => (this.card = card)} />
                    </div>
                    <div className="col s12">
                        <RaisedButton label="Update Card" primary onClick={this.handleSubmit} />
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
  
  CardForm.propTypes = {
    user: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    profileActions: PropTypes.object.isRequired,
  };

  export default connect(mapStateToProps, mapDispatchToProps)(CardForm);
