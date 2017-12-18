import { actionTypes } from '../../../imports/lib/Constants';

const modalActions = {
    openModal: (content, actions) => ({
        type: actionTypes.OPEN_MODAL,
        data: {
            actions,
            content,
        },
    }),
    closeModal: () => ({
        type: actionTypes.CLOSE_MODAL,
    }),
}

export default modalActions;