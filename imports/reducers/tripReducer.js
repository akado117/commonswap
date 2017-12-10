import { merge, cloneDeep } from 'lodash';
import { actionTypes, SUCCESS} from '../lib/Constants';

const initialState = {
    trips: [],
};

export default function tripReducer(state = initialState, action = {}) {
    switch (action.type) {
    case `${actionTypes.SAVE_TRIP}_${SUCCESS}`: {
        const stateClone = cloneDeep(state);
        stateClone.trips = stateClone.trips.concat(action.data.trip);
        return stateClone;
    }
    default:
        return state;
    }
}