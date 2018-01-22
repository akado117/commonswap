import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import FontIcon from 'material-ui/FontIcon';
import TextFieldStandardized from '../forms/TextFieldStandardized';
import { onChangeHelper } from '../../../../imports/helpers/DataHelpers';
import { Today } from '../../../../imports/helpers/DateHelpers';
import ConnectedButton from '../forms/ConnectedButton';
import { actionTypes } from '../../helpers/ConstantsRedux';

class SwapPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            guests: 0,
            requesterMessage: '',
            dates: {
                arrival: Today,
                departure: Today,
            },
        };
    }

    setDate = (date, type) => {
        const { dates } = this.state;
        dates[type] = date;
        this.setState({ dates });
    }

    render() {
        const { arrival, departure } = this.state.dates
        return (
            <div className="swap-picker z-depth-2">
                <DatePicker
                    className="material-date-picker"
                    onChange={(nul, date) => this.setDate(date, 'arrival')}
                    textFieldStyle={{ width: '100%' }}
                    defaultDate={arrival}
                    floatingLabelText={<span><FontIcon className="material-icons">date_range</FontIcon> Arrival</span>}
                />
                <DatePicker
                    className="material-date-picker"
                    onChange={(nul, date) => this.setDate(date, 'departure')}
                    textFieldStyle={{ width: '100%' }}
                    defaultDate={departure}
                    floatingLabelText={<span><FontIcon className="material-icons">date_range</FontIcon> Departure</span>}
                />
                <div className="input-field">
                    <label htmlFor="bedroom-count"><i className="fa fa-user fa-1x" aria-hidden="true" /> Number of Guests</label>
                    <input type="number" min="0" className="" id="bedroom-count" onChange={e => this.setState({ guests: onChangeHelper(e)})} value={this.state.guests} />
                </div>
                <TextFieldStandardized
                    hintText="Description"
                    floatingLabelText={<span><i className="fa fa-envelope fa-1x" aria-hidden="true" /> Add a message</span>}
                    onChange={(nul, requesterMessage) => this.setState({ requesterMessage })}
                />
                <ConnectedButton
                    disabled={this.props.disableButton}
                    icon={undefined}
                    actionType={actionTypes.SAVE_TRIP}
                    buttonText="Request Swap"
                    onClick={() => this.props.requestSwap(this.state)}
                    className="swap-button"
                    successText="Your Swap Submitted"
                />
            </div>
        );
    }
}

SwapPicker.propTypes = {
    requestSwap: PropTypes.func.isRequired,
    disableButton: PropTypes.bool,
};

SwapPicker.defaultProps = {
    disableButton: false,
}

export default SwapPicker;