import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox.jsx'

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
            <div className="row interests-container">
                <div className="row" style={{ paddingTop: '15px' }}>
                    {buttons}
                </div>
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