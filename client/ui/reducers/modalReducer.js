import { merge } from 'lodash';
import { actionTypes } from '../../../imports/lib/Constants';

const initialState = {
    open: false,
    content: '',
    actions: [],
};

function modal(state = initialState, action = {}) {
    switch (action.type) {
    case actionTypes.OPEN_MODAL: {
        const stateClone = merge({}, state, action.data);
        stateClone.open = true;
        return stateClone;
    }
    case actionTypes.CLOSE_MODAL: {
        const stateClone = merge({}, state, action.data);
        stateClone.open = false;
        return stateClone;
    }
    case actionTypes.LOGOUT:
        return initialState;
    default:
        return state;
    }
}

export default modal;