import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserActions from '../../actions/userActions';
import ModalActions from '../../actions/ModalActions';
import { loginTypes } from '../../../../imports/lib/Constants';


const style = {
    width: '145px',
};

class SignUpModal extends React.Component {
    componentDidMount = () => {
        Tracker.autorun(() => {
            if (Meteor.userId()) this.forceUpdate();
        });
    }

    getModalText = () => {
        if (!Meteor.userId()) {
            return (
                <div>
                    <h3>{this.props.title || 'Please Sign-Up or Sign-In'}</h3>
                    <p>(An account will automatically be created when you sign in with social)</p>
                </div>
            );
        }
        const firstName = this.props.profile.firstName || this.props.user.firstName;
        if (firstName) return <h3>{`Welcome, ${firstName}`}</h3>;
        return <h3>Welcome, Traveler</h3>;
    }

    loginCallBackHandler = () => {
        if (this.props.onLogIn) this.props.onLogIn();
    }

    loginHandler = (type) => {
        const { userActions } = this.props;
        if (type === 'close') {
            userActions.LogUserOut(() => { this.forceUpdate(); });
            this.loginCallBackHandler();
        } else if (type) {
            userActions.loginWithOAuth(type, () => this.loginCallBackHandler());
        }
    }

    render() {
        return (
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
        );
    }
}

SignUpModal.propTypes = {
    profile: PropTypes.object.isRequired,
    className: PropTypes.string,
    userActions: PropTypes.object.isRequired,
    modalActions: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    onLogIn: PropTypes.func,
    title: PropTypes.string,
}

SignUpModal.defaultProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpModal);
