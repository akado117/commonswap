import { merge } from 'lodash';
import { SUCCESS, actionTypes } from '../helpers/ConstantsRedux';

const initialState = {};

export default function userReducer(state = initialState, action = {}) {
    switch (action.type) {
    case `${actionTypes.LOGIN_}${SUCCESS}`:
        const stateClone = merge({},state, { ...action.user });
        stateClone.userId = Meteor.userId();
        return stateClone;
    case actionTypes.LOGOUT:
        return initialState;
    default:
        return state;
    }
}