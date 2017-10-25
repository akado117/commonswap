import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox.js'

class InterestsComponent extends Component {
    constructor(){
        super();

        this.state = {
        };
    }

    onChangeHandler = (e, type) => {
        const value = !this.state[type];
        this.props.getValueFunc(type, value);
        this.setState({ [type]: value })
    }

    render() {
        const buttons = this.props.buttonData.map((buttonData, idx) => {
           return <Checkbox key={`interests-${idx}`} onClick={this.onChangeHandler} name={buttonData.name} active={this.state[buttonData.name]} label={buttonData.label}/>
        });
        return (
            <div className="row interests-container" style={{ paddingTop: '15px' }}>
                {buttons}
            </div>
        )
    }
}

InterestsComponent.propTypes = {
    getValueFunc: PropTypes.func.isRequired,
    buttonData: PropTypes.array.isRequired,
};

InterestsComponent.defaultProps = {
    getValueFunc: () => {},
    buttonData: [],
};

export default InterestsComponent;