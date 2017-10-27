import { SUCCESS, actionTypes } from '../lib/Constants';
import _ from 'lodash';

const initialState = {
    profile: {},
    interests: {},
    emergencyContacts: [],
};

function profileReducer(state = initialState, action = {}) {
    switch (action.type) {
    case `${actionTypes.GET_PROFILE}_${SUCCESS}`:
        return _.assign({}, state, { user: action.user });
    case `${actionTypes.SAVE_PROFILE}_${SUCCESS}`:
        return _.assign({}, state, {
            profile: action.profile,
            interests: action.interests,
            emergencyContacts: action.emergencyContacts,
        });
    default:
        return state;
    }
}

export default profileReducer;