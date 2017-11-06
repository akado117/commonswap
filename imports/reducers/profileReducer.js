import _ from 'lodash';
import { SUCCESS, actionTypes } from '../lib/Constants';

const initialState = {
    profile: {},
    interests: {},
    emergencyContacts: [],
};
//case is exactly the same as the type
function profileReducer(state = initialState, action = {}) {
    switch (action.type) {
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