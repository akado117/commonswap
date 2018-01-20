import { Bert } from 'meteor/themeteorchef:bert';
import serviceActions from '../actions/ServiceActions';

export const FAILURE = 'FAILURE';
export const SUCCESS = 'SUCCESS';

let store;

export function setStore(Store) {
    store = Store;
}

export const actionTypes = {
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
    DELETE_PLACE_IMAGE: 'DELETE_PLACE_IMAGE',
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
    SERVICE_PENDING: 'SERVICE_PENDING',
    SERVICE_RETURNED: 'SERVICE_RETURNED',
    EMAIL_SENT: 'EMAIL_SENT',
    CARDS_CHARGED: 'CARDS_CHARGED',
    SAVE_CONTACT: 'SAVE_CONTACT',
    SAVE_CARD: 'SAVE_CARD',
    REORDER_PLACE_IMAGES: 'REORDER_PLACE_IMAGES',
    SAVE_PLACE_IMAGE_ORDER: 'SAVE_PLACE_IMAGE_ORDER',
    SEND_MESSAGE:'SEND_MESSAGE',
    MESSAGE_SENT:'MESSAGE_SENT',
    SAVE_CONTACT:'SAVE_CONTACT',
};

const serviceMessages = {
    SUCCESS: 'succeeded',
    FAILURE: 'failure',
    [actionTypes.SAVE_PROFILE]: 'Saving your profile has ',
    [actionTypes.SAVE_PLACE]: 'Saving your place has ',
    [actionTypes.SAVE_PLACE_AVAILABILITY]: 'Saving your place\'s available dates has ',
    [actionTypes.SAVE_TRIP]: 'Saving your interest in swapping with this person has ',
}

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
        Bert.alert(result.message, 'danger');
        return callback(result);
    }
};

export function servicePending(actionType) {
    store.dispatch(serviceActions.sendServiceIsPending(actionType));
};

export function serviceResponded(actionType) {
    store.dispatch(serviceActions.sendServiceResponded(actionType));
};


export const pendingAlert = () => Bert.alert('Waiting on the interwebs', 'info', 'growl-top-left');