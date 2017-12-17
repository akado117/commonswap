import { merge } from 'lodash';
import { actionTypes, SUCCESS, FAILURE } from '../../../imports/lib/Constants';
import Store from '../../../imports/store/store';

const ProfileActions = {
    upsertProfile: (profileData, callBack) => {
        const curProfData = Store.getState().profile;
        const mappedProfData = {
            profile: curProfData.profile || {},
            interests: curProfData.interests || {},
            emergencyContacts: curProfData.emergencyContacts || {},
        };
        const { profile, interests, emergencyContacts } = merge({}, mappedProfData, profileData);//technically more bandwidth but less sever load
        return dispatch => Meteor.call('upsertProfile', profile, interests, emergencyContacts, (error, result) => {
            if (error) {
                console.log(error);
                return dispatch({
                    type: `${actionTypes.SAVE_PROFILE}_${FAILURE}`,
                    ...error,
                });
            } else {
                if (result.data) {
                    dispatch({
                        type: `${actionTypes.SAVE_PROFILE}_${SUCCESS}`,
                        profile: result.data.profile,
                        interests: result.data.interests,
                        emergencyContacts: result.data.emergencyContacts,
                    });
                    return callBack ? callBack() : '';
                };
                return dispatch({
                    type: `${actionTypes.SAVE_PROFILE}_${FAILURE}`,
                    ...error,
                });
            }
        });
    },
    requestSwap: (data) => {
        console.log("PA REQUEST SWAP DATA");
        console.log(data);
        const { Arrival, Departure, Notes, User, placeId } = data;
        
        return dispatch => Meteor.call('requestEmail', data, (error, result) => {
            if (error) {
                console.log(error);
                return dispatch({
                    type: `${actionTypes.SAVE_PROFILE}_${FAILURE}`,
                    ...error,
                });
            } else {
                if (result.data) {
                    dispatch({
                        type: `${actionTypes.SAVE_PROFILE}_${SUCCESS}`,
                    });
                    return callBack ? callBack() : '';
                };
                return dispatch({
                    type: `${actionTypes.SAVE_PROFILE}_${FAILURE}`,
                    ...error,
                });
            }
        });
    },
    retrieveCardInfo: () => {
        return dispatch => Meteor.call('cardInfo', (error, result) => {
            if (error) {
                console.log(error);
                return dispatch({
                    type: `Card info`,
                    ...error,
                });
            } else {
                if (result) {
                    dispatch({
                        type: `${actionTypes.SAVE_PROFILE}_${SUCCESS}`,
                        card: result.data.card
                    });
                    return result;
                };
                return dispatch({
                    type: `card info`,
                    ...error,
                });
            }
        });
    }

}

export default ProfileActions