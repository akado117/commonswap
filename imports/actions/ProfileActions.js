import { merge } from 'lodash';
import { actionTypes, SUCCESS, FAILURE } from '../lib/Constants';
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
    requestEmail: (data) => {
        return (dispatch) => {
            dispatch({
                type: 'email_pending',
            });
            const { Arrival, Departure, Notes } = data;
            console.log(data);
            fetch("https://commonswap.azurewebsites.net/api/SwapRequest?code=X7a3QL7LeF89LYcDidaAxhQG3h5jY2A7fQRKP7a38ZydqTUBrV9orw==", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    //guests,
                    Arrival,
                    Departure,
                    Notes,
                }),
            }).then((res) => {
                dispatch({
                    type: 'email_sent',
                    ...res,
                });
            }).catch((err) => {
                dispatch({
                    type: 'email_failed',
                    ...err,
                });
            })
        }
    }
}

export default ProfileActions