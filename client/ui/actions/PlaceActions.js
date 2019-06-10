import { cloneDeep, merge } from 'lodash';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Bert } from 'meteor/themeteorchef:bert';
import { actionTypes, SUCCESS, FAILURE, standardResponseFunc, servicePending, serviceResponded } from '../helpers/ConstantsRedux';
import Store from '../store/store';
import { FormateDates, FormateDate } from '../../../imports/helpers/DateHelpers';
import { buildPlaceForBrowseObjs, mapMongoGeoSpatialCoords, buildPlaceForUpsert } from '../../../imports/helpers/DataHelpers'

const PlaceActions = {
    upsertPlace: (placeData, cb) => {
        const currentPlaceData = buildPlaceForUpsert(placeData, Store.getState());
        const { place = {}, address = {}, amenities = {} } = currentPlaceData;

        mapMongoGeoSpatialCoords(place);
        servicePending(actionTypes.SAVE_PLACE);
        return dispatch => Meteor.call('upsertPlace', place, address, amenities, (error, result) => {
            serviceResponded(actionTypes.SAVE_PLACE);
            return standardResponseFunc(error, result, actionTypes.SAVE_PLACE, dispatch, cb);
        });
    },
    updatePlaceDates: (datesToFormate = []) => dispatch => {
        const availableDates = FormateDates(datesToFormate);
        const state = Store.getState();
        if (state.place.place._id && Meteor.user()) {
            const updatedDateObj = {
                _id: state.place.place._id,
                availableDates,
            };
            servicePending(actionTypes.SAVE_PLACE_AVAILABILITY);
            Meteor.call('places.updateAvailability', updatedDateObj, (error, result) => {
                serviceResponded(actionTypes.SAVE_PLACE_AVAILABILITY);
                return standardResponseFunc(error, result, actionTypes.SAVE_PLACE_AVAILABILITY, dispatch);
            });
        } else {
            dispatch({//to save so when they log in they can just hit save again
                type: `${actionTypes.SAVE_PLACE_AVAILABILITY}_${SUCCESS}`,
                data: {
                    place: {
                        availableDates,
                    },
                },
            });
            return {
                type: `${actionTypes.SAVE_PLACE_AVAILABILITY}_${FAILURE}`,
                message: 'Please login or create a profile and place to save dates to',
            };
        }
    },
    updateAlwaysAvailable: ({ availableAnytime, _id, ownerUserId }) => dispatch => Meteor.call('places.updateAlwaysAvailable', { availableAnytime, _id, ownerUserId }, (error, result) =>
        standardResponseFunc(error, result, actionTypes.PLACE_UPDATE_ALWAYS_AVAILABLE, dispatch)),
    getPlaceById(_id) {
        return dispatch => Meteor.call('places.getPlaceById', { _id }, (error, result) => {
            return standardResponseFunc(error, result, actionTypes.GET_PLACE_BY_ID, dispatch);
        });
    },
    saveBrowseData: data => ({
        type: actionTypes.SAVE_BROWSE_DATES,
        ...data,
    }),
    getPlaceBasedUponAvailability: (unFormattedDates) => {
        // const data = unFormattedDates.query({query: gql`
        //   query getPlacesForBrowse {
        //     getPlacesForBrowse {
        //     shortDesc
        //     numOfGuests
        //     bedrooms
        //     address {
        //       city
        //       state
        //     }
        //     placeImages {
        //       _id
        //       url
        //     }
        //   }
        //   }
        // `}).then(console.log);
        // debugger
        const dateObj = cloneDeep(unFormattedDates);
        if (unFormattedDates.arrival && unFormattedDates.departure) {
            dateObj.arrival = FormateDate(unFormattedDates.arrival);
            dateObj.departure = FormateDate(unFormattedDates.departure);
        }
        servicePending(actionTypes.GET_PLACE_BY_AVAILABILITY);
        return dispatch => Meteor.call('places.getByAvailability', dateObj, (error, result) => {
            if (result.data) {
                result.data = buildPlaceForBrowseObjs(result.data);
            } else {
                Bert.alert(result.message, 'danger');
            }
            serviceResponded(actionTypes.GET_PLACE_BY_AVAILABILITY);
            return standardResponseFunc(error, result, actionTypes.GET_PLACE_BY_AVAILABILITY, dispatch);
        });
    },
    saveSwap: (swapObj) => {
        const Notes = swapObj.requesterMessage;
        const Arrival = swapObj.dates.arrival;
        const Departure = swapObj.dates.departure;
        const swapClone = cloneDeep(swapObj);
        swapClone.dates = FormateDates([swapObj.dates])[0];

        servicePending(actionTypes.SAVE_TRIP);
        return dispatch => Meteor.call('trips.saveTrip', swapClone, Notes, Arrival, Departure, (error, result) => {
            serviceResponded(actionTypes.SAVE_TRIP);
            return standardResponseFunc(error, result, actionTypes.SAVE_TRIP, dispatch);
        });
    },
    chargeCards: (trip) => {
        return dispatch => Meteor.call('trips.createCharge', trip, (error, result) => {
            return standardResponseFunc(error, result, actionTypes.CARDS_CHARGED, dispatch);
        });
    },
    getSwaps: args => dispatch => Meteor.call('trips.getUserTrips', args, (error, result) =>
        standardResponseFunc(error, result, actionTypes.GET_TRIPS, dispatch)),
    updateSwapStatus: ({ _id, status, prevStatus }) => dispatch => Meteor.call('trips.updateTripStatus', { _id, status, prevStatus }, (error, result) =>
        standardResponseFunc(error, result, actionTypes.TRIP_UPDATE_STATUS, dispatch)),
    saveSwapRating: (args) => dispatch => Meteor.call('trips.updateTripReview', args, (error, result) => {
        standardResponseFunc(error, result, actionTypes.SAVE_TRIP_REVIEW, dispatch);
    }),
};

export default PlaceActions;