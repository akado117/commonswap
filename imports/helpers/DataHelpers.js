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
        place.address = addresses.splice(addresses.indexOf(addy => addy.placeId === place._id))[0];
        place.profileImg = profileImgs.splice(profileImgs.indexOf(img => img.userId === place.ownerUserId))[0];
        place.placeImgs = pullMatchingFromArray(placeImgs, placeImageIdx, place._id);
        place.profile = profiles.splice(profiles.indexOf(prof => prof._id === place.ownerUserId))[0];
        placeForBrowseArray.push(place);
    });
    return placeForBrowseArray;
};

export function onChangeHelper(event) {
    return event.target.value;
};

