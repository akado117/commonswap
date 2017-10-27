export const FAILURE = 'FAILURE';
export const SUCCESS = 'SUCCESS';
export const genericSuccessCode = 10;
export const profileErrorCode = 21;
export const insufficentParamsCode = 22;
export const upsertFailedCode = 23;
export const actionTypes = {
    SAVE_ROOMIES: 'SAVE_ROOMIES',
    LOGIN_: 'LOGIN_',
    GET_PROFILE: 'GET_PROFILE',
    SAVE_PROFILE: 'SAVE_PROFILE',
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
