import { cloneDeep } from 'lodash';
import { SUCCESS, actionTypes } from '../../../imports/lib/Constants';

const initialState = {
    profile: {},
    interests: {},
    emergencyContacts: [],
};
let stateClone;
//case is exactly the same as the type
function profileReducer(state = initialState, action = {}) {
    switch (action.type) {
    case `${actionTypes.SAVE_PROFILE}_${SUCCESS}`:
        stateClone = cloneDeep(state);
        stateClone.profile = action.profile;
        stateClone.interests = action.interests;
        stateClone.emergencyContacts = action.emergencyContacts;
        stateClone.card = action.card;
        return stateClone;
    case actionTypes.LOGOUT:
        return initialState;
    default:
        return state;
    }
}

export default profileReducer;