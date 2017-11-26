import { intTypeParams, doubleTypeParams } from '../lib/Constants';
//arr and indexArry need to match
export const pullMatchingFromArray = (arr, indexArry, val) => {//arr is obj array, indexArr is array of key index to find, key is key to compare against, value is value to Match
    const idxToPull = [];
    const imgsToReturn = [];
    let idx = indexArry.indexOf(val);

    while (idx > -1) {
        idxToPull.push(idx);
        idx = indexArry.indexOf(val, idx + 1);
    }
    idxToPull.forEach((curIdx) => {
        imgsToReturn.push(arr[curIdx]);
    });
    return imgsToReturn;
};

//THIS WILL MODIFIY OBJECTS FED IN
export const buildPlaceForBrowseObjs = ({ places, addresses, placeImgs, profileImgs, profiles }) => {
    const placeForBrowseArray = [];//notCloning for performance reasons
    const placeImageIdx = placeImgs.map(img => img.placeId || 'NA');
    places.forEach((place) => {
        const addressIdx = addresses.findIndex(addy => addy.placeId === place._id);
        const profileImgIdx = profileImgs.findIndex(img => img.userId === place.ownerUserId);
        const profileIdx = profiles.findIndex(prof => prof.ownerUserId === place.ownerUserId);
        place.address = addressIdx > -1 ? addresses.splice(addressIdx, 1)[0] : {};
        place.profileImg = profileImgIdx > -1 ? profileImgs.splice(profileImgIdx, 1)[0] : {};
        place.placeImgs = pullMatchingFromArray(placeImgs, placeImageIdx, place._id) || [];
        place.profile = profileIdx > -1 ? profiles.splice(profileIdx, 1)[0] : {};
        placeForBrowseArray.push(place);
    });
    return placeForBrowseArray;
};

export function onChangeHelper(event) {
    return event.target.value;
}

export function parseInts(obj, propArrToConv = intTypeParams) { //modifies original obj
    Object.keys(obj).forEach((key) => {
        if (propArrToConv.indexOf(key) > -1) obj[key] = parseInt(obj[key], 10);
    });
    return obj;
}

export function parseFloats(obj, propArrToConv = doubleTypeParams) { //modifies original obj
    Object.keys(obj).forEach((key) => {
        if (propArrToConv.indexOf(key) > -1) obj[key] = parseFloat(obj[key]);
    });
    return obj;
}

export function mapMongoGeoSpatialCoords(obj) { //modifies original object
    if (obj && obj.coords && obj.coords.lat !== undefined && obj.coords.lng !== undefined) {
        const { lng, lat } = obj.coords;
        obj.location = {
            type: 'Point',
            coordinates: [lng, lat],
        };
    }
}