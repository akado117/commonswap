import _ from 'lodash';
import { SUCCESS, actionTypes } from '../lib/Constants';

const initialState = {
    placeImgs: [],
};

function imagesReducer(state = initialState, action = {}) {
    switch (action.type) {
    case `${actionTypes.GET_PLACE_IMAGES}_${SUCCESS}`:
        return _.merge({}, state, {
            placeImgs: action.placeImgs,
        });
    case `${actionTypes.ADD_PLACE_IMAGE}_${SUCCESS}`:
        const newState = _.cloneDeep(state);
        newState.placeImgs = state.placeImgs.concat([action.image]);
        return newState;
    case actionTypes.LOGOUT:
        return initialState;
    default:
        return state;
    }
}

export default imagesReducer;