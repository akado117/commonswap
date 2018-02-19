import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import UserActions from '../actions/userActions';
import ModalActions from '../actions/ModalActions';
import { loginTypes } from '../../../imports/lib/Constants';

const style = {
    width: '145px',
}

class SignupModalButton extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        Meteor.autorun(() => {
            if (Meteor.userId()) this.forceUpdate();
        });
    }

    getModalText = () => {
        if (!Meteor.userId()) {
            return (
                <div>
                    <h3>Please Sign-Up or Sign-In</h3>
                    <p>(An account will automatically be created when you sign in with social)</p>
                </div>
            );
        }
        const firstName = this.props.profile.firstName || this.props.user.firstName;
        if (firstName) return <h3>{`Welcome, ${firstName}`}</h3>;
        return <h3>Welcome, Traveler</h3>;
    }

    loginHandler = (type) => {
        const { userActions } = this.props;
        if (type === 'close') {
            userActions.LogUserOut(() => { this.forceUpdate(); });
        } else {
            userActions.loginWithOAuth(type);
        }
    }

    getModalContent  = () => (
        <div className="row">
            <div className="col s12 center-align">
                {this.getModalText()}
            </div>
            <div className="col s12 l6 center-align sign-up" style={{ marginBottom: '25px' }}>
                <RaisedButton
                    href="https://github.com/callemall/material-ui"
                    target="_blank"
                    label="Facebook"
                    backgroundColor="#3B5998"
                    labelColor="#ffffff"
                    className="sign-button"
                    icon={<FontIcon className="fa fa-facebook" />}
                    style={style}
                    onClick={() => this.loginHandler(loginTypes.facebook)}
                />
            </div>
            <div className="col s12 l6 center-align sign-up-mail">
                <RaisedButton
                    label="Google"
                    containerElement="label"
                    backgroundColor="#e14441"
                    labelColor="#ffffff"
                    icon={<FontIcon className="fa fa-google" />}
                    className="sign-button"
                    style={style}
                    onClick={() => this.loginHandler(loginTypes.google)}
                />
            </div>
        </div>
    )

    openSignupModal = () => {
        this.props.modalActions.openModal(this.getModalContent());
    }

    render() {
        return (
            <div className={this.props.className} style={{ margin: '0' }}>
                <RaisedButton
                    target="_blank"
                    label="Sign-Up!"
                    style={{ width: '100%' }}
                    primary
                    icon={<FontIcon className="material-icons">person outline</FontIcon>}
                    onClick={this.openSignupModal}
                />
            </div>
        );
    }
}

SignupModalButton.propTypes = {
    profile: PropTypes.object.isRequired,
    className: PropTypes.string,
    userActions: PropTypes.object.isRequired,
    userImage: PropTypes.object.isRequired,
}

SignupModalButton.defaultProps = {
    className: '',
}

function mapStateToProps(state) {
    const { user, profile, images } = state;
    return {
        user,
        userImage: images.profileImg,
        profile: profile.profile,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(UserActions, dispatch),
        modalActions: bindActionCreators(ModalActions, dispatch),
    };
}
//can also feed in dispatch mapper - this prevents the need to wrap every action function in dispatch
export default connect(mapStateToProps, mapDispatchToProps)(SignupModalButton);