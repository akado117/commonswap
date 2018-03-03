import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import UserActions from '../actions/userActions';
import ModalActions from '../actions/ModalActions';
import SignUpModal from './modals/SignUpModal';

class SignupModalButton extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        Meteor.autorun(() => {
            if (Meteor.userId()) this.forceUpdate();
        });
    }

    openSignupModal = () => {
        this.props.modalActions.openModal(<SignUpModal />);
    }

    render() {
        return (
            <div className={this.props.className} style={{ margin: '0' }}>
                <RaisedButton
                    target="_blank"
                    label="Sign-Up!"
                    style={{ width: '100%' }}
                    primary
                    icon={<FontIcon className="material-icons">person outline</FontIcon>}
                    onClick={this.openSignupModal}
                />
            </div>
        );
    }
}

SignupModalButton.propTypes = {
    className: PropTypes.string,
    modalActions: PropTypes.object.isRequired,
}

SignupModalButton.defaultProps = {
    className: '',
}

function mapDispatchToProps(dispatch) {
    return {
        modalActions: bindActionCreators(ModalActions, dispatch),
    };
}
//can also feed in dispatch mapper - this prevents the need to wrap every action function in dispatch
export default connect(() => ({}), mapDispatchToProps)(SignupModalButton);