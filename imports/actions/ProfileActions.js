import { actionTypes, SUCCESS, FAILURE } from '../lib/Constants';

export default {
    upsertProfile: ({ profile = {}, interests = {}, emergencyContacts = [] }, callBack) => {
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
            const { arrival, departure, notes, guests } = data;
            fetch(Meteor.settings.ajaxUrls.emailUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    arrival,
                    departure,
                    notes,
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