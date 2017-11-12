import { actionTypes, SUCCESS, FAILURE } from '../lib/Constants';

function standardImgResponseFunc(error, result, actionType, dispatch, cb) {
    let callback = cb;
    if (!cb) {
        callback = () => {};
    }
    if (error) {
        console.log(error);
        callback(error);
        return dispatch({
            type: `${actionType}_${FAILURE}`,
            ...error,
        });
    } else {
        if (result.data) {
            callback(undefined, result);
            return dispatch({
                type: `${actionType}_${SUCCESS}`,
                data: result.data,
            });
        };
        callback(result);
        return dispatch({
            type: `${actionType}_${FAILURE}`,
            errorMessage: result.message,
            ...result,
        });
    }
}
export default {
    getImagesForPlace: ({ placeId }) => {
        return dispatch => Meteor.call('images.place.get', { placeId }, (error, result) => {
            return standardImgResponseFunc(error, result, actionTypes.GET_PLACE_IMAGES, dispatch);
        });
    },
    addPlaceImageToDataBase: (insertObj, callback) => {
        return dispatch => Meteor.call('images.place.store', insertObj, (error, result) => {
            return standardImgResponseFunc(error, result, actionTypes.ADD_PLACE_IMAGE, dispatch, callback);
        });
    },
    getImageForProfile: () => {
        return dispatch => Meteor.call('images.profile.getOne', (error, result) => {
            return standardImgResponseFunc(error, result, actionTypes.GET_PROFILE_IMAGE, dispatch);
        });
    },
    addProfileImageToDataBase: (insertObj, callback) => {
        return dispatch => Meteor.call('images.profile.store', insertObj, (error, result) => {
            return standardImgResponseFunc(error, result, actionTypes.ADD_PROFILE_IMAGE, dispatch, callback);
        });
    },
}