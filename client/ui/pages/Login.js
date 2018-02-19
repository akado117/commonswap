import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { grey500, white } from 'material-ui/styles/colors';
import UserActions from '../actions/userActions';
import { loginTypes } from "../../../imports/lib/Constants";

const styles = {
    loginContainer: {
        minWidth: 320,
        maxWidth: 400,
        height: 'auto',
        position: 'absolute',
        top: '20%',
        left: 0,
        right: 0,
        margin: 'auto'
    },
    paper: {
        padding: 20,
        overflow: 'auto'
    },
    buttonsDiv: {
        textAlign: 'center',
        padding: 10
    },
    flatButton: {
        color: grey500
    },
    checkRemember: {
        style: {
            float: 'left',
            maxWidth: 180,
            paddingTop: 5
        },
        labelStyle: {
            color: grey500
        },
        iconStyle: {
            color: grey500,
            borderColor: grey500,
            fill: grey500
        }
    },
    loginBtn: {
        float: 'right'
    },
    btnFacebook: {
        background: '#4f81e9'
    },
    btnTwitter: {
        background: '#4099FF'
    },
    btnGoogle: {
        background: '#e14441'
    },
    btnSpan: {
        marginLeft: 5
    },
    menuItem: {
        padding: '0',
    },
};

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.user.user !== prevProps.user.user) this.setState({ open: false });
    };

    componentDidMount = () => {
        Meteor.autorun(() => {
            if (Meteor.userId()) this.forceUpdate();
        });
    }
 
    handleTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    getDropDownText = () => {
        if (!Meteor.userId()) return 'Login';
        const firstName = this.props.profile.firstName || this.props.user.firstName;
        if (firstName) return `Welcome, ${firstName}`;
        return 'Welcome, Traveler';
    }

    getButtonElement = () => {
        const imgUrl = this.props.userImage.url ||this.props.user.picture;
        const photo = imgUrl ? <div className="img-holder"><img src={imgUrl} alt="" /></div> : <i className="fa fa-user-o fa-1x" aria-hidden="true" />;
        return (
            <div className={`button-element align-center ${Meteor.userId() ? 'logged-in' : ''}`}>
                <span className="hide-on-small-only">{this.getDropDownText()}</span>{photo}
            </div>);
    }

    loginHandler = (type) => {
        const { userActions } = this.props;
        if (type === 'close') {
            userActions.LogUserOut(() => { this.forceUpdate(); });
        } else {
            userActions.loginWithOAuth(type);
        }
        this.handleRequestClose();
    }

    getLoginButtons = userId => (!userId ?
        <div>
            <MenuItem innerDivStyle={styles.menuItem}>
                <button className="login-button" href="" onClick={() => this.loginHandler(loginTypes.facebook)} style={{...styles.btnFacebook }}>
                    <i className="fa fa-facebook fa-lg" />
                    <span style={styles.btnSpan}>Log in with Facebook</span>
                </button>
            </MenuItem>
            <MenuItem innerDivStyle={styles.menuItem}>
                <button className="login-button" href="" onClick={() => this.loginHandler(loginTypes.google)} style={{...styles.btnGoogle }}>
                    <i className="fa fa-google-plus fa-lg" />
                    <span style={styles.btnSpan}>Log in with Google</span>
                </button>
            </MenuItem>
        </div> : null);

    render() {
        const { className } = this.props;
        return (
            <div className={className}>
                <button onClick={this.handleTouchTap} className="pop-over-login-button" >
                    {this.getButtonElement()}
                </button>
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                    onRequestClose={this.handleRequestClose}
                    autoCloseWhenOffScreen
                >
                    <Menu className="login-container">
                        {this.getLoginButtons(Meteor.userId())}
                        {/*<button href="" onClick={() => UserActions.loginWithOAuth('twitter')} style={{ ...styles.btn, ...styles.btnTwitter }}>*/}
                        {/*<i className="fa fa-twitter fa-lg" />*/}
                        {/*<span style={styles.btnSpan}>Log in with Twitter</span>*/}
                        {/*</button>*/}
                        {Meteor.userId() ? <MenuItem innerDivStyle={styles.menuItem}>
                            <button className="login-button" href="" onClick={() => this.loginHandler('close')} style={{...styles.btnTwitter }}>
                                <i className={`fa ${Meteor.userId() ? 'fa-lock' : 'fa-key'} fa-lg`} />
                                <span style={styles.btnSpan}>Logout</span>
                            </button>
                        </MenuItem> : null}
                    </Menu>
                </Popover>
            </div>
        );
    }
}

LoginPage.propTypes = {
    profile: PropTypes.object.isRequired,
    className: PropTypes.string,
    userActions: PropTypes.object.isRequired,
    userImage: PropTypes.object.isRequired,
}

LoginPage.defaultProps = {
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
    };
}
//can also feed in dispatch mapper - this prevents the need to wrap every action function in dispatch
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);