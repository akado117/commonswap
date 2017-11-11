import { graphql, gql } from 'react-apollo';
import { actionTypes, SUCCESS, FAILURE } from '../lib/Constants';
import ProfileActions from './ProfileActions';
import PlaceActions from './PlaceActions';
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
            console.log(res);
            return dispatch({
                type: `${actionTypes.LOGIN_}${SUCCESS}`,
                user: Meteor.user(),
            });
        };
        const loginFunctions = {
            facebook: dispatch => Meteor.loginWithFacebook((error,res) => callBack(error, res, dispatch)),
            google: dispatch => Meteor.loginWithGoogle((error,res) => callBack(error, res, dispatch)),
            twitter: dispatch => Meteor.loginWithTwitter((error,res) => callBack(error, res, dispatch)),
        };
        if (!loginType[loginType]) console.error(`${loginType} is not a defined loginType`);
        return loginFunctions[loginType];
    },
    userLoggedIn: (user) => {
        Store.dispatch(ProfileActions.upsertProfile({}));
        Store.dispatch(PlaceActions.upsertPlace({}));
        return {
            type: `${actionTypes.LOGIN_}${SUCCESS}`,
            user,

        };
    },
    LogUserOut: (callBack) => {
        Meteor.logout(typeof callBack === 'function' ? callBack : () => {});
        return {
            type: actionTypes.LOGOUT,
        };
    },
    getRoomById: (id, cb) => {
        const query =  gql`{
          getSavedRoom(Id:"${id}") {
            _id
            roomies {
              name
              daysInRoom
              amountOwed
            }
          }
        }`;
        return graphql(query, <Helper callbackFunc={cb}/>)
    },
}

Accounts.onLogin(() => { //this is a listener for logon;
    Store.dispatch(actions.userLoggedIn(Meteor.user()));
});

Meteor.subscribe('userData');

export default actions;
