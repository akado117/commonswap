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
        const { Arrival, Departure, Notes, User, placeId } = data;
        return dispatch => Meteor.call('requestEmail', data, (error, result) => {
            return standardResponseFunc(error, result, actionTypes.EMAIL_SENT, dispatch);
        });
    },
    sendMessage: (data) => {
        const { Question, User, placeId } = data;
        servicePending(actionTypes.MESSAGE_SENT);
        return dispatch => Meteor.call('sendMessage', data, (error, result) => {
            serviceResponded(actionTypes.MESSAGE_SENT);
            return standardResponseFunc(error, result, actionTypes.MESSAGE_SENT, dispatch);
        })
    },
    saveContact: (data) => {
        return dispatch => Meteor.call('saveContact', data, (error, result) => {
            return standardResponseFunc(error, result, actionTypes.SAVE_CONTACT, dispatch);
        })
    },
    retrieveCardInfo: () => {
        return dispatch => Meteor.call('getCardInfo', (error, result) => {
            return standardResponseFunc(error, result, actionTypes.GET_CARD_INFO, dispatch);
        });
    },
    retrieveEmergencyContact: () => {
        return dispatch => Meteor.call('getContact', (error, result) => {
            return standardResponseFunc(error, result, actionTypes.GET_CONTACT, dispatch);
        });
    },
    chargeCards: (trip) => {
        return dispatch => Meteor.call('createCharge', trip, (error, result) => {
            return standardResponseFunc(error, result, actionTypes.CARDS_CHARGED, dispatch);
        });
    },
}

export default ProfileActions