import { cloneDeep } from 'lodash';
import { actionTypes } from '../helpers/ConstantsRedux';
const initialState = {};

let stateClone;
function serviceReducer(state = initialState, action) {
    switch (action.type) {
    case actionTypes.SERVICE_PENDING: {
        stateClone = cloneDeep(state);
        stateClone[action.actionType] = true;
        return stateClone;
    }
    case actionTypes.SERVICE_RETURNED: {
        stateClone = cloneDeep(state);
        stateClone[action.actionType] = false;
        return stateClone;
    }
    default:
        return state;
    }
}

export default serviceReducer;