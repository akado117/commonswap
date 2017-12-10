import { merge, cloneDeep } from 'lodash';
import { actionTypes, SUCCESS} from '../lib/Constants';

const initialState = {
    trips: [],
    getTripsCalled: false,
};

export default function tripReducer(state = initialState, action = {}) {
    switch (action.type) {
    case `${actionTypes.SAVE_TRIP}_${SUCCESS}`: {
        const stateClone = cloneDeep(state);
        stateClone.trips = stateClone.trips.concat(action.data.trip);
        return stateClone;
    }
    case `${actionTypes.GET_TRIPS}_${SUCCESS}`: {
        const stateClone = cloneDeep(state);
        stateClone.trips = stateClone.trips.concat(action.data.trips);
        stateClone.getTripsCalled = true;
        return stateClone;
    }
    default:
        return state;
    }
}