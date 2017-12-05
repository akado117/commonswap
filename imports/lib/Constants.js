export const FAILURE = 'FAILURE';
export const SUCCESS = 'SUCCESS';
export const genericSuccessCode = 10;
export const imageSuccessCode = 11;
export const profileErrorCode = 21;
export const placeErrorCode = 24;
export const insufficentParamsCode = 22;
export const upsertFailedCode = 23;
export const plannerErrorCode = 25;
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
    GET_PLACE_IMAGES: 'GET_PLACE_IMAGES',
    ADD_PLACE_IMAGE: 'ADD_PLACE_IMAGE',
    SAVE_BROWSE_DATES: 'SAVE_BROWSE_DATES',
    GET_PROFILE_IMAGE: 'GET_PROFILE_IMAGE',
    ADD_PROFILE_IMAGE: 'ADD_PROFILE_IMAGE',
    SAVE_DESIRED_DATES: 'SAVE_DESIRED_DATES',
    SAVE_CUSTOMER: 'SAVE_CUSTOMER',
};

export const FileTypes = {
    PLACE: 'PLACE',
    PROFILE: 'PROFILE',
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
}

export const noShowFieldsForPlace = {
    profileImg: 0,
    interests: 0,
    address: 0,
    profile: 0,
};

export const intTypeParams = ['numOfGuests', 'bathrooms', 'bedrooms', 'beds'];
export const doubleTypeParams = ['rent', 'lat', 'lng'];