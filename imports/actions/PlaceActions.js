import { cloneDeep } from 'lodash';
import { actionTypes, SUCCESS, FAILURE } from '../lib/Constants';
import Store from '../store/store';

const PlaceActions = {
    upsertPlace: ({ place = {}, address = {}, amenities = {} }) => {
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
    updatePlaceDates: (dateArr = []) => dispatch => {
        const state = Store.getState();
        if (state.place.place._id) {
            const placeClone = cloneDeep(state.place);
            placeClone.place.availableDates = dateArr;
            dispatch(PlaceActions.upsertPlace(placeClone));
            return {
                type: `${actionTypes.SAVE_PLACE_AVAILABILITY}_${SUCCESS}`,
            }
        } else {
            return {
                type: `${actionTypes.SAVE_PLACE_AVAILABILITY}_${FAILURE}`,
                message: 'Please login or create a profile and place to save dates to',
            }
        }
    },
};

export default PlaceActions