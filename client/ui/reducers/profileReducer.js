import { cloneDeep } from 'lodash';
import { SUCCESS, actionTypes } from '../helpers/ConstantsRedux';

const initialState = {
    profile: {},
    interests: {},
    emergencyContacts: [],
    card: {},
};
let stateClone;
//case is exactly the same as the type
function profileReducer(state = initialState, action = {}) {
    switch (action.type) {
    case `${actionTypes.SAVE_PROFILE}_${SUCCESS}`:
        stateClone = cloneDeep(state);
        stateClone.profile = action.data.profile;
        stateClone.interests = action.data.interests;
        stateClone.emergencyContacts = action.data.emergencyContacts;
        return stateClone;
    case `${actionTypes.GET_CARD_INFO}_${SUCCESS}`:
        stateClone = cloneDeep(state);
        stateClone.card = action.data.card;
        return stateClone;
    case `${actionTypes.GET_CONTACT}_${SUCCESS}`:
        stateClone = cloneDeep(state);
        stateClone.card = action.data.card;
        return stateClone;
    case actionTypes.LOGOUT:
        return initialState;
    default:
        return state;
    }
}

export default profileReducer;