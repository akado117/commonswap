export const serviceErrorBuilder = (message, code, extraParams = {}) => ({
    message,
    code,
    servicesStatus: FAILURE,
    ...extraParams
});
export const serviceSuccessBuilder = (data, code, extraParams = {}) => ({
    response: data,
    code,
    servicesStatus: SUCCESS,
    ...extraParams,
});
export const consoleErrorHelper = (message, code, userId, error = '') => {
    console.error(`${new Date().toLocaleString()}: ${userId}, ${code}, ${message}, ${error}`)
};
export const consoleLogHelper = (message, code, userId, error = '') => {
    console.log(`${new Date().toLocaleString()}: ${userId}, ${code}, ${message}, ${error}`)
};
export const FAILURE = 'FAILURE';
export const SUCCESS = 'SUCCESS';
export const genericSuccessCode = 10;
export const profileErrorCode = 21;
export const insufficentParamsCode = 22;
export const upsertFailedCode = 23;

const constants = {
    actionTypes: {
        SAVE_ROOMIES: 'SAVE_ROOMIES',
        LOGIN_: 'LOGIN_',
    },
    SUCCESS: 'SUCCESS',
    FAILURE: 'FAILURE',
};



export default constants