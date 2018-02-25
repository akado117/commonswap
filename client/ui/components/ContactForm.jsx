import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextFieldStandardized from './forms/TextFieldStandardized';
import ConnectedButton from './forms/ConnectedButton';
import { onChangeHelper } from '../../../imports/helpers/DataHelpers';
import TextField from 'material-ui/TextField';
import { actionTypes } from '../helpers/ConstantsRedux';

class ContactForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            comments: ''
        };
    }

    render() {
        return (
            <div className="contact-form">
                <div className="row">
                    <div className="col s12 m6">
                        <TextFieldStandardized
                            floatingLabelText={<span>First Name</span>}
                            onChange={e => this.setState({ firstName: onChangeHelper(e) })}
                        />
                    </div>
                    <div className="col s12 m6">
                        <TextFieldStandardized
                            floatingLabelText={<span>Last Name</span>}
                            onChange={e => this.setState({ lastName: onChangeHelper(e) })}
                        />
                    </div>
                    <div className="col s12 m6">
                        <TextFieldStandardized
                            floatingLabelText={<span>Email</span>}
                            onChange={e => this.setState({ email: onChangeHelper(e) })}
                        />
                    </div>
                    <div className="col s12 m6">
                        <TextFieldStandardized
                            floatingLabelText={<span>Phone</span>}
                            onChange={e => this.setState({ phone: onChangeHelper(e) })}
                        />
                    </div>
                    <div className="col s12">
                        <TextField
                            floatingLabelText="Comments/ Questions"
                            underlineStyle={{ borderBottomColor: '#9e9e9e' }}
                            floatingLabelStyle={{ top: '33px', fontSize: '1rem', color: '#9e9e9e', left: '0 !important' }}
                            multiLine
                            rows={5}
                            rowsMax={9}
                            fullWidth
                            onChange={e => this.setState({ comments: onChangeHelper(e) })}
                        />
                    </div>
                </div>
                <div className="comments-container">
                    <div className="row">
                        <div className="col s6 offset-s3">
                            <ConnectedButton
                                actionType={actionTypes.SEND_CONTACT}
                                buttonText="Submit"
                                onClick={() => this.props.contactUs(this.state)}
                                className=""
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ContactForm.propTypes = {
    contactUs: PropTypes.func.isRequired,
};

export default ContactForm;