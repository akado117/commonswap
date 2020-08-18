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
import { grey50 } from 'material-ui/styles/colors';
import ConnectedButton from '../forms/ConnectedButton';
import { actionTypes } from '../../helpers/ConstantsRedux';

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
            <div className="card-form">
                <span style={{ marginBottom: '1.0rem', fontSize: '24px' }}><i className="fa fa-lock" aria-hidden="true"></i> Billing Information</span>
                <div className="row">
                    <div className="col s12">
                        <div className="col s12">
                            <p>The credit card information you enter will be used for payment. This information will be secured and kept private.</p>
                        </div>
                    </div>
                    <div className="col s12">
                        <div className="col s7 saved-card">
                            <p>Last 4 digits of saved card</p>
                        </div>
                        <div className="col s5 saved-card">
                            <p>Card Type</p>
                        </div>
                    </div>
                    <div className="col s12">
                        <div className="col s7">
                            {card.last4}
                        </div>
                        <div className="col s5">
                            {card.brand}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col s8" style={{ marginBottom: '1.5rem', marginTop: '1.5rem' }}>
                        <Card ref={card => (this.card = card)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col m4 s10">
                        <ConnectedButton
                            icon={<i className="fa fa-floppy-o" aria-hidden="true"></i>}
                            buttonText="Update Card"
                            onClick={this.handleSubmit}
                            className=""
                            actionType={actionTypes.SAVE_CARD}
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

CardForm.propTypes = {
    user: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    profileActions: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardForm);
