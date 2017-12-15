import { merge, cloneDeep } from 'lodash';
import { actionTypes, SUCCESS} from '../../../imports/lib/Constants';
import { MapTripsToCorrectCategories } from '../../../imports/helpers/DataHelpers';

const initialState = {
    trips: [],
    getTripsCalled: false,
    activeTrips: [],
    pastTrips: [],
    pendingTrips: [],
};

export default function tripReducer(state = initialState, action = {}) {
    switch (action.type) {
    case `${actionTypes.SAVE_TRIP}_${SUCCESS}`: {
        const stateClone = cloneDeep(state);
        stateClone.pendingTrips = stateClone.pendingTrips.concat(action.data.trip);
        return stateClone;
    }
    case `${actionTypes.GET_TRIPS}_${SUCCESS}`: {
        const stateClone = cloneDeep(state);
        const { activeTrips, pastTrips, pendingTrips } = MapTripsToCorrectCategories(action.data.trips);
        stateClone.getTripsCalled = true;
        stateClone.activeTrips.concat(activeTrips);
        stateClone.pastTrips.concat(pastTrips);
        stateClone.pendingTrips.concat(pendingTrips);
        return stateClone;
    }
    case actionTypes.LOGOUT:
        return initialState;
    default:
        return state;
    }
}