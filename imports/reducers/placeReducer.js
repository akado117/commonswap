import _ from 'lodash';
import { SUCCESS, actionTypes } from '../lib/Constants';

const initialState = {
    place: {},
    address: {},
    amenities: {},
};

function placeReducer(state = initialState, action = {}) {
    switch (action.type) {
    case `${actionTypes.SAVE_PLACE}_${SUCCESS}`:
        return _.assign({}, state, {
            place: action.place,
            address: action.address,
            amenities: action.amenities,
        });
    case `${actionTypes.SAVE_PLACE_AVAILABILITY}_${SUCCESS}`:
        return _.assign({}, state, {
            place: action.data.place,
            address: action.data.address,
            amenities: action.data.amenities,
        });
    case actionTypes.LOGOUT:
        return initialState;
    default:
        return state;
    }
}

export default placeReducer;