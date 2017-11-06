import { actionTypes, SUCCESS, FAILURE } from '../lib/Constants';

export default {
    getImagesForPlace: ({ placeId }) => {
        return dispatch => Meteor.call('images.place.get', { placeId }, (error, result) => {
            if (error) {
                console.log(error);
                return dispatch({
                    type: `${actionTypes.GET_PLACE_IMAGES}_${FAILURE}`,
                    ...error,
                });
            } else {
                if (result.data) {
                    return dispatch({
                        type: `${actionTypes.GET_PLACE_IMAGES}_${SUCCESS}`,
                        placeImgs: result.data.images,
                    });
                };
                return dispatch({
                    type: `${actionTypes.GET_PLACE_IMAGES}_${FAILURE}`,
                    errorMessage: result.message,
                    ...result,
                });
            }
        });
    },
    addPlaceImageToDataBase: (insertObj, callback) => {
        return dispatch => Meteor.call('images.place.store', insertObj, (error, result) => {
            if (error) {
                console.log(error);
                callback(error);
                return dispatch({
                    type: `${actionTypes.ADD_PLACE_IMAGE}_${FAILURE}`,
                    ...error,
                });
            } else {
                if (result.data) {
                    callback(undefined, result);
                    return dispatch({
                        type: `${actionTypes.ADD_PLACE_IMAGE}_${SUCCESS}`,
                        image: result.data,
                    });
                };
                callback(result);
                return dispatch({
                    type: `${actionTypes.ADD_PLACE_IMAGE}_${FAILURE}`,
                    errorMessage: result.message,
                    ...result,
                });
            }
        });
    },
}