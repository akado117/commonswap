import React from 'react';
import PropTypes from 'prop-types';

class FloatLabelForm extends React.Component {
    constructor() {
        super()
        this.state = {
            error: ''
        }
        this.validationHandler = this.validationHandler.bind(this)
    }
    validationHandler(e) {
        const inputValue = e.currentTarget.value
        if(this.props.validationHandler){
            this.setState({error: this.props.validationHandler() || ''})
        }
    }
    render() {
        const name = this.props.name.replace(/ /g, "_")
        const inputClass = "input-field col s12 " + (this.props.customClass || '')

        const additionalAttributes = this.props.additionalAttribs? this.props.additionalAttribs : {}

        const inputField = <input required={this.props.required} disabled={this.props.disabled} onBlur={this.validationHandler}
                                  id={name} type={this.props.type || 'text' } className="validate" {...additionalAttributes}/>
        return (
            <div className={inputClass}>
                {inputField}
                <label htmlFor={name} data-error={this.props.dataError} data-success={this.props.dataSuccess}>
                    {this.props.name} <span className="input-error">{this.state.error}</span></label>
            </div>
        )
    }
}

FloatLabelForm.PropTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    customClass: PropTypes.string,
    dataError: PropTypes.string,
    dataSuccess: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool
}

export default FloatLabelForm