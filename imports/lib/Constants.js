export const FAILURE = 'FAILURE';
export const SUCCESS = 'SUCCESS';
export const genericSuccessCode = 10;
export const imageSuccessCode = 11;
export const profileErrorCode = 21;
export const insufficentParamsCode = 22;
export const upsertFailedCode = 23;
export const placeErrorCode = 24;
export const plannerErrorCode = 25;
export const mongoFindOneError = 26;
export const tripErrorCode = 27;
export const actionTypes = {
    SAVE_ROOMIES: 'SAVE_ROOMIES',
    LOGIN_: 'LOGIN_',
    LOGOUT: 'LOGOUT',
    GET_PROFILE: 'GET_PROFILE',
    SAVE_PROFILE: 'SAVE_PROFILE',
    GET_PLACE: 'GET_PLACE',
    SAVE_PLACE: 'SAVE_PLACE',
    SAVE_PLACE_AVAILABILITY: 'SAVE_PLACE_AVAILABILITY',
    GET_PLACE_BY_AVAILABILITY: 'GET_PLACE_BY_AVAILABILITY',
    GET_PLACE_BY_ID: 'GET_PLACE_BY_ID',
    GET_PLACE_IMAGES: 'GET_PLACE_IMAGES',
    ADD_PLACE_IMAGE: 'ADD_PLACE_IMAGE',
    SAVE_BROWSE_DATES: 'SAVE_BROWSE_DATES',
    GET_PROFILE_IMAGE: 'GET_PROFILE_IMAGE',
    ADD_PROFILE_IMAGE: 'ADD_PROFILE_IMAGE',
    SAVE_DESIRED_DATES: 'SAVE_DESIRED_DATES',
    SAVE_CUSTOMER: 'SAVE_CUSTOMER',
    SAVE_TRIP: 'SAVE_TRIP',
    GET_TRIPS: 'GET_TRIPS',
};

export const FileTypes = {
    PLACE: 'PLACE',
    PROFILE: 'PROFILE',
};

export const stateFields = {
    fields: {
        displayNames: ["N/A","Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Maryland", "Massachusetts", "Michigan",
            "Minnesota", "Mississippi", "Missouri", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"],
        values: ["N/A","AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MT","NE",
            "NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","MD","MA","MI","MN","MS","MO","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"],
    },
};

export const defaultImageUrls = {
    cameraDude: 'http://stretchflex.net/photos/profileStock.jpeg',
    kevin: 'https://s3.us-east-2.amazonaws.com/com-swap-prod/static/profile_images/kevProf.JPG',
    alex: 'https://s3.us-east-2.amazonaws.com/com-swap-prod/static/profile_images/AKprofile.png',
    sassyChick: 'https://s3.us-east-2.amazonaws.com/com-swap-prod/static/profile_images/rsz_1profilestock2.jpg',
    awesomePlace: 'https://s3.us-east-2.amazonaws.com/com-swap-prod/static/rsz_apartment.jpg',
};

export const tripStatus = {
    ACTIVE: 'ACTIVE', //accepted and paid
    ACCEPTED: 'ACCEPTED',
    COMPLETE: 'COMPLETE',
    PENDING: 'PENDING',
};

export function standardResponseFunc(error, result, actionType, dispatch, cb) {
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
};

export const serviceErrorBuilder = (message, code, err = {}, extraParams = {}) => ({
    message,
    code,
    servicesStatus: FAILURE,
    err: {
        stack: err.stack,
        message: err.message,
    },
    ...extraParams,
});
export const serviceSuccessBuilder = (data, code, extraParams = {}) => ({
    response: data,
    code,
    servicesStatus: SUCCESS,
    ...extraParams,
});
export const consoleErrorHelper = (message, code, userId, error = {}) => {
    console.error(`${new Date().toLocaleString()}: ${userId}, ${code}, ${message}`);
    console.error(error.message);
    console.error(error.stack);

};
export const consoleLogHelper = (message, code, userId, error = '') => {
    console.log(`${new Date().toLocaleString()}: ${userId}, ${code}, ${message}, ${error}`)
};

export const FieldsForBrowseProfile = {
    _id: 1,
    ownerUserId: 1,
    userId: 1,
    profileId: 1,
    placeId: 1,
    placeImgs: 1,
    shortDesc: 1,
    numOfGuests: 1,
    bedrooms: 1,
    bathrooms: 1,
    coords: 1,
    url: 1,
    firstName: 1,
    city: 1,
    state: 1,
    school: 1,
    classOf: 1,
    profileImg: 1,
    interests: 1,
    amenities: 1,
    address: 1,
    profile: 1,
    specialInst: 1,
    notesOnArea: 1,
    detailedDesc: 1,
};

export const FieldsForTrip = {
    _id: 1,
    placeImg: 1,
    requesterName: 1,
    requesteeName: 1,
    //requesterEmail: 1,
    //requesteeEmail: 1,
    requesterUserId: 1,
    requesteeUserId: 1,
    requesterPlaceId: 1,
    requesteePlaceId: 1,
    'dates.arrival': 1,
    'dates.departure': 1,
    'address.city': 1,
    'address.state': 1,
    'place.bedrooms': 1,
    'place.numOfGuests': 1,
    'profile.school': 1,
    guests: 1,
    requesterProfileImg: 1,
    requesteeProfileImg: 1,
    requesterMessage: 1,
    rating: 1,
    ratingMessage: 1,
    status: 1,
}

export const noShowFieldsForPlace = {
    profileImg: 0,
    interests: 0,
    address: 0,
    profile: 0,
};

export const MaxImageUploadDim = {
    small: {
        sizeMb: 0.5,
        width: 700,
        height: 700,
    },
    large: {
        sizeMb: 2,
        width: 2048,
        height: 2048,
    },
};
export const MaxImageDimTypes = {
    LARGE: 'large',
    SMALL: 'small',
};

export const intTypeParams = ['numOfGuests', 'bathrooms', 'bedrooms', 'beds'];
export const doubleTypeParams = ['rent', 'lat', 'lng'];