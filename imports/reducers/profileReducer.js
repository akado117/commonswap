import _ from 'lodash';
import { SUCCESS, actionTypes } from '../lib/Constants';

const initialState = {
    profile: {},
    interests: {},
    emergencyContacts: [],
};

function profileReducer(state = initialState, action = {}) {
    switch (action.type) {
    case `${actionTypes.SAVE_PROFILE}_${SUCCESS}`:
        return _.merge({}, state, {
            profile: action.profile,
            interests: action.interests,
            emergencyContacts: action.emergencyContacts,
        });
    case 'email_pending':
        return _.merge({}, state, {
            isPending: true,
        });
    case 'email_sent':
        return _.merge({}, state, {
            isPending: false,
            data: action,
        });
    default:
        return state;
    }
}

export default profileReducer;