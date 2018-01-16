import { actionTypes, standardResponseFunc } from '../helpers/ConstantsRedux';
import Store from '../store/store';


export default {
    getImagesForPlace: ({ placeId }) => {
        return dispatch => Meteor.call('images.place.get', { placeId }, (error, result) => {
            return standardResponseFunc(error, result, actionTypes.GET_PLACE_IMAGES, dispatch);
        });
    },
    addPlaceImageToDataBase: (insertObj, callback) => {
        const { images = {} } = Store.getState();
        const position = images.placeImgs && images.placeImgs.length;
        insertObj.position = position;
        return dispatch => Meteor.call('images.place.store', insertObj, (error, result) => {
            return standardResponseFunc(error, result, actionTypes.ADD_PLACE_IMAGE, dispatch, callback);
        });
    },
    deletePlaceImage: ({ _id, placeId }) => {
        return dispatch => Meteor.call('images.place.delete', { _id, placeId }, (error, result) => {
            return standardResponseFunc(error, result, actionTypes.DELETE_PLACE_IMAGE, dispatch);
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
    reOrderImages: (imageIdx, increasePosition, placeImgs) => {
        let newImageArray;
        if (imageIdx === 0 && increasePosition) {
            newImageArray = placeImgs.slice(1);
            newImageArray.push(placeImgs[imageIdx]);
        } else if (imageIdx === placeImgs.length - 1 && !increasePosition) {
            newImageArray = placeImgs.slice(0, imageIdx);
            newImageArray.unshift(placeImgs[imageIdx]);
        } else if (increasePosition) {
            newImageArray = placeImgs.slice(0, imageIdx - 1);
            newImageArray.push(placeImgs[imageIdx]);
            newImageArray.push(placeImgs[imageIdx - 1]);
            newImageArray = newImageArray.concat(placeImgs.slice(imageIdx + 1));
        } else {
            newImageArray = placeImgs.slice(0, imageIdx);
            newImageArray.push(placeImgs[imageIdx + 1]);
            newImageArray.push(placeImgs[imageIdx]);
            newImageArray = newImageArray.concat(placeImgs.slice(imageIdx + 2));
        }
        newImageArray.forEach((img, idx) => {
            img.position = idx;
        });
        return {
            type: actionTypes.REORDER_PLACE_IMAGES,
            data: newImageArray,
        };
    },
    savePlaceImageOrder: (placeImgs) => {
        return dispatch => Meteor.call('images.place.saveOrder', { placeImgs }, (error, result) => {
            return standardResponseFunc(error, result, actionTypes.SAVE_PLACE_IMAGE_ORDER, dispatch);
        });
    },
}