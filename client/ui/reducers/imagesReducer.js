import _ from 'lodash';
import { SUCCESS, actionTypes } from '../helpers/ConstantsRedux';

const initialState = {
    placeImgs: [],
    profileImg: {},
};

function imagesReducer(state = initialState, action = {}) {
    switch (action.type) {
    case `${actionTypes.GET_PLACE_IMAGES}_${SUCCESS}`:
        return _.merge({}, state, {
            placeImgs: action.data.images,
        });
    case `${actionTypes.ADD_PLACE_IMAGE}_${SUCCESS}`:
        const newState = _.cloneDeep(state);
        newState.placeImgs = state.placeImgs.concat([action.data.image]);
        return newState;
    case `${actionTypes.GET_PROFILE_IMAGE}_${SUCCESS}`:
        return _.merge({}, state, {
            profileImg: action.data.image,
        });
    case `${actionTypes.ADD_PROFILE_IMAGE}_${SUCCESS}`:
        return _.merge({}, state, {
            profileImg: action.data.image,
        });
    case actionTypes.LOGOUT:
        return initialState;
    default:
        return state;
    }
}

export default imagesReducer;