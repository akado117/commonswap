import { cloneDeep, merge } from 'lodash';
import { SUCCESS, actionTypes } from '../helpers/ConstantsRedux';

const initialState = {
    placeImgs: [],
    profileImg: {},
};

let newState
function imagesReducer(state = initialState, action = {}) {
    switch (action.type) {
    case `${actionTypes.GET_PLACE_IMAGES}_${SUCCESS}`:
        return merge({}, state, {
            placeImgs: action.data.images,
        });
    case `${actionTypes.ADD_PLACE_IMAGE}_${SUCCESS}`:
        newState = cloneDeep(state);
        newState.placeImgs = state.placeImgs.concat([action.data.image]);
        return newState;
    case `${actionTypes.DELETE_PLACE_IMAGE}_${SUCCESS}`: {
        const clonedState = cloneDeep(state);
        clonedState.placeImgs = clonedState.placeImgs.filter(img => img._id !== action.data._id);
        return clonedState;
    }
    case `${actionTypes.GET_PROFILE_IMAGE}_${SUCCESS}`:
        return merge({}, state, {
            profileImg: action.data.image,
        });
    case `${actionTypes.ADD_PROFILE_IMAGE}_${SUCCESS}`:
        return merge({}, state, {
            profileImg: action.data.image,
        });
    case actionTypes.REORDER_PLACE_IMAGES: {
        newState = cloneDeep(state);
        newState.placeImgs = action.data;
        return newState;
    }
    case actionTypes.LOGOUT:
        return initialState;
    default:
        return state;
    }
}

export default imagesReducer;