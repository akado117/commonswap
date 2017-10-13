import React from 'react';
import { connect }  from 'react-redux';
import { bindActionCreators }  from 'redux';
import { Router } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import {grey500, white} from 'material-ui/styles/colors';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Help from 'material-ui/svg-icons/action/help';
import TextField from 'material-ui/TextField';
import {Link} from 'react-router';
import ThemeDefault from '../helpers/themes';

import Uploader from '../components/Uploader';

import UserActions from '../../actions/userActions';

class LoginPage extends React.Component {
    constructor() {
        super();

        this.state = {}
    }

    componentDidUpdate = () => {
        if (this.props.user.user) Router.push('/login')

    };

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
            <MuiThemeProvider muiTheme={ThemeDefault}>
                <div>
                    <div style={styles.loginContainer}>

                        <Paper style={styles.paper}>

                            <form>
                                <TextField
                                    hintText="E-mail"
                                    floatingLabelText="E-mail"
                                    fullWidth={true}
                                />
                                <TextField
                                    hintText="Password"
                                    floatingLabelText="Password"
                                    fullWidth={true}
                                    type="password"
                                />

                                <div>
                                    <Checkbox
                                        label="Remember me"
                                        style={styles.checkRemember.style}
                                        labelStyle={styles.checkRemember.labelStyle}
                                        iconStyle={styles.checkRemember.iconStyle}
                                    />

                                    <Link to="/">
                                        <RaisedButton label="Login"
                                                      primary={true}
                                                      style={styles.loginBtn}/>
                                    </Link>
                                </div>
                            </form>
                        </Paper>

                        <div style={styles.buttonsDiv}>
                            <FlatButton
                                label="Register"
                                href="/"
                                style={styles.flatButton}
                                icon={<PersonAdd />}
                            />

                            <FlatButton
                                label="Forgot Password?"
                                href="/"
                                style={styles.flatButton}
                                icon={<Help />}
                            />
                        </div>

                        <div style={styles.buttonsDiv}>
                            <button href="" onClick={UserActions.loginWithFacebook} style={{...styles.btn, ...styles.btnFacebook}}>
                                <i className="fa fa-facebook fa-lg"/>
                                <span style={styles.btnSpan}>Log in with Facebook</span>
                            </button>
                            <button href=""  onClick={UserActions.loginWithGoogle} style={{...styles.btn, ...styles.btnGoogle}}>
                                <i className="fa fa-google-plus fa-lg"/>
                                <span style={styles.btnSpan}>Log in with Google</span>
                            </button>
                            <button href=""  onClick={UserActions.loginWithTwitter} style={{...styles.btn, ...styles.btnTwitter}}>
                                <i className="fa fa-twitter fa-lg"/>
                                <span style={styles.btnSpan}>Log in with Twitter</span>
                            </button>
                        </div>
                        <Uploader/>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

function mapStateToProps(state) {
    const {user} = state;
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