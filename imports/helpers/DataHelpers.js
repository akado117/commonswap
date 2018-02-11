import { cloneDeep } from 'lodash';
import { intTypeParams, doubleTypeParams, tripStatus } from '../lib/Constants';
import { Today, FormatDate } from './DateHelpers';
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
export const buildPlaceForBrowseObjs = ({ places, placeImgs }) => {
    const placeForBrowseArray = [];//notCloning for performance reasons
    const placeImageIdx = placeImgs.map(img => img.placeId || 'NA');
    places.forEach((place) => {
        const { address, profile } = place;
        if (!address || !profile) return;
        place.placeImgs = pullMatchingFromArray(placeImgs, placeImageIdx, place._id) || [];
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

export function buildPlaceForUpsert(placeData, appState) {
    if (!placeData || !placeData.place) return placeData;
    const dataClone = cloneDeep(placeData);
    Object.keys(dataClone).forEach((key) => { //add Ids
        const { _id } = appState.place[key];
        if (_id) {
            dataClone[key]._id = _id;
        }
    });
    dataClone.place.profileImg = appState.images.profileImg || { url: appState.user.picture };
    const { firstName, personalSummary, classOf, school, occupation } = appState.profile.profile;
    dataClone.place.profile = { firstName, personalSummary, classOf, school, occupation };
    dataClone.place.interests = appState.profile.interests;
    const { zip, state, city } = placeData.address;
    dataClone.place.address = { zip, city, state };
    dataClone.place.amenities = placeData.amenities;

    return dataClone;
}

export function buildMarkerObj({ lat, lng }) {
    if (lat !== undefined || lng !== undefined) {
        return {
            position: {
                lat,
                lng,
            },
        };
    }
    return { lat, lng };
}

export function checkIfCoordsAreValid(coords) {
    const { lat, lng } = coords;
    return lat !== undefined && lng !== undefined;
}

export function getTripType(trip) {
    if (trip.status === tripStatus.COMPLETE || trip.status === tripStatus.DECLINED) return 'pastTrips';
    if (trip.status === tripStatus.ACTIVE) return 'activeTrips';
    if (trip.status === tripStatus.PENDING || trip.status === tripStatus.ACCEPTED) return 'pendingTrips';
    return 'pendingTrips';
}

export function MapTripsToCorrectCategories(trips) {
    const mappedObj = {
        pendingTrips: [],
        activeTrips: [],
        pastTrips: [],
    };
    if (!trips || !trips.length) return mappedObj;
    trips.forEach((trip) => {
        const tripType = getTripType(trip);
        mappedObj[tripType].push(trip);
    });
    return mappedObj;
}

export function determineImageDimensions(width, height, maxDimObj) {
    const maxHeight = maxDimObj.height;
    const maxWidth = maxDimObj.width;
    if (!maxWidth || !maxHeight) return { width, height };
    const widthRatio = width / maxWidth;
    const heightRatio = height / maxHeight;
    if (widthRatio < 1.01 && heightRatio < 1.01) return { width, height };
    const greatestRatio = widthRatio > heightRatio ? widthRatio : heightRatio;
    return {
        width: parseInt(width / greatestRatio, 10),
        height: parseInt(height / greatestRatio, 10),
        resized: true,
    };

}

export function obfiscateId(id) {
    return id.substr(4,6) + id.substr(7) + id.substr(0,3);
}

export function getCoordsFromPlaces(places) {
    return places.map(({ address_components, geometry: { location } }) => {
        return {
            lat: location.lat(),
            lng: location.lng(),
        };
    });
}

export function buildBoundsRange(coord, latLngFunc, range) {
    const { lat, lng } = coord;
    return {
        sw: new latLngFunc(lat - range, lng - range),
        ne: new latLngFunc(lat + range, lng + range),
    };
}