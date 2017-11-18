import { cloneDeep, merge } from 'lodash';
import { actionTypes, SUCCESS, FAILURE, standardResponseFunc } from '../lib/Constants';
import Store from '../store/store';

const PlaceActions = {
    upsertPlace: (placeData) => {
        const currentPlaceData = Store.getState().place;
        const mappedCurrentPlaceDate = {
            place: currentPlaceData.place || {},
            address: currentPlaceData.address || {},
            amenities: currentPlaceData.amenities || {},
        };
        const { place, address, amenities } = merge({}, mappedCurrentPlaceDate, placeData);//technically more bandwidth but less sever load
        return dispatch => Meteor.call('upsertPlace', place, address, amenities, (error, result) => {
            if (error) {
                console.log(error);
                return dispatch({
                    type: `${actionTypes.SAVE_PLACE}_${FAILURE}`,
                    ...error,
                });
            } else {
                if (result.data) {
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
    updatePlaceDates: (availableDates = []) => dispatch => {
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
            const { place, amenities, address } = cloneDeep(state.place);
            place.availableDates = dateArr;
            dispatch({
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
};

export default PlaceActions