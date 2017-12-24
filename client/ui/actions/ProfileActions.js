import { merge } from 'lodash';
import { actionTypes, SUCCESS, FAILURE, standardResponseFunc, servicePending, serviceResponded } from '../helpers/ConstantsRedux';
import { FormateDate } from '../../../imports/helpers/DateHelpers';
import Store from '../store/store';

const ProfileActions = {
    upsertProfile: (profileData, callBack) => {
        const curProfData = Store.getState().profile;
        const mappedProfData = {
            profile: curProfData.profile || {},
            interests: curProfData.interests || {},
            emergencyContacts: curProfData.emergencyContacts || {},
        };
        const { profile, interests, emergencyContacts } = merge({}, mappedProfData, profileData);//technically more bandwidth but less sever load
        if (profile.birthday) profile.birthday = FormateDate(profile.birthday);
        servicePending(actionTypes.SAVE_PROFILE);
        return dispatch => Meteor.call('upsertProfile', profile, interests, emergencyContacts, (error, result) => {
            serviceResponded(actionTypes.SAVE_PROFILE);
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
                    type: `${actionTypes.EMAIL_SENT}_${FAILURE}`,
                    ...error,
                });
            } else {
                if (result.data) {
                    dispatch({
                        type: `${actionTypes.EMAIL_SENT}_${SUCCESS}`,
                        data: result.data,
                    });
                    return undefined;
                };
                return dispatch({
                    type: `${actionTypes.EMAIL_SENT}_${FAILURE}`,
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