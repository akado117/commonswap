import _ from 'lodash';
import { actionTypes, SUCCESS} from '../lib/Constants';

const initialState = {};

export default function userReducer(state = initialState, action = {}) {
    switch (action.type) {
    case `${actionTypes.LOGIN_}${SUCCESS}`:
        return _.merge({},state, { ...action.user });
    case actionTypes.LOGOUT:
        return initialState;
    default:
        return state;
    }
}