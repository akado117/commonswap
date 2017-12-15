import { actionTypes, SUCCESS, FAILURE } from '../../../imports/lib/Constants';

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
}