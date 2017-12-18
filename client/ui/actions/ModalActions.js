import { actionTypes } from '../helpers/ConstantsRedux';

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