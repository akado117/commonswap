import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { grey500, white } from 'material-ui/styles/colors';
import ThemeDefault from '../helpers/themes';
import Navbar from '../components/Navbar';

import UserActions from '../../actions/userActions';

class LoginPage extends React.Component {
    constructor() {
        super();

        this.state = {};
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.user.user !== prevProps.user.user) browserHistory.push('/profile');
    };

    componentDidMount = () => {
        Meteor.autorun(() => {
            if (Meteor.userId()) this.forceUpdate();
        });
    }

    render() {
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
            btn: {
                background: '#4f81e9',
                color: white,
                padding: 7,
                borderRadius: 2,
                margin: 2,
                fontSize: 13
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
        };

        const { UserActions } = this.props;
        return (
            <div>
                <Navbar></Navbar>
                <MuiThemeProvider muiTheme={ThemeDefault}>
                    <div>
                        <div style={styles.loginContainer}>

                            <div style={styles.buttonsDiv}>
                                <button href="" onClick={() => UserActions.loginWithOAuth('facebook')} style={{ ...styles.btn, ...styles.btnFacebook }}>
                                    <i className="fa fa-facebook fa-lg" />
                                    <span style={styles.btnSpan}>Log in with Facebook</span>
                                </button>
                                <button href="" onClick={() => UserActions.loginWithOAuth('google')} style={{ ...styles.btn, ...styles.btnGoogle }}>
                                    <i className="fa fa-google-plus fa-lg" />
                                    <span style={styles.btnSpan}>Log in with Google</span>
                                </button>
                                <button href="" onClick={() => UserActions.loginWithOAuth('twitter')} style={{ ...styles.btn, ...styles.btnTwitter }}>
                                    <i className="fa fa-twitter fa-lg" />
                                    <span style={styles.btnSpan}>Log in with Twitter</span>
                                </button>
                                <button href="" onClick={() => Meteor.logout(() => {this.forceUpdate()})} style={{ ...styles.btn, ...styles.btnTwitter }}>
                                    <i className={`fa ${Meteor.userId() ? 'fa-lock' : 'fa-key'} fa-lg`} />
                                    <span style={styles.btnSpan}>{Meteor.userId() ? 'Logout' : 'Please log in' }</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state;
    return {
        user
    };
}
function mapDispatchToProps(dispatch) {
    return {
        UserActions: bindActionCreators(UserActions, dispatch),
    };
}
//can also feed in dispatch mapper - this prevents the need to wrap every action function in dispatch
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);