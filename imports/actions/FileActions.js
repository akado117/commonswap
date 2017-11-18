import { actionTypes, standardResponseFunc } from '../lib/Constants';


export default {
    getImagesForPlace: ({ placeId }) => {
        return dispatch => Meteor.call('images.place.get', { placeId }, (error, result) => {
            return standardResponseFunc(error, result, actionTypes.GET_PLACE_IMAGES, dispatch);
        });
    },
    addPlaceImageToDataBase: (insertObj, callback) => {
        return dispatch => Meteor.call('images.place.store', insertObj, (error, result) => {
            return standardResponseFunc(error, result, actionTypes.ADD_PLACE_IMAGE, dispatch, callback);
        });
    },
    getImageForProfile: () => {
        return dispatch => Meteor.call('images.profile.getOne', (error, result) => {
            return standardResponseFunc(error, result, actionTypes.GET_PROFILE_IMAGE, dispatch);
        });
    },
    addProfileImageToDataBase: (insertObj, callback) => {
        return dispatch => Meteor.call('images.profile.store', insertObj, (error, result) => {
            return standardResponseFunc(error, result, actionTypes.ADD_PROFILE_IMAGE, dispatch, callback);
        });
    },
}