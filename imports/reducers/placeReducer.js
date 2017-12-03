import { cloneDeep, merge } from 'lodash';
import { SUCCESS, actionTypes } from '../lib/Constants';

const initialState = {
    place: {},
    address: {},
    amenities: {},
    placesForBrowsing: [],
    arrival: null,
    departure: null,
    coords: null,
    numOfGuests: null,
};
let stateClone;
function placeReducer(state = initialState, action = {}) {
    switch (action.type) {
    case `${actionTypes.SAVE_PLACE}_${SUCCESS}`:
        stateClone = cloneDeep(state);
        merge(stateClone.place, action.place);
        merge(stateClone.address, action.address);
        merge(stateClone.amenities, action.amenities);
        return stateClone;
    case `${actionTypes.SAVE_PLACE_AVAILABILITY}_${SUCCESS}`:
        stateClone = cloneDeep(state);
        stateClone.place.availableDates = action.data.place.availableDates;
        return stateClone;
    case `${actionTypes.GET_PLACE_BY_AVAILABILITY}_${SUCCESS}`:
        stateClone = cloneDeep(state);
        stateClone.placesForBrowsing = action.data || [];
        return stateClone;
    case actionTypes.SAVE_BROWSE_DATES:
        stateClone = cloneDeep(state);
        Object.keys(action).forEach((key) => {
            if (key !== 'type' && action[key]) {
                stateClone[key] = action[key];
            }
        });
        return stateClone;
    case actionTypes.LOGOUT:
        return initialState;
    default:
        return state;
    }
}

export default placeReducer;