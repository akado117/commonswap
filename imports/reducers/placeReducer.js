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
        default:
            return state;
    }
}

export default placeReducer;