import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';

import ModalActions from '../../actions/ModalActions';

const WrappedDialog = props => (
    <Dialog
        title=""
        actions={props.modal.actions}
        open={props.modal.open}
        onRequestClose={props.modalActions.closeModal}
    >
        {props.modal.content}
    </Dialog>
);

function mapStateToProps(state) {
    const { modal } = state;
    return {
        modal,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        modalActions: bindActionCreators(ModalActions, dispatch),
    };
}

WrappedDialog.propTypes = {
    modalActions: PropTypes.object.isRequired, //eslint-disable-line
    modal: PropTypes.object.isRequired, //eslint-disable-line
};

export default connect(mapStateToProps, mapDispatchToProps)(WrappedDialog);
