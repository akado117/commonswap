import { actionTypes } from '../helpers/ConstantsRedux';

const ServiceActions = {
    sendServiceIsPending: actionType => ({
        type: actionTypes.SERVICE_PENDING,
        actionType,
    }),
    sendServiceResponded: actionType => ({
        type: actionTypes.SERVICE_RETURNED,
        actionType,
    }),
}

export default ServiceActions;