import { findIndex } from 'lodash';
import { SUCCESS, actionTypes } from '../helpers/ConstantsRedux';
import { MapTripsToCorrectCategories, getTripType } from '../../../imports/helpers/DataHelpers';

const initialState = {
    trips: [],
    getTripsCalled: false,
    activeTrips: [],
    pastTrips: [],
    pendingTrips: [],
};

const tripCategories = ['activeTrips', 'pastTrips', 'pendingTrips'];

export default function tripReducer(state = initialState, action = {}) {
    switch (action.type) {
    case `${actionTypes.SAVE_TRIP}_${SUCCESS}`: {
        const stateClone = { ...state };
        const { data: { trip, isNewTrip } } = action;
        if (!isNewTrip) {
            let indexOfTrip = stateClone.pendingTrips.length;//will add to end of array if not found
            stateClone.pendingTrips.forEach((pendingTrip, idx) => {
                if (pendingTrip._id === trip._id) indexOfTrip = idx;
            });
            stateClone.pendingTrips[indexOfTrip] = trip;
        } else {
            stateClone.pendingTrips = stateClone.pendingTrips.concat(action.data.trip);
        }
        return stateClone;
    }
    case `${actionTypes.GET_TRIPS}_${SUCCESS}`: {
        const stateClone = {...state};
        const { activeTrips, pastTrips, pendingTrips } = MapTripsToCorrectCategories(action.data.trips);
        stateClone.getTripsCalled = true;
        stateClone.activeTrips = stateClone.activeTrips.concat(activeTrips);
        stateClone.pastTrips = stateClone.pastTrips.concat(pastTrips);
        stateClone.pendingTrips = stateClone.pendingTrips.concat(pendingTrips);
        return stateClone;
    }
    case `${actionTypes.TRIP_UPDATE_STATUS}_${SUCCESS}`:
    case `${actionTypes.CARDS_CHARGED}_${SUCCESS}`: {
        const stateClone = {...state};
        const { status, prevStatus, _id } = action.data;
        const tripType = getTripType({ status });
        let trip;
        tripCategories.forEach((category) => {
            const index = findIndex(stateClone[category], { _id });
            if (index > -1) trip = stateClone[category].splice(index, 1)[0];
        });
        if (trip) {
            trip.status = status;
            stateClone[tripType].unshift(trip);
        }
        return stateClone;
    }
    case `${actionTypes.SAVE_TRIP_REVIEW}_${SUCCESS}`: {
        const { trip, changedToComplete } = action.data;
        const activeTrips = [...state.activeTrips];
        const pastTrips = [...state.pastTrips];
        if (changedToComplete) {
            for (let indexOfActive = 0; indexOfActive < activeTrips.length; indexOfActive += 1) {
                if (activeTrips[indexOfActive]._id === trip._id) {
                    activeTrips.splice(indexOfActive, 1);
                    pastTrips.unshift(trip);
                    break;
                }
            }
        } else {
            for (let indexOfActive = 0; indexOfActive < activeTrips.length; indexOfActive += 1) {
                if (activeTrips[indexOfActive]._id === trip._id) {
                    activeTrips[indexOfActive] = trip;
                    break;
                }
            }
        }
        return { ...state, activeTrips, pastTrips };
    }
    case actionTypes.LOGOUT:
        return initialState;
    default:
        return state;
    }
}