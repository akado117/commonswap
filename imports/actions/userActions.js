import { graphql, gql } from 'react-apollo';
import { actionTypes, SUCCESS, FAILURE } from '../lib/Constants';
import ProfileActions from './ProfileActions';
import PlaceActions from './PlaceActions';
import FileActions from './FileActions';
import Store from '../store/store';
import { mapUserServiceToProfile } from '../helpers/userHelper';

const actions = {
    loginWithOAuth: (loginType) => {
        const callBack = (error, res, dispatch) => {
            if (error) {
                console.warn('something bad happened:', error);
                return dispatch({
                    type: `${actionTypes.LOGIN_}${FAILURE}`,
                });
            };
            // return dispatch({ //this is handled with the onLogin listener at this time. Thanks meteor
            //     type: `${actionTypes.LOGIN_}${SUCCESS}`,
            // });
        };
        const loginFunctions = {
            facebook: dispatch => Meteor.loginWithFacebook(/*{ requestPermissions: ['public_profile', 'email', 'user_location', 'user_birthday'] }, */(error,res) => callBack(error, res, dispatch)),
            google: dispatch => Meteor.loginWithGoogle((error,res) => callBack(error, res, dispatch)),
            twitter: dispatch => Meteor.loginWithTwitter((error,res) => callBack(error, res, dispatch)),
        };
        if (!loginType[loginType]) console.error(`${loginType} is not a defined loginType`);
        return loginFunctions[loginType];
    },
    userLoggedIn: () => {
        Store.dispatch(FileActions.getImageForProfile());
        Store.dispatch(ProfileActions.upsertProfile({}, () => Store.dispatch(actions.setUserData())));
        Store.dispatch(PlaceActions.upsertPlace({}));
        return {
            type: 'USER_LOGGING_IN',
        };
    },
    setUserData: () => { //needs to be called after something else has connected to backend
        return {
            type: `${actionTypes.LOGIN_}${SUCCESS}`,
            user: Meteor.user().oAuthData,
        };
    },
    LogUserOut: (callBack) => {
        Meteor.logout(typeof callBack === 'function' ? callBack : () => {});
        return {
            type: actionTypes.LOGOUT,
        };
    },
}

Accounts.onLogin(() => { //this is a listener for logon;
    Store.dispatch(actions.userLoggedIn(Meteor.user()));
});

Meteor.subscribe('userData');

export default actions;
