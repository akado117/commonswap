import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontIcon from 'material-ui/FontIcon';
import TextFieldStandardized from '../forms/TextFieldStandardized';
import { onChangeHelper } from '../../../../imports/helpers/DataHelpers';
import ConnectedButton from '../forms/ConnectedButton';
import { actionTypes } from '../../helpers/ConstantsRedux';

class SendMessage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            question:'',
        };
    }

    render() {
        return (
            <div className="send-message z-depth-2">
                <div className="col s12 header">
                    <h4>Have a question?</h4>
                </div>
                <TextFieldStandardized
                    hintText=""
                    floatingLabelText={<span><i className="fa fa-envelope fa-1x" aria-hidden="true" /> Add a question</span>}
                    onChange={(nul, question) => this.setState({ question })}
                />
                <ConnectedButton
                    disabled={this.props.disableButton}
                    icon={undefined}
                    actionType={actionTypes.SEND_MESSAGE}
                    buttonText="Send Message"
                    onClick={() => this.props.sendMessage(this.state)}
                    className="message-button"
                />
            </div>
        );
    }
}

SendMessage.propTypes = {
    sendMessage: PropTypes.func.isRequired,
    disableButton: PropTypes.bool,
};

SendMessage.defaultProps = {
    disableButton: false,
}

export default SendMessage;