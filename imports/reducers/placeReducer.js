import { cloneDeep } from 'lodash';
import { SUCCESS, actionTypes } from '../lib/Constants';

const initialState = {
    place: {},
    address: {},
    amenities: {},
};
let stateClone;
function placeReducer(state = initialState, action = {}) {
    switch (action.type) {
    case `${actionTypes.SAVE_PLACE}_${SUCCESS}`:
        stateClone = cloneDeep(state);
        stateClone.place = action.place;
        stateClone.address = action.address;
        stateClone.amenities = action.amenities;
        return stateClone;
    case `${actionTypes.SAVE_PLACE_AVAILABILITY}_${SUCCESS}`:
        stateClone = cloneDeep(state);
        stateClone.place.availableDates = action.data.place.availableDates;
        return stateClone;
    case actionTypes.LOGOUT:
        return initialState;
    default:
        return state;
    }
}

export default placeReducer;