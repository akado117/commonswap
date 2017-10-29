import { actionTypes, SUCCESS, FAILURE } from '../lib/Constants';

export default {
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
}