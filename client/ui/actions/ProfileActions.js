import { merge } from 'lodash';
import { actionTypes, SUCCESS, FAILURE, standardResponseFunc } from '../helpers/ConstantsRedux';
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
            return standardResponseFunc(error, result, actionTypes.SAVE_PROFILE, dispatch, callBack);
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
        return dispatch => Meteor.call('getCardInfo', (error, result) => {
            return standardResponseFunc(error, result, actionTypes.GET_CARD_INFO, dispatch);
        });
    },
}

export default ProfileActions