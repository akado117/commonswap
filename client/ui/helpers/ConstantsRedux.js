export const FAILURE = 'FAILURE';
export const SUCCESS = 'SUCCESS';

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
    GET_CARD_INFO: 'GET_CARD_INFO',
    OPEN_MODAL: 'OPEN_MODAL',
    CLOSE_MODAL: 'CLOSE_MODAL',
};

export function standardResponseFunc(error, result, actionType, dispatch, cb) {
    let callback = cb;
    const failure = `${actionType}_${FAILURE}`;
    const success = `${actionType}_${SUCCESS}`;
    if (!cb) {
        callback = () => {};
    }
    if (error) {
        console.log(error);
        dispatch({
            type: failure,
            ...error,
        });
        return callback(error);
    } else {
        if (result.data) {
            dispatch({
                type: success,
                data: result.data,
            });
            return callback(undefined, result);
        };
        dispatch({
            type: failure,
            errorMessage: result.message,
            ...result,
        });
        return callback(result);
    }
};