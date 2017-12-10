import { cloneDeep, merge } from 'lodash';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { actionTypes, SUCCESS, FAILURE, standardResponseFunc } from '../lib/Constants';
import Store from '../store/store';
import { FormateDates, FormateDate } from '../helpers/DateHelpers';
import { buildPlaceForBrowseObjs, mapMongoGeoSpatialCoords, buildPlaceForUpsert } from '../helpers/DataHelpers'

const PlaceActions = {
    upsertPlace: (placeData, cb) => {
        const currentPlaceData = buildPlaceForUpsert(placeData, Store.getState());
        const { place = {}, address = {}, amenities = {} } = currentPlaceData;

        mapMongoGeoSpatialCoords(place);
        return dispatch => Meteor.call('upsertPlace', place, address, amenities, (error, result) => {
            if (error) {
                console.log(error);
                return dispatch({
                    type: `${actionTypes.SAVE_PLACE}_${FAILURE}`,
                    ...error,
                });
            } else {
                if (result.data) {
                    if (cb) cb({ placeId: result.data.place._id });
                    return dispatch({
                        type: `${actionTypes.SAVE_PLACE}_${SUCCESS}`,
                        place: result.data.place,
                        amenities: result.data.amenities,
                        address: result.data.address,
                    });
                };
                return dispatch({
                    type: `${actionTypes.SAVE_PLACE}_${FAILURE}`,
                    errorMessage: result.message,
                    ...result,
                });
            }
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
            Meteor.call('places.updateAvailability', updatedDateObj, (error, result) => {
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
        dateObj.arrival = FormateDate(unFormattedDates.arrival);
        dateObj.departure = FormateDate(unFormattedDates.departure);
        return dispatch => Meteor.call('places.getByAvailability', dateObj, (error, result) => {
            result.data = buildPlaceForBrowseObjs(result.data);
            return standardResponseFunc(error, result, actionTypes.GET_PLACE_BY_AVAILABILITY, dispatch);
        });
    },
    saveSwap: (swapObj) => {
        const swapClone = cloneDeep(swapObj);
        swapClone.dates = FormateDates([swapObj.dates])[0];
        return dispatch => Meteor.call('trips.saveTrip', swapClone, (error, result) => {
            return standardResponseFunc(error, result, actionTypes.SAVE_TRIP, dispatch);
        });
    },
};

export default PlaceActions;