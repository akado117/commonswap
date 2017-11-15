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
    saveSelectedDates: (data) => {
        console.log("Save selected dates entered");
        console.log(data);
        return dispatch => Meteor.call('saveSelectedDates', SelectedDates, (error, result) => {
            if (error) {
                console.log(error);
                return dispatch({
                    type: `${actionTypes.SAVE_DESIRED_DATES}_${FAILURE}`,
                    ...error,
                });
            } else {
                if (result.data) {
                    dispatch({
                        type: `${actionTypes.SAVE_DESIRED_DATES}_${SUCCESS}`,
                        dates: result.data.dates
                    });
                    return callBack ? callBack() : '';
                };
                return dispatch({
                    type: `${actionTypes.SAVE_DESIRED_DATES}_${FAILURE}`,
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
